"use client";

import { AppButton } from "@/components/application/AppButton";
import { AppLogo } from "@/components/application/AppLogo";
import { PasswordButton } from "@/components/application/PasswordButton";
import { TextInput } from "@/components/application/form/TextInput";
import { Card, Flex, Text } from "@radix-ui/themes";

import { signIn } from "next-auth/react";
import { default as Link, default as NextLink } from "next/link";
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
      <header className="w-full absolute top-0 left-0">
        <nav className="container flex items-center m-auto py-4">
          <NextLink href="/" className="font-semibold flex gap-2">
            <AppLogo />
            Inteminer
          </NextLink>
        </nav>
      </header>

      <Card className="w-full max-w-sm pb-4">
        <div className="flex justify-center flex-col items-center gap-2 my-5">
          <h1 className="text-3xl mt-2 font-semibold">Welcome</h1>
          <p className="text-sm text-default-500">Login to your account</p>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={signInForm.handleSubmit(onLogin)}
        >
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
              isLoading={signInForm.formState.isSubmitting}
              type="submit"
              size="3"
            >
              Login
            </AppButton>

            <Text className="text-center text-small">
              Need to create an account?{" "}
              <Link href="/sign-up" className="cursor-pointer underline">
                Sign up
              </Link>
            </Text>
          </Flex>
        </form>
      </Card>
    </main>
  );
}
