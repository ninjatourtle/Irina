import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Phone, MessageSquare, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { Appointment, PriceCard } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'online' | 'offline' | 'package';
  onBookingSuccess?: (appointment: Appointment) => void;
}

const CONSULTATION_TYPES: PriceCard[] = [
  { id: '1', title: 'Онлайн консультация', subtitle: 'В Zoom, Skype или Telegram', duration: '50 минут', price: '3 000 ₽', rawPrice: 3000, type: 'online' },
  { id: '2', title: 'Очная консультация', subtitle: 'В уютном кабинете (г. Санкт-Петербург)', duration: '50 минут', price: '4 000 ₽', rawPrice: 4000, type: 'offline' },
  { id: '3', title: 'Пакет из 4 консультаций', subtitle: 'Для регулярной и глубокой работы', duration: 'Регулярные встречи', price: '11 000 ₽', rawPrice: 11000, type: 'package' }
];

const TIME_SLOTS = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00'];

const MONTHS_RU = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

const DAYS_RU = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export default function BookingModal({ isOpen, onClose, initialType, onBookingSuccess }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<'online' | 'offline' | 'package'>(initialType || 'online');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [comment, setComment] = useState('');
  const [success, setSuccess] = useState(false);
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);

  // Generate next 7 days starts from tomorrow
  const [availableDates, setAvailableDates] = useState<{ raw: Date; label: string; subLabel: string }[]>([]);

  useEffect(() => {
    if (initialType) {
      setSelectedType(initialType);
    }
  }, [initialType]);

  useEffect(() => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dayOfWeekKey = d.getDay();
      const monthKey = d.getMonth();
      const dateNum = d.getDate();

      dates.push({
        raw: d,
        label: `${dateNum} ${MONTHS_RU[monthKey]}`,
        subLabel: DAYS_RU[dayOfWeekKey]
      });
    }
    setAvailableDates(dates);
    if (dates.length > 0) {
      setSelectedDate(dates[0].label);
    }
  }, []);

  // Reset function
  const resetForm = () => {
    setStep(1);
    setSelectedDate(availableDates[0]?.label || '');
    setSelectedTimeSlot('');
    setClientName('');
    setClientPhone('');
    setComment('');
    setSuccess(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      resetForm();
    }, 300);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    const appointment: Appointment = {
      id: Math.random().toString(36).substring(2, 9),
      type: selectedType,
      date: selectedDate,
      timeSlot: selectedTimeSlot || 'Время согласуем отдельно',
      clientName,
      clientPhone,
      comment,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const saved = localStorage.getItem('irina_snitsa_appointments');
    const list: Appointment[] = saved ? JSON.parse(saved) : [];
    list.push(appointment);
    localStorage.setItem('irina_snitsa_appointments', JSON.stringify(list));

    setCreatedAppointment(appointment);
    setSuccess(true);
    if (onBookingSuccess) {
      onBookingSuccess(appointment);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div id="booking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          id="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-brand-bg-dark/80 backdrop-blur-sm"
        />

        {/* Modal Panel */}
        <motion.div
          id="modal-panel"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-brand-gold/20 bg-brand-card p-6 shadow-2xl md:p-8"
        >
          {/* Close button */}
          <button
            id="modal-close-btn"
            onClick={handleClose}
            className="absolute top-4 right-4 text-brand-text-muted hover:text-brand-accent transition-colors"
          >
            <X size={24} />
          </button>

          {!success ? (
            <div>
              {/* Header */}
              <div id="modal-header" className="mb-6">
                <span className="font-serif text-xs uppercase tracking-widest text-brand-gold">Запись на консультацию</span>
                <h3 className="font-serif text-2xl md:text-3xl text-brand-text mt-1">Оставить заявку</h3>
                
                {/* Progress bar */}
                <div id="progress-indicator" className="flex items-center gap-2 mt-4">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        s <= step ? 'bg-brand-accent' : 'bg-brand-bg-dark'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Steps form content */}
              <div id="modal-content" className="min-h-[300px]">
                {/* Step 1: Format Selection */}
                {step === 1 && (
                  <motion.div
                    id="step-1-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <p className="text-sm text-brand-text-muted mb-2">Выберите формат взаимодействия:</p>
                    {CONSULTATION_TYPES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedType(t.type)}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                          selectedType === t.type
                            ? 'border-brand-accent bg-brand-card-light shadow-[0_0_15px_rgba(228,181,149,0.1)]'
                            : 'border-brand-gold/10 bg-brand-bg-dark/40 hover:border-brand-gold/30'
                        }`}
                      >
                        <div>
                          <h4 className="font-serif text-md text-brand-text font-medium">{t.title}</h4>
                          <p className="text-xs text-brand-text-muted mt-1">{t.subtitle}</p>
                          <span className="inline-block mt-2 text-xs bg-brand-bg-dark py-0.5 px-2 rounded text-brand-gold">
                            {t.duration}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-serif text-lg text-brand-accent font-bold block">{t.price}</span>
                          {selectedType === t.type && (
                            <span className="inline-flex items-center justify-center bg-brand-accent text-brand-bg rounded-full p-0.5 mt-2">
                              <Check size={14} strokeWidth={3} />
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* Step 2: Date and Time selection */}
                {step === 2 && (
                  <motion.div
                    id="step-2-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <p className="text-sm text-brand-text-muted mb-3 flex items-center gap-2">
                        <Calendar size={16} className="text-brand-gold" /> Выберите удобную дату:
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {availableDates.map((d, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedDate(d.label)}
                            className={`p-2 rounded-lg border text-center transition-all flex flex-col items-center justify-center ${
                              selectedDate === d.label
                                ? 'border-brand-accent bg-brand-card-light text-brand-accent font-medium'
                                : 'border-brand-gold/10 bg-brand-bg-dark/40 text-brand-text-muted hover:border-brand-gold/30'
                            }`}
                          >
                            <span className="text-xs uppercase opacity-80">{d.subLabel}</span>
                            <span className="text-sm font-semibold mt-1">{d.raw.getDate()}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <p className="text-sm text-brand-text-muted mb-3 flex items-center gap-2">
                        <Clock size={16} className="text-brand-gold" /> Выберите время начала:
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {TIME_SLOTS.map((t, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedTimeSlot(t)}
                            className={`py-2 px-3 rounded-lg border text-center transition-all text-sm ${
                              selectedTimeSlot === t
                                ? 'border-brand-accent bg-brand-card-light text-brand-accent font-medium'
                                : 'border-brand-gold/10 bg-brand-bg-dark/40 text-brand-text-muted hover:border-brand-gold/30'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setSelectedTimeSlot('')}
                        className={`w-full mt-3 py-2 border rounded-lg text-center transition-all text-xs ${
                          selectedTimeSlot === ''
                            ? 'border-brand-accent bg-brand-card-light text-brand-accent font-semibold'
                            : 'border-brand-gold/10 bg-brand-bg-dark/20 text-brand-text-muted hover:text-brand-text'
                        }`}
                      >
                        Согласовать время индивидуально (в чате)
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Contact Details */}
                {step === 3 && (
                  <form id="step-3-form" onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-sm text-brand-text-muted mb-2">Введите контактные данные:</p>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-brand-text-muted mb-1 flex items-center gap-1.5">
                          <User size={12} className="text-brand-gold" /> Имя и Фамилия
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ирина Смирнова"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full bg-brand-bg-dark/50 border border-brand-gold/20 rounded-xl px-4 py-3 text-sm text-brand-text placeholder-brand-text-muted/40 focus:outline-none focus:border-brand-accent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-brand-text-muted mb-1 flex items-center gap-1.5">
                          <Phone size={12} className="text-brand-gold" /> Номер телефона
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+7 (999) 000-00-00"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          className="w-full bg-brand-bg-dark/50 border border-brand-gold/20 rounded-xl px-4 py-3 text-sm text-brand-text placeholder-brand-text-muted/40 focus:outline-none focus:border-brand-accent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-brand-text-muted mb-1 flex items-center gap-1.5">
                          <MessageSquare size={12} className="text-brand-gold" /> Комментарий / Запрос (необязательно)
                        </label>
                        <textarea
                          placeholder="Кратко опишите, что вас беспокоит или какой вопрос вы хотите решить..."
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full bg-brand-bg-dark/50 border border-brand-gold/20 rounded-xl px-4 py-3 text-sm text-brand-text placeholder-brand-text-muted/40 focus:outline-none focus:border-brand-accent transition-all resize-none"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-brand-card-light/40 rounded-xl border border-brand-gold/10 flex items-start gap-2.5 text-xs text-brand-text-muted">
                      <div className="mt-0.5 text-brand-accent">✦</div>
                      <p>
                        Соглашаясь на отправку формы, вы даете согласие на обработку персональных данных в соответствии с политикой конфиденциальности. Нажав кнопку ниже, вы регистрируете заявку.
                      </p>
                    </div>
                  </form>
                )}
              </div>

              {/* Footer controls */}
              <div id="modal-footer" className="mt-8 flex items-center justify-between pt-4 border-t border-brand-gold/10">
                {step > 1 ? (
                  <button
                    onClick={handlePrev}
                    className="flex items-center gap-1 text-sm font-medium text-brand-text-muted hover:text-brand-text transition-colors"
                  >
                    <ChevronLeft size={18} /> Назад
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    onClick={handleNext}
                    className="bg-brand-accent hover:bg-brand-accent-hover text-brand-bg px-6 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-1 ml-auto"
                  >
                    Далее <ChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!clientName || !clientPhone}
                    type="submit"
                    className="bg-brand-accent hover:bg-brand-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-brand-bg px-8 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-[0_4px_15px_rgba(228,181,149,0.2)] ml-auto"
                  >
                    Записаться
                  </button>
                )}
              </div>
            </div>
          ) : (
            // Success view
            <motion.div
              id="booking-success-view"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-6"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-brand-accent/10 border border-brand-accent flex items-center justify-center text-brand-accent mb-6">
                <Check size={36} strokeWidth={2.5} />
              </div>

              <span className="font-serif text-xs uppercase tracking-widest text-brand-gold block mb-1">Готово!</span>
              <h3 className="font-serif text-2xl md:text-3xl text-brand-text mb-4">Заявка успешно отправлена</h3>
              
              <div className="max-w-sm mx-auto text-sm text-brand-text-muted space-y-3 mb-8">
                <p>
                  Спасибо, <strong className="text-brand-text">{createdAppointment?.clientName}</strong>! Я получила ваш запрос на консультацию.
                </p>
                
                {/* Simulated Ticket Receipt */}
                <div className="bg-brand-bg-dark/40 border border-brand-gold/10 rounded-xl p-4 text-left font-sans text-xs space-y-2 mt-4">
                  <div className="flex justify-between border-b border-brand-gold/5 pb-2">
                    <span className="text-brand-text-muted">Формат встречи:</span>
                    <span className="text-brand-accent font-semibold">
                      {CONSULTATION_TYPES.find(c => c.type === createdAppointment?.type)?.title}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-brand-gold/5 pb-2">
                    <span className="text-brand-text-muted">Дата:</span>
                    <span className="text-brand-text font-medium">{createdAppointment?.date}</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-gold/5 pb-2">
                    <span className="text-brand-text-muted">Время:</span>
                    <span className="text-brand-text font-medium">{createdAppointment?.timeSlot}</span>
                  </div>
                  <div className="flex justify-between text-xs pt-1">
                    <span className="text-brand-text-muted">Телефон для связи:</span>
                    <span className="text-brand-text font-mono">{createdAppointment?.clientPhone}</span>
                  </div>
                </div>

                <p className="pt-2">
                  Я свяжусь с вами в ближайшее время (обычно в течение 1–2 часов) в WhatsApp или Telegram, чтобы согласовать детали и забронировать точное время. 
                </p>
              </div>

              <button
                onClick={handleClose}
                className="w-full bg-brand-accent hover:bg-brand-accent-hover text-brand-bg py-3 px-6 rounded-xl font-semibold text-sm transition-all"
              >
                Отлично, буду ждать
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
