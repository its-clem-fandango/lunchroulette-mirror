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

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  //************FILE UPLOAD**************** */
  //image thread: https://github.com/colinhacks/zod/issues/387
  /*   avatar: z
    .any()
    .refine((file) => file.length == 1, "Image is required.")
    .refine((file) => file.size <= 5000000, "Max file size is 5MB.")
    .refine((file) =>
      file
        .toString()
        .includes(
          file?.type,
          ".jpg, .jpeg, .png and .webp files are accepted.",
        ),
    ), */
  companyName: z.string({
    required_error: "Please select a company name",
  }),
})

export default function CreateProfile() {
  //define form
  const form = useForm<z.infer<typeof formSchema>>({
    //specify input validator for reacthookform
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      //************FILE UPLOAD**************** */
      //avatar: undefined,
      companyName: "",
    },
  })

  //************FILE UPLOAD**************** */
  //const fileRef = form.register("avatar", { required: true })
  //console.log(form.watch())

  //define submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(`Here's my object:`, values)

    const requestOptions: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
    fetch(`${apiUrl}/users`, requestOptions)
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>About Me</CardTitle>
          <CardDescription>Tell us a little about yourself</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                      <Input placeholder="Enter your last name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified company to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="arol.dev">arol.dev</SelectItem>
                        <SelectItem value="Cooltra">cooltra</SelectItem>
                        <SelectItem value="impact">impact</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {
                //************FILE UPLOAD**************** */
                /* <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
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
                      <FormDescription>
                        This will be your avatar...
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              /> */
              }

              <Button type="submit">Continue</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
