import { useState } from "react";

type Props = {
  max: number;
  loop?: boolean;
  initial?: number;
};

export function useCounter({ max, loop, initial = 0 }: Props) {
  const [count, setCount] = useState(initial);

  const increment = () => {
    if (count < max - 1) {
      setCount(count + 1);
    } else if (loop) {
      setCount(0);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    } else if (loop) {
      setCount(max - 1);
    }
  };

  return { count, increment, decrement };
}
