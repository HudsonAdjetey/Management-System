import { NextResponse } from "next/server";

export default async function handler(req, res) {
  const { userID } = req.query;
  if (req.method !== "GET") {
    return NextResponse.json({
      message: "Only GET requests are allowed",
    });
  }

  try {
  } catch (error) {}
}
