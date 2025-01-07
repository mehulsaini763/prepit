"use client";

//react
import { useEffect, useState } from "react";

//next
import { useRouter } from "next/navigation";

//firebase
import { db } from "@/configs/firebase";

//icons
import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

//ui components
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Spinner,
  Typography,
} from "@/components/material-tailwind/components";

import { doc, getDoc } from "firebase/firestore";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

const SubscriptionModal = ({ user }) => {
const matchMedia = useMediaQuery({query:'(max-width:920px)'})

  // For routing
  const router = useRouter();

  // To handle modal visibility state
  const [modal, setModal] = useState(false);
  const handleDialog = () => {
    setIsCouponApplied(false);
    setDiscount("");
    setChecking(false);
    setValid(null);
    setModal(!modal);
  };

  const [baseAmount, setBaseAmount] = useState(0);
  const [code, setCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [discount, setDiscount] = useState("");
  const [checking, setChecking] = useState(false);
  const [valid, setValid] = useState(null);

  const checkCoupon = async () => {
    if (code == "") return;
    setChecking(true);
    const docRef = doc(db, "coupons", code);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().isActive) {
      setValid(true);
      setIsCouponApplied(true);
      setDiscount(+docSnap.data().percentageDiscount);
    } else {
      setIsCouponApplied(false);
      setValid(false);
    }
    setChecking(false);
  };

  // To set loading state
  const [loading, setLoading] = useState(false);

  const makePayment = async () => {
    setLoading(true);
    const response = await axios({
      url: `/api/phonepe/request/${user.id}`,
      method: "POST",
      data: JSON.stringify({
        isCouponApplied: isCouponApplied,
        discount: discount,
      }),
    });
    sessionStorage.removeItem('user')
    router.push(response.data);
  };

  useEffect(() => {
    (async () => {
      const baseAmount = (await axios.get("/api/baseAmount")).data;
      setBaseAmount(baseAmount);
    })();
  }, []);

  return (
    <>
      {/* Button to open the test setup modal */}
      <Button size="md" onClick={handleDialog}>
        Take Test
      </Button>

      {/* Modal for test setup */}
      <Dialog size="sm" open={modal}>
        {/* Modal header */}
        <DialogHeader className="flex items-center justify-end">
          {/* Close button for the modal */}
          <IconButton
            size="sm"
            variant="text"
            className="rounded-full"
            onClick={handleDialog}
            disabled={loading || checking}
          >
            <XMarkIcon className="w-5 h-5" />
          </IconButton>
        </DialogHeader>

        {/* Modal body */}
        <DialogBody className="space-y-4 md:space-y-2">
          <div className="flex flex-col justify-center items-center gap-2">
            <Typography variant={matchMedia?'h4':'h5'} className="text-center" color="black">
              Ace Your Exams with Python Eval!
            </Typography>
            <Typography variant="small" color="black" className="text-center">
              Unlock premium mock tests, expert insights, and personalized
              analytics. Subscribe now to ace your exams with confidence!
            </Typography>
          </div>
          <div className="md:p-4">
            <Typography variant="h6" color="black">
              What you get
            </Typography>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-6 w-6 text-blue-500" />
                <Typography
                  variant="small"
                  color="black"
                  className="font-medium"
                >
                  Unlimited Mock Tests
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-6 w-6 text-blue-500" />
                <Typography
                  variant="small"
                  color="black"
                  className="font-medium"
                >
                  Expert Insights
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-6 w-6 text-blue-500" />
                <Typography
                  variant="small"
                  color="black"
                  className="font-medium"
                >
                  Real Exam Simulation
                </Typography>
              </div>
            </div>
          </div>
          <div className=" md:px-4">
            <Typography variant="h6" color="black">
              Got a coupon code?
            </Typography>
            <div className="flex items-center gap-2">
              <div className="w-full">
                <Input
                  disabled={loading || checking}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  label="CODE"
                  icon={
                    checking ? (
                      <Spinner className="h-5 w-5" />
                    ) : valid == null ? null : valid ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-red-800" />
                    )
                  }
                />
              </div>
              <Button
                onClick={checkCoupon}
                className="flex justify-center items-center"
                disabled={loading || checking}
              >
                Apply
              </Button>
            </div>
          </div>
        </DialogBody>

        {/* Modal footer */}
        <DialogFooter className="border-t border-gray-400 flex items-center justify-between">
          <p className="text-3xl md:text-4xl font-bold text-black px-2">
            <sup className="text-xl font-medium">₹</sup>
            {isCouponApplied
              ? baseAmount - baseAmount * (discount / 100)
              : baseAmount}
            <sub className="text-xs md:text-sm md:px-2 font-medium italic">(Life time)</sub>
          </p>
          {/* Submit button */}
          <Button
            disabled={loading || checking}
            size="md"
            onClick={makePayment}
          >
            <div className="flex justify-center">
              {loading ? <Spinner className="h-4 w-4" /> : "Subscribe"}
            </div>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default SubscriptionModal;
