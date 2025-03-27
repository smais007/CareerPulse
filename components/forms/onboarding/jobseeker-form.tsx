import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/utils/uploadthing";
import { jobSeekerSchema } from "@/utils/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function JobSeekerForm() {
  const form = useForm<z.infer<typeof jobSeekerSchema>>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: {
      about: "",
      name: "",
      resume: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short bio</FormLabel>
              <FormControl>
                <Textarea placeholder="tell us about yourself" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume(PDF)</FormLabel>
              <FormControl>
                {field.value ? (
                  <div className="relative w-fit">
                    <Image
                      src={field.value}
                      alt="Logo"
                      width={100}
                      height={100}
                      className="rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2"
                      onClick={() => field.onChange("")}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <UploadDropzone
                    endpoint="resumeUploader"
                    onClientUploadComplete={(res) => {
                      field.onChange(res?.[0].url);
                    }}
                    onUploadError={() => {
                      console.log("Upload failed");
                    }}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
