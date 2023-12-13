import { AppButton } from "@/components/application/AppButton";
import { AppLogo } from "@/components/application/AppLogo";

import { Button, Separator } from "@radix-ui/themes";

import { getServerSession } from "next-auth";
import Link from "next/link";
import NextLink from "next/link";

export default async function Home() {
  const session = await getServerSession();

  return (
    <>
      <header className="w-full">
        <nav className="container flex items-center m-auto py-4">
          <NextLink href="/" className="font-semibold mr-10 flex gap-2">
            <AppLogo />
          </NextLink>
          <div className="grow flex gap-4"></div>
          {session ? (
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          ) : (
            <AuthButtons />
          )}
        </nav>
        <Separator size="4" />
      </header>
      <main className="container mt-10 ">
        <div className="grid grid-cols-4 h-72  gap-5">
          <div className="col-span-2 relative rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3276&q=80"
              className="object-cover rounded-lg w-full h-full absolute top-0 left-0 object-center"
              alt=""
            />
          </div>
          <div className="relative rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1687360441023-286ce1b5da0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3327&q=80"
              className="object-cover rounded-lg w-full h-full absolute top-0 left-0 object-center"
              alt=""
            />
          </div>
          <div className="relative rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1570158268183-d296b2892211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
              className="object-cover rounded-lg w-full h-full absolute top-0 left-0 object-center"
              alt=""
            />
          </div>
        </div>

        <h1 className="text-8xl tracking-tighter">
          Boost your online presence{" "}
          <span className="font-bold">and get noticed</span>
          <span className="text-base translate-y-5 float-right max-w-sm tracking-normal">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel vero
            nam illo voluptate est inventore amet sapiente a unde nesciunt!
          </span>
        </h1>

        <Separator className="my-10" size="4" />

        <div className="m-auto text-center">
          <Link href="/sign-up">
            <Button size="3">Get started for free</Button>
          </Link>
          <p className="text-sm text-default-500 mt-2">7 day free trial.</p>
        </div>
      </main>
    </>
  );
}

const AuthButtons = () => {
  return (
    <div className="flex gap-2">
      <Link href="/sign-up">
        <AppButton variant="soft" color="gray">
          Sign Up
        </AppButton>
      </Link>
      <Link href="/sign-in">
        <AppButton variant="soft" color="gray">
          Sign In
        </AppButton>
      </Link>
    </div>
  );
};
