import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, GraduationCap, Heart, Check, Sparkles, X } from 'lucide-react';

export default function AboutMe() {
  const [isExpanded, setIsExpanded] = useState(false);

  const principles = [
    { title: 'Бережность и уважение', txt: 'Я не оцениваю, не критикую и не учу вас жить. Принимаю любую вашу грань и темп.' },
    { title: 'Полная конфиденциальность', txt: 'Всё, что вы доверите мне на консультации — строго остается между нами.' },
    { title: 'Доказательные методы', txt: 'В работе опираюсь на подтвержденные подходы: КБТ, системную и гештальт-терапию.' },
  ];

  const credentials = [
    { title: 'Высшее психологическое образование', school: 'ВШП — Системное семейное консультирование' },
    { title: 'Курс КБТ при депрессиях и тревожности', school: 'Ассоциация КПТ-терапевтов России' },
    { title: 'Гештальт-подход в индивидуальном консультировании', school: 'Московский Институт Гештальта (МИГ)' },
    { title: '350+ часов личной терапии', school: 'Обязательный критерий устойчивости специалиста' },
  ];

  return (
    <section id="about-me" className="py-20 px-4 md:px-8 bg-brand-bg-dark/40 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Images & arm chair matching screenshot */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 border border-brand-gold/15 -translate-x-3 translate-y-3 rounded-2xl pointer-events-none" />
              
              <div className="relative overflow-hidden rounded-2xl border border-brand-gold/25 shadow-xl shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=650&h=650"
                  alt="Уютный кабинет психолога Ирины Сницы"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto aspect-square object-cover select-none filter brightness-95 hover:scale-[1.02] transition-transform duration-500"
                />
                
                {/* Overlay tiny badge */}
                <div className="absolute bottom-4 left-4 bg-brand-bg/90 backdrop-blur-md border border-brand-gold/15 px-3.5 py-1.5 rounded-xl">
                  <span className="text-[10px] text-brand-gold uppercase tracking-widest font-sans font-bold flex items-center gap-1.5">
                    <Heart size={12} className="fill-brand-gold/20" /> Мой уютный кабинет в СПБ
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Text descriptions */}
          <div className="md:col-span-7 text-left flex flex-col items-start leading-relaxed">
            <span className="font-serif text-xs uppercase tracking-widest text-brand-gold">Познакомимся ближе</span>
            <h3 className="font-serif text-3xl md:text-4.5xl text-brand-text mt-2 mb-4 leading-tight">
              Обо мне
            </h3>
            <div className="gold-line-wave mb-8" />

            <div className="space-y-5 text-sm md:text-base text-brand-text-muted font-light">
              <p>
                Я семейный и личностный психолог. Помогаю взрослым справляться с трудными жизненными ситуациями, лучше понимать свои истинные желания и выстраивать гармоничные отношения с собой и близкими.
              </p>
              <p>
                В работе для меня критически важно создать максимально безопасное, теплое и доверительное пространство. Место, где вы можете скинуть социальную маску, быть собой без страха осуждения и найти внутренние точки опоры для изменений.
              </p>
            </div>

            <button
              id="expand-about-btn"
              onClick={() => setIsExpanded(true)}
              className="mt-8 border border-brand-gold/30 hover:border-brand-accent bg-transparent hover:bg-brand-accent/5 hover:text-brand-accent text-brand-text font-bold font-sans text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer"
            >
              ПОДРОБНЕЕ ОБО МНЕ
            </button>
          </div>

        </div>
      </div>

      {/* Slide-out details drawer / modal */}
      <AnimatePresence>
        {isExpanded && (
          <div id="about-drawer-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="absolute inset-0 bg-brand-bg-dark/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-brand-gold/25 bg-brand-card p-6 md:p-8 shadow-2xl flex flex-col text-left"
            >
              {/* Close Button */}
              <button
                id="close-about-btn"
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 text-brand-text-muted hover:text-brand-accent transition-colors p-1"
              >
                <X size={24} />
              </button>

              <span className="font-serif text-xs uppercase tracking-widest text-brand-gold flex items-center gap-1">
                <Sparkles size={12} /> Образование и Принципы
              </span>
              <h4 className="font-serif text-2xl md:text-3xl text-brand-text mt-1 mb-6">
                Профессиональный бэкграунд Ирины
              </h4>

              {/* Education section */}
              <div className="mb-8">
                <h5 className="font-serif text-lg text-brand-accent mb-4 flex items-center gap-2 border-b border-brand-gold/10 pb-2">
                  <GraduationCap size={20} /> Сертифицированное образование
                </h5>
                <div className="space-y-4">
                  {credentials.map((c, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="mt-1 flex-shrink-0 text-brand-gold">
                        <Check size={16} strokeWidth={2.5} />
                      </div>
                      <div>
                        <h6 className="text-sm font-semibold text-brand-text">{c.title}</h6>
                        <p className="text-xs text-brand-text-muted mt-0.5">{c.school}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Principles section */}
              <div>
                <h5 className="font-serif text-lg text-brand-accent mb-4 flex items-center gap-2 border-b border-brand-gold/10 pb-2">
                  <BookOpen size={20} /> Мои профессиональные принципы
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {principles.map((p, i) => (
                    <div key={i} className="p-4 rounded-xl border border-brand-gold/10 bg-brand-bg-dark/40 flex flex-col text-left">
                      <h6 className="text-xs font-bold text-brand-text uppercase tracking-wide border-b border-brand-gold/5 pb-2 mb-2">
                        {p.title}
                      </h6>
                      <p className="text-xs text-brand-text-muted leading-relaxed font-light">{p.txt}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="mt-8 bg-brand-accent hover:bg-brand-accent-hover text-brand-bg py-3 rounded-xl text-center font-semibold text-sm transition-all"
              >
                Закрыть и продолжить просмотр
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
