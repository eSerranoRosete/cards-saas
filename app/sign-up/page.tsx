"use client";

import { useForm } from "react-hook-form";

import { AppButton } from "@/components/application/AppButton";
import { AppLogo } from "@/components/application/AppLogo";
import { PasswordButton } from "@/components/application/PasswordButton";
import { TextInput } from "@/components/application/form/TextInput";
import { useToast } from "@/components/application/toast/useToast";
import { createUser } from "@/firebase/user/createUser";
import { Flex, IconButton } from "@radix-ui/themes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignatureGradient } from "@/components/application/SignatureGradient";

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
    <main className="w-full min-h-screen flex items-center justify-center">
      <Link href="/">
        <IconButton
          variant="soft"
          color="gray"
          className="absolute top-5 left-5"
        >
          <ArrowLeft />
        </IconButton>
      </Link>
      <div className="w-full max-w-lg pb-4 relative">
        <div className="w-full flex absolute -translate-y-3/4 items-center justify-center">
          <SignatureGradient className="m-auto w-full" />
          <AppLogo className="absolute translate-y-1/2" />
        </div>

        <div className="w-full max-w-sm m-auto">
          <div className="flex justify-center flex-col items-center gap-2 my-5">
            <h1 className="text-3xl mt-2 font-semibold">
              Let&apos;s get started
            </h1>
            <p className="text-sm text-default-500">
              Fill in your info to create an account
            </p>
          </div>
          <form className="flex flex-col gap-4">
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
                onClick={form.handleSubmit(onSignUp)}
              >
                Register
              </AppButton>

              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="cursor-pointer underline text-blue-500"
                >
                  Login
                </Link>
              </p>
            </Flex>
          </form>
        </div>
      </div>
    </main>
  );
}
