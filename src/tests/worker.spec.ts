jest.mock("mongoose");
jest.mock("node-cron");
jest.mock("../models/user.model", () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
  },
}));

import { runBirthdayJob } from "../workers/birthday.worker";
import user from "../models/user.model";

describe("Birthday Worker (Unit)", () => {
  beforeAll(() => {
    jest.useFakeTimers({
      now: new Date("2026-01-21T02:00:00Z"), // 09:00 Jakarta
    });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("logs birthday message at 09:00 local time", async () => {
    (user.find as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      lean: jest.fn().mockResolvedValue([
        {
          name: "Harsenn",
          timezone: "Asia/Jakarta",
          birthday: new Date("1995-01-21"),
        },
      ]),
    });

    const logSpy = jest.spyOn(console, "log").mockImplementation();

    await runBirthdayJob();

    expect(logSpy).toHaveBeenCalledWith("🎉 Happy Birthday Harsenn 🎉");
  });
});
