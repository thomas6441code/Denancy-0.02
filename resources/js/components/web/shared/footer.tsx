// resources/js/Components/Footer.tsx
import { Link } from "@inertiajs/react";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white mt-10">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="font-semibold text-yellow-400 mb-3">
            Denancy Legends Group
          </h2>
          <p className="text-sm leading-relaxed text-gray-200">
            Innovative, reliable & customer-focused solutions in mining support,
            financial consultancy, management strategies, and logistics.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact Us</h3>
          <p className="text-sm text-gray-200">Phone: +255 658 209 911</p>
          <p className="text-sm text-gray-200">Email: info@denancy.co.tz</p>
          <p className="text-sm text-gray-200">Website: www.denancy.co.tz</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link href="/about" className="hover:text-yellow-400">About Us</Link></li>
            <li><Link href="/services" className="hover:text-yellow-400">Services</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-400">Contact</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-blue-950 py-4 text-center text-xs text-gray-300">
        © {new Date().getFullYear()} Denancy Legends Group. All Rights Reserved.
      </div>
    </footer>
  );
}
