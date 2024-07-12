import { createTempUser } from "@/lib/actions/action";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json(); // Parse the request body
    const newUser = await createTempUser(body);
    return NextResponse.json(
      {
        success: true,
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
};

// Add other HTTP methods if needed
// export const GET = async (req) => { ... };
// export const PUT = async (req) => { ... };
// export const DELETE = async (req) => { ... };
