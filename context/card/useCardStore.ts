"use client";

import { createStore, useStore } from "zustand";
import { createContext, useContext } from "react";
import { CardType } from "@/server/card/CardTypes";

export interface CardStoreProps extends CardType {}

export interface StoreState extends CardStoreProps {}

export interface StoreActions {
  setState: (state: Partial<StoreState>) => void;
}

export type Store = ReturnType<typeof createCardStore>;

export const createCardStore = (initProps?: Partial<CardStoreProps>) => {
  const DEFAULT_PROPS: CardStoreProps = {
    social: [],
  };
  return createStore<StoreState & StoreActions>()((set, get) => ({
    ...DEFAULT_PROPS,
    ...initProps,

    setState: (state) => {
      const currentState = get();
      return set({
        ...state,
        cover: {
          ...currentState.cover,
          ...state.cover,
        },
        avatar: {
          ...currentState.avatar,
          ...state.avatar,
        },
        settings: {
          ...currentState.settings,
          ...state.settings,
        },
      });
    },
  }));
};

export const CardContext = createContext<Store | null>(null);

export const useCardStore = () => {
  const context = useContext(CardContext);

  if (!context)
    throw new Error("useCardStore must be used within a CardProvider");

  const state: StoreState = useStore(context, (s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    organization: s.organization,
    avatar: s.avatar,
    cover: s.cover,
    phone: s.phone,
    email: s.email,
    settings: s.settings,
    social: s.social,
  }));

  const actions: StoreActions = useStore(context, (s) => ({
    setState: s.setState,
  }));

  return { state, actions };
};
