import { Schema, model } from "mongoose";

const TempUserSchema = new Schema({
  devName: {
    type: String,
    required: [true, "Name is required"],
  },
  // contact
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    // should match for a phone number
  },
});

const TempUsers = model.TempUsers || model("TempUsers", TempUserSchema);

export default TempUsers;
