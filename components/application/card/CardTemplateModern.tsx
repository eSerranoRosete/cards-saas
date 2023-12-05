"use client";

import { Button } from "@nextui-org/button";

import { Image } from "@nextui-org/image";

import { CardCarousel } from "./CardCarousel";
import ShareCardDialog from "./ShareCardDialog";
import { useCardStore } from "@/context/card/CardStore";
import { UploadAvatar } from "./UploadAvatar";
import { Card } from "@nextui-org/card";
import { Facebook } from "@/components/social-icons/Facebook";
import { Twitter } from "@/components/social-icons/Twitter";
import { LinkedIn } from "@/components/social-icons/LinkedIn";
import { YouTube } from "@/components/social-icons/YouTube";
import { Instagram } from "@/components/social-icons/Instagram";
import { Pinterest } from "@/components/social-icons/Pinterest";
import { Whatsapp } from "@/components/social-icons/Whatsapp";
import { TikTok } from "@/components/social-icons/TikTok";
import { SocialIcon } from "@/components/social-icons/SocialIcon";
import Link from "next/link";

type Props = {
  view: "edit" | "preview";
  cardID?: string;
};

export const CardTemplateModern = ({ view, cardID }: Props) => {
  const store = useCardStore();

  const colors = getColors(store.settings.dominantColor);

  return (
    <div className="w-full max-w-sm grid gap-8 relative rounded-large p-3 m-auto bg-background pb-10">
      <div className="relative rounded-large overflow-clip mb-3 bg-default-50 min-h-[300px]">
        {view === "edit" && cardID && (
          <div className="absolute top-2 right-2 z-20">
            <UploadAvatar cardID={cardID} />
          </div>
        )}
        <Image
          alt={store.title}
          className="w-full"
          removeWrapper
          src={store.avatar?.url}
        />
        <div
          style={{
            background: `linear-gradient(to top, ${colors?.foregroundInverted}, transparent)`,
          }}
          className={`w-full h-1/2 absolute bottom-0 z-10`}
        />
        <div
          style={{
            ...(colors && { color: colors?.foreground }),
          }}
          className={`z-20 w-full bottom-3 absolute text-center text-foreground`}
        >
          <h1 className="text-3xl font-bold ">{store.title}</h1>
          <p className="text-sm max-w-[200px] m-auto mb-2">
            {store.description}
          </p>
          <p className="text-xs font-bold">{store.organization}</p>
        </div>
      </div>
      <div className="grid gap-3">
        {store.settings?.showContactButton && (
          <Button
            style={{
              ...(colors && {
                backgroundColor: colors.background,
                color: colors.foreground,
              }),
            }}
            color="primary"
          >
            Add to Contacts
          </Button>
        )}
        {store.settings?.showShareButton && (
          <ShareCardDialog
            id={cardID}
            imgSrc={store.avatar?.url}
            title={store.title}
            disableModal={view === "edit"}
          />
        )}
      </div>
      {store.bio && (
        <Card className="rounded-large bg-default-50 text-foreground p-4 text-center text-sm">
          {store.bio}
        </Card>
      )}
      {store.modules?.carousel && (
        <CardCarousel items={store.modules.carousel} />
      )}

      <div className="w-full p-2 flex gap-3 flex-wrap justify-center">
        {store.social?.map((item) => (
          <Link key={item.id} href={item.url} target="_blank">
            <SocialIcon size={55} url={item.url} />
          </Link>
        ))}
      </div>
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
  const foregroundInverted = color > 125 ? "white" : "black";
  const background = "rgb(" + rbg[0] + "," + rbg[1] + "," + rbg[2] + ")";

  function rgbToHex(red: number, green: number, blue: number): string {
    // Ensure the input values are within the valid range (0-255)
    red = Math.min(Math.max(red, 0), 255);
    green = Math.min(Math.max(green, 0), 255);
    blue = Math.min(Math.max(blue, 0), 255);

    // Convert the RGB values to hexadecimal format
    const hexColor = `#${red.toString(16).padStart(2, "0")}${green
      .toString(16)
      .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;

    return hexColor.toUpperCase(); // Convert to uppercase for consistency
  }

  const hex = rgbToHex(rbg[0], rbg[1], rbg[2]);

  return { background: hex, foreground, foregroundInverted };
}
