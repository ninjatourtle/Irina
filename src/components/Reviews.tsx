import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, MessageSquare, Check, Smile } from 'lucide-react';
import { ReviewItem } from '../types';

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: '1',
    name: 'Елена',
    age: 34,
    text: 'После консультаций с Ириной стало намного легче дышать и наконец понимать себя. Появилась непоколебимая внутренняя опора и спокойствие, которого мне так не хватало.'
  },
  {
    id: '2',
    name: 'Мария',
    age: 29,
    text: 'Очень бережный, чуткий и внимательный специалист. Помогла справиться с изнуряющей тревогой, паническими состояниями и разложить по полочкам сложные отношения с парнем.'
  },
  {
    id: '3',
    name: 'Анна',
    age: 41,
    text: 'Искренне благодарна за колоссальную поддержку, деликатность и высочайший профессионализм. Эти консультации действительно и бесповоротно меняют качество жизни!'
  }
];

export default function Reviews() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  
  // Custom review submission form state
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewAge, setNewReviewAge] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [successSubmit, setSuccessSubmit] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('irina_snitsa_reviews');
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem('irina_snitsa_reviews', JSON.stringify(INITIAL_REVIEWS));
    }
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewText) return;

    const ageNum = parseInt(newReviewAge) || 30;

    const added: ReviewItem = {
      id: Math.random().toString(36).substring(2, 9),
      name: newReviewName,
      age: ageNum,
      text: newReviewText
    };

    const list = [...reviews, added];
    setReviews(list);
    localStorage.setItem('irina_snitsa_reviews', JSON.stringify(list));

    // Reset standard states
    setCurrentIndex(list.length - 1);
    setNewReviewName('');
    setNewReviewAge('');
    setNewReviewText('');
    setSuccessSubmit(true);
    setTimeout(() => {
      setSuccessSubmit(false);
      setShowSubmitForm(false);
    }, 2500);
  };

  if (reviews.length === 0) return null;

  const activeReview = reviews[currentIndex];

  return (
    <section id="reviews" className="py-20 px-4 md:px-8 bg-brand-bg relative overflow-hidden">
      
      {/* Decorative Blur Background circles */}
      <div className="absolute left-10 top-1/4 w-72 h-72 rounded-full bg-brand-gold/5 blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-serif text-xs uppercase tracking-widest text-brand-gold">Отзывы клиентов</span>
          <h3 className="font-serif text-3xl md:text-4.5xl text-brand-text mt-2 mb-4">Слова благодарности</h3>
          <div className="gold-line-wave mx-auto" />
        </div>

        {/* Carousel Outer frame */}
        <div className="relative max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.98, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: -20 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl border border-brand-gold/15 bg-brand-card p-8 md:p-12 text-center shadow-xl min-h-[250px] flex flex-col justify-between"
            >
              {/* Giant quote decorator */}
              <div className="absolute top-6 left-6 text-brand-gold/10 pointer-events-none select-none">
                <Quote size={80} strokeWidth={1} className="fill-brand-gold/5" />
              </div>

              <span>&nbsp;</span>

              <p className="font-serif text-lg md:text-xl text-brand-text leading-relaxed font-light italic mt-2 relative z-10">
                «{activeReview.text}»
              </p>

              <div className="mt-8 border-t border-brand-gold/10 pt-4 flex items-center justify-center gap-2">
                <span className="text-sm font-semibold text-brand-accent">{activeReview.name}</span>
                <span className="text-xs text-brand-text-muted">•</span>
                <span className="text-xs text-brand-text-muted">{activeReview.age} {activeReview.age % 10 === 1 && activeReview.age !== 11 ? 'год' : [2,3,4].includes(activeReview.age % 10) && ![12,13,14].includes(activeReview.age) ? 'года' : 'лет'}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Arrows */}
          <div id="carousel-controls" className="flex items-center justify-center gap-6 mt-8">
            <button
              id="prev-review-btn"
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-text-muted hover:text-brand-accent hover:border-brand-accent transition-all cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-brand-accent w-6' : 'bg-brand-gold/30 hover:bg-brand-gold/60'
                  }`}
                />
              ))}
            </div>

            <button
              id="next-review-btn"
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-text-muted hover:text-brand-accent hover:border-brand-accent transition-all cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Action Button: Submit testimonial */}
        <div className="mt-12 text-center">
          {!showSubmitForm ? (
            <button
              id="show-testimonial-form-btn"
              onClick={() => setShowSubmitForm(true)}
              className="inline-flex items-center gap-2 text-xs text-brand-gold font-semibold tracking-wider hover:text-brand-accent border-b border-dashed border-brand-gold/40 hover:border-brand-accent pb-1 transition-all cursor-pointer"
            >
              <MessageSquare size={14} /> Оставить свой отзыв
            </button>
          ) : (
            <motion.div
              id="testimonial-submit-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 max-w-md mx-auto rounded-2xl border border-brand-gold/15 bg-brand-card p-6 text-left shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-serif text-lg text-brand-text">Ваш честный отзыв</h4>
                <button
                  id="close-testimonial-form-btn"
                  onClick={() => setShowSubmitForm(false)}
                  className="p-1 text-brand-text-muted hover:text-brand-accent"
                >
                  <ChevronLeft size={16} />
                </button>
              </div>

              {!successSubmit ? (
                <form id="add-review-form" onSubmit={handleAddReview} className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-[11px] font-sans text-brand-text-muted mb-1">Ваше имя</label>
                      <input
                        type="text"
                        required
                        placeholder="Кристина"
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        className="w-full bg-brand-bg-dark/50 border border-brand-gold/25 rounded-lg px-3 py-2 text-xs text-brand-text placeholder-brand-text-muted/40 focus:outline-none focus:border-brand-accent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-sans text-brand-text-muted mb-1">Ваш возраст</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        placeholder="30"
                        value={newReviewAge}
                        onChange={(e) => setNewReviewAge(e.target.value)}
                        className="w-full bg-brand-bg-dark/50 border border-brand-gold/25 rounded-lg px-3 py-2 text-xs text-brand-text placeholder-brand-text-muted/40 focus:outline-none focus:border-brand-accent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans text-brand-text-muted mb-1">Текст отзыва</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Расскажите о своем опыте сессий, каких результатов добились..."
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      className="w-full bg-brand-bg-dark/50 border border-brand-gold/25 rounded-lg p-3 text-xs text-brand-text placeholder-brand-text-muted/40 focus:outline-none focus:border-brand-accent transition-all resize-none"
                    />
                  </div>

                  <button
                    id="submit-review-btn"
                    type="submit"
                    className="w-full bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-sans font-semibold text-xs py-2.5 rounded-lg transition-all"
                  >
                    Опубликовать
                  </button>
                </form>
              ) : (
                <div id="review-success" className="text-center py-6 space-y-3">
                  <div className="mx-auto w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-400">
                    <Check size={20} />
                  </div>
                  <h5 className="font-serif text-sm text-brand-text">Отзыв успешно добавлен!</h5>
                  <p className="text-xs text-brand-text-muted">Спасибо за обратную связь, это ценно.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
