import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app'
import user from '../models/user.model'

describe('User Api CRUD Negative Case', () => {
    let userId: string 

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL!);
        
    });

    beforeEach(async () => {
        await user.deleteMany({});
        const correctData = await request(app)
            .post("/users")
            .send({
                name: "winarto",
                email: "winarto@gmail.com",
                birthday: "1952-06-04",
                timezone: "Asia/Jakarta"
            });

        userId = correctData.body.data.id
    });

    const fakeObjectId = new mongoose.Types.ObjectId().toString();



    it("should be failed create user without name", async () => {
        const res = await request(app)
            .post("/users")
            .send({});


        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("name_is_required");
    });

    it("should be failed create user without email", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                name: "winarto",
            });


        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("email_is_required");
    });

    it("should be failed create user with invalid email", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                name: "winarto",
                email: "winarto",
            });


        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("valid_email_is_required");
    });

    it("should be failed create user without birthday", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                name: "winarto",
                email: "winarto@gmail.com"
            });


        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("birthday_is_required");
    });

    it("should be failed create user with invalid birthday type", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                name: "winarto",
                email: "winarto@gmail.com",
                birthday: "comcom",
            });


        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("birthday_must_be_in_iso8601_format_yyyy_mm_dd");
    });

    it("should be failed create user without timezone", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                name: "winarto",
                email: "winarto@gmail.com",
                birthday: "1952-06-04",
            });


        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("timezone_is_required");
    });

    it("should be failed create user with invalid timezone type", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                name: "winarto",
                email: "winarto@gmail.com",
                birthday: "1952-06-04",
                timezone: 6666
            });


        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("timezone_must_be_string");
    });

    it("should be failed create user without IANA timezone type", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                name: "winarto",
                email: "winarto@gmail.com",
                birthday: "1952-06-04",
                timezone: "Asia/Bekasi"
            });


        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("invalid_IANA_timezone");
    });

    it("should be failed create user with duplicate email", async () => {


        const res = await request(app)
            .post("/users")
            .send({
                name: "winarno",
                email: "winarto@gmail.com",
                birthday: "1952-06-04",
                timezone: "Asia/Jakarta"
            });


        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("email_exists");
    });

    it("should be failed get detail user with invalid id", async () => {
        const res = await request(app).get(`/users/${fakeObjectId}`);
        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("user_not_found");
    });

    it("should be failed update user with invalid id", async () => {
        const res = await request(app)
            .post("/users/update")
            .send({
                id: fakeObjectId,
                name: "winarto",
                email: "winarto@gmail.com",
                birthday: "1952-06-04",
                timezone: "Asia/Jakarta"
            });
        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("user_not_found");
    });

    it("should be failed update user without changing name", async () => {
        const res = await request(app)
            .post("/users/update")
            .send({
                id: userId,
                name: "winarto"
            });


        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        if(!userId) {
            expect(res.body.message).toBe("user_not_found");
        } else {
            expect(res.body.message).toBe("no_changes_detected");
        }
    });

    it("should be failed update user without changing email", async () => {
        const res = await request(app)
            .post("/users/update")
            .send({
                id: userId,
                email: "winarto@gmail.com"
            });


        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        if(!userId) {
            expect(res.body.message).toBe("user_not_found");
        } else {
            expect(res.body.message).toBe("no_changes_detected");
        }
    });

    it("should be failed update user without changing birthday", async () => {
        const res = await request(app)
            .post("/users/update")
            .send({
                id: userId,
                birthday: "1952-06-04"
            });


        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        if(!userId) {
            expect(res.body.message).toBe("user_not_found");
        } else {
            expect(res.body.message).toBe("no_changes_detected");
        }
    });

    it("should be failed update user without changing timezone", async () => {
        const res = await request(app)
            .post("/users/update")
            .send({
                id: userId,
                timezone: "Asia/Jakarta"
            });


        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        if(!userId) {
            expect(res.body.message).toBe("user_not_found");
        } else {
            expect(res.body.message).toBe("no_changes_detected");
        }
    });

    it("should be failed update user with empty id", async () => {
        const res = await request(app)
            .post("/users/update")
            .send({

            });


        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("id_is_required");
    });


    it("should be failed update user with invalid id type", async () => {
        const res = await request(app)
            .post("/users/update")
            .send({
                id: 666
            });


        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("id_must_be_a_string");
    });

    it("should be failed update user with no data", async () => {
        const res = await request(app)
            .post("/users/update")
            .send({
                id: userId
            });


        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        if(!userId) {
            expect(res.body.message).toBe("user_not_found");
        } else {
            expect(res.body.message).toBe("no_data_changes_detected");
        }
    });

    it("should be failed delete user with invalid id", async () => {
        const res = await request(app)
            .post("/users/delete")
            .send({
            });


        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("id_is_required");
    });

    it("should be failed delete user with invalid id type", async () => {
        const res = await request(app)
            .post("/users/delete")
            .send({
                id: 666
            });


        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("id_must_be_a_string");
    });

    it("should be failed delete user with false id type", async () => {
        const res = await request(app)
            .post("/users/delete")
            .send({
                id: fakeObjectId
            });


        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("user_not_found");
    });


    afterAll(async () => {
        await user.deleteMany({});
        await mongoose.connection.close();
    });
})
