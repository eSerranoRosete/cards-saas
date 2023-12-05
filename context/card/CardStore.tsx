"use client";

import { CardSettings, EditableCard } from "@/types/CardTypes";
import { create, useStore } from "zustand";
import { produce } from "immer";
import { createContext, useContext } from "react";

type State = EditableCard;

type Actions = {
  setTitle: (title: EditableCard["title"]) => void;
  setDescription: (description: EditableCard["description"]) => void;
  setOrganization: (organization: EditableCard["organization"]) => void;
  setEmail: (email: EditableCard["email"]) => void;
  setPhone: (phone: EditableCard["phone"]) => void;
  setBio: (bio: EditableCard["bio"]) => void;

  //settings
  setShowContact: (
    showContact: EditableCard["settings"]["showContactButton"]
  ) => void;
  setShowShare: (
    showShare: EditableCard["settings"]["showShareButton"]
  ) => void;
  setDominantColor: (color: string) => void;
  setAppearance: (appearance: CardSettings["appearance"]) => void;

  //modules
  setCarousel: (carousel: EditableCard["modules"]["carousel"]) => void;

  //social
  setSocial: (social: EditableCard["social"]) => void;

  setAvatar: (avatar: EditableCard["avatar"]) => void;
  setCover: (cover: EditableCard["cover"]) => void;

  //get
  getState: () => State;
};

const defaultState: State = {
  settings: {},
  modules: {},
};

const createCardStore = (init?: State) => {
  return create<State & Actions>((set, get) => ({
    ...defaultState,
    ...init,

    setTitle: (title) => set({ title }),
    setDescription: (description) => set({ description }),
    setOrganization: (organization) => set({ organization }),
    setEmail: (email) => set({ email }),
    setPhone: (phone) => set({ phone }),
    setBio: (bio) => set({ bio }),
    setShowContact: (showContact) =>
      set(
        produce((state: State) => {
          state.settings.showContactButton = showContact;
        })
      ),
    setShowShare: (showShare) =>
      set(
        produce((state: State) => {
          state.settings.showShareButton = showShare;
        })
      ),
    setDominantColor: (color) =>
      set(
        produce((state: State) => {
          state.settings.dominantColor = color;
        })
      ),
    setAppearance: (appearance) =>
      set(
        produce((state: State) => {
          state.settings.appearance = appearance;
        })
      ),

    setCarousel: (carousel) =>
      set(
        produce((state: State) => {
          state.modules.carousel = carousel;
        })
      ),

    setAvatar: (avatar) => set({ avatar }),
    setCover: (cover) => set({ cover }),

    setSocial: (social) =>
      set(
        produce((state: State) => {
          state.social = social;
        })
      ),

    getState: () => {
      const s = get();
      return {
        title: s.title,
        description: s.description,
        organization: s.organization,
        email: s.email,
        phone: s.phone,
        bio: s.bio,
        settings: s.settings,
        avatar: s.avatar,
        cover: s.cover,
        modules: s.modules,
        social: s.social,
      };
    },
  }));
};

type Store = ReturnType<typeof createCardStore>;

const CardContext = createContext<Store | null>(null);

/**
 * Function to use in the components to get and mutate the store
 * @returns store
 */
export const useCardStore = () => {
  const context = useContext(CardContext);

  if (!context)
    throw new Error("useCardStore must be used within a CardProvider");

  const store = useStore(context, (s) => ({ ...s }));

  return store;
};

type CardProviderProps = {
  children: React.ReactNode;
  initialState?: State;
};

export const CardProvider = ({ children, initialState }: CardProviderProps) => {
  const store = createCardStore(initialState);

  return <CardContext.Provider value={store}>{children}</CardContext.Provider>;
};
