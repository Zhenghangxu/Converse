import * as React from "react";
import { Input, Button, Divider } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { Icon } from "@iconify/react";
import { useFormStatus } from "react-dom";

export interface SignUpFormProps {
  isNewUser?: boolean;
}

export default function SignUpForm({ isNewUser = false }: SignUpFormProps) {
  return (
    <div>
      <form action={"https://www.google.com"} method="POST">
        <div className="max-w-md mx-auto flex flex-col gap-4 items-center">
          <Input type="email" label="Email" variant="bordered" size="lg" />
          <Input
            type="password"
            label="Password"
            variant="bordered"
            size="lg"
          />
          <Button
            color="primary"
            type="submit"
            aria-label="submit"
            size="lg"
            className="my-5"
          >
            {isNewUser ? "Sign Up" : "Log In"}
            <ArrowRight />
          </Button>
          <Divider className="w-40" />
          <Button
            color="default"
            aria-label="login-with-microsoft"
            size="lg"
            className="my-5"
            variant="ghost"
          >
            Microsoft Login
            <Icon icon="logos:microsoft-icon" />
          </Button>
        </div>
      </form>
    </div>
  );
}
