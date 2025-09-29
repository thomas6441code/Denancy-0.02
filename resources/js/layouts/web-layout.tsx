import Footer from "@/components/web/shared/footer";
import Navbar from "@/components/web/shared/navbar";
import TopSection, { TopSectionProps } from "@/components/web/shared/topSection";
import { ReactNode } from "react";

interface WebLayoutProps {
  children: ReactNode;
  topSectionProps?: TopSectionProps;
}

export default function WebLayout({ children, topSectionProps }: Readonly<WebLayoutProps>) {
  return (
    <div className="bg-gray-50">
        <Navbar />
        {/* Top Section with configurable props */}
        <TopSection {...topSectionProps} />
        <main className="flex-grow md:w-[81%] w-[95%] mx-auto z-40">
            {children}
        </main>
        <Footer />
    </div>
  );
}
