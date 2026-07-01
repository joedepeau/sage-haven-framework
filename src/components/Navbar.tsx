import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        {/* Logo Placeholder */}
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-navy">
            <span className="font-display text-sm font-semibold text-cream">IC</span>
          </div>
          <span className="hidden font-display text-lg font-medium text-navy sm:inline">
            Integration Coaching
          </span>
        </Link>

        {/* Book Call Button */}
        <Button
          variant="default"
          size="default"
          className="h-11 bg-ochre px-6 font-body text-sm font-semibold text-navy shadow-none hover:bg-ochre/90 sm:h-12 sm:px-8"
        >
          Book Call
        </Button>
      </div>
    </header>
  );
}
