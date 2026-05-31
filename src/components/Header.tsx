import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Calendar, Phone } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
}

export default function Header({ onOpenBooking }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Обо мне', href: '#about-me' },
    { label: 'С чем я помогаю', href: '#helps-with' },
    { label: 'Как проходит', href: '#consultation-timeline' },
    { label: 'Услуги и Стоимость', href: '#pricing' },
    { label: 'Отзывы', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Контакты', href: '#contacts' }
  ];

  return (
    <header id="app-header" className="sticky top-0 z-40 bg-brand-bg/95 backdrop-blur-md border-b border-brand-gold/10 px-4 py-4 md:px-8">
      <div id="header-container" className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <a id="header-logo" href="#" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          {/* Custom geometric sacred wireframe spiral mimicking the screenshot */}
          <div className="w-10 h-10 border border-brand-gold/40 flex items-center justify-center rounded-full relative overflow-hidden group">
            <svg viewBox="0 0 100 100" className="w-8 h-8 stroke-brand-gold fill-none animate-[spin_40s_linear_infinite]">
              <circle cx="50" cy="50" r="40" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 50,50 A 20,20 0 0,0 30,30" strokeWidth="1.5" />
              <path d="M 50,50 A 20,20 0 0,1 70,70" strokeWidth="1.5" />
              <path d="M 50,50 A 30,30 0 0,0 20,50" strokeWidth="1" />
              <path d="M 50,50 A 30,30 0 0,1 80,50" strokeWidth="1" />
              <circle cx="50" cy="50" r="3" className="fill-brand-gold" />
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <h1 className="font-serif text-lg tracking-wider text-brand-text leading-tight uppercase font-medium">
              Ирина Сница
            </h1>
            <span className="text-[10px] tracking-wide text-brand-gold font-sans uppercase font-semibold">
              Семейный и Личностный психолог
            </span>
          </div>
        </a>

        {/* DESKTOP NAV */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-6">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-sm text-brand-text-muted hover:text-brand-accent transition-colors font-medium tracking-wide"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA BUTTON */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            id="header-phone-link"
            href="tel:+79119876543"
            className="text-brand-text-muted hover:text-brand-accent transition-colors flex items-center gap-1.5 text-xs font-mono font-medium"
          >
            <Phone size={14} className="text-brand-gold" /> +7 (911) 987-65-43
          </a>
          <button
            id="header-booking-cta"
            onClick={onOpenBooking}
            className="bg-brand-accent/15 hover:bg-brand-accent hover:text-brand-bg text-brand-accent hover:shadow-[0_0_12px_rgba(228,181,149,0.3)] transition-all duration-300 font-semibold text-xs px-4 py-2 rounded-xl border border-brand-accent/40 flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar size={14} />
            Записаться
          </button>
        </div>

        {/* MOBILE TRIGGER */}
        <button
          id="mobile-menu-trigger"
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-1.5 rounded-lg text-brand-text-muted hover:text-brand-accent transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div id="mobile-drawer-overlay" className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-brand-bg-dark"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-4/5 max-w-sm bg-brand-card border-l border-brand-gold/15 p-6 flex flex-col justify-between shadow-2xl"
            >
              <div id="mobile-drawer-top">
                <div className="flex items-center justify-between pb-6 border-b border-brand-gold/10">
                  <div className="flex flex-col text-left">
                    <span className="font-serif text-md text-brand-text font-bold uppercase tracking-wider">Ирина Сница</span>
                    <span className="text-[9px] text-brand-gold uppercase tracking-wider font-semibold font-sans">Психолог</span>
                  </div>
                  <button
                    id="mobile-drawer-close"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-brand-text-muted hover:text-brand-accent transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div id="mobile-drawer-links" className="flex flex-col gap-5 mt-8">
                  {menuItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg text-brand-text-muted hover:text-brand-accent font-serif tracking-wide border-b border-brand-gold/5 pb-2 transition-colors block text-left"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <div id="mobile-drawer-bottom" className="space-y-4">
                <a
                  href="tel:+79119876543"
                  className="flex items-center gap-2 text-md font-mono font-medium text-brand-text hover:text-brand-accent transition-colors block text-left"
                >
                  <Phone size={18} className="text-brand-gold" /> +7 (911) 987-65-43
                </a>
                <button
                  id="mobile-drawer-booking"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-semibold text-sm py-3 rounded-xl transition-all shadow-[0_4px_12px_rgba(228,181,149,0.2)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar size={16} />
                  Записаться онлайн
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
