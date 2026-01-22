import {
  createUser,
  findDetailById,
  listUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import user from "../models/user.model";

jest.mock("../models/user.model");
jest.mock("../repositories/user.repository");

describe("User Controller - Catch Block", () => {
  const mockReq: any = {
    body: { id: "123", email: "test@mail.com" },
    params: { id: "123" },
  };

  const mockRes: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("createUser: should return 400 when exception occurs", async () => {
    (user.findOne as jest.Mock).mockRejectedValue(new Error("DB error"));

    await createUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: false,
      }),
    );
  });

  it("findDetailById: should return 400 when exception occurs", async () => {
    (user.findById as jest.Mock).mockRejectedValue(new Error("DB error"));

    await findDetailById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
  });

  it("listUser: should return 400 when exception occurs", async () => {
    (user.find as jest.Mock).mockRejectedValue(new Error("DB error"));

    await listUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
  });

  it("updateUser: should return 400 when exception occurs", async () => {
    (user.findByIdAndUpdate as jest.Mock).mockRejectedValue(
      new Error("DB error"),
    );

    await updateUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
  });

  it("deleteUser: should return 400 when exception occurs", async () => {
    (user.findByIdAndDelete as jest.Mock).mockRejectedValue(
      new Error("DB error"),
    );

    await deleteUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
  });
});
