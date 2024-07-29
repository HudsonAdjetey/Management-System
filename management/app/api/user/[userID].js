import { NextResponse } from "next/server";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return NextResponse.json({
      message: "Only GET requests are allowed",
    });
  }
}
