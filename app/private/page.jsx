"use client";

import { setDocuments, updateDocuments } from "@/utils/db-new";
import axios from "axios";
import { useState } from "react";

const page = () => {
  const [objects, setObject] = useState([
    {
      id: `PIQ${Date.now()}`,
      category: "Account Related",
      closedResponse: "",
      email: "mehulsaini763@gmail.com",
      fullName: "Mehul Saini",
      openRequest: "Issue with account login",
      reOpenRequest: "",
      resolvedResponse: "",
      status: "open",
    },
    {
      id: `PIQ${Date.now()}`,
      category: "Test Related",
      closedResponse: "The test was reset successfully.",
      email: "rohit.verma@gmail.com",
      fullName: "Rohit Verma",
      openRequest: "Reset my test progress",
      reOpenRequest: "",
      resolvedResponse: "Test progress has been reset.",
      status: "closed",
    },
    {
      id: `PIQ${Date.now()}`,
      category: "Subscription Related",
      closedResponse: "",
      email: "priya.kapoor@example.com",
      fullName: "Priya Kapoor",
      openRequest: "Unable to activate subscription",
      reOpenRequest: "The issue persists even after instructions.",
      resolvedResponse: "Your subscription has been activated.",
      status: "reopened",
    },
    {
      id: `PIQ${Date.now()}`,
      category: "General Complaint/Feedback",
      closedResponse: "Thank you for your feedback.",
      email: "anita.seth123@gmail.com",
      fullName: "Anita Seth",
      openRequest: "Suggestion to improve dashboard UI",
      reOpenRequest: "",
      resolvedResponse: "",
      status: "closed",
    },
    {
      id: `PIQ${Date.now()}`,
      category: "Others",
      closedResponse: "",
      email: "karan.jain@example.com",
      fullName: "Karan Jain",
      openRequest: "Query about upcoming features",
      reOpenRequest: "",
      resolvedResponse: "Upcoming features will be announced soon.",
      status: "resolved",
    },
    {
      id: `PIQ${Date.now()}`,
      category: "Test Related",
      closedResponse: "",
      email: "deepika.mishra@gmail.com",
      fullName: "Deepika Mishra",
      openRequest: "Test timer isn't functioning properly",
      reOpenRequest: "",
      resolvedResponse: "The test timer issue has been fixed.",
      status: "resolved",
    },
    {
      id: `PIQ${Date.now()}`,
      category: "Subscription Related",
      closedResponse: "",
      email: "rahul.sharma786@gmail.com",
      fullName: "Rahul Sharma",
      openRequest: "I was charged twice for my subscription",
      reOpenRequest: "",
      resolvedResponse: "Duplicate charge has been refunded.",
      status: "resolved",
    },
    {
      id: `PIQ${Date.now()}`,
      category: "General Complaint/Feedback",
      closedResponse: "",
      email: "pooja.singh@example.com",
      fullName: "Pooja Singh",
      openRequest: "Add dark mode to the interface",
      reOpenRequest: "",
      resolvedResponse: "",
      status: "open",
    },
    {
      id: `PIQ${Date.now()}`,
      category: "Account Related",
      closedResponse: "",
      email: "manoj.sharma@gmail.com",
      fullName: "Manoj Sharma",
      openRequest: "Account locked after multiple login attempts",
      reOpenRequest: "",
      resolvedResponse: "Account has been unlocked.",
      status: "resolved",
    },
    {
      id: `PIQ${Date.now()}`,
      category: "Others",
      closedResponse: "",
      email: "amit.kumar@gmail.com",
      fullName: "Amit Kumar",
      openRequest: "How to export test results?",
      reOpenRequest: "",
      resolvedResponse: "",
      status: "open",
    },
    {
      id: `PIQ${Date.now()}`,
      category: "Test Related",
      closedResponse: "",
      email: "deepak.malhotra@example.com",
      fullName: "Deepak Malhotra",
      openRequest: "Incorrect answers in the test",
      reOpenRequest: "The issue persists.",
      resolvedResponse: "The test questions have been reviewed and corrected.",
      status: "reopened",
    },
    {
      id: `PIQ${Date.now()}`,
      category: "Account Related",
      closedResponse: "",
      email: "kavita.verma@example.com",
      fullName: "Kavita Verma",
      openRequest: "Unable to update my profile information",
      reOpenRequest: "",
      resolvedResponse: "Profile information has been updated successfully.",
      status: "resolved",
    },
    {
      id: `PIQ${Date.now()}`,
      category: "Subscription Related",
      closedResponse: "",
      email: "abhishek.khan@example.com",
      fullName: "Abhishek Khan",
      openRequest: "Unable to cancel my subscription",
      reOpenRequest: "",
      resolvedResponse: "Subscription has been canceled.",
      status: "resolved",
    },
    {
      id: `PIQ${Date.now().toString().substring(0, 9)}`,
      category: "General Complaint/Feedback",
      closedResponse: "We have implemented your suggestion.",
      email: "sneha.joshi@gmail.com",
      fullName: "Sneha Joshi",
      openRequest: "Add filtering options in reports",
      reOpenRequest: "",
      resolvedResponse: "",
      status: "closed",
    },
    // Repeat similar entries for a total of 25 objects.
  ]);
  const thisFunction = async () => {
    try {
      await updateDocuments(
        "queries",
        objects.map((obj, i) => {
          obj.id = obj.id + i;
          return obj;
        }),
        "updatedAt"
      );
      console.log("done");
    } catch (error) {
      console.log(error.message);
    }
  };
  return <button onClick={thisFunction}>CALL API</button>;
};

export default page;
