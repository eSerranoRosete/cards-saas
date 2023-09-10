"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { SubmitHandler, useForm } from "react-hook-form";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { PasswordButton } from "@/components/application/PasswordButton";

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
    <main className="w-full min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm pb-4">
        <CardBody>
          <form
            className="flex flex-col gap-4"
            onSubmit={signInForm.handleSubmit(onLogin)}
          >
            <Input
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
            <Input
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
            <p className="text-center text-small">
              Need to create an account?{" "}
              <Link
                href="/sign-up"
                as={NextLink}
                size="sm"
                className="cursor-pointer"
              >
                Sign up
              </Link>
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                isLoading={signInForm.formState.isSubmitting}
                type="submit"
                fullWidth
                color="primary"
              >
                Login
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </main>
  );
}
