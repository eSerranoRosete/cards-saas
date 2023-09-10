"use client";

import { AppLogo } from "@/components/application/AppLogo";
import { PasswordButton } from "@/components/application/PasswordButton";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { signIn } from "next-auth/react";
import NextLink from "next/link";
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
        <CardHeader className="flex justify-center flex-col items-center gap-2 mt-5">
          <h1 className="text-3xl mt-2 font-semibold">Welcome</h1>
          <p className="text-sm text-default-500">Login to your account</p>
        </CardHeader>
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
          </form>
        </CardBody>
      </Card>
    </main>
  );
}
