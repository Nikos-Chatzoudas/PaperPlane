"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";

export default function SignIn() {
  const [pending, SetPending] = useState(false);
  const { signIn } = useAuthActions();
  const onProviderSignIn = (value: "google") => {
    SetPending(true);
    signIn(value).finally(() => {
      SetPending(false);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md bg-zinc-900 border-none">
        <CardHeader className="space-y-1 text-center flex flex-col justify-center items-center">
          <img className="w-20" src="logo.png" alt="" />
          <CardTitle className="text-2xl text-white font-bold">
            Welcome to PaperPlane
          </CardTitle>

          <p className="text-white">Sign in to your account</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            disabled={pending}
            className=" text-white hover:text-white w-full flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 "
            variant="ghost"
            onClick={() => onProviderSignIn("google")}
          >
            <FcGoogle />
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
