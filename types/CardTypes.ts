import { XataFile } from "@xata.io/client";
import { CarouselItem } from "./EditorTypes";

export interface CardType {
  id?: string;
  title?: string;
  description?: string;
  organization?: string;

  avatar?: MediaFile;
  cover?: MediaFile;

  email?: string;
  phone?: string;

  settings?: CardSettings;

  social: SocialItem[];

  modules?: CardModules;

  carouselImages?: MediaFile[];

  owner: string;
}

export type CardSettings = {
  showContactButton?: boolean;
  showShareButton?: boolean;
  dominantColor?: string;
};

export type CardModules = {
  bio?: string;
  carousel?: CarouselItem[];
};

export type SocialItem = {
  id: string;
  url: string;
};

export interface MediaFile
  extends Partial<
    Pick<XataFile, "id" | "base64Content" | "mediaType" | "name" | "url">
  > {
  url?: string;
}
