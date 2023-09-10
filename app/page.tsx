import { AppLogo } from "@/components/application/AppLogo";
import { Button } from "@nextui-org/button";

import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";

import { getServerSession } from "next-auth";
import NextLink from "next/link";

export default async function Home() {
  const session = await getServerSession();

  return (
    <>
      <header className="w-full">
        <nav className="container flex items-center m-auto py-4">
          <NextLink href="/" className="font-semibold mr-10 flex gap-2">
            <AppLogo />
            Inteminer
          </NextLink>
          <div className="grow flex gap-4"></div>
          {session ? (
            <Button as={NextLink} href="/dashboard" size="sm">
              Go to Dashboard
            </Button>
          ) : (
            <AuthButtons />
          )}
        </nav>
        <Divider />
      </header>
      <main className="container mt-10 ">
        <div className="grid grid-cols-4 h-72  gap-5">
          <div className="col-span-2 relative rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3276&q=80"
              className="object-cover w-full h-full absolute top-0 left-0 object-center"
              removeWrapper
              alt=""
            />
          </div>
          <div className="relative rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1687360441023-286ce1b5da0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3327&q=80"
              className="object-cover w-full h-full absolute top-0 left-0 object-center"
              removeWrapper
              alt=""
            />
          </div>
          <div className="relative rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1570158268183-d296b2892211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
              className="object-cover w-full h-full absolute top-0 left-0 object-center"
              removeWrapper
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

        <Divider className="my-10" />

        <div className="m-auto text-center">
          <Button as={NextLink} href="/sign-up" size="lg" color="primary">
            Get started for free
          </Button>
          <p className="text-sm text-default-500 mt-2">7 day free trial.</p>
        </div>
      </main>
    </>
  );
}

const AuthButtons = () => {
  return (
    <div className="flex gap-2">
      <Button as={NextLink} href="/sign-up" size="sm">
        Sign Up
      </Button>
      <Button href="/sign-in" as={NextLink} size="sm">
        Sign In
      </Button>
    </div>
  );
};
