// React imports
import crypto from "crypto";

// Other library imports
import axios from "axios";
import { v4 } from "uuid";

// Define the dynamic flag
export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request, searchParams) {
  const { params } = searchParams;
  const { isCouponApplied, discount } = await request.json();

  const baseAmountInPaise = Number(process.env.BASE_AMOUNT) * 100;
  const discountPercentage = isCouponApplied ? discount : 0;
  const finalAmount = baseAmountInPaise * (1 - discountPercentage / 100);

  const payload = {
    merchantId: process.env.PHONEPE_MERCHANT_ID,
    merchantTransactionId: v4().replace(/-/g, "").slice(0, 16),
    merchantUserId: params.uid,
    amount: finalAmount,
    redirectUrl: `${process.env.BASE_URL}/api/phonepe/response/${params.uid}`,
    redirectMode: "POST",
    callbackUrl: `${process.env.BASE_URL}/api/phonepe/response/${params.uid}`,
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const stringifiedData = JSON.stringify(payload);
  const base64String = Buffer.from(stringifiedData).toString("base64");
  const decodedString =
    base64String + "/pg/v1/pay" + process.env.PHONEPE_SALT_KEY;
  const checksum =
    crypto.createHash("sha256").update(decodedString).digest("hex") +
    "###" +
    process.env.PHONEPE_SALT_INDEX;

  try {
    const response = await axios({
      method: "post",
      url: `${process.env.PHONEPE_API_BASE_URL}/pg/v1/pay`,
      data: { request: base64String },

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
    });

    return Response.json(
      response.data.data.instrumentResponse.redirectInfo.url
    );
  } catch (error) {
    console.error(
      "Error making the API request:",
      error.response?.data || error.message
    );
    return Response.json({
      error: error.message,
      details: error.response?.data,
    });
  }
}
