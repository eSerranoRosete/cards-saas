import React from "react";
import { Twitter } from "./Twitter";
import { LinkedIn } from "./LinkedIn";
import { YouTube } from "./YouTube";

import { Pinterest } from "./Pinterest";
import { Whatsapp } from "./Whatsapp";
import { TikTok } from "./TikTok";
import { Facebook } from "./Facebook";
import { Instagram } from "./Instagram";

type SocialIconProps = {
  url: string;
  size?: number;
};

export const SocialIcon = ({ url, size }: SocialIconProps) => {
  const domain = new URL(url).hostname;

  const Icon = getSocialIcon(domain);

  if (!Icon) return <></>;

  return <Icon width={size} height={size} />;
};

const getSocialIcon = (domain: string) => {
  if (domain.includes("twitter")) {
    return Twitter;
  }

  if (domain.includes("linkedin")) {
    return LinkedIn;
  }

  if (domain.includes("youtube")) {
    return YouTube;
  }

  if (domain.includes("instagram")) {
    return Instagram;
  }

  if (domain.includes("pinterest")) {
    return Pinterest;
  }

  if (domain.includes("whatsapp")) {
    return Whatsapp;
  }

  if (domain.includes("tiktok")) {
    return TikTok;
  }

  if (domain.includes("facebook")) {
    return Facebook;
  }
};
