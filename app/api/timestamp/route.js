export const dynamic = "force-dynamic"; // defaults to auto

import { Timestamp } from "firebase/firestore";

export async function GET(request) {
  await request;
  try {
    const timestamp = Timestamp.now();
    console.log("############ TIMESTAMP SENT SUCCESSFULLY #############");
    return Response.json(timestamp);
  } catch (error) {
    console.log("############ TIMESTAMP ERROR #############");
    return Response.json(400);
  }
}
