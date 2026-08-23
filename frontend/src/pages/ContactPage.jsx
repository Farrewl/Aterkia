import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../data/siteConfig';
import { Mail, MapPin, Send, CheckCircle2, ArrowUpRight, Anchor, MessageCircle, Users, Rocket } from 'lucide-react';
import { sponsorsData } from '../data/sponsorsData';
import ImageWithFallback from '../components/ImageWithFallback';

const marqueeSponsors = [...sponsorsData, ...sponsorsData];

function Bubbles({ count = 15 }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-white/20 bg-white/5"
          style={{
            left: `${5 + Math.random() * 90}%`,
            width: `${4 + Math.random() * 10}px`,
            height: `${4 + Math.random() * 10}px`,
            bottom: `-${10 + Math.random() * 20}px`,
            animation: `bubbleRise ${4 + Math.random() * 6}s ease-in infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

function WaveDivider({ className = '', color = '#f8fafc', from = 'transparent' }) {
  return (
    <div className={`relative w-full overflow-hidden leading-none ${className}`}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
        <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z" fill={from} />
        <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80 Z" fill={color} />
      </svg>
    </div>
  );
}

function FloatingShip() {
  return (
    <div className="absolute top-16 right-8 sm:right-16 opacity-10 pointer-events-none" aria-hidden="true">
      <svg className="animate-sail" width="120" height="60" viewBox="0 0 110 50">
        <path d="M15,35 L25,28 L85,28 L95,35 L90,38 L20,38 Z" fill="#005EB8" />
        <rect x="42" y="18" width="26" height="10" rx="3" fill="#0050A0" />
        <rect x="45" y="12" width="20" height="6" rx="2" fill="#003D7A" />
        <line x1="55" y1="12" x2="55" y2="4" stroke="#003D7A" strokeWidth="1.5" />
        <circle cx="55" cy="3" r="2" fill="#FF6B35" />
      </svg>
    </div>
  );
}

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    category: 'Sponsorship',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleCards, setVisibleCards] = useState(false);
  const cardsRef = useRef(null);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisibleCards(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', category: 'Sponsorship', message: '' });
    }, 800);
  };

  const contactCards = [
    { icon: Mail, label: 'Primary Email', value: siteConfig.email, href: `mailto:${siteConfig.email}`, color: 'from-sky-400 to-sky-600', bg: 'bg-sky-50' },
    { icon: MessageCircle, label: 'Sponsorship & Partnerships', value: siteConfig.partnershipEmail, href: `mailto:${siteConfig.partnershipEmail}`, color: 'from-blue-400 to-blue-600', bg: 'bg-blue-50' },
    { icon: MapPin, label: 'Research HQ', value: `Student Center, ${siteConfig.affiliation}, ${siteConfig.location}`, color: 'from-slate-400 to-slate-600', bg: 'bg-slate-50' },
  ];

  const quickStats = [
    { icon: Anchor, value: '2', label: 'Active Robots', color: 'text-sky-500' },
    { icon: Users, value: '30+', label: 'Team Members', color: 'text-blue-500' },
    { icon: Rocket, value: '5+', label: 'Competitions', color: 'text-olympic-500' },
  ];

  const socialLinks = [
    { label: 'Instagram', href: siteConfig.socials.instagram, color: 'hover:bg-pink-500 hover:border-pink-500 hover:text-white', icon: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z' },
    { label: 'LinkedIn', href: siteConfig.socials.linkedin, color: 'hover:bg-blue-600 hover:border-blue-600 hover:text-white', icon: 'M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' },
    { label: 'YouTube', href: siteConfig.socials.youtube, color: 'hover:bg-red-500 hover:border-red-500 hover:text-white', icon: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
    { label: 'GitHub', href: siteConfig.socials.github, color: 'hover:bg-slate-800 hover:border-slate-800 hover:text-white', icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
  ];

  return (
    <div className="min-h-screen">
      {/* === HERO SECTION === */}
      <section className="relative bg-gradient-to-br from-olympic-900 via-slate-900 to-olympic-950 overflow-hidden">
        <Bubbles count={20} />
        <FloatingShip />

        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-sky-500/8 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-olympic-500/8 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center max-w-3xl mx-auto">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-white tracking-tight leading-tight animate-fade-up" style={{ animationDelay: '100ms' }}>
              Support{' '}
              <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-sky-300 bg-clip-text text-transparent">
                Aterkia
              </span>
            </h1>

            <p className="text-sky-200/60 text-lg sm:text-xl mt-5 font-light leading-relaxed animate-fade-up max-w-xl mx-auto" style={{ animationDelay: '200ms' }}>
              Have a collaboration idea, sponsorship offer, or want to learn more about our maritime robotics research?
            </p>

            {/* Quick Stats */}
            <div className="flex justify-center gap-8 sm:gap-12 mt-10 animate-fade-up" style={{ animationDelay: '300ms' }}>
              {quickStats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="text-center group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-black text-white">{stat.value}</div>
                    <div className="text-xs text-sky-300/50 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <WaveDivider color="#f8fafc" from="#0A1628" className="relative -mb-1" />
      </section>

      {/* === MAIN CONTENT === */}
      <section className="relative bg-[#f8fafc] py-16 sm:py-20" ref={cardsRef}>
        <div className="absolute inset-0 dot-pattern opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left — Contact Cards + Socials */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-4">
                {contactCards.map((card, idx) => {
                  const Icon = card.icon;
                  const Wrapper = card.href ? 'a' : 'div';
                  const wrapperProps = card.href ? { href: card.href, target: '_blank', rel: 'noreferrer' } : {};

                  return (
                    <Wrapper
                      key={idx}
                      {...wrapperProps}
                      className={`flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-white transition-all duration-300 group
                        ${card.href ? 'hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100/50 cursor-pointer' : ''}
                        ${visibleCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                      `}
                      style={{ transitionDelay: `${idx * 120}ms` }}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shrink-0 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{card.label}</span>
                        <span className={`text-sm font-semibold block leading-snug ${card.href ? 'text-olympic-700 group-hover:text-sky-600 transition-colors' : 'text-slate-600'}`}>
                          {card.value}
                        </span>
                      </div>
                      {card.href && (
                        <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-sky-500 shrink-0 mt-1 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      )}
                    </Wrapper>
                  );
                })}
              </div>

              {/* Sponsors */}
              <div className={`pt-6 transition-all duration-500 delay-500 ${visibleCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-4">Our Sponsors</span>
                <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_60px,_black_calc(100%-60px),transparent_100%)]">
                  <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-10 sm:gap-14 py-2">
                    {marqueeSponsors.map((sponsor, idx) => (
                      <a
                        key={`${sponsor.id}-${idx}`}
                        href={sponsor.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={sponsor.name}
                        className="relative group"
                      >
                        <div className="shrink-0 opacity-50 hover:opacity-90 transition-opacity duration-300 cursor-pointer">
                          <ImageWithFallback
                            src={sponsor.logo}
                            alt={sponsor.name}
                            name={sponsor.name}
                            type="sponsor"
                            className="w-14 h-14 sm:w-20 sm:h-20 object-contain"
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className={`pt-2 transition-all duration-500 delay-[600ms] ${visibleCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3 px-1">Follow Us</span>
                <div className="flex gap-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className={`w-11 h-11 rounded-xl bg-white border border-slate-100 text-slate-400 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${s.color}`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.icon} /></svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Contact Form */}
            <div className={`lg:col-span-7 transition-all duration-700 delay-200 ${visibleCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="relative bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-10 overflow-hidden">
                {/* Decorative corner waves */}
                <div className="absolute -top-1 -right-1 w-32 h-32 opacity-[0.03] pointer-events-none">
                  <svg viewBox="0 0 120 120" className="w-full h-full">
                    <path d="M0,0 Q60,20 120,0 L120,120 Q60,100 0,120 Z" fill="#005EB8" />
                  </svg>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto animate-bounce-soft">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-black font-display text-olympic-900">Message Sent Successfully!</h4>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto font-light leading-relaxed">
                      Thank you for contacting Team Aterkia. The relevant division coordinator will follow up shortly.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-semibold text-slate-700 transition-colors mt-2"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name / Organization</label>
                        <input
                          type="text"
                          required
                          placeholder="Your name"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-olympic-500/20 focus:border-olympic-400 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="email@company.com"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-olympic-500/20 focus:border-olympic-400 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Inquiry Category</label>
                      <select
                        value={formState.category}
                        onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-olympic-500/20 focus:border-olympic-400 transition-all"
                      >
                        <option value="Sponsorship">Sponsorship / Partnership Offer</option>
                        <option value="Riset ASV">ASV Division Collaboration</option>
                        <option value="Riset AUV">AUV Division Collaboration</option>
                        <option value="Media">Media Coverage / Interview</option>
                        <option value="Lainnya">General Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Message</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Write your message, collaboration proposal, or question..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-olympic-500/20 focus:border-olympic-400 transition-all resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-olympic-500 to-olympic-600 hover:from-olympic-600 hover:to-olympic-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-olympic-500/25 hover:shadow-xl hover:shadow-olympic-500/30 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>      
    </div>
  );
}