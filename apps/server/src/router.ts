import { Router } from "express"
import UsersController from "./controllers/users.controller"

const router = Router()

router.get("/")

router.get("/users", UsersController.getAllUsers)
router.get("/users/:id", UsersController.getUser)
router.post("/users", UsersController.createUser)
router.put("/users/profile/:id", UsersController.editUserProfile)

export default router