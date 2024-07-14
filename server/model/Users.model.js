const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    devID: {
      //   matches the user id
      type: String,
      match: /^[a-fA-F0-9]{24}$/,
    },
    avatar: String,

    password: {
      //   Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
      type: String,
      required: [true, "Password is required."],
      minlength: 8,
      match:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
  },
  {
    timestamps: true,
  }
);

const Users = model("users", UserSchema);

module.exports = Users;
