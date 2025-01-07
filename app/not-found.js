"use client";

import { Spinner, Typography } from "@/components/material-tailwind/components";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter()
    router.push('/')
  return (
    <div className="flex flex-col justify-center gap-8 items-center h-screen w-full">
      <Typography variant="h4">Invalid Request</Typography>
        <Spinner className="h-6 w-6"/>
        <Typography variant="lead">Redirecting</Typography>
    </div>
  );
}
