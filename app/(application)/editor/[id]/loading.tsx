import { Box } from "@radix-ui/themes";

export default function Loading() {
  return (
    <div className="mt-20 animate-pulse">
      <div className="w-full flex gap-5 h-[calc(100vh-25vh)]">
        <Box className="bg-stone-800 w-28 h-full rounded-large opacity-50" />

        <Box className="bg-stone-800 w-full h-full max-w-lg rounded-large opacity-50" />

        <Box className="bg-stone-800 w-full h-full rounded-large opacity-50" />
      </div>
    </div>
  );
}
