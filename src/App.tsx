import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HelpsWith from './components/HelpsWith';
import WhenToApply from './components/WhenToApply';
import AboutMe from './components/AboutMe';
import ConsultationTimeline from './components/ConsultationTimeline';
import Pricing from './components/Pricing';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import ChatSimulator from './components/ChatSimulator';
import { MessageSquare, Sparkles, X, CheckSquare, Calendar, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Appointment } from './types';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [initialBookingType, setInitialBookingType] = useState<'online' | 'offline' | 'package'>('online');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [recentAppointment, setRecentAppointment] = useState<Appointment | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  // Monitor scroll for ScrollToTop button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenBooking = (type: 'online' | 'offline' | 'package' = 'online') => {
    setInitialBookingType(type);
    setBookingOpen(true);
  };

  const handleBookingSuccess = (appt: Appointment) => {
    setRecentAppointment(appt);
    setShowNotification(true);
    // Dismiss notification automatically after 5s
    setTimeout(() => {
      setShowNotification(false);
    }, 6000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="app-root-container" className="relative min-h-screen flex flex-col bg-brand-bg text-brand-text overflow-x-hidden select-none selection:bg-brand-accent selection:text-brand-bg">
      
      {/* Decorative starry background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#cda275_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.015] pointer-events-none" />

      {/* HEADER NAVBAR */}
      <Header onOpenBooking={() => handleOpenBooking('online')} />

      {/* CORE PAGES LAYOUT CONTENT */}
      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <Hero
          onOpenBooking={() => handleOpenBooking('online')}
          onOpenChat={() => setChatOpen(true)}
        />

        {/* DETAILS SECTION: WHAT THE PSYCHOLOGIST HELPS WITH */}
        <HelpsWith />

        {/* ACCORDION/CHECKLIST SECTION: SYMPTOMS INDICATORS */}
        <WhenToApply />

        {/* ABOUT ME SECTION */}
        <AboutMe />

        {/* TIMELINE SECTION: STEPS INTEGRATIONS */}
        <ConsultationTimeline />

        {/* PRICING & CALL-TO-ACTIONS */}
        <Pricing
          onOpenBooking={handleOpenBooking}
          onOpenChat={() => setChatOpen(true)}
        />

        {/* CLIENT TESTIMONIALS */}
        <Reviews />

        {/* FAQS EXPLANATORY SECTION */}
        <FAQ />

      </main>

      {/* FOOTER & SOCIAL CONNECTORS */}
      <Footer onOpenChat={() => setChatOpen(true)} />

      {/* SYSTEM-WIDE INTERACTIVE DIALOG MODALS */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialType={initialBookingType}
        onBookingSuccess={handleBookingSuccess}
      />

      <ChatSimulator
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        onOpenBooking={() => handleOpenBooking('online')}
      />

      {/* FLOATING ACTION INTERACTION TRIGGERS */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 pointer-events-none">
        
        {/* Scroll To Top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              id="scroll-to-top-btn"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              onClick={scrollToTop}
              className="p-3.5 rounded-full border border-brand-gold/20 bg-brand-card hover:bg-brand-card-light text-brand-gold hover:text-brand-accent shadow-xl transition-all cursor-pointer pointer-events-auto"
            >
              <ChevronUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Primary floating chat trigger bubble */}
        <motion.button
          id="floating-chat-trigger"
          onClick={() => setChatOpen(!chatOpen)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="p-4 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-brand-bg shadow-2xl flex items-center justify-center relative cursor-pointer group pointer-events-auto shadow-[0_4px_25px_rgba(228,181,149,0.35)]"
        >
          {/* Pulsating glow */}
          <span className="absolute inset-x-0 inset-y-0 rounded-full bg-brand-accent/20 animate-ping pointer-events-none" />

          {/* Interactive prompt tool-tip on left side */}
          <span className="absolute right-16 bg-brand-card border border-brand-gold/15 text-brand-text text-xs font-serif font-semibold py-2 px-4 rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none hidden md:inline">
            ✨ Задайте вопрос Ирине в чате!
          </span>

          <AnimatePresence mode="wait">
            {chatOpen ? (
              <motion.div key="close" initial={{ rotate: -45 }} animate={{ rotate: 0 }} exit={{ rotate: 45 }}>
                <X size={24} strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div key="chat" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="relative">
                <MessageSquare size={24} strokeWidth={2.5} />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-brand-accent" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

      </div>

      {/* Floating temporary banner toast for booking success notifications */}
      <AnimatePresence>
        {showNotification && recentAppointment && (
          <motion.div
            id="success-toast-notif"
            initial={{ opacity: 0, y: 50, x: -50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-50 p-4 rounded-2xl border border-brand-accent bg-brand-card shadow-2xl flex items-start gap-3.5 max-w-sm text-left"
          >
            <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
              <CheckSquare size={16} />
            </div>
            
            <div className="flex-1 space-y-1">
              <h5 className="text-xs font-bold font-sans text-brand-text uppercase tracking-wider">Заявка зарегистрирована</h5>
              <p className="text-xs text-brand-text-muted leading-relaxed font-light">
                <strong className="text-brand-text font-medium">{recentAppointment.clientName}</strong>, вы записаны на консультацию ({recentAppointment.date}). Подтверждение отправлено!
              </p>
            </div>

            <button
              onClick={() => setShowNotification(false)}
              className="text-brand-text-muted hover:text-brand-accent p-0.5"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
