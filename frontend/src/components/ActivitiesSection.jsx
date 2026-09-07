import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { activitiesData } from '../data/activitiesData';

const GalleryStack = ({ images, title, onClickTop }) => {
  const [cards, setCards] = useState(images);

  const handleCardClick = (e) => {
    e.stopPropagation();
    setCards((prev) => {
      const [top, ...rest] = prev;
      return [...rest, top];
    });
  };

  return (
    <div className="relative w-full max-w-[400px] h-[350px] sm:h-[450px] mx-auto perspective-[1000px]">
      <AnimatePresence mode="popLayout">
        {cards.slice(0, 4).map((img, index) => {
          const isTop = index === 0;
          return (
            <motion.div
              key={`${img}-${index}-${cards[0]}`}
              layout
              initial={false}
              animate={{
                scale: 1 - index * 0.06,
                y: index * 10,
                zIndex: 10 - index,
                opacity: 1 - index * 0.2,
                rotate: index === 0 ? 0 : (index % 2 === 0 ? 3 : -3) * index,
              }}
              whileHover={isTop ? { scale: 1.02, y: -5, rotate: 0 } : {}}
              onClick={isTop ? handleCardClick : undefined}
              className={`
                absolute inset-0 cursor-pointer origin-bottom
                bg-slate-900 border-2 border-[#a8c0e0]/40 rounded-3xl p-3
                shadow-2xl shadow-black/50 overflow-hidden
                ${isTop ? 'ring-2 ring-[#a8c0e0]/30' : ''}
              `}
            >
              <div className="relative h-full w-full rounded-2xl overflow-hidden bg-slate-800">
                <img
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

const Lightbox = ({ images, title, index, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors z-10"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors z-10"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors z-10"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <motion.div
        className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={images[index]}
          src={images[index]}
          alt={title}
          className="max-h-[75vh] w-auto max-w-full rounded-2xl shadow-2xl border-2 border-[#a8c0e0]/30"
        />
        <div className="mt-4 text-center">
          <p className="text-white font-display font-bold text-lg">{title}</p>
          <p className="text-white/50 text-sm mt-1">
            {index + 1} / {images.length}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ActivityRow = ({ activity, index, onOpen }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 mb-32 last:mb-0`}>
      <div className="w-full lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h3 className="text-3xl sm:text-4xl font-black font-display text-white mb-6 leading-tight">
            {activity.title}
          </h3>
          <p className="text-slate-400 text-lg font-light leading-relaxed max-w-xl">
            {activity.description}
          </p>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GalleryStack images={activity.images} title={activity.title} />
        </motion.div>

        <button
          onClick={() => onOpen(activity)}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#a8c0e0]/10 hover:bg-[#a8c0e0]/20 border-2 border-[#a8c0e0]/30 hover:border-[#a8c0e0]/50 text-[#a8c0e0] text-xs font-bold uppercase tracking-wider transition-all duration-300"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          Open Gallery
        </button>
      </div>
    </div>
  );
};

export default function ActivitiesSection() {
  const [activeActivity, setActiveActivity] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  const open = (activity) => {
    setActiveActivity(activity);
    setImageIndex(0);
  };
  const close = () => setActiveActivity(null);
  const next = () => setImageIndex((i) => (activeActivity ? (i + 1) % activeActivity.images.length : 0));
  const prev = () => setImageIndex((i) => (activeActivity ? (i - 1 + activeActivity.images.length) % activeActivity.images.length : 0));

  return (
    <section className="relative py-24 bg-[#060d1a] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-[#a8c0e0]/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-[#a8c0e0]/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tight leading-tight">
            <span className="text-[#a8c0e0]">Our Activity</span>
          </h2>
          <div className="mt-4 h-1.5 w-24 bg-gradient-to-r from-[#a8c0e0] to-[#5a7ba0] mx-auto rounded-full" />
        </div>

        <div className="space-y-12">
          {activitiesData.map((activity, index) => (
            <ActivityRow
              key={activity.id}
              activity={activity}
              index={index}
              onOpen={open}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeActivity && (
          <Lightbox
            images={activeActivity.images}
            title={activeActivity.title}
            index={imageIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
