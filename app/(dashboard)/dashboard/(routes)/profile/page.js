"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { auth } from "@/configs/firebase";
import { sendEmailVerification } from "firebase/auth";

import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import {
  Input,
  Typography,
  Button,
  Spinner,
} from "@/components/material-tailwind/components";

// import moment from "moment";
import { getCookie } from "@/utils/misc";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    (async () => {
      const user = await getCookie("[BF USER]");
      setUser(user);
    })();

    (async () => {
      if (auth.currentUser) {
        const token = await auth.currentUser.getIdTokenResult();
        setProvider(token.signInProvider);
      }
    })();
  }, [auth.currentUser]);

  const [showVerificationMessage, setVerificationMessage] = useState(false);

  const verifyEmail = async () => {
    await sendEmailVerification(auth.currentUser);
    setVerificationMessage(true);
  };

  return !user || !auth.currentUser ? (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Spinner color="blue" className="h-8 w-8" />
    </div>
  ) : (
    <div className="overflow-y-auto h-full p-2">
      <Typography variant="h5" color="blue-gray">
        Basic Information
      </Typography>
      <Typography variant="small" className="text-gray-600 font-normal">
        Update your profile information below.
      </Typography>
      <hr className="my-2 border-gray-400" />
      <div className="flex flex-col gap-4 pt-4 pb-12">
        <div className="flex flex-col items-center w-full md:flex-row">
          <div className="w-full mb-1 md:mb-0 md:w-1/3">
            <Typography
              variant="paragraph"
              color="blue-gray"
              className=" font-medium"
            >
              Name
            </Typography>
            <Typography variant="small" color="blue-gray">
              Your full name
            </Typography>
          </div>
          <div className="w-full md:w-1/3">
            <Input size="md" value={user.fullName} disabled color="blue" />
          </div>
        </div>
        <div className="flex flex-col items-center w-full md:flex-row">
          <div className="w-full mb-1 md:mb-0 md:w-1/3">
            <Typography
              variant="paragraph"
              color="blue-gray"
              className=" font-medium"
            >
              Email
            </Typography>
            <Typography variant="small" color="blue-gray">
              Your email{" "}
              <i>
                {auth.currentUser.emailVerified
                  ? "(Verified)"
                  : "(Not Verified)"}
              </i>
            </Typography>
            <p className="text-xs italic text-red-500">
              {showVerificationMessage &&
                "verification link is sent to your email"}
            </p>
          </div>
          <div className="w-full md:w-1/3 relative flex">
            <Input
              type="email"
              label="Email Address"
              value={user.email}
              disabled
              icon={
                auth.currentUser.emailVerified && (
                  <CheckBadgeIcon className="w-6 h-6 text-green-500" />
                )
              }
            />
            {!auth.currentUser.emailVerified && (
              <Button
                size="sm"
                className="!absolute right-1 top-1 rounded shadow-none hover:shadow-none"
                onClick={verifyEmail}
                disabled={showVerificationMessage}
              >
                Verify
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center w-full md:flex-row">
          <div className="w-full mb-1 md:mb-0 md:w-1/3">
            <Typography
              variant="paragraph"
              color="blue-gray"
              className=" font-medium"
            >
              Mobile
            </Typography>
            <Typography variant="small" color="blue-gray">
              Your phone number
            </Typography>
          </div>
          <div className="w-full md:w-1/3">
            <Input size="md" value={user.phoneNumber} disabled color="blue" />
          </div>
        </div>
      </div>
      {/* <Typography variant="h5" color="blue-gray">
        Subscription
      </Typography>
      <Typography variant="small" className="text-gray-600 font-normal">
        View your subscription information below.
      </Typography>
      <hr className="my-2 border-gray-400" />
      <div className="flex flex-col gap-4 pt-4 pb-12">
        <div className="flex flex-col items-center w-full md:flex-row">
          <div className="w-full mb-1 md:mb-0 md:w-1/3">
            <Typography variant="paragraph" color="blue-gray" className=" font-medium">
              Subscribed
            </Typography>
            <Typography variant="small" color="blue-gray">
              have you Subscribed?
            </Typography>
          </div>
          <div className="w-full md:w-1/3">
            <Input
              size="lg"
              value={user.isSubscribed ? 'You are Subscribed' : 'You are Not Subscribed'}
              disabled
              color="blue"
              icon={user.isSubscribed && <CheckBadgeIcon className="w-6 h-6 text-green-500" />}
            />
          </div>
        </div>
        {user.isSubscribed && (
          <div className="flex flex-col items-center w-full md:flex-row">
            <div className="w-full md:w-1/3">
              <Typography variant="paragraph" color="blue-gray" className=" font-medium">
                Subscribed On
              </Typography>
              <Typography variant="small" color="blue-gray">
                Subscription Date
              </Typography>
            </div>
            <div className="w-full md:w-1/3">
              <Input
                size="md"
                value={moment.unix(user.subscribedAt.seconds).format('Do MMMM YYYY')}
                disabled
                color="blue"
              />
            </div>
          </div>
        )}
      </div> */}
      {provider != "google.com" && (
        <>
          <Typography variant="h5" color="blue-gray">
            Other Settings
          </Typography>
          <Typography variant="small" className="text-gray-600 font-normal">
            Other account related settings
          </Typography>
          <hr className="my-2 border-gray-400" />
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col items-center w-full md:flex-row">
              <div className="w-full md:w-1/3">
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className=" font-medium"
                >
                  Change Password
                </Typography>
                <Typography variant="small" color="blue-gray">
                  Change your current password
                </Typography>
              </div>
              <div className="w-full md:w-1/3">
                <Link href={"/password/change"}>
                  <Button size="md" color="blue">
                    Change Password
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
