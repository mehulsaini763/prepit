"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { auth } from "@/configs/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  deleteUser,
} from "firebase/auth";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Spinner,
} from "@/components/material-tailwind/components";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getDocument } from "@/utils/db";
import { setCookie } from "@/utils/misc";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const SignInPage = () => {
  const router = useRouter();
  const [signingIn, setSigningIn] = useState(false);
  const [loggingInGoogle, setLoggingInGoogle] = useState(false);
  const [asterik, setAsterik] = useState(true);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setSigningIn(true);
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (result.user) {
        const data = await getDocument("users", result.user.uid);

        if (!data) {
          alert("User doesn't exsist! Try Signing Up");
          await deleteUser(result.user);
          await signOut(auth);
          return;
        }

        await setCookie("[BF USER]", { ...data, expiresIn: "12h" });
        router.push("/dashboard/tests");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("Invalid credentials");
    } finally {
      setSigningIn(false);
    }
  };

  const googleSignIn = async () => {
    setLoggingInGoogle(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        const data = await getDocument("users", result.user.uid);

        if (data) {
          alert("User doesn't exsist! Try Signing Up");
          await deleteUser(result.user);
          await signOut(auth);
          return;
        }

        await setCookie("[BF USER]", { ...data, expiresIn: "12h" });
        router.push("/dashboard/tests");
      }
    } catch (error) {
      console.error("Error occurred during Google sign-in", error);
    } finally {
      setLoggingInGoogle(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Card
        color="blue"
        variant="gradient"
        className="hidden w-3/5 rounded-none h-full md:flex flex-col justify-start items-start gap-4 p-12 text-gray-50"
      >
        <p className="text-5xl font-semibold">Welcome Back!</p>
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Image
            alt="Image"
            src="/assets/Online test-amico.svg"
            width={1000}
            height={1000}
            className="w-96 h-96"
          />
        </div>
      </Card>
      <div className="w-full md:w-2/5 flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="mx-auto w-full max-w-[24rem]" shadow={false}>
            <CardBody className="flex flex-col gap-4">
              <div>
                <p className="text-xl font-bold text-black">Sign In</p>
                <p className="text-sm">Enter your Details</p>
              </div>
              <div>
                <Input
                  {...register("email")}
                  id="email"
                  label="Email"
                  size="sm"
                  color={errors.email ? "red" : "blue"}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div>
                <Input
                  {...register("password")}
                  type={asterik ? "password" : "text"}
                  id="password"
                  label="Password"
                  size="sm"
                  color={errors.password ? "red" : "blue"}
                  icon={
                    asterik ? (
                      <EyeIcon
                        className="h-4 w-4"
                        onClick={() => setAsterik(!asterik)}
                      />
                    ) : (
                      <EyeSlashIcon
                        className="h-4 w-4"
                        onClick={() => setAsterik(!asterik)}
                      />
                    )
                  }
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    {errors.password.message}
                  </span>
                )}
                <div className="w-full text-right">
                  <Link
                    href={"/password/forgot"}
                    className="text-xs text-blue-500 font-medium"
                  >
                    forgot password?
                  </Link>
                </div>
              </div>

              <Button
                disabled={signingIn}
                type="submit"
                variant="gradient"
                fullWidth
                className="flex items-center justify-center"
              >
                {signingIn ? (
                  <Spinner color="blue" className="h-4 w-4" />
                ) : (
                  "Sign In"
                )}
              </Button>
              <hr />
              <Button
                className="flex items-center justify-center gap-2"
                color="gray"
                size="sm"
                variant="outlined"
                onClick={googleSignIn}
                disabled={loggingInGoogle}
              >
                {loggingInGoogle ? (
                  <Spinner color="gray" className="h-4 w-4" />
                ) : (
                  <>
                    <Image
                      width={50}
                      height={50}
                      alt="logo"
                      src="/assets/google.png"
                      className="w-4 h-4 m-1"
                    />
                    Continue with Google
                  </>
                )}
              </Button>
            </CardBody>
            <CardFooter className="flex justify-center gap-1 text-xs">
              <p>Don't have an account?</p>
              <Link
                href="/signup"
                className="font-bold hover:underline hover:cursor-pointer"
              >
                Sign Up
              </Link>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
