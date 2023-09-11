export type EditorTabs =
  | "basic"
  | "contact"
  | "modules"
  | "social"
  | "settings";

export type CarouselItem = {
  id: string;
  title?: string;
  description?: string;
  img: string;
};
