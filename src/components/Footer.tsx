import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.svg";

export function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-cream px-6 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <img src={logoAsset} alt="Still Harbour logo" className="h-9 w-9 object-contain" />
            <span className="font-display text-base font-medium text-navy">
              Still Harbour Coaching
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link
              to="/privacy"
              className="font-body text-sm text-slate underline underline-offset-2 transition-colors hover:text-navy"
            >
              Privacy Policy
            </Link>
            <p className="font-body text-sm text-slate">
              &copy; {new Date().getFullYear()} Still Harbour. All rights reserved.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-navy/10 pt-6">
          <p className="font-body text-xs leading-relaxed text-slate/80">
            <span className="font-semibold text-slate">Disclaimer:</span> Still Harbour Coaching provides educational and peer-support coaching services only. The information on this website is for educational and harm-reduction purposes and is not a substitute for professional medical advice, diagnosis, or treatment. I do not provide, sell, or encourage the use of illegal substances.
          </p>
        </div>
      </div>
    </footer>
  );
}
