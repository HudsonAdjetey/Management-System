import { models, model, Schema } from "mongoose";

const UserSchema = new Schema({
  devName: {
    type: String,
    required: true,
  },
  email: String,
  devID: String,
  phoneNumber: {
    type: String,
    required: true,
  },
  passKey: String,
  lastUpdated: Date,
  adminAccess: Boolean,
  adminAccessExpiresAt: Date,
  otp: String,
  otpExpiresAt: Date,
  otpAttempts: Number,
  otpAttemptsExpiresAt: Date,
  otpVerified: Boolean,
  otpVerificationAttempts: Number,
  otpVerificationAttemptsExpiresAt: Date,
  otpVerificationToken: String,
  otpVerificationTokenExpiresAt: Date,
  otpVerificationTokenVerified: Boolean,
  otpVerificationTokenAttempts: Number,
  otpVerificationTokenAttemptsExpiresAt: Date,
  otpVerificationTokenVerificationAttempts: Number,
  otpVerificationTokenVerificationAttemptsExpiresAt: Date,
  otpVerificationTokenVerificationToken: String,
  otpVerificationTokenVerificationTokenExpiresAt: Date,
  otpVerificationTokenVerificationTokenVerified: Boolean,
});

export const User = models.Users || model("Users", UserSchema);
