import cron from "node-cron";
import moment from "moment-timezone";
import mongoose from "mongoose";
import user from "../models/user.model";

const MONGO_URL = process.env.MONGO_URL!;

export async function runBirthdayJob() {

  const todayUtc = moment.utc();

  const users = await user
  .find({
    $expr: {
      $and: [
        { $eq: [{ $month: "$birthday" }, todayUtc.month() + 1] },
        { $eq: [{ $dayOfMonth: "$birthday" }, todayUtc.date()] }
      ]
    }
  })
  .select("name timezone")
  .lean();

  for (const u of users) {
    const nowLocal = moment().tz(u.timezone);

    if (nowLocal.format("HH:mm") === "09:00") {
      console.log(`🎉 Happy Birthday, ${u.name}! 🎉`);
    }
  }
}


async function start() {
  try {
    await mongoose.connect(MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB connected (worker)");

    cron.schedule("* * * * * ", async () => {
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
