"use client";
import { signIn } from "next-auth/react";
import { FC } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface LoginProps {
  isDevMode: boolean;
}

export const LogIn: FC<LoginProps> = ({ isDevMode }) => {
  return (
    <Card className="flex gap-2 flex-col min-w-[300px]">
      <CardHeader className="gap-2">
        <CardTitle className="text-2xl flex gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={"ai-icon.png"} alt="AI Icon" />
          </Avatar>
          <span className="text-primary">AnyAsk</span> {/* Utilizează AI_NAME dacă este definit */}
        </CardTitle>
        <CardDescription>
          Login with your Personal Account or Microsoft 365 account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button onClick={() => signIn("azure-ad-b2c")}>Personal Account</Button>
        <Button onClick={() => signIn("azure-ad")}>Microsoft 365</Button>
        {isDevMode && (
          <Button onClick={() => signIn("credentials")}>
            Basic Auth (DEV ONLY)
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
