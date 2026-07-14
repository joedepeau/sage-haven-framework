import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/logo.png.asset.json";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoAsset.url} alt="Still Harbour logo" className="h-10 w-10 object-contain" />
          <span className="hidden font-display text-lg font-medium text-navy sm:inline">
            Still Harbour Coaching
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6">
          <Link
            to="/about"
            className="font-body text-sm font-medium text-navy transition-colors hover:text-ochre sm:text-base"
          >
            About
          </Link>
          <Button
            variant="default"
            size="default"
            className="h-11 bg-ochre px-6 font-body text-sm font-semibold text-navy shadow-none hover:bg-ochre/90 sm:h-12 sm:px-8"
          >
            Book Call
          </Button>
        </nav>
      </div>
    </header>
  );
}
