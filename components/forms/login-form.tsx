import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { auth, signIn } from "@/utils/auth";
import GeneralSubmitButton from "../general/general-submit-button";
import { redirect } from "next/navigation";

const LoginForm = async () => {
  const session = await auth();

  if (session?.user) {
    return redirect("/");
  }
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription> Login to your account </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <form
              action={async () => {
                "use server";
                await signIn("github", { redirectTo: "/" });
              }}
            >
              <GeneralSubmitButton
                text="Login with GitHub"
                variant="outline"
                className="w-full"
                status="Logging in..."
              />
              {/* <Button className="w-full"> Login with GitHub</Button> */}
            </form>
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/" });
              }}
            >
              {/* <Button className="w-full"> Login with Google</Button> */}
              <GeneralSubmitButton
                text="Login with Google"
                variant="outline"
                className="w-full"
                status="Logging in..."
              />
            </form>
          </div>
        </CardContent>
      </Card>
      <div>
        <p className="text-center text-xs text-muted-foreground text-balance">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
