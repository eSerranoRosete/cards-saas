import { useState } from "react";

export const useIsOpen = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggler = {
    isOpen,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
    onOpenChange: () => setIsOpen(!isOpen),
  };

  return { ...toggler };
};
