import { APP_NAME } from '../../utils/constants';

/**
 * Footer — Simple footer with copyright and links.
 * Displayed on public-facing pages.
 */
const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="gradient-primary flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold text-white">
              S
            </div>
            <span className="text-sm font-semibold text-text-primary">{APP_NAME}</span>
          </div>

          {/* Links */}
          <div className="flex gap-6">
            <a href="#" className="text-sm text-text-secondary transition-colors hover:text-text-primary">
              Privacy
            </a>
            <a href="#" className="text-sm text-text-secondary transition-colors hover:text-text-primary">
              Terms
            </a>
            <a href="#" className="text-sm text-text-secondary transition-colors hover:text-text-primary">
              Support
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
