"use client";

import { useCardStore } from "@/context/card/useCardStore";
import { Button } from "@nextui-org/button";

import { Image } from "@nextui-org/image";
import UploadAssetDialog from "../application/UploadAssetDialog";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";

import QrCode from "qrcode";

type Props = {
  view: "edit" | "preview";
};

export const CardTemplateModern = ({ view }: Props) => {
  const { state, actions } = useCardStore();
  const [shareOpen, setShareOpen] = useState(false);
  const [qrCode, setQrCode] = useState<string>();

  const generate = async () => {
    const url = `${window.location.origin}/card/${state.id}`;
    const qrCode = await QrCode.toDataURL(url);
    setQrCode(qrCode);
  };

  const openShareTray = () => {
    generate();
    setShareOpen(true);
  };

  const colors = getColors(state.settings?.dominantColor);

  const fromBottom = {
    initial: { bottom: "-100%" },
    animate: {
      y: 0,
      bottom: "-15%",
      transition: {
        type: "spring",
        bounce: 0.3,
      },
    },
    exit: { bottom: "-100%" },
  };

  return (
    <div className="w-full max-w-sm grid gap-8 relative overflow-clip rounded-large p-3 m-auto bg-black">
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
          alt={state.title}
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
        {state.settings?.showShareButton && (
          <Button onClick={openShareTray}>Share this Card</Button>
        )}
      </div>

      {state.modules?.blockquote && (
        <div className="rounded-large bg-default-50 p-4 text-center text-sm">
          {state.modules.blockquote}
        </div>
      )}

      <AnimatePresence>
        {shareOpen && (
          <motion.div
            onDrag={(e, info) => {
              if (info.offset.y < -200) {
                setShareOpen(false);
              }

              if (info.offset.y > 200) {
                setShareOpen(false);
              }
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.1}
            dragMomentum={false}
            dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
            variants={fromBottom}
            initial="initial"
            animate="animate"
            exit="exit"
            className={cn(
              "w-full h-full bg-black/60 backdrop-blur-lg absolute z-50 rounded-large p-4"
            )}
          >
            <Button
              isIconOnly
              size="sm"
              onClick={() => setShareOpen(false)}
              className="float-right"
              variant="flat"
            >
              <XIcon className="w-4" />
            </Button>
            <div className="mt-20 text-center">
              <Image
                alt="Profile Image"
                className="w-20 h-20 rounded-large object-cover m-auto"
                removeWrapper
                src={state.avatar?.base64Content || state.avatar?.url}
              />
              <p className="text-xl font-bold mt-5">{state.title}</p>

              <Image className="m-auto mt-5" removeWrapper src={qrCode} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
