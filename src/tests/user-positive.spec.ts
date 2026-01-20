import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app'
import user from '../models/user.model'

describe('User Api CRUD Positive Case', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL!);
    });

    let userId: string | null = null
    let secondUserId: string | null = null


    it("should create user successfully", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                name: "winarto",
                email: "winarto@gmail.com",
                birthday: "1952-06-04",
                timezone: "Asia/Jakarta"
            });

        expect(res.status).toBe(200);
        expect(res.body.data.name).toBe("winarto");
        expect(res.body.data.email).toBe("winarto@gmail.com");

        userId = res.body.data.id
    });

    it("should create second user successfully", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                name: "winarno",
                email: "winarno@gmail.com",
                birthday: "1952-06-04",
                timezone: "Asia/Jakarta"
            });

        expect(res.status).toBe(200);
        expect(res.body.data.name).toBe("winarno");
        expect(res.body.data.email).toBe("winarno@gmail.com");

        secondUserId = res.body.data.id
    });

    it("show list user", async () => {
        const res = await request(app).get("/users");
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBe(2);
    });

    it("show detail user", async () => {
        const res = await request(app).get(`/users/${userId}`);
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("name");
        expect(res.body.data).toHaveProperty("email");
    });

    it("should update user successfully", async () => {
        const res = await request(app)
            .post(`/users/update`)
            .send({
                name: "winaryo",
                id: userId
            });
        
        expect(res.status).toBe(200);
    });

    it("should delete user successfully", async () => {
        const res = await request(app)
            .post(`/users/delete`)
            .send({
                id: secondUserId
            });
        
        expect(res.status).toBe(200);
    });
        
    afterAll(async () => {
        await user.deleteMany({});
        await mongoose.connection.close();
    });
})
