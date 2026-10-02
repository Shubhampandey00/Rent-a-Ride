import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    // Optional phone number.
    // Uniqueness is handled by the partial index below.
    phoneNumber: {
      type: String,
      trim: true,
    },

    adress: {
      type: String,
      trim: true,
    },

    // Required for normal users and Google users.
    // Your Google authentication controller generates
    // a random password for Google-created users.
    password: {
      type: String,
      required: true,
    },

    profilePicture: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE=",
    },

    isUser: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isVendor: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

/*
 * Phone number is optional.
 *
 * The partial index means MongoDB only enforces uniqueness
 * when phoneNumber is actually a STRING.
 *
 * Therefore multiple users can have no phone number.
 */
userSchema.index(
  { phoneNumber: 1 },
  {
    unique: true,
    partialFilterExpression: {
      phoneNumber: {
        $type: "string",
      },
    },
  }
);

console.log(
  "PHONE INDEX FROM USER MODEL:",
  JSON.stringify(userSchema.indexes(), null, 2)
);

const User = mongoose.model("User", userSchema);

export default User;