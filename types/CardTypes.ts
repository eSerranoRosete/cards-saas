export type CardType = {
  id: string;
  owner: string | null;
  title?: string;
  description?: string;
  organization?: string;
  bio?: string;
  avatar?: FileRecord;
  cover?: FileRecord;
  email?: string;
  phone?: string;
  settings: CardSettings;
  social?: CardSocial;
  modules: CardModules;
};

export interface EditableCard extends Omit<CardType, "id" | "owner"> {}

export type CardSocial = SocialItem[];

export type CardSettings = {
  showContactButton?: boolean;
  showShareButton?: boolean;
  dominantColor?: string;
};

export type CardModules = {
  carousel?: CarouselItem[];
};

export type SocialItem = {
  id: string;
  url: string;
};

export type FileRecord = {
  id: string;
  url: string;
  path?: string;
};

export type CarouselItem = {
  id: string;
  title?: string;
  description?: string;
  img: FileRecord;
};
