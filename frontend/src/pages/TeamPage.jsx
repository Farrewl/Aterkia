import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Anchor,
  Waves,
  Users,
  ChevronRight,
  X
} from 'lucide-react';
import { divisionTeams } from '../data/teamData';
import { siteConfig } from '../data/siteConfig';
import ImageWithFallback from '../components/ImageWithFallback';
import OrgChart from '../components/OrgChart';
import { TiltCard, Spotlight, useReveal } from '../components/motion';

const TEAM_GROUP_PHOTO = '/images/team/aterkia-team-group.webp';
const PRESIDENT_PHOTO = '/images/team/president/muhammad-bintang-tri-surya.webp';

const teamTracks = {
  TECHNICAL: {
    label: 'TEKNIS',
    shortLabel: 'Engineering & Robotics',
    description: 'Tim yang merancang, membangun, memprogram, dan menguji robot maritim Aterkia.',
    tags: ['ASV', 'AUV'],
    divisions: ['ASV', 'AUV'],
    accent: 'from-sky-500 to-cyan-400',
    icon: Anchor,
  },
  NONTECHNICAL: {
    label: 'NONTEKNIS',
    shortLabel: 'Operations & Organization',
    description: 'Tim yang menjaga administrasi, keuangan, operasional, dan representasi Aterkia.',
    tags: ['Secretary & Treasurer', 'Official'],
    divisions: ['SECRETARY_TREASURER', 'OFFICIAL'],
    accent: 'from-cyan-500 to-teal-400',
    icon: Users,
  },
};

const DIVISION_ACCENT = {
  ASV: { label: 'Surface Robotics', grad: 'from-sky-500 to-cyan-400', ring: 'ring-sky-400/30' },
  AUV: { label: 'Underwater Robotics', grad: 'from-cyan-500 to-blue-500', ring: 'ring-cyan-400/30' },
  SECRETARY_TREASURER: { label: 'Secretary & Treasurer', grad: 'from-teal-500 to-emerald-400', ring: 'ring-teal-400/30' },
  OFFICIAL: { label: 'Official Team', grad: 'from-amber-500 to-orange-400', ring: 'ring-amber-400/30' },
};

function DivisionGlyph({ division }) {
  const className = 'w-9 h-9';
  if (division === 'ASV') {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
        <path d="M8 27.5h32l-5.2 8H14.1L8 27.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M18 27.5V18h12l5 9.5M24 18v-6M24 12h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 40c3 0 3-2 6-2s3 2 6 2 3-2 6-2 3 2 6 2 3-2 6-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (division === 'SECRETARY_TREASURER') {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
        <path d="M12 7h24v34H12zM18 15h12M18 22h7M18 32h12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="31" cy="23" r="6" fill="currentColor" opacity=".18" />
        <path d="M31 19v8M28.5 21.5H33a2 2 0 0 1 0 4h-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (division === 'OFFICIAL') {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
        <path d="m24 6 5.2 5.4 7.4-1 1.3 7.3 6.1 4.2-3.5 6.6 2 7.2-7.1 2.3-3.1 6.8-8.3-2.8-8.3 2.8-3.1-6.8-7.1-2.3 2-7.2L4 21.9l6.1-4.2 1.3-7.3 7.4 1L24 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="m18.5 25 3.6 3.6 7.8-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M9 26c0-5 6.7-9 15-9s15 4 15 9-6.7 9-15 9S9 31 9 26Z" stroke="currentColor" strokeWidth="2" />
      <path d="M39 26h5M4 26h5M20 17v-5h8v5M16 35l-3 5M32 35l3 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="26" r="2" fill="currentColor" />
      <circle cx="25" cy="26" r="2" fill="currentColor" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M5.35 7.72A2.18 2.18 0 1 0 5.34 3.36a2.18 2.18 0 0 0 .01 4.36ZM3.5 20.5h3.7V9.18H3.5V20.5ZM9.43 9.18h3.54v1.55h.05c.5-.93 1.7-1.92 3.5-1.92 3.74 0 4.43 2.46 4.43 5.66v6.03h-3.69v-5.35c0-1.27-.02-2.92-1.78-2.92-1.78 0-2.05 1.39-2.05 2.83v5.44H9.74V9.18h-.31Z" />
    </svg>
  );
}

function SectionEyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-widest">
      <span className="h-px w-6 bg-gradient-to-r from-transparent to-sky-400/70" />
      {children}
      <span className="h-px w-6 bg-gradient-to-l from-transparent to-sky-400/70" />
    </span>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="mt-3 text-3xl sm:text-4xl font-black font-display text-white tracking-tight">{children}</h2>
  );
}

/* MemberCard — photo card with name pill */
function MemberCard({ member }) {
  const firstName = member.fullName.split(' ')[0];
  return (
    <article className="reveal-zoom">
      <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/[0.04] border border-white/10">
        <ImageWithFallback
          src={member.photo}
          alt={`Foto ${member.fullName}`}
          name={member.fullName}
          division={member.division}
          type="team"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          containerClassName="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute right-3 bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/10 bg-[#05052f]/85 p-1 pr-3 backdrop-blur-sm">
          <span className="shrink-0 truncate rounded-full bg-[#03002e] px-3 py-1.5 text-xs font-extrabold text-sky-300">
            {firstName}
          </span>
          <span className="min-w-0 truncate text-[11px] font-bold text-white/80">{member.role}</span>
        </div>
      </div>
    </article>
  );
}

/* Profile contact row */
function ProfileContact({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <small className="block text-[10px] font-bold uppercase tracking-wider text-white/35">{label}</small>
        <strong className="block truncate text-sm font-semibold text-white/85">{value}</strong>
      </span>
      {href && <ArrowUpRight className="h-4 w-4 shrink-0 text-white/25" aria-hidden="true" />}
    </div>
  );

  if (!href) return content;

  const isExternal = href.startsWith('http');
  return (
    <a
      className="transition-colors duration-300 hover:border-sky-400/30 hover:bg-white/[0.06]"
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      aria-label={`${label} ${value}`}
    >
      {content}
    </a>
  );
}

/* Featured person — portrait right/left layout */
function FeaturedPerson({ person, division, kind, imageSide = 'right' }) {
  const isAdvisor = kind === 'advisor';
  const isSubteam = kind === 'subteam';
  const instagramHandle = person.instagram || '@aterkia.roboboat';
  const instagramUrl = `https://instagram.com/${instagramHandle.replace('@', '')}`;
  const email = person.email || `${division.name.toLowerCase()}@aterkia-undip.org`;
  const contacts = [
    { icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
    { icon: InstagramIcon, label: 'Instagram', value: instagramHandle, href: instagramUrl },
    { icon: LinkedinIcon, label: 'LinkedIn', value: person.linkedinLabel || person.fullName, href: person.linkedin || '' },
  ];
  const imageLeft = imageSide === 'left';

  return (
    <article className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 ${imageLeft ? '' : ''} reveal`}>
      <div className={`${imageLeft ? 'lg:order-2' : ''}`}>
        <Spotlight color="56,189,248" opacity={0.08} className="rounded-3xl">
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-9">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
              {isAdvisor ? 'Faculty & Research' : isSubteam ? 'Sub-division Leadership' : 'Division Leadership'}
            </span>
            <h3 className="mt-3 font-display text-2xl font-black text-white sm:text-3xl">{person.fullName}</h3>
            <p className="mt-1 text-sm font-medium text-sky-300/80">{person.role}</p>

            <div className="mt-6">
              <span className="text-xs font-bold uppercase tracking-wider text-white/35">Area keahlian</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {person.expertise?.map((skill) => (
                  <span key={skill} className="rounded-lg border border-sky-500/25 bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-6">
              <span className="text-xs font-bold uppercase tracking-wider text-white/35">Connect</span>
              <div className="mt-3 space-y-2.5">
                {contacts.map((contact) => (
                  <ProfileContact key={contact.label} {...contact} />
                ))}
              </div>
            </div>
          </div>
        </Spotlight>
      </div>

      <div className={`${imageLeft ? 'lg:order-1' : ''}`}>
        <div className="relative mx-auto w-full max-w-sm">
          <div className={`absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-sky-500/20 via-transparent to-cyan-400/20 blur-xl ${!imageLeft ? 'lg:left-auto' : ''}`} />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
            <div className="relative aspect-[3/4]">
              <ImageWithFallback
                src={person.photo}
                alt={`Foto ${person.fullName}`}
                name={person.fullName}
                division={person.division}
                type="team"
                className="h-full w-full object-cover object-top"
                containerClassName="h-full w-full"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Aterkia / {division.name}</span>
                <strong className="text-sm font-black text-white">
                  {isAdvisor ? 'Faculty Advisor' : kind === 'chair' ? 'Division Lead' : isSubteam ? person.role : 'Vice Division Lead'}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* Subdivision explorer — MECH / ELKAPRO selector + panel */
function SubdivisionExplorer({ team }) {
  const [activeSubdivision, setActiveSubdivision] = useState(null);
  const subdivisions = Object.values(team.subdivisions || {});
  const selectedSubdivision = subdivisions.find((item) => item.id === activeSubdivision) || null;
  const selectedMembers = selectedSubdivision
    ? team.members.filter((member) => selectedSubdivision.memberIds.includes(member.id))
    : [];

  const selectSubdivision = (subdivisionId) => {
    setActiveSubdivision((cur) => (cur === subdivisionId ? null : subdivisionId));
  };

  return (
    <section className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <div className="mb-6">
        <SectionEyebrow>Inside {team.name}</SectionEyebrow>
        <SectionTitle>
          Meet the <span className="gradient-text">sub teams</span>
        </SectionTitle>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {subdivisions.map((subdivision) => {
          const isActive = activeSubdivision === subdivision.id;
          const isInactive = activeSubdivision && !isActive;
          return (
            <button
              key={subdivision.id}
              type="button"
              onClick={() => selectSubdivision(subdivision.id)}
              aria-expanded={isActive}
              className={`group rounded-2xl border p-5 text-left transition-all duration-300 ${
                isActive
                  ? 'border-sky-400/40 bg-sky-500/10'
                  : 'border-white/10 bg-white/[0.03] hover:border-sky-400/25 hover:bg-white/[0.06]'
              } ${isInactive ? 'opacity-40' : ''}`}
            >
              <div className="flex items-center justify-between">
                <strong className="font-display text-lg font-black text-white">{subdivision.name}</strong>
                <span className="flex items-center gap-1 text-xs font-bold text-sky-400">
                  {isActive ? (<><ArrowLeft className="h-3.5 w-3.5" /> Back</>) : (<>Explore <ArrowRight className="h-3.5 w-3.5" /></>)}
                </span>
              </div>
              <span className="mt-0.5 block text-xs font-semibold text-sky-300/70">{subdivision.fullName}</span>
              <p className="mt-2 text-sm font-light leading-relaxed text-white/50">{subdivision.description}</p>
            </button>
          );
        })}
      </div>

      {selectedSubdivision && (
        <div id={`${team.id.toLowerCase()}-subdivision-detail`} className="mt-8 space-y-8 animate-fade-in">
          <div className="border-t border-white/10 pt-8">
            <FeaturedPerson
              person={selectedSubdivision.leader}
              division={team}
              kind="subteam"
              imageSide={selectedSubdivision.id === 'MECHANICAL' ? 'right' : 'left'}
            />
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">{selectedSubdivision.fullName}</span>
              <SectionTitle>Anggota {selectedSubdivision.name} {team.name}</SectionTitle>
              <p className="mt-2 text-sm font-light text-white/40">
                Tim yang bekerja langsung bersama ketua sub-divisi dalam satu alur pengembangan.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {selectedMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function TeamPage() {
  const headerReveal = useReveal();
  const [activeTrack, setActiveTrack] = useState(null);
  const [activeDivision, setActiveDivision] = useState(null);
  const selectedTeam = activeDivision ? divisionTeams[activeDivision] : null;
  const selectedTrack = activeTrack ? teamTracks[activeTrack] : null;
  const showFacultyAdvisor = selectedTeam ? ['ASV', 'AUV'].includes(selectedTeam.id) : false;
  const visibleDivisions = selectedTrack
    ? selectedTrack.divisions.map((divisionId) => divisionTeams[divisionId])
    : [];

  const presidentContacts = [
    { icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: InstagramIcon, label: 'Instagram', value: '@roboboat_undip', href: siteConfig.socials.instagram },
    { icon: LinkedinIcon, label: 'LinkedIn', value: 'Aterkia RoboBoat', href: siteConfig.socials.linkedin },
  ];

  const handleBackToTracks = () => { setActiveDivision(null); setActiveTrack(null); };
  const handleBackToDivisions = () => { setActiveDivision(null); };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0c4a6e] via-olympic-950 to-[#060d1a]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] left-[55%] h-72 w-72 rounded-full bg-sky-500/8 blur-3xl" />
          <div className="absolute bottom-[10%] left-[10%] h-56 w-56 rounded-full bg-cyan-400/6 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-28">
          <h1 className="text-4xl font-black font-display text-white tracking-tight sm:text-6xl animate-fade-up">
            <span className="block text-2xl font-light text-white/40 sm:text-3xl">We are</span>
            <span className="gradient-text text-5xl sm:text-7xl">Aterkia</span>
          </h1>

          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-sky-900/40 animate-fade-up" style={{ animationDelay: '150ms' }}>
            <img
              src={TEAM_GROUP_PHOTO}
              alt="Tim Aterkia bersama setelah meraih penghargaan"
              decoding="async"
              fetchPriority="high"
              width="1619"
              height="971"
              className="w-full object-cover"
            />
          </div>

          <a href="#meet-the-team" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition-colors hover:text-sky-200">
            Meet the team
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* ── Org chart ── */}
      <OrgChart />

      {/* ── Meet the team ── */}
      <section id="meet-the-team" className="relative bg-[#060d1a] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* President */}
          <div ref={headerReveal} className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <Spotlight color="56,189,248" opacity={0.08} className="rounded-3xl">
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-9">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400/90">President of Aterkia</span>
                <h2 className="mt-3 font-display text-3xl font-black text-white sm:text-4xl">
                  Muhammad Bintang Tri Surya
                </h2>
                <p className="mt-2 text-sm font-medium text-sky-300/80">Electrical Engineering ’23</p>

                <div className="mt-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/35">Leadership focus</span>
                  <p className="mt-2 text-sm font-light leading-relaxed text-white/55">
                    Menyatukan tim teknis dan nonteknis agar bergerak dalam satu visi.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Technical Direction', 'Organization', 'Team Development'].map((f) => (
                      <span key={f} className="rounded-lg border border-amber-400/25 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold text-amber-200/90">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/35">Connect</span>
                  <div className="mt-3 space-y-2.5">
                    {presidentContacts.map((contact) => (
                      <ProfileContact key={contact.label} {...contact} />
                    ))}
                  </div>
                </div>
              </div>
            </Spotlight>

            <div className="mx-auto w-full max-w-sm">
              <div className="relative -inset-3 rounded-[2rem] bg-gradient-to-br from-amber-500/15 via-transparent to-sky-400/15 blur-xl" />
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                <div className="relative aspect-[3/4]">
                  <ImageWithFallback
                    src={PRESIDENT_PHOTO}
                    alt="Muhammad Bintang Tri Surya, President Aterkia"
                    name="Muhammad Bintang Tri Surya"
                    division="Leadership"
                    type="team"
                    className="h-full w-full object-cover object-top"
                    containerClassName="h-full w-full"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Aterkia / Leadership</span>
                    <strong className="block text-sm font-black text-white">President</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Show track selector OR division options */}
          {!activeTrack ? (
            <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2" aria-label="Pilih jalur tim">
              {Object.entries(teamTracks).map(([trackId, track]) => {
                const Icon = track.icon;
                const TrackLink = TiltCard;
                return (
                  <TrackLink key={trackId} maxTilt={4} className="h-full">
                    <button
                      type="button"
                      onClick={() => { setActiveDivision(null); setActiveTrack(trackId); }}
                      aria-controls="division-options"
                      className="group relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-left transition-all duration-300 hover:border-sky-400/30 hover:bg-white/[0.06]"
                    >
                      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${track.accent}`} />
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-6 w-6" />
                      </div>
                      <small className="text-xs font-bold uppercase tracking-widest text-sky-400">{track.shortLabel}</small>
                      <strong className="mt-1 block font-display text-2xl font-black text-white">{track.label}</strong>
                      <p className="mt-2 text-sm font-light leading-relaxed text-white/50">{track.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {track.tags.map((tag) => (
                          <span key={tag} className="rounded-lg bg-white/5 px-3 py-1 text-xs font-semibold text-white/60">{tag}</span>
                        ))}
                      </div>
                      <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-sky-400">
                        Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </button>
                  </TrackLink>
                );
              })}
            </div>
          ) : (
            <div id="division-options" className="mt-16 animate-fade-in">
              {/* Track chapter header */}
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleBackToTracks}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/70 transition-colors hover:border-sky-400/30 hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <div>
                    <small className="text-xs font-bold uppercase tracking-widest text-sky-400">{selectedTrack.shortLabel}</small>
                    <h3 className="font-display text-2xl font-black text-white">{selectedTrack.label}</h3>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTrack.tags.map((tag) => (
                    <span key={tag} className="rounded-lg bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-200">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {visibleDivisions.map((division) => {
                  const isActive = activeDivision === division.id;
                  const isInactive = activeDivision && !isActive;
                  const accent = DIVISION_ACCENT[division.id];
                  return (
                    <button
                      key={division.id}
                      type="button"
                      onClick={() => (isActive ? handleBackToDivisions() : setActiveDivision(division.id))}
                      aria-pressed={isActive}
                      aria-controls="division-detail"
                      className={`group relative overflow-hidden rounded-3xl border p-6 text-left transition-all duration-300 ${
                        isActive
                          ? 'border-sky-400/40 bg-sky-500/10'
                          : 'border-white/10 bg-white/[0.03] hover:border-sky-400/25 hover:bg-white/[0.06]'
                      } ${isInactive ? 'opacity-40' : ''}`}
                    >
                      <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${accent.grad} text-white shadow-lg`}>
                        <DivisionGlyph division={division.id} />
                      </div>
                      <strong className="font-display text-2xl font-black text-white">{division.name}</strong>
                      <span className="mt-0.5 block text-sm font-semibold text-sky-300/80">{accent.label}</span>
                      <p className="mt-2 text-sm font-light leading-relaxed text-white/50">{division.tagline}</p>
                      <span className={`mt-4 inline-flex items-center gap-1 text-sm font-bold ${isActive ? 'text-white' : 'text-sky-400'}`}>
                        {isActive ? (<><ArrowLeft className="h-4 w-4" /> Back</>) : (<>Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Division detail ── */}
      {selectedTeam && (
        <section key={selectedTeam.id} id="division-detail" className="relative border-t border-white/5 bg-gradient-to-b from-[#060d1a] to-[#0a1628] py-16 animate-fade-in">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <SectionEyebrow>Discover {selectedTeam.name}</SectionEyebrow>
              <SectionTitle>
                Meet the <span className="gradient-text">{selectedTeam.name}</span> team
              </SectionTitle>
              <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed text-white/40">{selectedTeam.tagline}</p>
            </div>

            {showFacultyAdvisor && (
              <div className="mb-4">
                <FeaturedPerson person={selectedTeam.advisor} division={selectedTeam} kind="advisor" imageSide="right" />
              </div>
            )}

            <div className="mt-12">
              <FeaturedPerson person={selectedTeam.chair} division={selectedTeam} kind="chair" imageSide="right" />
            </div>

            {selectedTeam.subdivisions ? (
              <div className="mt-12">
                <SubdivisionExplorer team={selectedTeam} />
              </div>
            ) : (
              <div className="mt-12 border-t border-white/10 pt-10">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Our crew</span>
                  <SectionTitle>Anggota divisi {selectedTeam.name}</SectionTitle>
                  <p className="mt-2 text-sm font-light text-white/40">Tim lintas disiplin yang bekerja sebagai satu kesatuan.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {selectedTeam.members.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
