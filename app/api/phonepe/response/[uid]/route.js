// Node.js imports
import crypto from "crypto";

// Third-party library imports
import axios from "axios";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/configs/firebase";

// Define the dynamic flag
export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request, { params }) {
  const body = await request.formData();

  const merchantId = body.get("merchantId");
  const merchantTransactionId = body.get("transactionId");

  const endpoint = `/pg/v1/status/${merchantId}/${merchantTransactionId}`;
  const decodedString = endpoint + process.env.PHONEPE_SALT_KEY;

  const encodedString = crypto
    .createHash("sha256")
    .update(decodedString)
    .digest("hex");
  const checksum = `${encodedString}###${process.env.PHONEPE_SALT_INDEX}`;

  try {
    const response = await axios.get(
      `${process.env.PHONEPE_API_BASE_URL}${endpoint}`,
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
          "X-MERCHANT-ID": merchantId,
        },
      }
    );

    const userDocRef = doc(db, "users", params.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      return Response.json({
        error: "User does not exist",
      });
    }

    const user = userDocSnap.data();

    const docRef = doc(db, "payments", response.data.data.transactionId);
    await setDoc(docRef, {
      amount: response.data.data.amount,
      createdAt: serverTimestamp(),
      email: user.email,
      phoneNumber: user.phoneNumber,
      fullName: user.fullName,
      txnId: response.data.data.transactionId,
      uid: params.uid,
    });

    await updateDoc(userDocRef, {
      isSubscribed: true,
      subscribedAt: serverTimestamp(),
    });

    return Response.redirect(
      `${process.env.BASE_URL}/dashboard/tests`
    );
  } catch (error) {
    console.error(
      "Error making the API request:",
      error.response?.data || error.message
    );
    return Response.json(
      {
        error: "Request failed",
        details: error.response?.data || error.message,
      },
      { status: error.response ? error.response.status : 500 }
    );
  }
}
