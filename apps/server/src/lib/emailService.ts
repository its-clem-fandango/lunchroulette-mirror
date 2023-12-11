import { CourierClient } from "@trycourier/courier"
import dotenv from "dotenv"
import { MATCH_TEMPLATE } from "./templates"

dotenv.config()

if (!process.env.COURIER_PROD_API_KEY)
  throw new Error("missing Courier api key")

const courier = new CourierClient({
  authorizationToken: process.env.COURIER_PROD_API_KEY,
})

if (!process.env.TEMPLATE) throw new Error("fefw")

export const sendMatchEmail = async (
  email: string,
  firstName: string,
  matchFirstName: string,
  matchLastName: string,
) => {
  const data = {
    firstName,
    matchFirstName,
    matchLastName,
  }

  await sendEmail(email, MATCH_TEMPLATE, data)
}

const sendEmail = async (email: string, template: string, data: any) => {
  await courier.send({
    message: {
      to: {
        email,
      },
      template,
      data,
    },
  })
  // const { requestId } = response
  // const { status } = await courier.messages.get(requestId)
  // console.log(status)
}
