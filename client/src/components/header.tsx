import { CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-neutral-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-800 dark:text-white">MotoQuote</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-neutral-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">About</a>
              <a href="#" className="text-neutral-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Contact</a>
              <a href="#" className="text-neutral-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Help</a>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
