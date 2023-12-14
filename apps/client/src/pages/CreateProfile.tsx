import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { apiUrl } from "@/lib/constants"
import { UserContext, useUserContext } from "@/lib/UserContext"

const formSchema = z.object({
  firstName: z.string().min(2).max(50).default(""),
  lastName: z.string().min(2).max(50).default(""),
  //image thread: https://github.com/colinhacks/zod/issues/387
  avatar: z
    .any()
    .refine((files) => files.length >= 1, "Image is required.")
    .refine((files) => files[0].size <= 5000000, "Max file size is 5MB."),
  companyName: z.string().min(2).max(50),
})

export default function CreateProfile() {
  const [user, setUser] = useUserContext()

  //define form
  const form = useForm<z.infer<typeof formSchema>>({
    //specify input validator for reacthookform
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      avatar: [],
      companyName: "",
    },
  })

  const fileRef = form.register("avatar", { required: true })
  const fileList = form.watch("avatar")
  const fileURL = fileList?.length
    ? URL.createObjectURL(fileList[0])
    : undefined

  function onSubmit(values: z.infer<typeof formSchema>, e: React.FormEvent) {
    console.log("clicked")
    console.log(user)
    e.preventDefault()

    const requestOptions: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
    fetch(`${apiUrl}/users`, requestOptions)
      .then((response) => {
        // Check if the request was successful
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        // Convert the response to JSON
        const newUser = response.json()
      })
      .then((data) => {
        // Handle the data (JSON)
        console.log(data)
        console.log("hello")
      })

    // upload to firestore
    // file = fileList[0] o values.avatar[0]
  }

  return (
    <>
      <div>
        <img src={fileURL} />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>About Me</CardTitle>
            <CardDescription>Tell us a little about yourself</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
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

                <Button type="submit">Continue</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
