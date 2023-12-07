import { Skeleton } from "@/components/Skeleton";
import { CardContainer } from "./CardContainer";

export default function Loading() {
  return (
    <CardContainer className="mt-20">
      <Skeleton className="w-fullh-72" />
      <Skeleton className="w-fullh-72" />
      <Skeleton className="w-fullh-72" />
      <Skeleton className="w-fullh-72" />
    </CardContainer>
  );
}
