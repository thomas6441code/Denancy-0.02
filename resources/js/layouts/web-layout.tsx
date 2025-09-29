import Footer from "@/components/web/shared/footer";
import Navbar from "@/components/web/shared/navbar";
import { ReactNode } from "react";

export default function WebLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <main className="flex-grow md:w-[81%] w-[95%] mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
