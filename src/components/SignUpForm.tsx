import * as React from "react";
import { Input, Button, Divider } from "@nextui-org/react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Icon } from "@iconify/react";
import validate from "@/app/lib/validate";
import PasswordValidator from "./PasswordValidator";
import { AnimatePresence, motion } from "framer-motion";

export interface SignUpFormProps {
  isNewUser?: boolean;
}

export default function SignUpForm({ isNewUser = false }: SignUpFormProps) {
  const [emailValue, setEmailValue] = React.useState("");
  const [isEmailInvalid, setIsEmailInvalid] = React.useState(false);
  const [isPWVisible, setIsPWVisible] = React.useState(false);
  const [isPWInvalid, setIsPWInvalid] = React.useState(false);
  const [PWvalue, setPWValue] = React.useState("");
  // const isInvalid = validate(emailValue, "email");
  return (
    <form>
      <div className="max-w-md mx-auto flex flex-col gap-4 items-center">
        <Input
          value={emailValue}
          type="email"
          onValueChange={setEmailValue}
          onBlur={() => setIsEmailInvalid(!validate(emailValue, "email"))}
          label="Email"
          variant="bordered"
          color={isEmailInvalid ? "danger" : "default"}
          size="lg"
          isInvalid={isEmailInvalid}
          errorMessage="Please enter a valid email address"
        />
        <Input
          label="Password"
          value={PWvalue}
          variant="bordered"
          onValueChange={setPWValue}
          color={isPWInvalid ? "danger" : "default"}
          type={isPWVisible ? "text" : "password"}
          size="lg"
          endContent={
            <button
              className="focus:outline-none flex h-full items-center justify-center"
              type="button"
              onClick={() => {
                setIsPWVisible(!isPWVisible);
              }}
              aria-label="toggle password visibility"
            >
              {isPWVisible ? (
                <EyeOff className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <Eye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
        {isNewUser && <PasswordValidator password={PWvalue} />}
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
        {!isNewUser && (
          <>
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
          </>
        )}
      </div>
    </form>
  );
}
