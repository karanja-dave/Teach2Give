
import { Express } from "express";
import * as userController from "../controllers/user.controllers";
import { adminOnly,userOnly,adminUser} from "../middleware/bearAuth";
const userRoutes = (app: Express) => {
    app.get("/users", adminOnly, userController.getAllUsers);
    app.get("/users/:id", userController.getUserById);
    app.post("/users", userController.createUser);
    app.put("/users/:id", userController.updateUser);
    app.delete("/users/:id", userController.deleteUser);
    app.post("/login",userController.loginUser)
}

export default userRoutes;