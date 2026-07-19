import Link from 'next/link';
import { getSiteConfig } from '../../lib/content';

export default function Footer() {
  const config = getSiteConfig();
  return (
    <footer className="bg-brand-dark text-white py-16 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h4 className="font-poppins text-lg font-bold mb-4">{config.name} Stargate</h4>
          <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">{config.address}</p>
          <p className="text-sm text-gray-400 mt-4">{config.email}</p>
        </div>

        <div>
          <h4 className="font-poppins text-lg font-bold mb-4">Site Map</h4>
          <div className="flex flex-col space-y-2 text-sm text-gray-400">
            <Link href="/about" className="hover:text-white transition">About ASPIRE Stargate</Link>
            <Link href="/careers" className="hover:text-white transition">Get Involved</Link>
          </div>
        </div>

        <div>
          <h4 className="font-poppins text-lg font-bold mb-4">Social Links</h4>
          <div className="flex flex-col space-y-2 text-sm text-gray-400">
            <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a>
            <a href={config.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Facebook</a>
            <a href={config.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Twitter</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} {config.legalName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
