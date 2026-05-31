import { motion } from 'motion/react';
import { Video, HelpCircle, MessageCircle, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

interface PricingProps {
  onOpenBooking: (type: 'online' | 'offline' | 'package') => void;
  onOpenChat: () => void;
}

export default function Pricing({ onOpenBooking, onOpenChat }: PricingProps) {
  const cards = [
    {
      type: 'online' as const,
      title: 'Онлайн консультация',
      desc: 'В любом удобном мессенджере (Zoom, Skype, Telegram, WhatsApp) из любой точки мира.',
      duration: '50 минут',
      price: '3 000 ₽',
      badge: 'Популярно',
      icon: Video,
      bullets: ['Конфиденциальный зашифрованный созвон', 'Доступ из уютного домашнего окружения', 'Не нужно тратить время на дорогу', 'Запись методических материалов по запросу']
    },
    {
      type: 'offline' as const,
      title: 'Очная консультация',
      desc: 'Личная терапевтическая сессия в комфортном, тихом кабинете в центре Санкт-Петербурга.',
      duration: '50 минут',
      price: '4 000 ₽',
      badge: 'Очный формат',
      icon: MapPin,
      bullets: ['Полная тишина и фокус на процессе', 'Безопасное терапевтическое пространство', 'Чай, кофе, салфетки включены', 'Удобное местоположение рядом с метро']
    },
    {
      type: 'package' as const,
      title: 'Пакет из 4 консультаций',
      desc: 'Пакет встреч для глубокой, циклической проработки укоренившихся запросов.',
      duration: 'Для регулярной работы',
      price: '11 000 ₽',
      badge: 'Выгодно (-10%)',
      icon: Sparkles,
      bullets: ['Фиксированные слоты в расписании за вами', 'Разработка индивидуального плана изменений', 'Связь со мной в мессенджерах между встречами', 'Приоритет при подборе времени переноса']
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 md:px-8 bg-brand-bg-dark/40 relative">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Header */}
        <span className="font-serif text-xs uppercase tracking-widest text-brand-gold">Услуги и стоимость</span>
        <h3 className="font-serif text-3xl md:text-4.5xl text-brand-text mt-2 mb-4">
          Форматы и стоимость
        </h3>
        <div className="gold-line-wave mx-auto mb-12" />

        {/* Pricing Cards Stack */}
        <div className="space-y-6 max-w-2xl mx-auto">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                id={`price-card-${card.type}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative rounded-2xl border text-left p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 transition-all duration-300 ${
                  card.type === 'package'
                    ? 'bg-brand-card shadow-[0_10px_30px_rgba(205,162,117,0.06)] border-brand-gold'
                    : 'bg-brand-card/85 border-brand-gold/15 hover:border-brand-gold/35 shadow-md'
                }`}
              >
                {/* Accent badge */}
                <span className="absolute top-4 right-4 bg-brand-bg text-brand-gold text-[9px] uppercase tracking-widest font-sans font-bold px-2.5 py-1 rounded-full border border-brand-gold/10">
                  {card.badge}
                </span>

                {/* Left part: Title, details, bullets */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-bg-dark border border-brand-gold/10 flex items-center justify-center text-brand-accent">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg md:text-xl font-bold text-brand-text">{card.title}</h4>
                      <span className="text-xs text-brand-accent/90 bg-brand-bg-dark/40 px-2 py-0.5 rounded font-medium mt-1 inline-block">
                        ⏱️ {card.duration}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed font-light">
                    {card.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-brand-gold/5">
                    {card.bullets.map((bullet, listIdx) => (
                      <div key={listIdx} className="flex items-center gap-2 text-xs text-brand-text-muted">
                        <CheckCircle2 size={12} className="text-brand-accent shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right part: Action & Pricing */}
                <div className="sm:w-56 flex flex-col justify-center sm:items-end border-t sm:border-t-0 sm:border-l border-brand-gold/10 pt-4 sm:pt-0 sm:pl-6 text-left sm:text-right shrink-0">
                  <span className="text-[10px] uppercase text-brand-text-muted tracking-wider block mb-1">Стоимость</span>
                  <span className="font-serif text-3xl font-extrabold text-brand-accent block mb-4">{card.price}</span>
                  
                  <button
                    id={`price-btn-${card.type}`}
                    onClick={() => onOpenBooking(card.type)}
                    className="w-full bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-bold font-sans text-xs uppercase tracking-widest py-3 px-6 rounded-xl transition-all duration-300 shadow-md cursor-pointer"
                  >
                    ЗАПИСАТЬСЯ
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Squiggle call-to-action banner underneath */}
        <motion.div
          id="not-knowing-start-banner"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 max-w-2xl mx-auto rounded-3xl border border-brand-accent/25 bg-brand-card p-8 text-center relative overflow-hidden"
        >
          {/* Abstract wavy lines background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
            <svg viewBox="0 0 400 200" className="w-full h-full stroke-brand-accent fill-none stroke-[3]">
              <path d="M0,100 C100,50 150,150 200,100 C250,50 300,150 400,100" />
              <path d="M0,130 C100,80 150,180 200,130 C250,80 300,180 400,130" />
            </svg>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-2">
              <HelpCircle size={22} />
            </div>

            <h4 className="font-serif text-2xl text-brand-text">Не знаете, с чего начать?</h4>
            <p className="text-sm text-brand-text-muted leading-relaxed max-w-md mx-auto">
              Напишите мне в удобный мессенджер-симулятор. Я тепло выслушаю вас и помогу бережно подобрать комфортный формат.
            </p>

            <button
              id="pricing-chat-cta"
              onClick={onOpenChat}
              className="mt-4 bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-bold text-xs uppercase tracking-wider py-3.5 px-10 rounded-xl transition-all inline-flex items-center gap-2 shadow-[0_4px_15px_rgba(228,181,149,0.2)] cursor-pointer"
            >
              <MessageCircle size={15} /> Начать открытый чат
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
