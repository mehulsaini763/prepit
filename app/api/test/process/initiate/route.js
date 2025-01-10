import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/configs/firebase";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request) {
  try {
    const test = await request.json();

    const docRef = doc(db, "tests", "userTests", test.userId, test.testId);

    await setDoc(docRef, {
      testId: test.testId,
      testType: test.testType,
      isProcessed: false,
      createdAt: serverTimestamp(),
    });

    return Response.json(
      { success: true, messsage: "Test Initialized" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.messsage);
    console.log("Failed to initialize test");
    return Response.json(
      { success: true, messsage: "Failed to initialize test" },
      { status: 200 }
    );
  }
}
