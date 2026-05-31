import { motion } from 'motion/react';
import { Calendar, MessageSquare, ShieldCheck, Award } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenChat: () => void;
}

export default function Hero({ onOpenBooking, onOpenChat }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 md:py-24 px-4 md:px-8 border-b border-brand-gold/10">
      
      {/* Absolute decorative blurred lights to make the canvas look luxurious */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-brand-accent/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* TEXT COLUMN */}
        <motion.div
          id="hero-text-block"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-card border border-brand-gold/15 mb-6">
            <span className="w-2 h-2 bg-brand-accent rounded-full animate-ping" />
            <span className="text-[11px] uppercase tracking-wider text-brand-gold font-semibold font-sans">
              Идёт запись на июнь 2026
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-[54px] text-brand-text leading-[1.12] tracking-tight font-medium">
            Психолог для взрослых, которые хотят разобраться в себе и жить спокойнее
          </h2>
          
          <p className="mt-6 text-base sm:text-lg text-brand-text-muted max-w-xl font-sans font-light leading-relaxed">
            Помогаю мягко и бережно понять причины состояния, вернуть твердую внутреннюю опору и наметить понятные шаги для долгожданных изменений.
          </p>

          {/* Core Interactive Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button
              id="hero-booking-btn"
              onClick={onOpenBooking}
              className="bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-bold font-sans text-sm tracking-wide uppercase px-8 py-4.5 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(228,181,149,0.25)] hover:shadow-[0_4px_30px_rgba(228,181,149,0.4)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar size={18} />
              Записаться на консультацию
            </button>

            <button
              id="hero-chat-btn"
              onClick={onOpenChat}
              className="bg-brand-card hover:bg-brand-card-light text-brand-text border border-brand-gold/20 hover:border-brand-gold/45 font-medium text-sm px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              {/* WhatsApp custom green indicator icon inside button */}
              <div className="relative">
                <MessageSquare size={18} className="text-brand-gold" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-brand-card" />
              </div>
              <span>Написать в WhatsApp</span>
            </button>
          </div>

          {/* Social credentials and compliance info */}
          <div className="mt-12 grid grid-cols-2 gap-6 w-full max-w-md pt-8 border-t border-brand-gold/10">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="text-brand-gold shrink-0 mt-0.5" size={18} />
              <div className="text-left">
                <h5 className="text-xs font-semibold text-brand-text">100% Конфиденциально</h5>
                <p className="text-[10px] text-brand-text-muted mt-0.5">В соответствии с этическим кодексом</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Award className="text-brand-gold shrink-0 mt-0.5" size={18} />
              <div className="text-left">
                <h5 className="text-xs font-semibold text-brand-text">Квалификация</h5>
                <p className="text-[10px] text-brand-text-muted mt-0.5">Дипломы и сертифицированные часы терапии</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* IMAGE PORTRAIT COLUMN */}
        <motion.div
          id="hero-image-block"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center lg:justify-end shrink-0"
        >
          <div className="relative w-full max-w-sm">
            {/* Elegant luxury framing lines matching screenshot */}
            <div className="absolute inset-0 border border-brand-gold/20 -translate-x-4 translate-y-4 rounded-2xl pointer-events-none" />
            <div className="absolute inset-0 border border-brand-accent/25 -translate-x-2 translate-y-2 rounded-2xl pointer-events-none" />
            
            {/* Main Picture */}
            <div className="relative overflow-hidden rounded-2xl border border-brand-gold/30 bg-brand-card max-h-[460px] shadow-2xl shrink-0">
              <img
                src="https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=600&h=800"
                alt="Ирина Сница — Семейный и Личностный психолог"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none object-top hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-brand-bg-dark via-brand-bg-dark/10 to-transparent p-4 text-center">
                <span className="font-serif text-sm italic text-brand-accent">«Каждый человек заслуживает чувствовать безопасность и душевный покой»</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
