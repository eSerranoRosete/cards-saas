import { AppBar } from "@/components/application/AppBar";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <div>
      <AppBar />
      <main className="container m-auto">{children}</main>
    </div>
  );
}
