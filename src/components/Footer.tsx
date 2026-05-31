import { Phone, Mail, Send, MessageCircle, HelpCircle, Flame } from 'lucide-react';

interface FooterProps {
  onOpenChat: () => void;
}

export default function Footer({ onOpenChat }: FooterProps) {
  return (
    <footer id="contacts" className="bg-brand-bg-dark border-t border-brand-gold/15 pt-20 pb-10 px-4 md:px-8 relative overflow-hidden">
      
      {/* Decorative vector path wave illustration mockup representing therapeutic calm wires */}
      <div className="absolute top-0 inset-x-0 h-24 opacity-[0.04] pointer-events-none select-none">
        <svg viewBox="0 0 1440 100" className="w-full h-full stroke-brand-gold fill-none stroke-[2]">
          <path d="M0,50 Q180,0 360,50 T720,50 T1080,50 T1440,50" />
          <path d="M0,70 Q180,20 360,70 T720,70 T1080,70 T1440,70" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Call to action card */}
        <div id="contacts-cta-banner" className="text-center space-y-6">
          <span className="font-serif text-sm uppercase tracking-widest text-brand-gold">Сделайте первый шаг</span>
          <h3 className="font-serif text-3xl md:text-5xl text-brand-text max-w-xl mx-auto leading-tight font-medium">
            Сделайте первый шаг к более спокойному состоянию
          </h3>
          <p className="text-sm md:text-base text-brand-text-muted max-w-lg mx-auto leading-relaxed font-light">
            Вы можете написать мне в удобный мессенджер-симулятор, коротко описать ситуацию или записаться на первую консультацию. Психотерапия начинается с доверия.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto">
            <button
              onClick={onOpenChat}
              className="w-full bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-sans font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-xl transition-all shadow-[0_4px_15px_rgba(228,181,149,0.2)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle size={16} className="fill-brand-bg stroke-none" /> Написать в WhatsApp (чат)
            </button>
            
            <button
              onClick={onOpenChat}
              className="w-full bg-brand-card hover:bg-brand-card-light text-brand-text border border-brand-gold/20 hover:border-brand-gold/40 font-sans font-semibold text-xs py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send size={15} className="text-brand-accent" /> Написать в Telegram (чат)
            </button>
          </div>
        </div>

        {/* Contacts details row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-16 border-t border-brand-gold/10 items-start text-left">
          
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="font-serif text-2xl text-brand-text mb-2">Контакты</span>
              <p className="text-xs text-brand-text-muted leading-relaxed font-light max-w-xs">
                Принимаю очно в уютном психологическом кабинете в центре Санкт-Петербурга, а также консультирую онлайн по всему миру.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="tel:+79119876543"
                className="flex items-center gap-3 text-sm md:text-base font-mono font-medium text-brand-text hover:text-brand-accent transition-colors block text-left"
              >
                <div className="w-8 h-8 rounded-full bg-brand-card border border-brand-gold/10 flex items-center justify-center text-brand-gold">
                  <Phone size={14} />
                </div>
                <span>+7 (911) 987-65-43</span>
              </a>

              <a
                href="mailto:irina.snitsa@email.ru"
                className="flex items-center gap-3 text-sm md:text-base font-sans text-brand-text-muted hover:text-brand-text transition-colors block text-left"
              >
                <div className="w-8 h-8 rounded-full bg-brand-card border border-brand-gold/10 flex items-center justify-center text-brand-gold">
                  <Mail size={14} />
                </div>
                <span className="font-mono">irina.snitsa@email.ru</span>
              </a>
            </div>
          </div>

          {/* Social connections and certificates */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-brand-gold mb-2 font-bold">Я в социальных сетях</span>
              <p className="text-xs text-brand-text-muted leading-relaxed font-light">
                Делюсь полезными психологическими техниками самопомощи, разборами синдромов и инсайтами. Подписывайтесь!
              </p>
            </div>

            {/* Custom Vector Icons matching VK, Youtube, Telegram, WhatsApp */}
            <div className="flex gap-4">
              {/* VK icon card */}
              <a
                href="https://vk.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-brand-card border border-brand-gold/10 hover:border-brand-accent flex items-center justify-center hover:scale-105 transition-all text-brand-text-muted hover:text-brand-accent"
              >
                <span className="text-xs font-black tracking-tighter">ВК</span>
              </a>

              {/* Instagram proxy */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-brand-card border border-brand-gold/10 hover:border-brand-accent flex items-center justify-center hover:scale-105 transition-all text-brand-text-muted hover:text-brand-accent"
              >
                <span className="text-xs font-black tracking-tighter">IG</span>
              </a>

              {/* Telegram proxy */}
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-brand-card border border-brand-gold/10 hover:border-brand-accent flex items-center justify-center hover:scale-105 transition-all text-brand-text-muted hover:text-brand-accent animate-pulse"
              >
                <Send size={15} />
              </a>

              {/* YouTube proxy */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-brand-card border border-brand-gold/10 hover:border-brand-accent flex items-center justify-center hover:scale-105 transition-all text-brand-text-muted hover:text-brand-accent"
              >
                <span className="text-xs font-black tracking-tighter">YT</span>
              </a>
            </div>
            
            <div className="text-[10px] text-brand-text-muted/60 leading-relaxed font-light border-t border-brand-gold/5 pt-4">
              *Деятельность организации Meta Platforms Inc. (включая Instagram) запрещена на территории РФ.
            </div>
          </div>

        </div>

        {/* Low-profile bottom footer lines */}
        <div className="pt-10 border-t border-brand-gold/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-text-muted">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span>© Ирина Сница, 2026.</span>
            <span className="hidden sm:inline opacity-30">|</span>
            <a href="#privacy-policy" className="hover:text-brand-gold transition-colors underline decoration-dotted">Политика конфиденциальности</a>
          </div>
          <div>
            <span className="text-[10px] font-light">
              Разработка и интерактивный прототип сайта-визитки
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
