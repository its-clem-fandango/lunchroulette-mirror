import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { getStorage, ref, uploadBytes, getDownloadURL, StorageReference } from "firebase/storage"
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
import { useUserContext } from "@/lib/UserContext"
import avatarDefaultImage from "../assets/Ellipse_5.svg"
import { Frame } from "@/components/ui/frame"
import { useNavigate } from "react-router-dom"
import usersApi from "@/lib/usersApi"

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
  ) {

    if (user) {
      const didUserSelectFile = fileList?.length > 0
      if (didUserSelectFile) {
        const file = fileList[0]

        const storage = getStorage()
        const storageRef = ref(storage, `${idOfUser}.jpg`)

        await uploadBytes(storageRef, file)

        const imageRef = ref(storage, `${idOfUser}.jpg`)

        uploadAndGetDownloadURL(imageRef)
          .then(async (urlForAvatar) => {
            await usersApi.updateUserProfile(user.id, values.firstName, values.lastName, urlForAvatar)

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
        await usersApi.updateUserProfile(user.id, firstName, lastName)
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
  }

  return (
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="text-center">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <FormLabel htmlFor="picture">Profile Picture</FormLabel>
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
              <Button
                type="button"
                className="bg-sherpa-900 mt-4"
                onClick={() =>
                  window.document.getElementById("picture")?.click()
                }
              >
                Change profile picture
              </Button>
            </div>
            <Card className="w-[350px] mt-10 pt-5">
              <CardContent>
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
                <Button className="mt-4 w-full" type="submit">
                  Continue
                </Button>
              </CardContent>
            </Card>
          </form>
        </Form>
      </Frame>
    </motion.div>
  )
}

async function uploadAndGetDownloadURL(imageRef: StorageReference) {
  return await getDownloadURL(imageRef)
}