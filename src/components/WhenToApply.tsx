import { motion } from 'motion/react';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export default function WhenToApply() {
  const painPoints = [
    'Вы часто прокручиваете одни и те же мысли и не можете их «выключить»',
    'Сложно расслабиться, почувствовать базовое спокойствие и безопасность',
    'Отношения приносят больше боли, одиночества и тревоги, чем радости',
    'Вы чертовски устали держаться сильными и делать вид, что всё нормально',
    'Сложно понять, чего вы хотите на самом деле, какие ваши истинные желания',
    'Чувствуете, что ходите по кругу, решая одни и те же проблемы годами',
  ];

  const outcomes = [
    { num: '01', title: 'Облегчение', txt: 'Снижение уровня фоновой тревоги и острого эмоционального напряжения.' },
    { num: '02', title: 'Ясность', txt: 'Понимание истинных причин своих реакций и поступков окружающих.' },
    { num: '03', title: 'Опора', txt: 'Обретение внутренней уверенности, умение уверенно говорить «нет».' },
  ];

  return (
    <section id="when-to-apply" className="py-20 px-4 md:px-8 bg-brand-bg relative overflow-hidden">
      
      {/* Background radial highlight */}
      <div className="absolute right-0 top-1/2 w-80 h-80 rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Checklist column */}
          <motion.div
            id="when-to-apply-checklist"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            <span className="font-serif text-xs uppercase tracking-widest text-brand-gold">Симптомы</span>
            <h3 className="font-serif text-3xl md:text-4.5xl text-brand-text mt-2 mb-4 leading-tight">
              Когда стоит обратиться к психологу?
            </h3>
            <div className="gold-line-wave mb-8" />
            
            <p className="text-sm text-brand-text-muted mb-8 leading-relaxed max-w-lg">
              Если хотя бы 2-3 пункта откликаются у вас внутри, это серьезный повод уделить внимание вашей психике. Ждать, пока «само пройдёт» — значит тратить драгоценные годы жизни на страдания.
            </p>

            <div className="space-y-4 w-full">
              {painPoints.map((point, index) => (
                <div
                  key={index}
                  id={`pain-point-${index}`}
                  className="flex items-start gap-4 p-4 rounded-xl border border-brand-gold/5 bg-brand-card/30 hover:bg-brand-card/60 transition-colors"
                >
                  <div className="text-brand-accent mt-0.5 shrink-0">
                    <CheckCircle2 size={20} className="stroke-brand-accent" />
                  </div>
                  <p className="text-sm sm:text-base text-brand-text font-light leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Positive Shift column */}
          <motion.div
            id="when-to-apply-shift"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 bg-brand-card rounded-2xl border border-brand-gold/15 p-6 md:p-8 flex flex-col items-start text-left relative"
          >
            <div className="absolute -top-3 -left-3 bg-brand-gold text-brand-bg rounded-lg text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1 shadow-md">
              Результат
            </div>

            <h4 className="font-serif text-2xl text-brand-text mb-2 mt-2">Что изменится весной и летом?</h4>
            <p className="text-xs text-brand-text-muted mb-6 leading-relaxed">
              Психотерапия — это не волшебство, а глубокая структурированная работа. Вот к какому состоянию мы придем шаг за шагом:
            </p>

            <div className="space-y-6 w-full">
              {outcomes.map((o, index) => (
                <div key={index} className="flex gap-4 items-start border-l-2 border-brand-accent/30 pl-4 py-1 hover:border-brand-accent transition-colors">
                  <span className="font-mono text-xs text-brand-gold font-bold tracking-widest">{o.num}</span>
                  <div className="text-left">
                    <h5 className="text-sm font-semibold text-brand-text flex items-center gap-1">
                      {o.title} <ChevronRight size={12} className="text-brand-accent" />
                    </h5>
                    <p className="text-xs text-brand-text-muted mt-1 leading-relaxed">{o.txt}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-brand-gold/10 w-full text-center">
              <span className="font-serif text-sm italic text-brand-gold">«Качество вашей жизни зависит от качества вашего эмоционального состояния»</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
