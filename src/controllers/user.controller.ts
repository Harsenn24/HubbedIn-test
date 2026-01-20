import { Request, Response } from "express";
import user from "../models/user.model";
import { updateUserRepo, createUserRepo, deleteUserRepo } from "../repositories/user.repository";
import { UserCreateDto, UserDeleteDto, UserUpdateDto } from "../dto/user.dto";


export const createUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body as UserCreateDto
    const emailData = await user.findOne({ email: payload.email });
    if (emailData) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const userCreate = await createUserRepo(payload);
    return res.status(200).json({
      status: true,
      message: "Ok",
      data: {
        id: userCreate._id,
        ...payload
      }
    })
  } catch (e: any) {
    return res.status(400).json({
      status: false,
      error: e.message,
      data: []
    });
  }
};

export const listUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const data = id ? await user.find({ _id: id }) : await user.find();
    return res.status(200).json({
      status: true,
      message: "Ok",
      data
    });
  } catch (e: any) {
    return res.status(400).json({
      status: false,
      error: e.message,
      data: []
    });
  }
}

export const findDetailById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await user.findById(id);

    if (!data) {
      return res.status(400).json({
        status: false,
        message: "User not found",
        data: []
      });
    }

    return res.status(200).json({
      status: true,
      message: "Ok",
      data
    });
  } catch (e: any) {
    return res.status(400).json({
      status: false,
      error: e.message,
      data: []
    });
  }
}


export const updateUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body as UserUpdateDto
    const userData = await user.findOne({ _id: payload.id });
    if (!userData) {
      return res.status(400).json({
        status: false,
        message: "user_not_found",
        data: []
      });
    }

    if (userData.email === payload.email || userData.name === payload.name || userData.birthday === payload.birthday || userData.timezone === payload.timezone) {
      return res.status(400).json({
        status: false,
        message: "no_changes_detected",
        data: []
      })
    }

    if (!payload.email && !payload.name && !payload.birthday && !payload.timezone) {
      return res.status(400).json({
        status: false,
        message: "no_data_changes_detected",
        data: []
      })
    }

    await updateUserRepo(payload);

    return res.status(200).json({
      status: true,
      message: "Ok",
      data: {}
    });
  } catch (e: any) {
    return res.status(400).json({
      status: false,
      error: e.message,
      data: []
    });
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body as UserDeleteDto;
    const userData = await user.findById(payload.id);
    if (!userData) {
      return res.status(400).json({
        status: false,
        message: "user_not_found",
        data: []
      });
    }
    await deleteUserRepo(payload.id);
    return res.status(200).json({
      status: true,
      message: "Ok",
      data: {}
    });
  } catch (e: any) {
    return res.status(400).json({
      status: false,
      error: e.message,
      data: []
    });
  }
}