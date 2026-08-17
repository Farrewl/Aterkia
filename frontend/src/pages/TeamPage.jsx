import React, { useState } from 'react';
import { teamMembers, teamDivisions } from '../data/teamData';
import ImageWithFallback from '../components/ImageWithFallback';
import { Search, Mail, Users, HelpCircle, ChevronDown, ChevronUp, UserCircle } from 'lucide-react';

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showHelper, setShowHelper] = useState(false);

  const filteredMembers = teamMembers.filter((member) => {
    const matchesDivision =
      activeTab === 'All' ||
      member.division.toLowerCase() === activeTab.toLowerCase() ||
      (activeTab === 'ASV Division' && member.division.includes('ASV')) ||
      (activeTab === 'AUV Division' && member.division.includes('AUV')) ||
      (activeTab === 'Software' && member.division.includes('Software')) ||
      (activeTab === 'Electrical' && member.division.includes('Electrical')) ||
      (activeTab === 'Mechanical' && member.division.includes('Mechanical')) ||
      (activeTab === 'Media & Creative' && member.division.includes('Media'));

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      member.fullName.toLowerCase().includes(q) ||
      member.role.toLowerCase().includes(q) ||
      member.specialty.toLowerCase().includes(q);

    return matchesDivision && matchesSearch;
  });

  const getDivisionColor = (division) => {
    const d = division.toLowerCase();
    if (d.includes('lead')) return { bar: 'from-amber-400 to-orange-400', badge: 'bg-amber-50 text-amber-600 border-amber-200', dot: 'bg-amber-400' };
    if (d.includes('asv')) return { bar: 'from-olympic-400 to-blue-400', badge: 'bg-olympic-50 text-olympic-600 border-olympic-200', dot: 'bg-olympic-400' };
    if (d.includes('auv')) return { bar: 'from-blue-500 to-olympic-500', badge: 'bg-blue-50 text-blue-600 border-blue-200', dot: 'bg-blue-500' };
    if (d.includes('soft')) return { bar: 'from-teal-400 to-emerald-400', badge: 'bg-teal-50 text-teal-600 border-teal-200', dot: 'bg-teal-400' };
    if (d.includes('elec')) return { bar: 'from-yellow-400 to-amber-400', badge: 'bg-yellow-50 text-yellow-600 border-yellow-200', dot: 'bg-yellow-400' };
    if (d.includes('mech')) return { bar: 'from-emerald-400 to-teal-400', badge: 'bg-emerald-50 text-emerald-600 border-emerald-200', dot: 'bg-emerald-400' };
    return { bar: 'from-purple-400 to-pink-400', badge: 'bg-purple-50 text-purple-600 border-purple-200', dot: 'bg-purple-400' };
  };

  return (
    <div>

      {/* Hero Header */}
      <section className="relative py-20 bg-gradient-to-br from-olympic-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-olympic-100/40 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute inset-0 dot-pattern opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-olympic-500 uppercase tracking-widest mb-4">
              <Users className="w-4 h-4" />
              Susunan Organisasi
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-olympic-900 tracking-tight leading-tight mb-5">
              Struktur Anggota Tim{' '}
              <span className="gradient-text">Aterkia</span>
            </h1>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
              Mahasiswa lintas disiplin ilmu teknik yang berkolaborasi dalam riset dan perancangan wahana kapal permukaan (ASV) serta robot selam (AUV).
            </p>

            {/* Helper toggle */}
            <div className="mt-5">
              <button
                onClick={() => setShowHelper(!showHelper)}
                className="inline-flex items-center gap-1.5 text-sm text-olympic-500 hover:text-olympic-700 font-medium transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Petunjuk Mengganti Foto Anggota</span>
                {showHelper ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showHelper && (
                <div className="bg-white p-6 rounded-2xl text-left mt-4 text-sm text-slate-600 max-w-xl border border-slate-100 shadow-lg shadow-slate-100/50 space-y-2 animate-fade-in">
                  <p className="font-bold text-olympic-900 flex items-center gap-2">
                    <span className="text-lg">📸</span> Cara Mudah Mengganti Foto Anggota:
                  </p>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-600">
                    <li>Letakkan file foto di: <code className="text-olympic-500 bg-olympic-50 px-2 py-0.5 rounded-lg text-xs font-mono">frontend/public/images/team/</code></li>
                    <li>Buka file data: <code className="text-olympic-500 bg-olympic-50 px-2 py-0.5 rounded-lg text-xs font-mono">frontend/src/data/teamData.js</code></li>
                    <li>Ubah baris <code className="text-olympic-600 font-mono text-xs">photo</code> (misal: <code className="text-slate-500 font-mono text-xs">"/images/team/foto-anda.jpg"</code>) atau gunakan link foto online.</li>
                    <li>Jika belum ada foto, sistem otomatis menampilkan avatar inisial nama.</li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-16 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {teamDivisions.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isSelected
                        ? 'bg-olympic-500 text-white shadow-md shadow-olympic-500/20'
                        : 'bg-slate-50 text-slate-500 hover:text-olympic-600 hover:bg-olympic-50 border border-slate-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama / keahlian..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-olympic-300 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-24 bg-slate-50 rounded-3xl max-w-sm mx-auto border border-slate-100">
              <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-base font-medium">Tidak ada anggota yang cocok</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
              {filteredMembers.map((member, idx) => {
                const colors = getDivisionColor(member.division);
                return (
                  <div
                    key={member.id}
                    className={`group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md shadow-slate-100/50 hover:shadow-xl hover:shadow-olympic-100/60 transition-all duration-500 hover:-translate-y-2 ${
                      idx % 5 === 0 ? 'sm:translate-y-4' : ''
                    }`}
                  >
                    {/* Color top bar */}
                    <div className={`h-1.5 bg-gradient-to-r ${colors.bar}`} />

                    <div className="p-6 text-center">
                      {/* Avatar */}
                      <div className="relative w-24 h-24 mx-auto mb-5">
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.bar} opacity-20 blur-lg group-hover:opacity-30 transition-opacity`} />
                        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white border-2 border-slate-100 group-hover:border-olympic-200 transition-colors shadow-inner">
                          <ImageWithFallback
                            src={member.photo}
                            alt={member.fullName}
                            name={member.fullName}
                            division={member.division}
                            type="team"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            containerClassName="w-full h-full"
                          />
                        </div>
                        {/* Online dot */}
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${colors.dot} border-2 border-white shadow-sm`} />
                      </div>

                      {/* Name & Role */}
                      <h3 className="font-display font-bold text-lg text-olympic-900 group-hover:text-olympic-600 transition-colors leading-snug mb-1">
                        {member.fullName}
                      </h3>
                      <p className="text-sm text-olympic-500 font-medium mb-3">
                        {member.role}
                      </p>

                      {/* Division badge */}
                      <div className="flex justify-center mb-4">
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-xl border uppercase tracking-wider ${colors.badge}`}>
                          {member.division}
                        </span>
                      </div>

                      {/* Bio */}
                      <p className="text-xs text-slate-500 text-center leading-relaxed font-light line-clamp-3 mb-5">
                        {member.bio}
                      </p>
                    </div>

                    {/* Social — bottom */}
                    <div className="px-6 pb-6 pt-2 border-t border-slate-50 flex items-center justify-center gap-2 text-slate-400">
                      {member.socials.linkedin && (
                        <a href={member.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
                          className="p-2 rounded-xl hover:text-olympic-500 hover:bg-olympic-50 transition-all duration-200">
                          <LinkedinIcon />
                        </a>
                      )}
                      {member.socials.github && (
                        <a href={member.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"
                          className="p-2 rounded-xl hover:text-olympic-500 hover:bg-olympic-50 transition-all duration-200">
                          <GithubIcon />
                        </a>
                      )}
                      {member.socials.instagram && (
                        <a href={member.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"
                          className="p-2 rounded-xl hover:text-olympic-500 hover:bg-olympic-50 transition-all duration-200">
                          <InstagramIcon />
                        </a>
                      )}
                      {member.socials.email && (
                        <a href={`mailto:${member.socials.email}`} aria-label="Email"
                          className="p-2 rounded-xl hover:text-olympic-500 hover:bg-olympic-50 transition-all duration-200">
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
