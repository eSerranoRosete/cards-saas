"use client";

import { useCardStore } from "@/context/card/useCardStore";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import UploadAssetDialog from "../application/UploadAssetDialog";

type Props = {
  view: "edit" | "preview";
};

export const CardTemplateModern = ({ view }: Props) => {
  const { state, actions } = useCardStore();

  const colors = getColors(state.settings?.dominantColor);

  return (
    <div className="w-full max-w-sm grid gap-8 rounded-large p-3 m-auto bg-black">
      <div className="relative rounded-large overflow-clip mb-3 bg-default-50 min-h-[300px]">
        {view === "edit" && (
          <div className="absolute top-2 right-2 z-20">
            <UploadAssetDialog
              onSuccess={(s) =>
                actions.setState({ avatar: { base64Content: s } })
              }
              onColor={(c) =>
                actions.setState({ settings: { dominantColor: c } })
              }
            />
          </div>
        )}
        <Image
          className="w-full"
          removeWrapper
          src={state.avatar?.base64Content || state.avatar?.url}
        />
        <div className="w-full h-1/2 bg-gradient-to-t from-black to-transparent absolute bottom-0 z-10" />
        <div className="z-20 w-full bottom-0 absolute text-center">
          <h1 className="text-3xl font-bold ">{state.title}</h1>
          <p className="text-sm max-w-[200px] m-auto mb-2">
            {state.description}
          </p>
          <p className="text-xs font-bold">{state.organization}</p>
        </div>
      </div>

      <div className="grid gap-3">
        {state.settings?.showContactButton && (
          <Button
            style={{
              ...(colors && {
                backgroundColor: colors.background,
                color: colors.foreground,
              }),
            }}
          >
            Add to Contacts
          </Button>
        )}
        {state.settings?.showShareButton && <Button>Share this Card</Button>}
      </div>

      {state.modules?.blockquote && (
        <div className="rounded-large bg-default-50 p-4 text-center text-sm">
          {state.modules.blockquote}
        </div>
      )}
      {/* 
      <div className="w-full grid grid-cols-2 gap-4 rounded-large">
        <div className="bg-lime-500 aspect-square rounded-large" />
        <div className="bg-blue-500 aspect-square rounded-large" />
      </div> */}
    </div>
  );
};

function getColors(rbgString?: string) {
  if (!rbgString) return;

  const rbg = rbgString
    .replace("rgb(", "")
    .replace(")", "")
    .split(",")
    .map((s) => parseInt(s));

  const color = Math.round((rbg[0] * 299 + rbg[1] * 587 + rbg[2] * 114) / 1000);
  const foreground = color > 125 ? "black" : "white";
  const background = "rgb(" + rbg[0] + ", " + rbg[1] + ", " + rbg[2] + ")";

  return { background, foreground };
}
