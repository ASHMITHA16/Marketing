import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Company from "../models/Company.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, companyName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Check if company exists
    let company = await Company.findOne({ name: companyName });

    if (!company) {
      company = await Company.create({ name: companyName });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      company: company._id,
    });
    
    res.status(201).json({
      message: "Signup successful",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Signup failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if user exists
    const user = await User.findOne({ email }).populate("company");

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    // 3️⃣ Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        companyId: user.company._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4️⃣ Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        company: user.company.name,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Login failed",
    });
  }
};