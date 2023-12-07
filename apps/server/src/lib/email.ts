import { CourierClient } from "@trycourier/courier"

if (!process.env.COURIER_PROD_API_KEY)
  throw new Error("missing Courier api key")

const courier = new CourierClient({
  authorizationToken: process.env.COURIER_PROD_API_KEY,
})

export const sendEmail = async (email: string) => {
  await courier.send({
    message: {
      to: {
        email: email,
      },
      template: "ZXAQDJJEH144YFMX6CXYFVBXEK9S",
      data: {},
    },
  })
}
