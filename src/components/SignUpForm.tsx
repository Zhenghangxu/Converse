"use client";
import * as React from "react";
import {
  Input,
  Button,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Icon } from "@iconify/react";
import validate from "@/app/lib/validate";
import PasswordValidator from "./PasswordValidator";
import { signUp } from "@/app/actions";
import { useFormState } from "react-dom";
import { type returnData } from "@/app/actions";
import { useRouter } from "next/navigation";
import { UIContext } from "@/app/_context/ChatContext";

export interface SignUpFormProps {
  isNewUser?: boolean;
}

const initialState: returnData = {
  userOutput: null,
  // custom status code for initial state
  status: 900,
};

export default function SignUpForm({ isNewUser = false }: SignUpFormProps) {
  const { isPWInvalid } = React.useContext(UIContext);
  const [emailValue, setEmailValue] = React.useState("");
  const [isEmailInvalid, setIsEmailInvalid] = React.useState(false);
  const [isPWVisible, setIsPWVisible] = React.useState(false);
  // const [isPWInvalid, setIsPWInvalid] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [PWvalue, setPWValue] = React.useState("");
  const [showWarningMsg, setShowWarningMsg] = React.useState(false);
  // loading
  const [isButtonLoading, setIsButtonLoading] = React.useState(false);
  // error
  const [isError, setIsError] = React.useState(false);
  // success
  const [isSuccess, setIsSuccess] = React.useState(false);
  // const isInvalid = validate(emailValue, "email");
  // sumit
  const [formState, formAction] = useFormState(signUp, initialState);
  const router = useRouter();
  const showWarning = () => {
    setShowWarningMsg(true);
    setTimeout(() => {
      setShowWarningMsg(false);
    }, 2000);
  };
  React.useEffect(() => {
    if (formState.status === 900) {
      // start loading
      return;
    }
    if (formState.status === 200 || formState.status === 800) {
      console.log("User signed up successfully");
      setIsButtonLoading(false);
      setIsSuccess(true);
      // client-side redirect
      router.push("/chat");
    }
    if (formState.status === 500) {
      console.log("User signup failed");
      setIsButtonLoading(false);
      setIsError(true);
      setErrorMsg("Oops! Something went wrong on our end. Please try again.");
      showWarning();
    }
    if (formState.status === 409) {
      console.log("User already exists");
      setIsButtonLoading(false);
      setIsError(true);
      setErrorMsg("Looks like you already have an account. Please log in.");
      showWarning();
    }
  }, [formState]);

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        setIsButtonLoading(true);
        if (isEmailInvalid || isPWInvalid) {
          setIsButtonLoading(false);
          setErrorMsg("Hey, Please check your email or password.");
          showWarning();
          e.preventDefault();
        }
      }}
    >
      <div className="max-w-md mx-auto flex flex-col gap-4 items-center">
        <Input
          value={emailValue}
          type="email"
          name="email"
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
          name="password"
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
        {isNewUser && (
          <PasswordValidator
            password={PWvalue}
          />
        )}
        <Popover
          isOpen={showWarningMsg}
          placement="bottom"
          arrowSize={10}
          showArrow
        >
          <PopoverTrigger>
            <Button
              color="primary"
              type="submit"
              aria-label="submit"
              size="lg"
              className="my-5"
              isLoading={isButtonLoading}
              // For some reason adding onClick would nullify the form action
            >
              {isNewUser ? "Sign Up" : "Log In"}
              <ArrowRight />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2 text-black dark:text-white">
              <p className="text-inherit">{errorMsg}</p>
            </div>
          </PopoverContent>
        </Popover>

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

// import React from "react";
// import {, Button} from "@nextui-org/react";

// export default function App() {
//   const [isOpen, setIsOpen] = React.useState(false);

//   return (
//     <div className="flex flex-col gap-2">
// <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
//   <PopoverTrigger>
//     <Button>Open Popover</Button>
//   </PopoverTrigger>
//   <PopoverContent>
//     <div className="px-1 py-2">
//       <div className="text-small font-bold">Popover Content</div>
//       <div className="text-tiny">This is the popover content</div>
//     </div>
//   </PopoverContent>
// </Popover>
//       <p className="text-small text-default-400">Open: {isOpen ? "true" : "false"}</p>
//     </div>
//   );
// }
