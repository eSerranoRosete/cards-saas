"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import NextLink from "next/link";

type SignupValues = {
  name: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  const singUpForm = useForm<SignupValues>();

  const onSignUp: SubmitHandler<SignupValues> = (data) => console.log(data);

  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm pb-4">
        <CardBody className="overflow-hidden">
          <form
            className="flex flex-col gap-4"
            onSubmit={singUpForm.handleSubmit(onSignUp)}
          >
            <Input
              label="Name"
              placeholder="Enter your name"
              {...singUpForm.register("name", {
                required: "Name is required",
              })}
              errorMessage={singUpForm.formState.errors.name?.message}
            />
            <Input
              label="Email"
              placeholder="Enter your email"
              {...singUpForm.register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Enter a valid email",
                },
                validate: async (value) => {
                  const isValid = false;

                  if (!isValid) {
                    return "Email already exists";
                  } else {
                    return;
                  }
                },
              })}
              errorMessage={singUpForm.formState.errors.email?.message}
            />
            <Input
              label="Password"
              placeholder="Enter a password"
              type="password"
              {...singUpForm.register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              errorMessage={singUpForm.formState.errors.password?.message}
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
              <Button type="submit" fullWidth color="primary">
                Sign up
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </main>
  );
}
