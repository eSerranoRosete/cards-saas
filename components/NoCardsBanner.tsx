"use client";

import { Card } from "@nextui-org/card";
import InitCardDialog from "./InitCardDialog";

export const NoCardsBanner = () => {
  return (
    <Card className="w-full h-72 rounded overflow-clip relative flex items-center justify-center">
      <div className="text-center ">
        <h1 className="mb-5 text-3xl font-bold max-w-md">
          You don&apos;t have any cards yet!
        </h1>
        <h2>
          Get started by{" "}
          <InitCardDialog
            button={(onOpen) => (
              <button onClick={onOpen} className="underline">
                creating your first card
              </button>
            )}
          />
        </h2>
      </div>
    </Card>
  );
};
