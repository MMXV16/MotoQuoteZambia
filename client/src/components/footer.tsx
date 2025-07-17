import { CheckCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 dark:bg-gray-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">MotoQuote</h3>
            </div>
            <p className="text-neutral-400 dark:text-gray-400">Making motor insurance accessible and transparent for all Zambians.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-neutral-400 dark:text-gray-400">
              <li><a href="#" className="hover:text-white dark:hover:text-gray-200 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-200 transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-200 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-200 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-neutral-400 dark:text-gray-400">
              <li><a href="#" className="hover:text-white dark:hover:text-gray-200 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-200 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-200 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-200 transition-colors">Complaints</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-neutral-400 dark:text-gray-400">
              <li>+260 211 123 456</li>
              <li>info@motoquote.zm</li>
              <li>Lusaka, Zambia</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-700 dark:border-gray-800 mt-8 pt-8 text-center text-neutral-400 dark:text-gray-400">
          <p>&copy; 2024 MotoQuote Zambia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
