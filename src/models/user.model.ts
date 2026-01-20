import { Schema, model, Document } from "mongoose"

export interface IUser extends Document {
    name: string;
    email: string;
    birthday: Date;
    timezone: string;
}

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    birthday: {
        type: Date,
        required: true
    },
    timezone: {
        type: String,
        required: true
    }
});

export default model<IUser>("users", UserSchema);
