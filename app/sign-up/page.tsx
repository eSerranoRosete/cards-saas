"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { SubmitHandler, useForm } from "react-hook-form";

import NextLink from "next/link";
import { createUser } from "@/server/createUser";
import { useRouter } from "next/navigation";
import { AppButton } from "@/components/application/AppButton";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { PasswordButton } from "@/components/application/PasswordButton";

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

  const onSignUp: SubmitHandler<SignupValues> = async (data) => {
    const response = await createUser(data);

    if (response.error) {
      form.setError("email", {
        message: "Email is already in use",
      });
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm pb-4">
        <CardBody className="overflow-hidden">
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSignUp)}
          >
            <Input
              label="Name"
              placeholder="Enter your name"
              {...form.register("name", {
                required: "Name is required",
              })}
              errorMessage={form.formState.errors.name?.message}
            />
            <Input
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
            <Input
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
            <p className="text-center text-small">
              Already have an account?{" "}
              <Link
                as={NextLink}
                href="/sign-in"
                className="cursor-pointer"
                size="sm"
              >
                Login
              </Link>
            </p>
            <div className="flex gap-2 justify-end">
              <AppButton
                isLoading={form.formState.isSubmitting}
                type="submit"
                fullWidth
                color="primary"
              >
                Sign up
              </AppButton>
            </div>
          </form>
        </CardBody>
      </Card>
    </main>
  );
}
