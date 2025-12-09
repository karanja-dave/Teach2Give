import request from 'supertest'
import app from '../../src/index'
import { getPool } from '../../src/db/config'
import bcrypt from 'bcrypt'

// user authentication 
// define type for pool 
let pool:any
// before all tests, implement this 
beforeAll(async()=>{
    // connect to Db 
    pool = await getPool()
    // used to hash user password 
    const hashedPassword=await bcrypt.hash("testpassword123",10)
    // create user 
    await pool.request().query(`
        INSERT INTO Users (first_name, last_name, email, phone_number, password, role)
        VALUES ('Test', 'User', 'testuser@testmail.com', '0712345678', '${hashedPassword}', 'user')
    `);
})

// after all tests, implement this 
afterAll(async()=>{
    // cleanup: 1. delete user 
    await pool.request().query("DELETE FROM Users WHERE email LIKE '%@testmail.com'");
    // cleanup:2 close Db connection 
    await pool.close()
})

describe('User API Intergration Test Suite', () => { 
    // login :with valid credentials
    it("should authenticate a user and return a token",async()=>{
        // i need an existing user in the Db for login 
        const res = await request(app).post('/login').send({
            email:"testuser@testmail.com",
            password:"testpassword123"
        })

        expect(res.statusCode).toBe(200) 
        expect(res.body).toHaveProperty('token') ;
        expect(res.body.message).toMatch(/login successful/i); 
        expect(res.body.user.email).toBe("testuser@testmail.com")      

    })
    // login with wrong credentials 
    it("should fail with wrong password",async()=>{
        // I need an existing user logged in with wrong pass
         const res = await request(app).post('/login').send({
            email:"testuser@testmail.com",
            password:"wrongpassword123",
        })

        expect(res.statusCode).toBe(401)
        expect(res.body.error).toMatch(/invalid credentials/i)
    })
    // login with wrong email :user DNE 
    it("should fail with non-existing user on login",async()=>{
        const res = await request(app).post('/login').send({
            email:"nonesistent@testmail.com",
            password:"testpassword123",
        })

        expect(res.statusCode).toBe(404)
        expect(res.body.error).toMatch(/user not found/i)

    })

    // get all users 
    it("should get all users successfully",async()=>{
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200)
        // console.log(res); just to confirm we are intercating with the Db, clg are not supposed to be in test 
        expect(Array.isArray(res.body)).toBe(true) //use this instead of the clg
    })

    // create user 
    it.skip("should create a new user successfully",async()=>{
        const newUser={
            "first_name": "Dave",
            "last_name": "Karanja",
            "email": "dave@testmail.com",
            "phone_number": "0712300001",
            "password": "password13",
            "role":"admin"
        };

        const res = await request(app).post("/users").send(newUser)
        expect(res.status).toBe(201)
    })
    // negative test for user creation: not all user input are provided
    it.skip("should fail to create a user with missing fields",async()=>{
        const res = await request(app).post("/users").send({
            first_name:"OnlyName"
        });
        expect(res.statusCode).toBeGreaterThanOrEqual(400)
    })

    // user creation with duplicated email 
    it("should fail to create a user with duplicate email",async()=>{
        const newUser={
            "first_name": "Dave",
            "last_name": "Karanja",
            "email": "testuser@testmail.com", //already exists 
            "phone_number": "0712300001",
            "password": "password13",
            "role":"admin"
        };

        const res = await request(app).post("/users").send(newUser)
        expect(res.statusCode).toBe(500)
    })

    // get user by Id 
    it("should return a user by Id",async()=>{
        const insereted=await pool.request().query(
                "INSERT INTO Users (first_name, last_name, email, phone_number, password, role) OUTPUT INSERTED.userid VALUES ('John', 'Smith', 'john@testmail.com', '0700000000', 'pass123', 'user')"
            );
        
        const userId = insereted.recordset[0].userid
        const res = await request(app).get(`/users/${userId}`)
        expect(res.statusCode).toBe(200)
    })

    // test for users not found 
    it("should return 404 if user not found", async () => {
        const res = await request(app).get("/users/99999999");
        expect(res.status).toBe(404);
        expect(res.body.message).toMatch(/user not found/i);
    });

    //UPDATE USER
    it("should update a user successfully", async () => {
        const inserted = await pool
            .request()
            .query(
                "INSERT INTO Users (first_name, last_name, email, phone_number, password, role) OUTPUT INSERTED.userid VALUES ('Update', 'Me', 'update@testmail.com', '0790000000', 'pass789', 'user')"
            );

        const userId = inserted.recordset[0].userid;
        const res = await request(app).put(`/users/${userId}`).send({
            first_name: "Updated",
            last_name: "User",
            phone_number: "0700111222",
            password: "newpass123",
            role: "admin",
        });

        expect(res.status).toBe(200);
        expect(res.body.message).toMatch(/updated successfully/i);
    });

    it("should return 400 when updating with invalid ID", async () => {
        const res = await request(app).put("/users/abc").send({
            first_name: "BadId",
        });
        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/invalid user id/i);
    });

    it("should return 404 when updating non-existent user", async () => {
        const res = await request(app).put("/users/999999").send({
            first_name: "Ghost",
        });
        expect(res.status).toBe(404);
        expect(res.body.message).toMatch(/user not found/i);
    });

    //DELETE USER
    it("should delete a user successfully", async () => {
        const inserted = await pool
            .request()
            .query(
                "INSERT INTO Users (first_name, last_name, email, phone_number, password, role) OUTPUT INSERTED.userid VALUES ('Alice', 'Brown', 'alice@testmail.com', '0722222222', 'pass456', 'user')"
            );

        const userId = inserted.recordset[0].userid;
        console.log("want to see:", userId);
        const res = await request(app).delete(`/users/${userId}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toMatch(/user deleted successfully/i);
    });

    it("should return 400 for invalid user ID on delete", async () => {
        const res = await request(app).delete("/users/abc");
        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/invalid user id/i);
    });

    it("should return 404 for non-existent user on delete", async () => {
        const res = await request(app).delete("/users/99999999");
        expect(res.status).toBe(404);
        expect(res.body.message).toMatch(/user not found/i);
    });

    //VERIFY USER EMAIL
    it("should fail verifying without email or code", async () => {
        const res = await request(app).post("/verify").send({});
        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/email and code are required/i);
    });


    it("should fail verifying non-existent user", async () => {
        const res = await request(app).post("/verify").send({
            email: "noone@testmail.com",
            code: "123456",
        });
        expect(res.status).toBe(404);
    });

 })