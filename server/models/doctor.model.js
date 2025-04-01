import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

// Zod schema for doctor validation
const doctorZodSchema = z.object({
  firstName: z.string().min(3, "First Name must contain at least 3 characters!"),
  lastName: z.string().min(3, "Last Name must contain at least 3 characters!"),
  email: z.string().email("Please provide a valid email address!"),
  phone: z.string().length(10, "Phone Number must contain exactly 10 digits!"),
  dob: z.string().min(1, "Date of Birth is required!"),
  gender: z.enum(["Male", "Female", "Other"], "Gender must be 'Male', 'Female', or 'Other'"),
  doctorDepartment: z.string().min(3, "Department must contain at least 3 characters!"),
  yearsOfExperience: z.number().min(0, "Years of experience cannot be negative!"),
  licenseNumber: z.string().min(6, "License Number must be at least 6 characters!"),
  password: z.string().min(8, "Password must contain at least 8 characters!"),
avatar: z.object({
    public_id: z.string().optional(),
    url: z.string().optional(),
  }).optional(),
});

// Function to validate each field using Zod
const validateField = (field, value) => {
  const result = doctorZodSchema.shape[field].safeParse(value);
  return result.success;
};

// Mongoose schema for Doctor
const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validateField("firstName", value),
      message: "First Name must contain at least 3 characters!",
    },
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validateField("lastName", value),
      message: "Last Name must contain at least 3 characters!",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validateField("email", value),
      message: "Please provide a valid email address!",
    },
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validateField("phone", value),
      message: "Phone Number must contain exactly 10 digits!",
    },
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  doctorDepartment: {
    type: String,
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: (value) => validateField("yearsOfExperience", value),
      message: "Years of experience cannot be negative!",
    },
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validateField("licenseNumber", value),
      message: "License Number must be at least 6 characters!",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator: (value) => validateField("password", value),
      message: "Password must contain at least 8 characters!",
    },
  },
  refreshToken: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["Doctor"],
    default: "Doctor",
  },
  avatar: {
    public_id: String,
    url: String,
  },
});

// Middleware to hash the password before saving
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare entered password with hashed password
doctorSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate JWT
doctorSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// Export the model
export const Doctor = mongoose.model("Doctor", doctorSchema);
