import Link from "next/link";
import { Phone, Mail, Facebook, Instagram } from "lucide-react";

const Footer = () => (
  <footer className="bg-charcoal text-primary-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <h3 className="text-2xl font-display font-bold text-gradient-gold mb-4">Islamabad Elite</h3>
          <p className="text-primary-foreground/60 text-sm leading-relaxed">
            Islamabad's premier luxury real estate agency specializing in premium properties across sectors F-6, F-7, and F-8. Your trusted partner for finding the perfect home in the capital.
          </p>
          {/* Social links */}
          <div className="flex items-center gap-3 mt-4">
            <a href="https://facebook.com/islamabadeliteproperties" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://instagram.com/islamabadeliteproperties" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/60">
            <li><Link href="/islamabad/f-6" className="hover:text-primary transition-colors">Properties in F-6 Islamabad</Link></li>
            <li><Link href="/islamabad/f-7" className="hover:text-primary transition-colors">Properties in F-7 Islamabad</Link></li>
            <li><Link href="/islamabad/f-8" className="hover:text-primary transition-colors">Properties in F-8 Islamabad</Link></li>
            <li><Link href="/properties" className="hover:text-primary transition-colors">All Properties</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Popular Searches</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/60">
            <li><Link href="/islamabad/f-7/2" className="hover:text-primary transition-colors">Properties for Sale in F-7/2</Link></li>
            <li><Link href="/islamabad/f-6/1" className="hover:text-primary transition-colors">Properties in F-6/1</Link></li>
            <li><Link href="/islamabad/f-8/3" className="hover:text-primary transition-colors">F-8/3 Real Estate</Link></li>
            <li><Link href="/islamabad/f-7/4" className="hover:text-primary transition-colors">F-7/4 Luxury Properties</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/60">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <a href="tel:+923001234567" className="hover:text-primary">+92 300 1234567</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <a href="mailto:info@islamabadeliteproperties.com" className="hover:text-primary">info@islamabadeliteproperties.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-primary-foreground/10">
        <div className="text-center">
          <p className="text-sm text-primary-foreground/40 max-w-3xl mx-auto leading-relaxed">
            Islamabad Elite Properties is a leading real estate company offering premium properties, villas, and apartments for sale in Islamabad's most sought-after sectors including F-6, F-7, and F-8. Whether you're looking for a 1 Kanal property in F-7/2, a luxury villa in F-6, or a modern apartment in F-8, we have the perfect property for you.
          </p>
          <p className="text-xs text-primary-foreground/30 mt-4">© {new Date().getFullYear()} Islamabad Elite Properties. All rights reserved.</p>
          
          {/* Built by nonchtech */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="text-xs text-primary-foreground/40">Built by</span>
            <a href="https://www.nonchtech.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
              <img src="/nonchtech-logo.png" alt="nonchtech - Web Development Company" className="h-14 w-auto invert" width="160" height="56" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
