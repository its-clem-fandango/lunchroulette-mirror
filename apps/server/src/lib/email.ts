import { CourierClient } from "@trycourier/courier"

if (!process.env.COURIER_PROD_API_KEY)
  throw new Error("missing Courier api key")

const courier = new CourierClient({
  authorizationToken: process.env.COURIER_PROD_API_KEY,
})

export type EmailContact = {
  name: string
  email: string
}

const constructMessage = (name: string, email: string) => {
  return `
    Congratulations! You have a metting with
    ${name} (${email}) at 13:00 in the lobby. `
}

export const notifyMeetingConfirmation = async (
  userEmailContact: EmailContact,
  friendEmailContact: EmailContact,
) => {
  await courier.send({
    message: {
      to: {
        email: userEmailContact.email,
      },
      content: {
        title: `Meeting Confirmation - Lunch-Roulette`,
        body: constructMessage(
          friendEmailContact.name,
          friendEmailContact.email,
        ),
      },
      routing: {
        method: "single",
        channels: ["email"],
      },
    },
  })

  await courier.send({
    message: {
      to: {
        email: friendEmailContact.email,
      },
      content: {
        title: `Meeting Confirmation - Lunch-Roulette`,
        body: constructMessage(userEmailContact.name, userEmailContact.email),
      },
      routing: {
        method: "single",
        channels: ["email"],
      },
    },
  })
}
