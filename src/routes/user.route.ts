import { Router } from "express";
import { createUser, listUser, findDetailById, updateUser, deleteUser } from "../controllers/user.controller";
import { createUserValidator } from "../validators/user-create.validator";
import { updateUserValidator } from "../validators/user-update.validator";
import { deleteUserValidator } from "../validators/user-delete.validator";


import { validate } from "../middlewares/validate";

const router = Router();

router.post("/", createUserValidator, validate, createUser);
router.get("/", listUser);
router.get("/:id", findDetailById);
router.post("/update", updateUserValidator, validate, updateUser);
router.post("/delete", deleteUserValidator, validate, deleteUser);

export default router;
