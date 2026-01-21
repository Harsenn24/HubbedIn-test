import cron from "node-cron";
import moment from "moment-timezone";
import mongoose from "mongoose";
import user from "../models/user.model";

const MONGO_URL = process.env.MONGO_URL!;

export async function runBirthdayJob() {
  const users = await user.find();

  users.forEach(user => {
    const now = moment().tz(user.timezone);
    const birthday = moment(user.birthday).tz(user.timezone);

    if (
      now.format("MM-DD") === birthday.format("MM-DD") &&
      now.format("HH:mm") === "09:00"
    ) {
      console.log(`🎉 Happy Birthday, ${user.name}! 🎉 `);
    }
  });
}


async function start() {
  try {
    await mongoose.connect(MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB connected (worker)");

    cron.schedule("* * * * *", async () => {
      try {

        await runBirthdayJob();

      } catch (err) {
        console.error("Cron error:", err);
      }
    });

    console.log("Birthday worker running...");
  } catch (err) {
    console.error("Mongo connection failed:", err);
    process.exit(1);
  }
}

start();
