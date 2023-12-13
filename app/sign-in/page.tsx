"use client";

import { AppButton } from "@/components/application/AppButton";
import { AppLogo } from "@/components/application/AppLogo";
import { PasswordButton } from "@/components/application/PasswordButton";
import { TextInput } from "@/components/application/form/TextInput";
import { Button, Flex, IconButton, Text } from "@radix-ui/themes";
import { ArrowLeft } from "lucide-react";

import { signIn } from "next-auth/react";
import { default as Link } from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type SignInValues = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const signInForm = useForm<SignInValues>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onLogin: SubmitHandler<SignInValues> = async (data) => {
    const res = await signIn("credentials", {
      username: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      return signInForm.setError("password", {
        message: "Invalid email or password",
      });
    }

    router.push(callbackUrl);
  };

  return (
    <main className="w-full min-h-screen flex items-center relative justify-center">
      <Link href="/">
        <IconButton
          variant="soft"
          color="gray"
          className="absolute top-5 left-5"
        >
          <ArrowLeft />
        </IconButton>
      </Link>

      <div className="w-full max-w-sm pb-4 relative">
        <div className="absolute -top-24 w-full flex justify-center z-10">
          <AppLogo />
        </div>
        <div className="absolute w-full h-32 blur-xl -top-32 overflow-hidden rounded-t-full bg-gradient-to-r from-indigo-600 via-cyan-500 to-indigo-600">
          <div className="absolute top-1/4 w-[700px] left-1/2 -translate-x-1/2 aspect-square bg-zinc-950 rounded-full" />
          <div className="absolute top-1/4 w-[700px] left-1/2 -translate-x-1/2 aspect-square blur-none bg-blue-500 opacity-5 rounded-full" />
        </div>

        <div className="flex justify-center flex-col items-center gap-2 my-5">
          <h1 className="text-3xl mt-2 font-semibold">Welcome Back</h1>
          <p className="text-sm text-default-500">Login to your account</p>
        </div>
        <form className="flex flex-col gap-4">
          <Flex className="w-full" direction="column" gap="5">
            <TextInput
              label="Email"
              placeholder="Enter your email"
              errorMessage={signInForm.formState.errors.email?.message}
              {...signInForm.register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Enter a valid email",
                },
              })}
            />
            <TextInput
              label="Password"
              placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
              errorMessage={signInForm.formState.errors.password?.message}
              {...signInForm.register("password", {
                required: "Password is required",
              })}
              endContent={
                <PasswordButton
                  isVisible={isVisible}
                  toggleVisibility={toggleVisibility}
                />
              }
            />

            <AppButton
              className="w-full"
              onClick={signInForm.handleSubmit(onLogin)}
              isLoading={signInForm.formState.isSubmitting}
            >
              Login
            </AppButton>

            <Text className="text-center text-sm">
              Need to create an account?{" "}
              <Link
                href="/sign-up"
                className="cursor-pointer underline text-blue-500"
              >
                Register
              </Link>
            </Text>
          </Flex>
        </form>
      </div>
    </main>
  );
}
