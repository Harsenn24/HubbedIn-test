import cron from "node-cron";
import moment from "moment-timezone";
import mongoose from "mongoose";
import user from "../models/user.model";

const MONGO_URL = process.env.MONGO_URL!;

export async function runBirthdayJob() {
  const today = moment();

  const users = await user
    .find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$birthday" }, today.month() + 1] },
          { $eq: [{ $dayOfMonth: "$birthday" }, today.date()] },
        ],
      },
      timezone: { $exists: true },
    })
    .select("name birthday timezone")
    .lean();

  for (const u of users) {
    const nowLocal = moment().tz(u.timezone);

    const isBirthday =
      nowLocal.month() === moment(u.birthday).month() &&
      nowLocal.date() === moment(u.birthday).date();

    const isNineAM = nowLocal.hour() === 9 && nowLocal.minute() === 0;

    if (isBirthday && isNineAM) {
      console.log(`🎉 Happy Birthday ${u.name} 🎉`);
    }
  }
}

async function start() {
  try {
    await mongoose.connect(MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB connected (worker)");

    cron.schedule(
      "0 * * * *",
      async () => {
        await runBirthdayJob();
      },
      { timezone: "UTC" },
    );

    console.log("Birthday worker running...");
  } catch (err) {
    console.error("Mongo connection failed:", err);
    process.exit(1);
  }
}

start();
