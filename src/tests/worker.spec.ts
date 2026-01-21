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
    it("logs birthday message at 09:00", async () => {
        (user.find as jest.Mock).mockResolvedValue([
            {
                name: "Harsenn",
                timezone: "Asia/Jakarta",
                birthday: new Date("1995-01-21"),
            },
        ]);

        jest.spyOn(Date, "now").mockReturnValue(
            new Date("2026-01-21T09:00:00+07:00").getTime()
        );

        const logSpy = jest.spyOn(console, "log").mockImplementation();

        await runBirthdayJob();

        expect(logSpy).toHaveBeenCalled();
    });
});

