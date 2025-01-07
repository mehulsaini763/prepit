"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { auth } from "@/configs/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Spinner,
} from "@/components/material-tailwind/components";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { getDocument, getDocumentByQuery, setDocument } from "@/utils/db";
import { setCookie } from "@/utils/misc";

const formSchema = z
  .object({
    fullName: z.string().min(1, "Invalid Name"),
    email: z.string().email("Invalid Email"),
    password: z.string().min(8, "Password too short"),
    confirmPassword: z.string().min(8, "Passwords do not match"),
    phoneNumber: z
      .string()
      .min(10, "Invalid Phone Number")
      .max(10, "Invalid Phone Number"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

const SignUpPage = () => {
  const router = useRouter();
  const [signingIn, setSigningIn] = useState(false);
  const [asterik, setAsterik] = useState(true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      subscribedAt: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    setSigningIn(true);
    const { fullName, email, password, phoneNumber } = data;
    try {
      const user = await getDocumentByQuery("users", "email", "==", email);

      if (user[0]) {
        alert("Email is already registered");
        setSigningIn(false);
        return;
      }

      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (result.user) {
        await setDocument(
          "users",
          result.user.uid,
          {
            id: result.user.uid,
            fullName,
            email,
            phoneNumber,
            isSubscribed: false,
          },
          true
        );
      }

      const data = await getDocument("users", result.user.uid);

      if (data) {
        await setCookie("[BF USER]", { ...data, expiresIn: "12h" });
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert(error);
    }
    setSigningIn(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Card
        color="blue"
        variant="gradient"
        className="hidden w-3/5 rounded-none h-full md:flex flex-col justify-start items-start gap-4 p-12 text-gray-50"
      >
        <div>
          <h1 className="text-5xl font-bold text-white">
            Join Our Learning Community
          </h1>
          <p className="text-xl text-white mb-6">
            Access thousands of mock tests, track your progress, and achieve
            your dreams with our comprehensive test preparation platform.
          </p>
        </div>
        <div className="flex justify-between items-start py-8">
          <ul className="list-disc list-inside text-white text-xl font-semibold">
            <li className="mb-2">Extensive Question Bank</li>
            <li className="mb-2">Real Exam Simulation</li>
            <li className="mb-2">Instant Feedback</li>
            <li className="mb-2">Performance Tracking</li>
            <li className="mb-2">Expert Guidance</li>
          </ul>
          <div>
            <Image
              alt="Image"
              src="/assets/Online test-pana.svg"
              width={1000}
              height={1000}
              className="h-80 w-80 text-gray-200"
            />
          </div>
        </div>
      </Card>
      <div className="md:w-2/5 flex flex-col w-full justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card shadow={false}>
            <CardBody className="flex flex-col gap-4">
              <div>
                <p className="text-xl font-bold text-black">Sign Up</p>
                <p className="text-sm">Enter your Details</p>
              </div>
              <div>
                <Input
                  {...register("fullName")}
                  id="fullName"
                  label="Name"
                  size="sm"
                  color={errors.fullName ? "red" : "blue"}
                />
                {errors.fullName && (
                  <span className="text-red-500 text-xs">
                    {errors.fullName.message}
                  </span>
                )}
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
                  {...register("phoneNumber")}
                  id="phoneNumber"
                  label="Phone Number"
                  size="sm"
                  color={errors.phoneNumber ? "red" : "blue"}
                />
                {errors.phoneNumber && (
                  <span className="text-red-500 text-xs">
                    {errors.phoneNumber.message}
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
              </div>
              <div>
                <Input
                  {...register("confirmPassword")}
                  type={asterik ? "password" : "text"}
                  id="confirmPassword"
                  label="Confirm Password"
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
                {errors.confirmPassword && (
                  <span className="text-red-500 text-xs">
                    {errors.confirmPassword.message}
                  </span>
                )}
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
                  "Sign Up"
                )}
              </Button>
            </CardBody>
            <CardFooter className="flex justify-center items-center gap-1 text-xs">
              <p>Already have an account?</p>
              <Link
                href="/signin"
                className="font-bold hover:underline hover:cursor-pointer"
              >
                Sign In
              </Link>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
