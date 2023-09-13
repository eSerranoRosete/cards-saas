import { useState } from "react";

export const useIsLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loader = {
    isLoading,
    start: () => setIsLoading(true),
    stop: () => setIsLoading(false),
  };

  return loader;
};
