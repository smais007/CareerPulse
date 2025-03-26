import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

const LoginForm = () => {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription> Login to your account </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <form>
              <Button className="w-full"> Login with GitHub</Button>
            </form>
            <form>
              <Button className="w-full"> Login with Google</Button>
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
