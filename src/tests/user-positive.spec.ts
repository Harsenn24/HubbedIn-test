import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app'
import user from '../models/user.model'

describe('User Api CRUD Positive Case', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL!);
    });

    let userId: string | null = null


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


    it("should create user successfully", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                name: "winaryo",
                email: "winaryo@gmail.com",
                birthday: "1952-06-04",
                timezone: "Asia/Jakarta"
            });

        expect(res.status).toBe(200);
        expect(res.body.data.name).toBe("winaryo");
        expect(res.body.data.email).toBe("winaryo@gmail.com");

    });


    it("show list user", async () => {
        const res = await request(app).get("/users");
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBe(res.body.data.length);
    });

    it("show detail user", async () => {
        const res = await request(app).get(`/users/${userId}`);
        console.log(res.body)
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("name");
        expect(res.body.data).toHaveProperty("email");
    });

    it("should update user successfully", async () => {
        const res = await request(app)
            .post(`/users/update`)
            .send({
                name: "heritapiheru",
                id: userId
            });

        expect(res.status).toBe(200);
    });

    it("should delete user successfully", async () => {
        const res = await request(app)
            .post(`/users/delete`)
            .send({
                id: userId
            });

        console.log(res.body)

        expect(res.status).toBe(200);
    });

    afterAll(async () => {
        await user.deleteMany({});
        await mongoose.connection.close();
    });
})
