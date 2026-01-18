import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../modules/lgu/lgu.model";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const users = [
      { username: "lgu_admin", password: "admin123", role: "lgu" },
      { username: "mayor_office", password: "password123", role: "lgu" },
    ];

    for (const u of users) {
      const exists = await User.findOne({ username: u.username });
      if (!exists) {
        const hashed = await bcrypt.hash(u.password, 10);
        await User.create({ username: u.username, password: hashed, role: u.role });
        console.log(`Created user: ${u.username}`);
      } else {
        console.log(`User already exists: ${u.username}`);
      }
    }

    console.log("Seeding finished");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers();
