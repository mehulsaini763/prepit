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
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "@/configs/firebase";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const formSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // set the path to the confirmPassword field
  });

const ChangePasswordPage = () => {
  const [changed, setChanged] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    const user = auth.currentUser;
    if (user) {
      const credential = EmailAuthProvider.credential(
        user.email,
        data.currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, data.newPassword);
      setChanged(true);
    }
  };

  return (
    <div className="w-full md:w-2/5 flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mx-auto w-full max-w-md" shadow={false}>
          <CardBody className="flex flex-col gap-4">
            <div>
              <p className="text-xl font-bold text-black">
                Change Your Password
              </p>
              <p className="text-sm">
                Keep your account secure by regularly updating your password.
                Please enter your current password and choose a new one.
              </p>
            </div>
            <p className="text-base font-bold">
              Steps to Change Your Password:
            </p>
            <ol className="list-decimal p-0">
              <li>
                <Typography className="text-sm font-semibold">
                  Enter your current password.
                </Typography>
              </li>
              <li>
                <Typography className="text-sm font-semibold">
                  Enter your new password.
                </Typography>
              </li>
              <li>
                <Typography className="text-sm font-semibold">
                  Confirm your new password by entering it again.
                </Typography>
              </li>
              <li>
                <Typography className="text-sm font-semibold">
                  Click the "Change Password" button.
                </Typography>
              </li>
            </ol>

            <div
              className={`flex flex-col ${
                form.formState.isValid ? "gap-4" : ""
              }`}
            >
              <div>
                <Input
                  {...register("currentPassword")}
                  id="currentPassword"
                  label="Current Password"
                  size="sm"
                  type="password"
                />
                {errors.currentPassword && (
                  <span className="text-red-500 text-xs">
                    {errors.currentPassword.message}
                  </span>
                )}
              </div>
              <div>
                <Input
                  {...register("newPassword")}
                  id="newPassword"
                  label="New Password"
                  size="sm"
                  type="password"
                />
                {errors.newPassword && (
                  <span className="text-red-500 text-xs">
                    {errors.newPassword.message}
                  </span>
                )}
              </div>
              <div>
                <Input
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  label="Confirm New Password"
                  size="sm"
                  type="password"
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-xs">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
              {changed && (
                <p className="italic text-green-500">
                  Password has been successfully changed
                </p>
              )}
            </div>

            <Button
              variant="gradient"
              fullWidth
              type="submit"
              disabled={changed}
              className="flex items-center justify-center"
            >
              Change Password
            </Button>
          </CardBody>
          <CardFooter className="flex flex-col justify-center gap-2 text-xs py-2">
            <Link
              href={"/dashboard/profile"}
              className="flex gap-2 items-center text-blue-500 py-2 text-base"
            >
              <ArrowLeftIcon className="h-5 w-5" /> Go to Profile Page
            </Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
