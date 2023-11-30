import express from "express"
import UsersController from "./controllers/users.controller"

const router = express.Router()
const app = express()

router.get("/")

router.get("/users", UsersController.getAllUsers)
router.get("/users/:id", UsersController.getUser)
router.post("/users", UsersController.createUser)
router.put("/users/profile/:id", UsersController.editUserProfile)
