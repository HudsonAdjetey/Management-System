const { model, moodels, Schema, Types, models } = require("mongoose");

const tempUserSchema = new Schema(
  {
    devName: {
      type: String,
      required: [true, "Admin Name required"],
    },
    // create an object id
    devID: {
      type: Schema.Types.ObjectId,
      required: [true, "Dev ID required"],
      default: Types.ObjectId,
    },
    phoneNumber: String,
    otp: String,
    otpExpiresAt: Date,
    otpAttempts: Number,
    otpAttemptsExpiresAt: Date,
    otpVerified: Boolean,

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const TempUsers = models.tempUsers || model("tempUsers", tempUserSchema);

module.exports = TempUsers;
