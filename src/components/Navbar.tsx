"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cities } from "@/data/cities";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen]   = useState(false);
  const [citiesOpen, setCitiesOpen]   = useState(false);
  const citiesRef                     = useRef<HTMLDivElement>(null);
  const pathname                      = usePathname();

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false); setCitiesOpen(false); }, [pathname]);

  // Close cities dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (citiesRef.current && !citiesRef.current.contains(e.target as Node)) {
        setCitiesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    { to: "/",          label: "Home" },
    { to: "/properties",label: "Properties" },
  ];

  return (
    <>
      {/* ── Bar ─────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/40 shadow-sm"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Islamabad Elite Properties – Home">
            <img src="/logo.jpg" alt="Islamabad Elite Properties" className="h-8 sm:h-10 md:h-12 w-auto object-contain rounded-sm" width="48" height="48" loading="eager" />
            <span className="sm:hidden text-sm font-display font-bold text-gradient-gold tracking-wide">IEP</span>
            <span className="hidden sm:block text-base md:text-lg font-display font-bold text-gradient-gold leading-tight">
              Islamabad Elite<br />
              <span className="text-xs md:text-sm font-medium text-muted-foreground tracking-widest uppercase">Properties</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive(l.to) ? "text-primary" : "text-muted-foreground"}`}
              >
                {l.label}
              </Link>
            ))}

            {/* Cities dropdown */}
            <div ref={citiesRef} className="relative">
              <button
                onClick={() => setCitiesOpen((o) => !o)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                  cities.some((c) => isActive(`/${c.slug}`)) ? "text-primary" : "text-muted-foreground"
                }`}
                aria-haspopup="true"
                aria-expanded={citiesOpen}
              >
                Cities
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${citiesOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {citiesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-background border border-border rounded-xl shadow-xl overflow-hidden z-10"
                  >
                    <Link
                      to="/twin-cities"
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors border-b border-border"
                    >
                      Twin Cities Overview
                    </Link>
                    {cities.map((city) => (
                      <Link
                        key={city.slug}
                        to={`/${city.slug}`}
                        className={`flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors hover:bg-muted ${
                          isActive(`/${city.slug}`) ? "text-primary bg-primary/5" : "text-foreground"
                        }`}
                      >
                        <span>{city.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+923001234567" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium transition-colors hover:bg-muted" aria-label="Call us">
              <Phone className="w-3.5 h-3.5" /> Call
            </a>
            <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-gold text-primary-foreground text-sm font-semibold transition-transform hover:scale-105" aria-label="WhatsApp our agent">
              <Phone className="w-4 h-4" /> WhatsApp
            </a>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setDrawerOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Open menu" aria-expanded={drawerOpen} aria-controls="mobile-drawer">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ────────────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden" aria-hidden="true" onClick={() => setDrawerOpen(false)} />

            <motion.div
              key="drawer"
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full z-[70] w-[75%] max-w-sm bg-background shadow-2xl md:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                <Link to="/" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2.5" aria-label="Home">
                  <img src="/logo.jpg" alt="IEP" className="h-8 w-auto object-contain rounded-sm" width="32" height="32" />
                  <span className="text-sm font-display font-bold text-gradient-gold">Islamabad Elite</span>
                </Link>
                <button onClick={() => setDrawerOpen(false)} className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Close menu">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <ul className="flex flex-col space-y-1">
                  {navLinks.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} onClick={() => setDrawerOpen(false)} className={`flex items-center w-full min-h-[48px] px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive(l.to) ? "text-primary bg-primary/8 font-semibold" : "text-foreground hover:text-primary hover:bg-muted"}`}>
                        {l.label}
                      </Link>
                    </li>
                  ))}

                  {/* Cities section */}
                  <li>
                    <p className="px-4 pt-4 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">Cities</p>
                    <Link to="/twin-cities" onClick={() => setDrawerOpen(false)} className="flex items-center w-full min-h-[48px] px-4 py-3 rounded-xl text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
                      Twin Cities Overview
                    </Link>
                    {cities.map((city) => (
                      <Link
                        key={city.slug}
                        to={`/${city.slug}`}
                        onClick={() => setDrawerOpen(false)}
                        className={`flex items-center justify-between w-full min-h-[48px] px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive(`/${city.slug}`) ? "text-primary bg-primary/8 font-semibold" : "text-foreground hover:text-primary hover:bg-muted"}`}
                      >
                        <span>{city.name}</span>
                        <span className="text-xs text-muted-foreground">{city.sectors.length} sectors</span>
                      </Link>
                    ))}
                  </li>
                </ul>
              </nav>

              {/* Footer CTAs */}
              <div className="px-4 py-6 border-t border-border space-y-3">
                <a href="tel:+923001234567" onClick={() => setDrawerOpen(false)} className="flex items-center justify-center gap-2 w-full min-h-[48px] py-3 rounded-xl border border-border text-foreground text-sm font-medium transition-colors hover:bg-muted">
                  <Phone className="w-4 h-4" /> Call Us
                </a>
                <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" onClick={() => setDrawerOpen(false)} className="flex items-center justify-center gap-2 w-full min-h-[48px] py-3 rounded-xl bg-gradient-gold text-primary-foreground text-sm font-semibold">
                  <Phone className="w-4 h-4" /> WhatsApp Agent
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
