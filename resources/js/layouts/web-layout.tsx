import Footer from "@/components/web/shared/footer";
import Navbar from "@/components/web/shared/navbar";
import { ReactNode } from "react";

export default function WebLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
