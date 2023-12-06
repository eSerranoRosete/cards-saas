"use client";

import { useForm } from "react-hook-form";

import NextLink from "next/link";

import { AppButton } from "@/components/application/AppButton";
import { AppLogo } from "@/components/application/AppLogo";
import { PasswordButton } from "@/components/application/PasswordButton";
import { TextInput } from "@/components/application/form/TextInput";
import { useToast } from "@/components/application/toast/useToast";
import { createUser } from "@/firebase/user/createUser";
import { Card, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

type SignupValues = {
  name: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  const form = useForm<SignupValues>();
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const toast = useToast();

  const onSignUp = async (data: SignupValues) => {
    const response = await createUser({ data });

    if (response.error) {
      form.setError("email", {
        message: response.error,
      });
    } else {
      router.push("/sign-in");
      toast.set({
        variant: "success",
        title: "Account created",
        message: "Now you can login to your account",
      });
    }
  };

  return (
    <main className="  w-full min-h-screen flex items-center justify-center">
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
          <p className="text-sm text-default-500">Create an account</p>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSignUp)}
        >
          <Flex direction="column" gap="5">
            <TextInput
              label="Name"
              placeholder="Enter your name"
              {...form.register("name", {
                required: "Name is required",
              })}
              errorMessage={form.formState.errors.name?.message}
            />
            <TextInput
              label="Email"
              placeholder="Enter your email"
              {...form.register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Enter a valid email",
                },
              })}
              errorMessage={form.formState.errors.email?.message}
            />
            <TextInput
              label="Password"
              placeholder="Enter a password"
              type={isVisible ? "text" : "password"}
              {...form.register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              errorMessage={form.formState.errors.password?.message}
              endContent={
                <PasswordButton
                  isVisible={isVisible}
                  toggleVisibility={toggleVisibility}
                />
              }
            />

            <AppButton
              className="w-full"
              isLoading={form.formState.isSubmitting}
              type="submit"
              size="3"
            >
              Sign up
            </AppButton>

            <p className="text-center text-small">
              Already have an account?{" "}
              <Link href="/sign-in" className="cursor-pointer underline">
                Sign in
              </Link>
            </p>
          </Flex>
        </form>
      </Card>
    </main>
  );
}
