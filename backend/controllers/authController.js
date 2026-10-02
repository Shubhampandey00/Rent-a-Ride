import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import Jwt from "jsonwebtoken";

const expireDate = new Date(Date.now() + 3600000);

// ==========================================
// CREATE ACCESS + REFRESH TOKENS
// ==========================================
const createTokens = (userId) => {
  const accessToken = Jwt.sign(
    { id: userId },
    process.env.ACCESS_TOKEN,
    { expiresIn: "15m" }
  );

  const refreshToken = Jwt.sign(
    { id: userId },
    process.env.REFRESH_TOKEN,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

// ==========================================
// SIGN UP
// ==========================================
export const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check required fields
    if (!username || !email || !password) {
      return next(
        errorHandler(
          400,
          "Username, email and password are required"
        )
      );
    }

    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    // Validate username
    if (cleanUsername.length < 3) {
      return next(
        errorHandler(
          400,
          "Username must contain at least 3 characters"
        )
      );
    }

    // Validate password
    if (password.length < 6) {
      return next(
        errorHandler(
          400,
          "Password must contain at least 6 characters"
        )
      );
    }

    // Check username
    const existingUsername = await User.findOne({
      username: cleanUsername,
    });

    if (existingUsername) {
      return next(
        errorHandler(409, "Username already exists")
      );
    }

    // Check email
    const existingEmail = await User.findOne({
      email: cleanEmail,
    });

    if (existingEmail) {
      return next(
        errorHandler(409, "Email is already registered")
      );
    }

    // Hash password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    /*
     * IMPORTANT:
     * phoneNumber is intentionally NOT included here.
     *
     * New users can register without a phone number.
     */
    const newUser = new User({
      username: cleanUsername,
      email: cleanEmail,
      password: hashedPassword,
      isUser: true,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: savedUser._id,
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);

    // Handle MongoDB duplicate-key errors
    if (error?.code === 11000) {
      const duplicateField =
        Object.keys(error.keyPattern || {})[0];

      if (duplicateField === "email") {
        return next(
          errorHandler(409, "Email is already registered")
        );
      }

      if (duplicateField === "username") {
        return next(
          errorHandler(409, "Username already exists")
        );
      }

      if (duplicateField === "phoneNumber") {
        return next(
          errorHandler(409, "Phone number is already registered")
        );
      }
    }

    next(error);
  }
};

// ==========================================
// SIGN IN
// ==========================================
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        errorHandler(
          400,
          "Email and password are required"
        )
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    const validUser = await User.findOne({
      email: cleanEmail,
    });

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(
      password,
      validUser.password
    );

    if (!validPassword) {
      return next(
        errorHandler(401, "Wrong credentials")
      );
    }

    const {
      accessToken,
      refreshToken,
    } = createTokens(validUser._id);

    // Save refresh token
    await User.findByIdAndUpdate(
      validUser._id,
      { refreshToken },
      { new: true }
    );

    // Don't send password to frontend
    const {
      password: hashedPassword,
      ...rest
    } = validUser.toObject();

    return res.status(200).json({
      ...rest,
      accessToken,
      refreshToken,
      isAdmin: validUser.isAdmin,
      isUser: validUser.isUser,
      isVendor: validUser.isVendor,
    });
  } catch (error) {
    console.error("SIGNIN ERROR:", error);
    next(error);
  }
};

// ==========================================
// GOOGLE SIGN IN / SIGN UP
// ==========================================
export const google = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;

    if (!email) {
      return next(
        errorHandler(
          400,
          "Google account email is required"
        )
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check whether this email already exists
    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    // ========================================
    // EXISTING USER
    // ========================================
    if (existingUser) {
      // Don't allow a vendor account to become a user
      if (!existingUser.isUser) {
        return next(
          errorHandler(
            409,
            "This email is already registered as a vendor"
          )
        );
      }

      // Update Google profile picture if available
      if (
        photo &&
        existingUser.profilePicture !== photo
      ) {
        existingUser.profilePicture = photo;
      }

      const {
        accessToken,
        refreshToken,
      } = createTokens(existingUser._id);

      existingUser.refreshToken = refreshToken;

      await existingUser.save();

      const {
        password: hashedPassword,
        ...rest
      } = existingUser.toObject();

      return res.status(200).json({
        ...rest,
        accessToken,
        refreshToken,
        isUser: existingUser.isUser,
        isAdmin: existingUser.isAdmin,
        isVendor: existingUser.isVendor,
      });
    }

    // ========================================
    // NEW GOOGLE USER
    // ========================================

    // Google doesn't provide our application's password.
    // Generate a random one so the User model remains valid.
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const hashedPassword = bcryptjs.hashSync(
      generatedPassword,
      10
    );

    // Generate unique username
    const baseUsername =
      (name || "user")
        .trim()
        .replace(/\s+/g, "")
        .toLowerCase();

    const username =
      `${baseUsername}_${Math.random()
        .toString(36)
        .slice(-8)}`;

    /*
     * IMPORTANT:
     * phoneNumber is NOT included.
     */
    const newUser = new User({
      username,
      email: cleanEmail,
      password: hashedPassword,
      profilePicture: photo || undefined,
      isUser: true,
    });

    const savedUser = await newUser.save();

    const {
      accessToken,
      refreshToken,
    } = createTokens(savedUser._id);

    savedUser.refreshToken = refreshToken;

    await savedUser.save();

    const {
      password: savedPassword,
      ...rest
    } = savedUser.toObject();

    return res.status(201).json({
      ...rest,
      accessToken,
      refreshToken,
      isUser: savedUser.isUser,
      isAdmin: savedUser.isAdmin,
      isVendor: savedUser.isVendor,
    });
  } catch (error) {
    console.error("GOOGLE AUTH ERROR:", error);

    // Handle MongoDB duplicate-key errors
    if (error?.code === 11000) {
      const duplicateField =
        Object.keys(error.keyPattern || {})[0];

      if (duplicateField === "email") {
        return next(
          errorHandler(
            409,
            "Email is already registered"
          )
        );
      }

      if (duplicateField === "username") {
        return next(
          errorHandler(
            409,
            "Username already exists"
          )
        );
      }

      if (duplicateField === "phoneNumber") {
        return next(
          errorHandler(
            409,
            "Phone number is already registered"
          )
        );
      }
    }

    next(error);
  }
};

// ==========================================
// REFRESH TOKEN
// ==========================================
export const refreshToken = async (
  req,
  res,
  next
) => {
  if (!req.headers.authorization) {
    return next(
      errorHandler(
        403,
        "No authorization header provided"
      )
    );
  }

  try {
    const authHeader = req.headers.authorization;

    const tokenPart = authHeader.split(" ")[1];

    if (!tokenPart) {
      return next(
        errorHandler(
          401,
          "Refresh token not provided"
        )
      );
    }

    const [refreshTokenValue] = tokenPart.split(",");

    if (!refreshTokenValue) {
      return next(
        errorHandler(
          401,
          "Refresh token not provided"
        )
      );
    }

    const decoded = Jwt.verify(
      refreshTokenValue,
      process.env.REFRESH_TOKEN
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(
        errorHandler(
          403,
          "Invalid refresh token"
        )
      );
    }

    if (user.refreshToken !== refreshTokenValue) {
      return next(
        errorHandler(
          403,
          "Invalid refresh token"
        )
      );
    }

    const newAccessToken = Jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );

    const newRefreshToken = Jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    await User.findByIdAndUpdate(
      user._id,
      {
        refreshToken: newRefreshToken,
      }
    );

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error(
      "REFRESH TOKEN ERROR:",
      error
    );

    return next(
      errorHandler(
        401,
        "Invalid or expired refresh token"
      )
    );
  }
};