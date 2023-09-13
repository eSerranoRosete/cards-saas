import { Skeleton } from "@nextui-org/skeleton";
import { CardContainer } from "./CardContainer";

export default function Loading() {
  return (
    <CardContainer className="mt-20">
      <Skeleton className="w-full h-72 rounded-large opacity-50" />
      <Skeleton className="w-full h-72 rounded-large opacity-50" />
      <Skeleton className="w-full h-72 rounded-large opacity-50" />
      <Skeleton className="w-full h-72 rounded-large opacity-50" />
    </CardContainer>
  );
}
