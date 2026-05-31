import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MessageSquare, X, CheckCheck, Sparkles, Smile } from 'lucide-react';

interface ChatSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'irina';
  text: string;
  timestamp: string;
  isTrigger?: boolean;
}

const PRESET_QUESTIONS = [
  { text: '👋 Хочу записаться на консультацию', category: 'booking' },
  { text: '💻 Как проходят онлайн-встречи?', category: 'format' },
  { text: '🎓 Какое у вас образование?', category: 'education' },
  { text: '🌿 С какими запросами вы работаете?', category: 'topics' },
  { text: '😰 Помогаете ли вы при тревоге?', category: 'anxiety' }
];

export default function ChatSimulator({ isOpen, onClose, onOpenBooking }: ChatSimulatorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setMessages([
          {
            id: 'init-1',
            sender: 'irina',
            text: 'Здравствуйте! Рада, что вы заглянули. Меня зовут Ирина. 😊',
            timestamp: getFormattedTime()
          },
          {
            id: 'init-2',
            sender: 'irina',
            text: 'Я семейный и личностный психолог. Готова бережно выслушать ваш запрос и помочь сориентироваться. Напишите ваш вопрос или выберите одну из тем ниже!',
            timestamp: getFormattedTime()
          }
        ]);
        setIsTyping(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function getFormattedTime() {
    const d = new Date();
    return d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      sender: 'user',
      text: textToSend,
      timestamp: getFormattedTime()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate Irina's response based on keywords or selection
    setTimeout(() => {
      let replyText = '';
      let isBookingTrigger = false;
      const cleanText = textToSend.toLowerCase();

      if (cleanText.includes('записаться') || cleanText.includes('запись') || cleanText.includes('хочу наприем') || cleanText.includes('встречу')) {
        replyText = 'Вам отлично подойдёт онлайн или очная консультация! Вы можете нажать на кнопку ниже, чтобы забронировать удобный день и время прямо на сайте. Либо мы можем договориться в этом чате!';
        isBookingTrigger = true;
      } else if (cleanText.includes('онлайн') || cleanText.includes('как проходит') || cleanText.includes('формат')) {
        replyText = 'Мои онлайн-сессии длятся 50 минут. Они проходят в спокойной, конфиденциальной обстановке через Zoom, Skype или Telegram. Вам понадобятся только наушники, стабильный интернет и уединённое пространство, где никто не помешает.';
      } else if (cleanText.includes('образован') || cleanText.includes('диплом') || cleanText.includes('сертификат') || cleanText.includes('учеба')) {
        replyText = 'Я окончила Высшую Школу Психологии по специальности «Семейное и системное консультирование», а также регулярно прохожу повышение квалификации в методе КБТ (когнитивно-поведенческая терапия) и гештальт-терапии. Имею за плечами более 350 часов личной терапии и регулярную супервизию.';
      } else if (cleanText.includes('тревог') || cleanText.includes('паник') || cleanText.includes('страх')) {
        replyText = 'Да, работа с тревожностью и паническими атаками — один из моих основных профилей. Мы бережно выявим внутренние триггеры, снимем острое напряжение при помощи практических техник КБТ и научимся находить опору внутри себя.';
      } else if (cleanText.includes('отношен') || cleanText.includes('семья') || cleanText.includes('развод') || cleanText.includes('ссоры')) {
        replyText = 'В отношениях важно научиться слышать свои потребности и конструктивно говорить о них партнеру. Я помогаю пережить расставание, разрешить затяжные конфликты и выстроить здоровые личные границы в паре.';
      } else if (cleanText.includes('цена') || cleanText.includes('стоимост') || cleanText.includes('сколько стои')) {
        replyText = 'Онлайн-консультация стоит 3 000 рублей (50 минут), очная сессия — 4 000 рублей. Также доступен пакет из 4 встреч за 11 000 рублей, это выгоднее и настраивает на регулярную продуктивную терапию.';
      } else {
        replyText = 'Большое спасибо за ваше сообщение! Каждый запрос уникален. Я с удовольствием помогу вам разобраться подробнее во время нашей первой беседы. Хотите прямо сейчас подобрать удобное время?';
        isBookingTrigger = true;
      }

      const irinaMsg: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        sender: 'irina',
        text: replyText,
        timestamp: getFormattedTime(),
        isTrigger: isBookingTrigger
      };

      setMessages((prev) => [...prev, irinaMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePresetClick = (qText: string) => {
    handleSendMessage(qText);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div id="chat-simulator-overlay" className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-6 pointer-events-none">
        {/* Backdrop for mobile */}
        <motion.div
          id="chat-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-bg-dark/40 backdrop-blur-xs md:hidden pointer-events-auto"
        />

        {/* Chat window */}
        <motion.div
          id="chat-window"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="relative w-full max-w-md h-[85vh] md:h-[600px] rounded-2xl border border-brand-gold/20 bg-brand-bg-dark shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
        >
          {/* Header */}
          <div id="chat-header" className="bg-brand-card p-4 border-b border-brand-gold/15 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150"
                  alt="Ирина Сница"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-brand-gold/30"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-brand-card" />
              </div>
              <div className="text-left">
                <h4 className="font-serif text-sm font-semibold text-brand-text flex items-center gap-1">
                  Ирина Сница <Sparkles size={12} className="text-brand-accent fill-brand-accent/20" />
                </h4>
                <span className="text-[10px] text-brand-accent font-medium">Консультация онлайн (в сети)</span>
              </div>
            </div>

            <button
              id="chat-close-btn"
              onClick={onClose}
              className="text-brand-text-muted hover:text-brand-accent p-1 rounded-full hover:bg-brand-card-light transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div id="chat-messages-area" className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-bg/80 relative">
            <div className="text-center">
              <span className="inline-block px-3 py-1 bg-brand-card/45 rounded-md border border-brand-gold/5 text-[10px] text-brand-text-muted">
                Чат открыт. Сообщения защищены шифрованием. Мессенджер-симулятор.
              </span>
            </div>

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-md flex flex-col ${
                    m.sender === 'user'
                      ? 'bg-brand-accent text-brand-bg rounded-br-xs font-medium'
                      : 'bg-brand-card text-brand-text rounded-bl-xs border border-brand-gold/5'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line">{m.text}</p>
                  
                  {/* Dynamic Action inside the Chat Bubble */}
                  {m.isTrigger && m.sender === 'irina' && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenBooking();
                      }}
                      className="mt-3 bg-brand-accent text-brand-bg text-xs font-semibold py-2 px-4 rounded-xl hover:bg-brand-accent-hover transition-all self-start flex items-center justify-center gap-1 shadow-md cursor-pointer"
                    >
                      Записаться через форму
                    </button>
                  )}

                  <span
                    className={`text-[9px] shrink-0 self-end mt-1 inline-flex items-center gap-0.5 ${
                      m.sender === 'user' ? 'text-brand-bg/60' : 'text-brand-text-muted/70'
                    }`}
                  >
                    {m.timestamp}
                    {m.sender === 'user' && <CheckCheck size={11} />}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-brand-card rounded-2xl rounded-bl-xs px-4 py-3 text-brand-text border border-brand-gold/5 flex items-center gap-1.5 shadow-md">
                  <span className="text-xs text-brand-text-muted font-serif italic">Ирина печатает</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Preset Buttons (if no active typing is ongoing) */}
          {!isTyping && (
            <div id="chat-presets" className="p-2 border-t border-brand-gold/10 bg-brand-card/40 flex gap-1.5 overflow-x-auto shrink-0 scrollbar-none select-none">
              {PRESET_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handlePresetClick(q.text)}
                  className="shrink-0 text-left bg-brand-card-light/75 hover:bg-brand-card-light text-brand-text text-[11px] py-1.5 px-3 rounded-full border border-brand-gold/10 transition-colors cursor-pointer"
                >
                  {q.text}
                </button>
              ))}
            </div>
          )}

          {/* Input field */}
          <form
            id="chat-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-3 border-t border-brand-gold/15 bg-brand-card flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Напишите сообщение..."
              className="flex-1 bg-brand-bg-dark/50 border border-brand-gold/20 rounded-full px-4 py-2.5 text-sm text-brand-text placeholder-brand-text-muted/40 focus:outline-none focus:border-brand-accent transition-all"
            />
            <button
              id="chat-send-btn"
              type="submit"
              disabled={!inputValue.trim()}
              className="bg-brand-accent hover:bg-brand-accent-hover text-brand-bg p-2.5 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer"
            >
              <Send size={16} />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
