import { getUserCards } from "@/firebase/card/getUserCards";
import { Inner } from "./inner";

export default async function DashboardPage() {
  const { data } = await getUserCards();
  const cards = data || [];

  return <Inner cards={cards} />;
}
