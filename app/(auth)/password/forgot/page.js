"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@/components/material-tailwind/components";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/configs/firebase";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const formSchema = z.object({
  email: z.string().email("Invalid Email"),
});

const ForgotPasswordPage = () => {
  const [sent, setSent] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    await sendPasswordResetEmail(auth, data.email);
    setSent(true);
  };

  return (
    <div className="w-full md:w-2/5 flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mx-auto w-full max-w-md" shadow={false}>
          <CardBody className="flex flex-col gap-4">
            <div>
              <p className="text-xl font-bold text-black">
                Forgot Your Password?
              </p>
              <p className="text-sm">
                No worries! We've got you covered. Just enter the email address
                associated with your account, and we'll send you a link to reset
                your password.
              </p>
            </div>
            <Typography variant="h6">Steps to Reset Your Password:</Typography>
            <ol className="list-decimal">
              <li>
                {" "}
                <Typography className="text-sm font-semibold">
                  Enter your email address below.
                </Typography>
              </li>
              <li>
                <Typography className="text-sm font-semibold">
                  Check your email for a password reset link.
                </Typography>
              </li>
              <li>
                <Typography className="text-sm font-semibold">
                  Click the link and follow the instructions to set a new
                  password.
                </Typography>
              </li>
            </ol>

            <Typography className="text-xs font-semibold">
              {" "}
              Note: If you don't receive the email within a few minutes, please
              check your spam or junk folder.
            </Typography>

            <div>
              <div>
                <Input
                  {...register("email")}
                  id="email"
                  label="Email"
                  size="sm"
                />
                {sent && (
                  <p className="italic text-red-500">
                    reset link is sent to your email
                  </p>
                )}
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <Button
              variant="gradient"
              fullWidth
              type="submit"
              disabled={sent}
              className="flex items-center justify-center"
            >
              Reset Password
            </Button>
          </CardBody>
          <CardFooter className="flex flex-col justify-center gap-2 text-xs">
            If you still encounter issues or need further assistance, please
            contact our support team at [support email/contact link].
            <Link
              href={"/signin"}
              className="flex gap-2 items-center text-blue-500 py-2 text-base"
            >
              <ArrowLeftIcon className="h-5 w-5" /> Go to SignIn Page
            </Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
