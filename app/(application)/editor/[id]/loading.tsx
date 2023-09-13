import { Skeleton } from "@nextui-org/skeleton";

export default function Loading() {
  return (
    <div className="mt-20">
      <div className="w-full flex gap-5 h-[calc(100vh-25vh)]">
        <Skeleton className="w-28 h-full rounded-large opacity-50" />

        <Skeleton className="w-full h-full max-w-lg rounded-large opacity-50" />

        <Skeleton className="w-full h-full rounded-large opacity-50" />
      </div>
    </div>
  );
}
