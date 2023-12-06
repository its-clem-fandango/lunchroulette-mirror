// import express from "express"
import { Router } from "express"
import UsersController from "./controllers/users.controller"
import MeetingController from "./controllers/meeting.controller"

const router = Router()

router.get("/users", UsersController.getAllUsers)
router.get("/users/:id", UsersController.getUser)
router.post("/users", UsersController.createUser)
router.put("/users/profile/:id", UsersController.editUserProfile)
router.patch(
  "/users/availableToday/:id",
  UsersController.toggleIsAvailableToday,
)
router.post("/meetings", MeetingController.createMeeting)
router.get("/getMatch/:id", MeetingController.getMeeting)
router.get("/matches", UsersController.getMatches)

export default router
