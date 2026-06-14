import Link from "next/link";
import { navigationLinks } from "@/constants/navigation";
import ThemeToggle from "../ui/ThemeToggle";
export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
        <Link
          href="/"
          className="text-xl font-bold"
        >
          Abhishek
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navigationLinks.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-sm font-medium hover:text-blue-600"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

      </nav>
    </header>
  );
}