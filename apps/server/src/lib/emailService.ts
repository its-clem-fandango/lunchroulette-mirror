import { CourierClient } from "@trycourier/courier"
import dotenv from "dotenv"

dotenv.config()

if (!process.env.COURIER_PROD_API_KEY)
  throw new Error("missing Courier api key")

const courier = new CourierClient({
  authorizationToken: process.env.COURIER_PROD_API_KEY,
})

if (!process.env.TEMPLATE) throw new Error("fefw")

export const sendEmail = async (email: string, template: string) => {
  await courier.send({
    message: {
      to: {
        email: email,
      },
      template: template,
      data: {},
    },
  })
}
