import { Box } from "@radix-ui/themes";
import { CardContainer } from "./CardContainer";

export default function Loading() {
  return (
    <CardContainer className="mt-20">
      <Box className="w-full bg-stone-800 h-72 rounded-large opacity-50" />
      <Box className="w-full bg-stone-800 h-72 rounded-large opacity-50" />
      <Box className="w-full bg-stone-800 h-72 rounded-large opacity-50" />
      <Box className="w-full bg-stone-800 h-72 rounded-large opacity-50" />
    </CardContainer>
  );
}
