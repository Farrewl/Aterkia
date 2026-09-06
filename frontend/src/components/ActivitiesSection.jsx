import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react';
import { activitiesData } from '../data/activitiesData';

const GalleryStack = ({ images, title }) => {
  const [cards, setCards] = useState(images);

  const handleCardClick = () => {
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
              key={`${img}-${index}`}
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
                bg-slate-900 border border-white/10 rounded-3xl p-3
                shadow-2xl shadow-black/50 overflow-hidden
                ${isTop ? 'ring-2 ring-sky-500/20' : ''}
              `}
            >
              <div className="relative h-full w-full rounded-2xl overflow-hidden bg-slate-800">
                <img
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                {isTop && (
                  <div className="absolute top-4 right-4 bg-sky-500/80 backdrop-blur-sm text-white p-2 rounded-full shadow-lg">
                    <Camera className="w-4 h-4" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

const ActivityRow = ({ activity, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 mb-32 last:mb-0`}>
      {/* Text Content */}
      <div className="w-full lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          
          <h3 className="text-3xl sm:text-4xl font-black font-display text-white mb-6 leading-tight">
            {activity.title}
          </h3>
          <p className="text-slate-400 text-lg font-light leading-relaxed max-w-xl">
            {activity.description}
          </p>
        </motion.div>
      </div>

      {/* Gallery Stack */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GalleryStack images={activity.images} title={activity.title} />
        </motion.div>
      </div>
    </div>
  );
};

export default function ActivitiesSection() {
  return (
    <section className="relative py-24 bg-[#060d1a] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-sky-500/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tight leading-tight">
            <span className="gradient-text">Our Activity</span>
          </h2>
          <div className="mt-4 h-1.5 w-24 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full" />
        </div>

        <div className="space-y-12">
          {activitiesData.map((activity, index) => (
            <ActivityRow key={activity.id} activity={activity} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
