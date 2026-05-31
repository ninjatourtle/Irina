import { motion } from 'motion/react';
import { UserPlus, Search, Navigation, HeartHandshake, ArrowDown } from 'lucide-react';

export default function ConsultationTimeline() {
  const steps = [
    {
      title: 'Знакомство и запрос',
      desc: 'Обсуждаем в бережной атмосфере, с чем вы пришли, что болит и какие изменения вы хотите увидеть в своей жизни в результате встреч.',
      icon: UserPlus,
    },
    {
      title: 'Разбор ситуации',
      desc: 'Спокойно и бережно смотрим на глубокие скрытые причины происходящего, проживаем сложные эмоции и находим циклические негативные сценарии.',
      icon: Search,
    },
    {
      title: 'Понятные шаги',
      desc: 'Вместе формируем практические ориентиры и новые модели совладания, с которыми можно уверенно и свободно двигаться дальше самостоятельно.',
      icon: Navigation,
    },
    {
      title: 'Поддержка',
      desc: 'Вы больше не один на один со своей проблемой. На протяжении всего пути я нахожусь рядом, подстраховываю и бережно укрепляю внутреннюю опору.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="consultation-timeline" className="py-20 px-4 md:px-8 bg-brand-bg relative">
      <div className="max-w-3xl mx-auto text-center">
        
        {/* Header */}
        <span className="font-serif text-xs uppercase tracking-widest text-brand-gold">Этапы развития</span>
        <h3 className="font-serif text-3xl md:text-4.5xl text-brand-text mt-2 mb-4">
          Как проходит консультация
        </h3>
        <div className="gold-line-wave mx-auto mb-16" />

        {/* Steps container */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const IconComp = step.icon;
            return (
              <div key={index} className="flex flex-col items-center">
                
                {/* Horizontal details card */}
                <motion.div
                  id={`timeline-step-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="w-full max-w-xl rounded-2xl border border-brand-gold/15 bg-brand-card p-6 md:p-8 text-left relative overflow-hidden flex items-start gap-5 hover:border-brand-gold/40 transition-colors"
                >
                  <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-xl bg-brand-bg-dark border border-brand-gold/20 flex items-center justify-center text-brand-accent">
                    <IconComp size={22} className="stroke-brand-accent" />
                  </div>

                  <div>
                    <span className="font-mono text-xs text-brand-gold tracking-widest uppercase font-bold block mb-1">Шаг 0{index + 1}</span>
                    <h4 className="font-serif text-xl font-medium text-brand-text mb-2">
                      {step.title}
                    </h4>
                    <p className="text-sm text-brand-text-muted font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>

                {/* Show connecting arrow if not the last item */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="py-4 text-brand-gold flex flex-col items-center gap-1 opacity-80"
                  >
                    <div className="w-0.5 h-6 bg-gradient-to-b from-brand-gold/40 to-brand-gold" />
                    <ArrowDown size={16} className="text-brand-gold animate-bounce" />
                    <div className="w-0.5 h-2 bg-brand-gold" />
                  </motion.div>
                )}

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
