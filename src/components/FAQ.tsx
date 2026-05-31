import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Search, Sparkles } from 'lucide-react';
import { FAQItem } from '../types';

const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Как понять, что мне действительно нужен психолог?',
    answer: 'Если вы регулярно чувствуете фоновое недовольство жизнью, ходите по кругу в конфликтах, боретесь с навязчивой тревогой или не можете принять решение — это знак. Нам не обязательно ждать глубокого кризиса, чтобы начать заботиться о своей психике.'
  },
  {
    id: 'faq-2',
    question: 'Сколько сессий/консультаций мне понадобится?',
    answer: 'Всё зависит от запроса. Для решения точечной проблемы (например, подготовиться к сложному разговору) может хватить 4–8 встреч. Для глубоких личностных изменений (самооценка, детские сценарии, затяжные депрессивные состояния) требуется регулярная работа от 3 до 6 месяцев.'
  },
  {
    id: 'faq-3',
    question: 'Равноценен ли онлайн-формат очной встрече?',
    answer: 'Да, многочисленные научные исследования доказывают, что онлайн-терапия так же эффективна, как и очная. Самое главное — гарантировать себе 50 минут уединения, надеть наушники и иметь стабильный интернет. Психика прекрасно адаптируется к видеосвязи.'
  },
  {
    id: 'faq-4',
    question: 'Что делать, если я вообще не знаю, с чего начать?',
    answer: 'Это абсолютно стандартное состояние. Вам не нужно приносить готовый, красиво сформулированный диагноз. Достаточно прийти и описать состояние своими словами: «Мне тяжело», «Я запуталась», «Хочу покоя». Мы распутаем клубок переживаний вместе на первой сессии.'
  }
];

const HIDDEN_FAQS: FAQItem[] = [
  {
    id: 'faq-5',
    question: 'Будут ли домашние задания?',
    answer: 'Поведенческие задания и дневники мы внедряем по согласию. Это очень ускоряет проработку в методе КБТ: вы пробуете новые стратегии поведения в реальной жизни между нашими сессиями, а не только говорите о них в кабинете.'
  },
  {
    id: 'faq-6',
    question: 'Насколько это конфиденциально?',
    answer: 'Это фундаментальный закон моей этики. Всё, что вы говорите на сессии, остается строго в кабинете. Исключения прописаны в законах РФ и касаются лишь непосредственной физической угрозы вашей жизни или жизни других людей.'
  },
  {
    id: 'faq-7',
    question: 'Каковы условия переноса или отмены консультации?',
    answer: 'Вы можете бесплатно перенести встречу не позднее, чем за 24 часа. При отмене или переносе менее чем за сутки, сессия оплачивается в полном объёме. Это правило помогает взаимно уважать время друг друга и сохранять терапевтические границы.'
  },
  {
    id: 'faq-8',
    question: 'В чем разница между психологом, психотерапевтом и психиатром?',
    answer: 'Психолог работает вербально с клинически здоровыми людьми без выписки рецептов. Психиатр — это дипломированный врач, который диагностирует заболевания и назначает медикаменты (антидепрессанты и др.). Я работаю разговорными методами, но при признаках депрессии бережно порекомендую бережного психиатра для совместной терапии.'
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const currentList = showAll ? [...INITIAL_FAQS, ...HIDDEN_FAQS] : INITIAL_FAQS;

  const filteredFaqs = searchQuery
    ? [...INITIAL_FAQS, ...HIDDEN_FAQS].filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentList;

  return (
    <section id="faq" className="py-20 px-4 md:px-8 bg-brand-bg relative">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="font-serif text-xs uppercase tracking-widest text-brand-gold">Часто задаваемые вопросы</span>
          <h3 className="font-serif text-3xl md:text-4.5xl text-brand-text mt-2 mb-4">FAQ для клиентов</h3>
          <div className="gold-line-wave mx-auto mb-8" />
          
          {/* Internal search filter bar */}
          <div className="relative max-w-sm mx-auto mt-6">
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-brand-text-muted">
              <Search size={15} />
            </div>
            <input
              type="text"
              placeholder="Поиск ответа по ключевым словам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-card/70 border border-brand-gold/15 rounded-full pl-10 pr-4 py-2 text-xs text-brand-text placeholder-brand-text-muted/40 focus:outline-none focus:border-brand-accent transition-all text-left"
            />
          </div>
        </div>

        {/* Accordion Questions List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-brand-accent/50 bg-brand-card shadow-md'
                    : 'border-brand-gold/10 bg-brand-card/45 hover:border-brand-gold/25'
                }`}
              >
                {/* Trigger Question title */}
                <button
                  id={`faq-trigger-${faq.id}`}
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 font-serif text-base md:text-lg text-brand-text hover:text-brand-accent transition-colors"
                >
                  <span className="font-medium inline-flex items-center gap-2">
                    {isOpen && <Sparkles size={14} className="text-brand-accent animate-pulse shrink-0" />}
                    {faq.question}
                  </span>
                  <div className="shrink-0 w-8 h-8 rounded-full bg-brand-bg-dark flex items-center justify-center text-brand-gold border border-brand-gold/10">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                {/* Answer Container sliding */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="border-t border-brand-gold/5 bg-brand-bg-dark/25"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="p-5 md:p-6 text-sm text-brand-text-muted leading-relaxed font-light whitespace-pre-line text-left">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Expand-all Toggle Button */}
        {!searchQuery && (
          <div className="mt-10 text-center">
            <button
              id="faq-show-all-btn"
              onClick={() => {
                setShowAll(!showAll);
                setOpenId(null);
              }}
              className="border border-brand-gold/30 hover:border-brand-accent bg-transparent hover:bg-brand-accent/5 hover:text-brand-accent text-brand-text font-serif text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all cursor-pointer"
            >
              {showAll ? 'СВЕРНУТЬ ВОПРОСЫ' : 'ВСЕ ВОПРОСЫ'}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
