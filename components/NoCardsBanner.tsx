import React from "react";

import Link from "next/link";
import { Card } from "@nextui-org/card";

export const NoCardsBanner = () => {
  return (
    <Card className="w-full h-72 rounded overflow-clip relative flex items-center justify-center">
      <div className="text-center ">
        <h1 className="mb-5 text-3xl font-bold max-w-md">
          You don&apos;t have any cards yet!
        </h1>
        <h2>
          Get started by{" "}
          <Link className="underline" href="/editor">
            creating your first card
          </Link>
        </h2>
      </div>
    </Card>
  );
};
