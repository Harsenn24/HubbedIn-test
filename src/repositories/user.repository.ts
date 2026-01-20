import { UserCreateDto, UserUpdateDto } from "../dto/user.dto";
import user from "../models/user.model";
import mongoose from "mongoose";

export async function updateUserRepo(payload: UserUpdateDto) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {

        const { id, ...updatePayload } = payload

        await user.updateOne({ _id: id }, { ...updatePayload });

        await session.commitTransaction();
        session.endSession();
        return true


    } catch (error: any) {
        session.abortTransaction();
        throw new Error(error);
    }
}

export async function createUserRepo(payload: UserCreateDto) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const userCreate = await user.create(payload);

        await session.commitTransaction();
        session.endSession();
        return userCreate;
    } catch (error: any) {
        session.abortTransaction();
        throw new Error(error);
    }
}

export async function deleteUserRepo(id: string) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await user.deleteOne({ _id: id });
        await session.commitTransaction();
        session.endSession();
    } catch (error: any) {
        session.abortTransaction();
        throw new Error(error);
    }
}