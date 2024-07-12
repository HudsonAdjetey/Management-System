"use server";

import User from "@/model/tempUser.model";
import { connectToDB } from "../dbConfig";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createTempUser = async (userData) => {
  try {
    await connectToDB();
    const newTempUser = await TempUsers.create(userData);
    return newTempUser;
  } catch (error) {
    throw new Error("Error creating temp user: " + error.message);
  }
};
// revalidatePath("/user/[id]", { id: newUser._id });
