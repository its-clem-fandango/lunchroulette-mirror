import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { Card, CardContent } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { apiUrl } from "@/lib/constants"
import { useUserContext } from "@/lib/UserContext"
import avatarDefaultImage from "../assets/Ellipse_5.svg"
import { Frame } from "@/components/ui/frame"
import { useNavigate } from "react-router-dom"

// should be called EditProfile?
export default function CreateProfile() {
  const [user, setUser] = useUserContext()
  const navigate = useNavigate()

  // Form Schema with optiona avatar
  const userHasAvatar = user && user.avatar
  const avatarSchema = userHasAvatar
    ? z.any().optional() // Make avatar optional if the user already has one
    : z
        .any()
        .refine((files) => files.length >= 1, "Image is required.")
        .refine((files) => files[0].size <= 5000000, "Max file size is 5MB.")
  const formSchema = z.object({
    firstName: z.string().min(2).max(50).default(""),
    lastName: z.string().min(2).max(50).default(""),
    avatar: avatarSchema,
  })

  //define form
  const form = useForm<z.infer<typeof formSchema>>({
    //specify input validator for reacthookform
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
    },
  })

  // Getting the info from the Context
  const firstName = user?.firstName
  const lastName = user?.lastName
  const idOfUser = user?.id
  console.log("idOfUser", idOfUser)

  // File (Profile Picture) Management -> To put it on the Avatar Image to show to user
  const fileRef = form.register("avatar", { required: true })
  const fileList = form.watch("avatar")
  const didUserSelectFile = fileList?.length > 0
  const fileURL = didUserSelectFile
    ? URL.createObjectURL(fileList[0])
    : user?.avatar
  const avatarImage = fileURL || avatarDefaultImage

  // This is when the Submit actually happens
  async function onSubmit(
    values: z.infer<typeof formSchema>
    // e: React.FormEvent
  ) {
    console.log("user", user)
    // e.preventDefault()

    // NOW WE DO THE PUT REQUEST
    // There are
    function uploadAndGetDownloadURL(imageRef: any) {
      return getDownloadURL(imageRef)
        .then((url) => {
          // The URL is now returned from this function
          console.log("image url", url)
          return url // This is the important change
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error getting the download URL", error)
          throw new Error("Error getting the download URL")
        })
    }

    // Upload new Image to Firebase Storage
    const didUserSelectFile = fileList?.length > 0
    if (didUserSelectFile) {
      const file = fileList[0]
      // Get a storage reference
      const storage = getStorage()
      const storageRef = ref(storage, `${idOfUser}.jpg`)

      // add your image in that refrence
      const snapshot = await uploadBytes(storageRef, file)

      //For retrieval
      // Create a reference to the file you want to download in firestore
      const imageRef = ref(storage, `${idOfUser}.jpg`)

      uploadAndGetDownloadURL(imageRef).then((urlForAvatar) => {
        // This case WITH the image change

        // Now that we have the URL, we can make the PUT request

        const requestOptions: RequestInit = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: values.firstName,
            lastName: values.lastName,
            avatar: urlForAvatar, // urlForAvatar is now available here
          }),
        }

        fetch(`${apiUrl}/users/${idOfUser}`, requestOptions)
          .then((response) => {
            // Check if the request was successful
            if (!response.ok) {
              throw new Error("Network response was not ok")
            }
            // Convert the response to JSON
            const newUser = response.json()
            return newUser
          })
          .then((data) => {
            // Handle the data (JSON)
            console.log(data)
            console.log("hello")
          })

        setUser((user) => {
          if (!user) throw new Error("User is not defined")

          return {
            ...user,
            firstName: values.firstName,
            lastName: values.lastName,
            avatar: urlForAvatar,
          }
        })

        navigate("/homepage")
      })
    } else {
      // No image
      const requestOptions: RequestInit = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
        }),
      }

      fetch(`${apiUrl}/users/${idOfUser}`, requestOptions)
        .then((response) => {
          // Check if the request was successful
          if (!response.ok) {
            throw new Error("Network response was not ok")
          }
          // Convert the response to JSON
          const newUser = response.json()
          return newUser
        })
        .then((data) => {
          // Handle the data (JSON)
          console.log(data)
          console.log("hello")
        })

      setUser((user) => {
        if (!user) throw new Error("User is not defined")

        return {
          ...user,
          firstName: values.firstName,
          lastName: values.lastName,
        }
      })

      navigate("/homepage")
    }
  }

  return (
    <>
      <motion.div
        className="fixed h-full w-full bg-white box-border"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.45, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <Frame>
          <img
            className="rounded-full ring-2 ring-white h-20 w-20 mx-auto"
            src={avatarImage}
          />
          <Card className="w-[350px] mt-10 pt-5">
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  {
                    <FormField
                      control={form.control}
                      name="avatar"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <FormLabel htmlFor="picture">
                              Profile Picture
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="picture"
                                type="file"
                                accept="image/jpeg, image/png, image/webp"
                                {...fileRef}
                              />
                            </FormControl>
                          </div>
                        </FormItem>
                      )}
                    />
                  }
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your first name..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your last name..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Continue</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </Frame>
      </motion.div>
    </>
  )
}
