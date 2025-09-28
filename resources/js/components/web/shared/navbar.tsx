// resources/js/Components/Navbar.tsx
import { Link } from "@inertiajs/react";
import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full shadow">
      {/* Top bar */}
      <div className="bg-gray-100 text-sm text-gray-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-blue-900">Locate Denancy</Link>
            <Link href="#" className="hover:text-blue-900">Careers</Link>
            <Link href="#" className="hover:text-blue-900">Contact Us</Link>
            <Link href="#" className="hover:text-blue-900">Tenders</Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-blue-900 font-semibold">0800 002 002</span>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="border rounded-full pl-8 pr-3 py-1 text-sm"
              />
              <Search className="absolute left-2 top-1.5 h-4 w-4 text-gray-500" />
            </div>
            <button className="bg-orange-500 text-white px-4 py-1 rounded font-medium hover:bg-orange-600">
              Internet Banking
            </button>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <h1 className="text-xl font-bold text-yellow-400">Denancy Legends</h1>

          {/* Menu */}
          <div className="space-x-8 font-medium">
            <Link href="/" className="hover:text-yellow-400">Home</Link>
            <Link href="/about" className="hover:text-yellow-400">About Us</Link>
            <Link href="/services" className="hover:text-yellow-400">Services</Link>
            <Link href="/contact" className="hover:text-yellow-400">Contact</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
