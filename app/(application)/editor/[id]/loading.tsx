import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="mt-20 animate-pulse">
      <div className="w-full flex gap-5 h-[calc(100vh-25vh)]">
        <Skeleton className="w-28 h-full" />

        <Skeleton className="w-full h-full max-w-lg" />

        <Skeleton className="w-full h-full" />
      </div>
    </div>
  );
}
