import { motion } from 'motion/react';
import { EyeOff, Users, ShieldAlert, Award, Flame, Compass, HelpCircle, RefreshCw, HeartCrack, UserMinus } from 'lucide-react';

export default function HelpsWith() {
  const topics = [
    {
      title: 'Тревожность, панические состояния',
      desc: 'Постоянное беспокойство, страхи, внезапные панические атаки и навязчивые мысли.',
      icon: EyeOff,
    },
    {
      title: 'Сложности в отношениях',
      desc: 'Конфликты с близкими, непонимание, эмоциональная зависимость или отдаление.',
      icon: Users,
    },
    {
      title: 'Низкая самооценка',
      desc: 'Постоянная самокритика, синдром самозванца, неуверенность в своих силах и решениях.',
      icon: Award,
    },
    {
      title: 'Расставание, развод, измена',
      desc: 'Помощь в бережном проживании тяжелого жизненного этапа и адаптации к переменам.',
      icon: HeartCrack,
    },
    {
      title: 'Эмоциональное выгорание',
      desc: 'Упадок сил, хроническая усталость, потеря интереса к профессиональной и личной жизни.',
      icon: Flame,
    },
    {
      title: 'Трудности с принятием решений',
      desc: 'Застревание в сомнениях, страх ошибки, непонимание «куда двигаться дальше».',
      icon: Compass,
    },
    {
      title: 'Ощущение «я не справляюсь»',
      desc: 'Чувство перегруженности обстоятельствами, нехватка внутренних ресурсов.',
      icon: HelpCircle,
    },
    {
      title: 'Повторяющиеся жизненные сценарии',
      desc: 'Застревание в однотипных нездоровых отношениях, грабли, на которые наступаете вновь и вновь.',
      icon: RefreshCw,
    },
    {
      title: 'Чувство вины и стыда',
      desc: 'Пожирающие внутренние упреки, синдром «хорошей девочки/мальчика» во вред себе.',
      icon: ShieldAlert,
    },
    {
      title: 'Одиночество и потеря опоры',
      desc: 'Ощущение изоляции, душевная пустота, потеря привычных жизненных ориентиров.',
      icon: UserMinus,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="helps-with" className="py-20 px-4 md:px-8 bg-brand-bg-dark/40 relative">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Header */}
        <span className="font-serif text-xs uppercase tracking-widest text-brand-gold">Специализация</span>
        <h3 className="font-serif text-3xl md:text-4.5xl text-brand-text mt-2 mb-4">С чем я помогаю</h3>
        <div className="gold-line-wave mx-auto mb-12" />

        {/* Dynamic Topics Grid */}
        <motion.div
          id="helps-with-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {topics.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                id={`helps-card-${index}`}
                variants={cardVariants}
                className="group relative rounded-2xl border border-brand-gold/10 bg-brand-card p-6 text-left transition-all duration-300 hover:border-brand-gold/40 hover:-translate-y-1 hover:shadow-[0_10px_25px_-10px_rgba(205,162,117,0.15)]"
              >
                {/* Glowing gold dot corner accent */}
                <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-brand-gold/30 group-hover:bg-brand-gold transition-colors" />

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-bg-dark/60 border border-brand-gold/15 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-bg transition-colors duration-300 shrink-0">
                    <IconComponent size={22} strokeWidth={1.5} />
                  </div>
                  <h4 className="font-serif text-lg font-medium text-brand-text leading-snug group-hover:text-brand-accent transition-colors">
                    {item.title}
                  </h4>
                </div>
                
                <p className="text-sm text-brand-text-muted font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Small reassuring footnote */}
        <div className="mt-12 p-4 max-w-2xl mx-auto rounded-2xl border border-brand-gold/10 bg-brand-card/40 text-center">
          <p className="text-xs text-brand-text-muted leading-relaxed font-light">
            ✨ <strong className="text-brand-text font-medium">Важно знать:</strong> Если вашей проблемы нет в списке, это абсолютно нормально. Напишите мне в форму, и мы вместе разберем вашу ситуацию на вводной бесплатной переписке или подберем коллегу нужного профиля.
          </p>
        </div>

      </div>
    </section>
  );
}
