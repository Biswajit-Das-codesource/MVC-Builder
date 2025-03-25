#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";

const createFolder = (name) => {
  if (!fs.existsSync(name)) {
    fs.mkdirSync(name);
    console.log(`✅ Created folder: ${name}`);
  }
};

const createFile = (name, content) => {
  fs.writeFileSync(name, content);
  console.log(`✅ Created file: ${name}`);
};

console.log("🚀 Setting up project...");
execSync("npm init -y", { stdio: "inherit" });

console.log("📦 Installing dependencies...");
const dependencies = [
  "express",
  "mongoose",
  "cors",
  "bcryptjs",
  "jsonwebtoken",
  "dotenv",
  "cookie-parser",
  "zod",
];
const devDependencies = ["nodemon"];

execSync(`npm install ${dependencies.join(" ")}`, { stdio: "inherit" });
execSync(`npm install --save-dev ${devDependencies.join(" ")}`, {
  stdio: "inherit",
});

// Modify package.json
const packageJson = JSON.parse(fs.readFileSync("package.json"));
packageJson.type = "module";
packageJson.scripts = {
  start: "node index.js",
  dev: "nodemon index.js",
};
fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));

// Create folders
["models", "controllers", "routes"].forEach(createFolder);

// Create .env file
createFile(".env", `PORT=5000\nMONGO_URI=mongodb://localhost:27017/mydb`);

// Create index.js (Main Server File)
createFile(
  "index.js",
  `import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => console.log("🚀 Server running on port", process.env.PORT)))
  .catch((err) => console.error("❌ MongoDB Error:", err));
  `
);

// Create User Model
createFile(
  "models/user.model.js",
  `import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  phoneNumber: String
}, { timestamps: true });

export default mongoose.model("User", userSchema);
  `
);

// Create User Controller
createFile(
  "controllers/user.controller.js",
  `import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  const { username, email, password, phoneNumber } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword, phoneNumber });
  await newUser.save();
  res.json({ message: "✅ User Created", user: newUser });
};
  `
);

// Create User Routes
createFile(
  "routes/user.routes.js",
  `import express from "express";
import { createUser } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/user", createUser);
export default router;
  `
);

// Final message
console.log("\n🎉 Setup Complete! Run `npm run dev` to start the server.");
console.log("\n📦 Installed Modules:");
console.log(`- Dependencies: ${dependencies.join(", ")}`);
console.log(`- Dev Dependencies: ${devDependencies.join(", ")}`);
console.log("\n🙏 Thank you for using this setup script!");
