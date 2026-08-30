import React, { useEffect, useRef, useState } from 'react';
import './TeamPage.css';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Mail
} from 'lucide-react';
import { divisionTeams } from '../data/teamData';
import { siteConfig } from '../data/siteConfig';
import ImageWithFallback from '../components/ImageWithFallback';

const TEAM_GROUP_PHOTO = '/images/team/aterkia-team-group.webp';
const PRESIDENT_PHOTO = '/images/team/president/muhammad-bintang-tri-surya.webp';

const teamTracks = {
  TECHNICAL: {
    label: 'TEKNIS',
    shortLabel: 'Engineering & Robotics',
    description: 'Tim yang merancang, membangun, memprogram, dan menguji robot maritim Aterkia.',
    tags: ['ASV', 'AUV'],
    divisions: ['ASV', 'AUV']
  },
  NONTECHNICAL: {
    label: 'NONTEKNIS',
    shortLabel: 'Operations & Organization',
    description: 'Tim yang menjaga administrasi, keuangan, operasional, dan representasi Aterkia.',
    tags: ['Secretary & Treasurer', 'Official'],
    divisions: ['SECRETARY_TREASURER', 'OFFICIAL']
  }
};

const divisionPresentation = {
  ASV: {
    shortLabel: 'Surface Robotics',
    description: 'Kapal otonom untuk navigasi, persepsi, dan misi di permukaan air.',
    tags: ['Navigation', 'Hull', 'Telemetry']
  },
  AUV: {
    shortLabel: 'Underwater Robotics',
    description: 'Robot bawah air untuk persepsi visual, kendali, dan eksplorasi laut.',
    tags: ['Vision', 'Control', 'Pressure Hull']
  },
  SECRETARY_TREASURER: {
    shortLabel: 'Secretary & Treasurer',
    description: 'Menjaga administrasi, dokumentasi, penganggaran, dan akuntabilitas tim.',
    tags: ['Secretary', 'Finance', 'Administration']
  },
  OFFICIAL: {
    shortLabel: 'Official Team',
    description: 'Mengelola operasional, komunikasi, acara, dan representasi resmi Aterkia.',
    tags: ['Operations', 'Relations', 'Events']
  }
};

function DivisionGlyph({ division }) {
  if (division === 'ASV') {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M8 27.5h32l-5.2 8H14.1L8 27.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M18 27.5V18h12l5 9.5M24 18v-6M24 12h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 40c3 0 3-2 6-2s3 2 6 2 3-2 6-2 3 2 6 2 3-2 6-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (division === 'SECRETARY_TREASURER') {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M12 7h24v34H12zM18 15h12M18 22h7M18 32h12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="31" cy="23" r="6" fill="currentColor" opacity=".18" />
        <path d="M31 19v8M28.5 21.5H33a2 2 0 0 1 0 4h-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (division === 'OFFICIAL') {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="m24 6 5.2 5.4 7.4-1 1.3 7.3 6.1 4.2-3.5 6.6 2 7.2-7.1 2.3-3.1 6.8-8.3-2.8-8.3 2.8-3.1-6.8-7.1-2.3 2-7.2L4 21.9l6.1-4.2 1.3-7.3 7.4 1L24 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="m18.5 25 3.6 3.6 7.8-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
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

function MemberCard({ member }) {
  const firstName = member.fullName.split(' ')[0];
  const divisionName = member.division?.toLowerCase() || '';
  const divisionKey = divisionName.includes('auv')
    ? 'auv'
    : divisionName.includes('nontek')
      ? 'nontek'
      : 'asv';

  return (
    <article
      className="humaan-card-reveal is-visible"
    >
      <div className={`humaan-member-card humaan-member-card--${divisionKey} group`}>
        <ImageWithFallback
          src={member.photo}
          alt={`Foto ${member.fullName}`}
          name={member.fullName}
          division={member.division}
          type="team"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          containerClassName="h-full w-full"
        />

        <div className="humaan-name-pill" title={`${member.fullName} — ${member.role}`}>
          <span className="humaan-name-pill__name">{firstName}</span>
          <span className="humaan-name-pill__role">{member.role}</span>
        </div>
      </div>
    </article>
  );
}

function ScrollReveal({ children, className = '' }) {
  return (
    <div className={`org-scroll-reveal is-visible ${className}`}>
      {children}
    </div>
  );
}

// Flow illustrations are shown immediately. This avoids observers and delayed
// transitions when a large division tree is mounted after a selection.
function useFlowReveal(flowRef, variableNames, dependencyKey) {
  useEffect(() => {
    const flow = flowRef.current;
    if (!flow) return undefined;
    variableNames.forEach((name) => flow.style.setProperty(name, '1'));
    return undefined;
  }, [flowRef, dependencyKey]);
}

function ProfileContact({ icon: Icon, label, value, href }) {
  const content = (
    <>
      <span className="org-contact__icon"><Icon aria-hidden="true" /></span>
      <span className="org-contact__copy">
        <small>{label}</small>
        <strong>{value}</strong>
      </span>
      {href && <ArrowUpRight className="org-contact__arrow" aria-hidden="true" />}
    </>
  );

  if (!href) return <div className="org-contact org-contact--static">{content}</div>;

  const isExternal = href.startsWith('http');
  return (
    <a
      className="org-contact"
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      aria-label={`${label} ${value}`}
    >
      {content}
    </a>
  );
}

function FeaturedPerson({ person, division, kind, imageSide = 'right' }) {
  const isAdvisor = kind === 'advisor';
  const isSubteam = kind === 'subteam';
  const instagramHandle = person.instagram || '@aterkia.roboboat';
  const instagramUrl = `https://instagram.com/${instagramHandle.replace('@', '')}`;
  const email = person.email || `${division.name.toLowerCase()}@aterkia-undip.org`;
  const contacts = [
    { icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
    { icon: InstagramIcon, label: 'Instagram', value: instagramHandle, href: instagramUrl },
    {
      icon: LinkedinIcon,
      label: 'LinkedIn',
      value: person.linkedinLabel || person.fullName,
      href: person.linkedin || ''
    }
  ];

  return (
    <article
      className={`org-person org-person--${kind} org-person--image-${imageSide}`}
      data-person={person.id}
    >
      <div className="org-person__copy">
        <div className="org-person__topline">
          <span className="org-person__eyebrow">
            {isAdvisor ? 'Faculty & Research' : isSubteam ? 'Sub-division Leadership' : 'Division Leadership'}
          </span>
          <span className="org-person__topline-meta">
            <small>Aterkia</small>
            <i aria-hidden="true" />
            <b>{division.name}</b>
          </span>
        </div>

        <div className="org-person__identity">
          <div className="org-person__heading">
            <h3>{person.fullName}</h3>
            <p className="org-person__role">{person.role}</p>
          </div>

          <div className="org-person__details-grid">
            <div className="org-person__expertise">
              <span><b /> Area keahlian</span>
              <div>
                {person.expertise?.map((skill) => <i key={skill}>{skill}</i>)}
              </div>
            </div>
          </div>

          <div className="org-person__contact-area">
            <div className="org-person__contact-heading">
              <span>Connect</span>
              <small>Email & social profiles</small>
            </div>

            <div className="org-person__contacts" aria-label={`Kontak ${person.fullName}`}>
              {contacts.map((contact) => (
                <ProfileContact key={contact.label} {...contact} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="org-person__portrait">
        <span className="org-person__portrait-glow" aria-hidden="true" />
        <span className="org-person__division-mark">{division.name}</span>
        <div className="org-person__portrait-frame">
          <ImageWithFallback
            src={person.photo}
            alt={`Foto ${person.fullName}`}
            name={person.fullName}
            division={person.division}
            type="team"
            className="h-full w-full object-contain object-bottom"
            containerClassName="h-full w-full"
          />
          <div className="org-person__portrait-caption">
            <span>Aterkia / {division.name}</span>
            <strong>
              {isAdvisor
                ? 'Faculty Advisor'
                : kind === 'chair'
                  ? 'Division Lead'
                  : isSubteam
                    ? person.role
                  : 'Vice Division Lead'}
            </strong>
          </div>
        </div>

        <div className="org-person__portrait-note" aria-hidden="true">
          <span>Marine Robotics</span>
          <b>{division.name}</b>
        </div>
      </div>
    </article>
  );
}

function SubdivisionExplorer({ team }) {
  const [activeSubdivision, setActiveSubdivision] = useState(null);
  const flowRef = useRef(null);
  const subdivisions = Object.values(team.subdivisions || {});
  const selectedSubdivision = subdivisions.find((item) => item.id === activeSubdivision) || null;
  const selectedMembers = selectedSubdivision
    ? team.members.filter((member) => selectedSubdivision.memberIds.includes(member.id))
    : [];

  useEffect(() => {
    setActiveSubdivision(null);
  }, [team.id]);

  useFlowReveal(
    flowRef,
    ['--sub-heading', '--sub-trunk', '--sub-branches', '--sub-cards'],
    team.id
  );

  const selectSubdivision = (subdivisionId) => {
    setActiveSubdivision(subdivisionId);
  };

  return (
    <section className="subdivision-explorer" aria-labelledby={`${team.id.toLowerCase()}-subdivision-title`}>
      <div ref={flowRef} className="subdivision-flow">
        <header className="subdivision-flow__heading">
          <span>Inside {team.name}</span>
          <h2 id={`${team.id.toLowerCase()}-subdivision-title`}>
            Meet the <em>sub teams</em>
          </h2>
        </header>

        <svg className="subdivision-flow__lines" viewBox="0 0 1000 210" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="subdivision-water-gradient" gradientUnits="userSpaceOnUse" x1="500" y1="0" x2="500" y2="210">
              <stop offset="0" stopColor="#12c6e4" />
              <stop offset="0.52" stopColor="#557fe9" />
              <stop offset="1" stopColor="#ff8667" />
            </linearGradient>
          </defs>
          <path className="subdivision-flow__line-base water-flow-base" style={{ stroke: 'url(#subdivision-water-gradient)' }} d="M500 0 C500 38 494 58 500 78" />
          <path className="subdivision-flow__line-base water-flow-base" style={{ stroke: 'url(#subdivision-water-gradient)' }} d="M500 78 C468 118 390 126 250 146 C220 151 210 176 210 210" />
          <path className="subdivision-flow__line-base water-flow-base" style={{ stroke: 'url(#subdivision-water-gradient)' }} d="M500 78 C532 118 610 126 750 146 C780 151 790 176 790 210" />
          <path className="subdivision-flow__line subdivision-flow__line--trunk water-flow-line" style={{ stroke: 'url(#subdivision-water-gradient)' }} pathLength="1" d="M500 0 C500 38 494 58 500 78" />
          <path className="subdivision-flow__line subdivision-flow__line--mechanical water-flow-line" style={{ stroke: 'url(#subdivision-water-gradient)' }} pathLength="1" d="M500 78 C468 118 390 126 250 146 C220 151 210 176 210 210" />
          <path className="subdivision-flow__line subdivision-flow__line--elkapro water-flow-line" style={{ stroke: 'url(#subdivision-water-gradient)' }} pathLength="1" d="M500 78 C532 118 610 126 750 146 C780 151 790 176 790 210" />
        </svg>

        <div className={`team-selection-group subdivision-options ${activeSubdivision ? 'has-selection-lite' : ''}`}>
          {subdivisions.map((subdivision) => {
            const isActive = activeSubdivision === subdivision.id;
            const isInactive = activeSubdivision && !isActive;
            return (
              <button
                key={subdivision.id}
                type="button"
                className={`team-selection-card subdivision-option subdivision-option--${subdivision.id.toLowerCase()} ${isActive ? 'is-active-lite' : ''} ${isInactive ? 'is-inactive-lite' : ''}`}
                onClick={() => (isActive ? setActiveSubdivision(null) : selectSubdivision(subdivision.id))}
                aria-expanded={isActive}
                aria-controls={`${team.id.toLowerCase()}-subdivision-detail`}
              >
                <span className="subdivision-option__index">{subdivision.id === 'MECHANICAL' ? 'MECH' : 'ELKA'}</span>
                <strong>{subdivision.name}</strong>
                <small>{subdivision.fullName}</small>
                <p>{subdivision.description}</p>
                <span className={`subdivision-option__action ${isActive ? 'is-back' : ''}`}>
                  {isActive ? <><ArrowLeft /> Back</> : <>Explore <ArrowRight /></>}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedSubdivision && (
        <div
          key={`${team.id}-${selectedSubdivision.id}`}
          id={`${team.id.toLowerCase()}-subdivision-detail`}
          className={`team-selection-panel subdivision-result subdivision-result--${selectedSubdivision.id.toLowerCase()}`}
        >
          <header className="subdivision-result__story">
            <div className="subdivision-result__story-stage">
              <svg viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="subdivision-result-water-gradient" gradientUnits="userSpaceOnUse" x1="500" y1="0" x2="500" y2="560">
                    <stop offset="0" stopColor="#12c6e4" />
                    <stop offset="0.52" stopColor="#557fe9" />
                    <stop offset="1" stopColor="#ff8667" />
                  </linearGradient>
                </defs>
                <path
                  className="subdivision-result__line-base water-flow-base"
                  style={{ stroke: 'url(#subdivision-result-water-gradient)' }}
                  d={selectedSubdivision.id === 'MECHANICAL'
                    ? 'M500 0 C500 70 416 92 430 150 C440 192 486 214 500 240'
                    : 'M500 0 C500 70 584 92 570 150 C560 192 514 214 500 240'}
                />
                <path className="subdivision-result__line-base water-flow-base" style={{ stroke: 'url(#subdivision-result-water-gradient)' }} d="M500 326 C500 374 526 404 526 458 C526 508 504 536 500 560" />
                <path
                  className="subdivision-result__line subdivision-result__line--upper water-flow-line"
                  style={{ stroke: 'url(#subdivision-result-water-gradient)' }}
                  pathLength="1"
                  d={selectedSubdivision.id === 'MECHANICAL'
                    ? 'M500 0 C500 70 416 92 430 150 C440 192 486 214 500 240'
                    : 'M500 0 C500 70 584 92 570 150 C560 192 514 214 500 240'}
                />
                <path className="subdivision-result__line subdivision-result__line--lower water-flow-line" style={{ stroke: 'url(#subdivision-result-water-gradient)' }} pathLength="1" d="M500 326 C500 374 526 404 526 458 C526 508 504 536 500 560" />
              </svg>

              <div className="subdivision-result__story-title">
                <h2>Meet the <em>{selectedSubdivision.name}</em> lead</h2>
              </div>

            </div>
          </header>

          <ScrollReveal className="org-feature-wrap org-feature-wrap--subteam">
            <FeaturedPerson
              person={selectedSubdivision.leader}
              division={team}
              kind="subteam"
              imageSide={selectedSubdivision.id === 'MECHANICAL' ? 'right' : 'left'}
            />
          </ScrollReveal>

          <ScrollReveal className="division-members division-members--subteam">
            <div className="division-members__heading">
              <span>{selectedSubdivision.fullName}</span>
              <h2>Anggota {selectedSubdivision.name} {team.name}</h2>
              <p>Tim yang bekerja langsung bersama ketua sub-divisi dalam satu alur pengembangan.</p>
            </div>
            <div className="humaan-team-grid">
              {selectedMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      )}
    </section>
  );
}

export default function TeamPage() {
  const [activeTrack, setActiveTrack] = useState(null);
  const [activeDivision, setActiveDivision] = useState(null);
  const leaderStoryRef = useRef(null);
  const divisionStoryRef = useRef(null);
  const divisionProfileStoryRef = useRef(null);
  const divisionLeadershipStoryRef = useRef(null);
  const selectedTeam = activeDivision ? divisionTeams[activeDivision] : null;
  const selectedTrack = activeTrack ? teamTracks[activeTrack] : null;
  const showFacultyAdvisor = selectedTeam ? ['ASV', 'AUV'].includes(selectedTeam.id) : false;
  const visibleDivisions = selectedTrack
    ? selectedTrack.divisions.map((divisionId) => divisionTeams[divisionId])
    : [];
  const presidentContacts = [
    { icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: InstagramIcon, label: 'Instagram', value: '@roboboat_undip', href: siteConfig.socials.instagram },
    { icon: LinkedinIcon, label: 'LinkedIn', value: 'Aterkia RoboBoat', href: siteConfig.socials.linkedin }
  ];

  const handleBackToDivisions = () => {
    setActiveDivision(null);
  };

  const handleBackToTracks = () => {
    setActiveDivision(null);
    setActiveTrack(null);
  };

  const handleSelectTrack = (trackId) => {
    setActiveDivision(null);
    setActiveTrack(trackId);
  };

  const handleSelectDivision = (divisionId) => {
    setActiveDivision(divisionId);
  };

  useFlowReveal(
    leaderStoryRef,
    ['--leader-scroll', '--leader-upper', '--leader-vision', '--leader-lower'],
    'leader-story'
  );

  useFlowReveal(
    divisionStoryRef,
    ['--division-story-title', '--division-story-trunk', '--division-story-branches'],
    activeTrack || 'no-track'
  );

  useFlowReveal(
    divisionProfileStoryRef,
    ['--profile-intro', '--profile-upper', '--profile-advisor', '--profile-lower'],
    activeDivision || 'no-division'
  );

  useFlowReveal(
    divisionLeadershipStoryRef,
    ['--lead-upper', '--lead-title', '--lead-lower'],
    activeDivision || 'no-division'
  );

  return (
    <main className="team-page">
      <section className="team-group-section" aria-labelledby="team-title">
        <div className="team-group-stage">

          <div className="team-hero-meta" aria-label="Aterkia team profile">
            <span className="team-hero-meta__dot" aria-hidden="true" />
            <span>Team Profile</span>
            <span className="team-hero-meta__divider" aria-hidden="true" />
            <span>2025 / 2026</span>
          </div>

          <div className="team-group-title-motion">
            <h1 id="team-title" className="team-group-title">
              <span className="team-group-title__lead">Built by many. Moving as one.</span>
              <span className="team-group-title__brand">Aterkia</span>
            </h1>
          </div>

          <div className="team-group-photo-motion">
            <img
              src={TEAM_GROUP_PHOTO}
              alt="Foto bersama seluruh anggota tim Aterkia"
              decoding="async"
              fetchPriority="high"
              width="3000"
              height="893"
              className="team-group-photo"
            />
          </div>

          <div className="team-hero-footer centered">
            <a href="#meet-the-team" aria-label="View division options">
              <span>Explore the team</span>
              <ArrowDown />
            </a>
          </div>
        </div>

      </section>

      <section id="meet-the-team" className="division-selector" aria-label="Pilih divisi Aterkia">
        <div className="division-selector__intro division-selector__intro--president">
          <header ref={leaderStoryRef} className="team-structure__header">
            <div className="team-leader-story-stage">
              <div className="team-structure__heading-copy">
                <h2>
                  <span>Meet the team </span><em>leader</em>
                </h2>
              </div>

              <div className="team-leader-flow">
                <svg viewBox="0 0 180 620" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="leader-scroll-gradient" gradientUnits="userSpaceOnUse" x1="90" y1="0" x2="90" y2="620">
                      <stop offset="0" stopColor="#1cc8e7" />
                      <stop offset="0.5" stopColor="#6379ef" />
                      <stop offset="1" stopColor="#ff8f69" />
                    </linearGradient>
                  </defs>
                  <path className="team-leader-flow__path-base water-flow-base" style={{ stroke: 'url(#leader-scroll-gradient)' }} d="M90 0 C90 88 108 108 108 158 C108 194 94 204 90 220" />
                  <line className="team-leader-flow__path-base water-flow-base" style={{ stroke: 'url(#leader-scroll-gradient)' }} x1="90" y1="220" x2="90" y2="322" />
                  <path
                    className="team-leader-flow__path team-leader-flow__path--upper water-flow-line"
                    pathLength="1"
                    d="M90 0 C90 88 108 108 108 158 C108 194 94 204 90 220"
                  />
                  <path className="team-leader-flow__path-base water-flow-base" style={{ stroke: 'url(#leader-scroll-gradient)' }} d="M90 322 C88 382 72 408 72 474 C72 548 88 568 90 620" />
                  <path
                    className="team-leader-flow__path team-leader-flow__path--lower water-flow-line"
                    pathLength="1"
                    d="M90 322 C88 382 72 408 72 474 C72 548 88 568 90 620"
                  />
                </svg>
                <strong className="team-leader-flow__vision">
                  <span>One </span><em className="is-vision">vision</em>
                  <span> One </span><em className="is-direction">direction</em>
                </strong>
              </div>
            </div>
          </header>

          <article className="team-president" aria-labelledby="team-president-name">
            <span className="team-president__surface" aria-hidden="true" />
            <span className="team-president__signal team-president__signal--one" aria-hidden="true" />
            <span className="team-president__signal team-president__signal--two" aria-hidden="true" />

            <figure className="team-president__portrait">
              <img
                src={PRESIDENT_PHOTO}
                alt="Muhammad Bintang Tri Surya, President Aterkia"
                loading="lazy"
                decoding="async"
                width="720"
                height="1080"
              />
              <span className="team-president__portrait-shade" aria-hidden="true" />
              <figcaption>
                <span>Aterkia / Leadership</span>
                <strong>President</strong>
              </figcaption>
            </figure>

            <div className="team-president__profile">
              <div className="team-president__identity">
                <p>President of Aterkia</p>
                <h2 id="team-president-name">
                  <span>Muhammad Bintang Tri Surya</span>
                </h2>
                <div className="team-president__role-line">
                  <div>
                    <strong>Electrical Engineering ’23</strong>
                  </div>
                </div>
              </div>

              <div className="team-president__leadership">
                <span>Leadership focus</span>
                <p>
                  Menyatukan tim teknis dan nonteknis agar bergerak dalam satu visi.
                </p>
                <div className="team-president__focus-list" aria-label="Fokus kepemimpinan president">
                  <span>Technical Direction</span>
                  <span>Organization</span>
                  <span>Team Development</span>
                </div>
              </div>

              <div className="team-president__connect">
                <div className="team-president__connect-heading">
                  <span>Connect</span>
                  <small>Official contact & social profiles</small>
                </div>
                <div className="team-president__contacts">
                  {presidentContacts.map((contact) => (
                    <ProfileContact key={contact.label} {...contact} />
                  ))}
                </div>
              </div>
            </div>
          </article>

          <div
            className={`team-structure__bridge is-visible ${selectedTrack ? 'is-selected' : ''}`}
            aria-hidden="true"
          >
            <svg className="team-structure__bridge-lines" viewBox="0 0 1000 500" preserveAspectRatio="none">
              <defs>
                <linearGradient id="team-structure-water-gradient" gradientUnits="userSpaceOnUse" x1="500" y1="0" x2="500" y2="500">
                  <stop offset="0" stopColor="#12c6e4" />
                  <stop offset="0.52" stopColor="#557fe9" />
                  <stop offset="1" stopColor="#ff8667" />
                </linearGradient>
              </defs>
              <path className="team-structure__bridge-line-base water-flow-base" style={{ stroke: 'url(#team-structure-water-gradient)' }} d="M500 0 C500 52 490 92 500 132" />
              <path className="team-structure__bridge-line team-structure__bridge-line--trunk water-flow-line" style={{ stroke: 'url(#team-structure-water-gradient)' }} pathLength="1" d="M500 0 C500 52 490 92 500 132" />
              {!selectedTrack ? (
                <>
                  <path className="team-structure__bridge-line-base water-flow-base" style={{ stroke: 'url(#team-structure-water-gradient)' }} d="M500 350 C482 390 435 408 365 427 C306 444 270 468 250 500" />
                  <path className="team-structure__bridge-line-base water-flow-base" style={{ stroke: 'url(#team-structure-water-gradient)' }} d="M500 350 C518 390 565 408 635 427 C694 444 730 468 750 500" />
                  <path className="team-structure__bridge-line team-structure__bridge-line--left water-flow-line" style={{ stroke: 'url(#team-structure-water-gradient)' }} pathLength="1" d="M500 350 C482 390 435 408 365 427 C306 444 270 468 250 500" />
                  <path className="team-structure__bridge-line team-structure__bridge-line--right water-flow-line" style={{ stroke: 'url(#team-structure-water-gradient)' }} pathLength="1" d="M500 350 C518 390 565 408 635 427 C694 444 730 468 750 500" />
                  <path className="team-structure__bridge-line team-structure__bridge-line--mobile water-flow-line" style={{ stroke: 'url(#team-structure-water-gradient)' }} pathLength="1" d="M500 350 C494 404 506 451 500 500" />
                </>
              ) : (
                <>
                  <path className="team-structure__bridge-line-base water-flow-base" style={{ stroke: 'url(#team-structure-water-gradient)' }} d="M500 350 C494 404 506 451 500 500" />
                  <path className="team-structure__bridge-line team-structure__bridge-line--single water-flow-line" style={{ stroke: 'url(#team-structure-water-gradient)' }} pathLength="1" d="M500 350 C494 404 506 451 500 500" />
                </>
              )}
            </svg>
            <div className="team-structure__bridge-node">
              <strong><span>Team </span><em>structure</em></strong>
            </div>
          </div>
        </div>

        {!activeTrack ? (
          <div
            className="team-selection-group team-track-grid"
            aria-label="Pilih jalur tim"
          >
            {Object.entries(teamTracks).map(([trackId, track]) => {
              return (
                <button
                  key={trackId}
                  type="button"
                  className={`team-selection-card team-track-card team-track-card--${trackId.toLowerCase()}`}
                  onClick={() => handleSelectTrack(trackId)}
                  aria-controls="division-options"
                >
                  <span className="team-track-card__surface" aria-hidden="true" />
                  <span className="team-track-card__rail" aria-hidden="true" />
                  <span className="team-track-card__copy">
                    <small>{track.shortLabel}</small>
                    <strong>{track.label}</strong>
                    <span>{track.description}</span>
                    <span className="team-track-card__tags">
                      {track.tags.map((tag) => <i key={tag}>{tag}</i>)}
                    </span>
                  </span>
                  <span className="team-track-card__action">Explore <ArrowRight /></span>
                </button>
              );
            })}
          </div>
        ) : (
          <div
            id="division-options"
            className={`team-selection-panel division-path division-path--${activeTrack.toLowerCase()}`}
          >
            <article className={`track-chapter-card track-chapter-card--${activeTrack.toLowerCase()}`}>
              <span className="track-chapter-card__surface" aria-hidden="true" />
              <span className="track-chapter-card__rail" aria-hidden="true" />
              <button
                type="button"
                className="track-chapter-card__back"
                onClick={handleBackToTracks}
              >
                <ArrowLeft />
                <span>Back</span>
              </button>
              <div className="track-chapter-card__copy">
                <small>{selectedTrack.shortLabel}</small>
                <h2>{selectedTrack.label}</h2>
                <p>{selectedTrack.description}</p>
                <span className="track-chapter-card__tags">
                  {selectedTrack.tags.map((tag) => <i key={tag}>{tag}</i>)}
                </span>
              </div>
              <span className="track-chapter-card__flow-origin" aria-hidden="true" />
            </article>

            <header ref={divisionStoryRef} className="division-route-story">
              <div className="division-route-story__stage">
                <div className="division-route-story__heading">
                  <h2>Choose your <em>division</em></h2>
                </div>

                <svg className="division-route-story__flow" viewBox="0 0 1000 460" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="division-route-water-gradient" gradientUnits="userSpaceOnUse" x1="500" y1="0" x2="500" y2="460">
                      <stop offset="0" stopColor="#12c6e4" />
                      <stop offset="0.52" stopColor="#557fe9" />
                      <stop offset="1" stopColor="#ff8667" />
                    </linearGradient>
                  </defs>
                  <path className="division-route-story__line-base water-flow-base" style={{ stroke: 'url(#division-route-water-gradient)' }} d="M500 0 C500 62 486 102 500 158" />
                  <path className="division-route-story__line-base water-flow-base" style={{ stroke: 'url(#division-route-water-gradient)' }} d="M500 158 C474 236 386 264 250 304 C220 313 210 370 210 460" />
                  <path className="division-route-story__line-base water-flow-base" style={{ stroke: 'url(#division-route-water-gradient)' }} d="M500 158 C526 236 614 264 750 304 C780 313 790 370 790 460" />
                  <path className="division-route-story__line division-route-story__line--trunk water-flow-line" style={{ stroke: 'url(#division-route-water-gradient)' }} pathLength="1" d="M500 0 C500 62 486 102 500 158" />
                  <path className="division-route-story__line division-route-story__line--left water-flow-line" style={{ stroke: 'url(#division-route-water-gradient)' }} pathLength="1" d="M500 158 C474 236 386 264 250 304 C220 313 210 370 210 460" />
                  <path className="division-route-story__line division-route-story__line--right water-flow-line" style={{ stroke: 'url(#division-route-water-gradient)' }} pathLength="1" d="M500 158 C526 236 614 264 750 304 C780 313 790 370 790 460" />
                </svg>
              </div>
            </header>

            <div className={`team-selection-group division-split ${activeDivision ? 'has-selection has-selection-lite' : ''}`}>
              {visibleDivisions.map((division) => {
                const isActive = activeDivision === division.id;
                const isInactive = activeDivision && !isActive;
                const presentation = divisionPresentation[division.id];

                return (
                    <button
                      key={division.id}
                      type="button"
                      onClick={() => (isActive ? handleBackToDivisions() : handleSelectDivision(division.id))}
                      aria-pressed={isActive}
                      aria-controls="division-detail"
                      className={`team-selection-card division-choice division-choice--${division.id.toLowerCase()} ${isActive ? 'is-active-lite' : ''} ${isInactive ? 'is-inactive-lite' : ''}`}
                    >
                      <span className="division-choice__surface" aria-hidden="true" />
                      <span className="division-choice__icon">
                        <DivisionGlyph division={division.id} />
                      </span>
                      <span className="division-choice__content">
                        <strong>{division.name}</strong>
                        <span>{presentation.shortLabel}</span>
                        <small>{presentation.description}</small>
                      </span>
                      <span className={`division-choice__action ${isActive ? 'is-back-lite' : ''}`}>
                        {isActive ? (
                          <><ArrowLeft /> Back</>
                        ) : (
                          <>Explore <ArrowRight /></>
                        )}
                      </span>
                    </button>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {selectedTeam && (
        <section key={selectedTeam.id} id="division-detail" className={`team-selection-panel division-detail division-detail--${selectedTeam.id.toLowerCase()}`}>
          {showFacultyAdvisor && (
            <>
              <header ref={divisionProfileStoryRef} className="division-profile-story">
                <div className="division-profile-story__stage">
                  <div className="division-profile-story__intro">
                    <h2>Discover <em>{selectedTeam.name}</em></h2>
                    <p>{selectedTeam.tagline}</p>
                  </div>

                  <div className="division-profile-story__flow">
                    <svg viewBox="0 0 180 640" preserveAspectRatio="none" aria-hidden="true">
                      <defs>
                        <linearGradient id="division-profile-water-gradient" gradientUnits="userSpaceOnUse" x1="90" y1="0" x2="90" y2="640">
                          <stop offset="0" stopColor="#12c6e4" />
                          <stop offset="0.52" stopColor="#557fe9" />
                          <stop offset="1" stopColor="#ff8667" />
                        </linearGradient>
                      </defs>
                      <path className="division-profile-story__line-base water-flow-base" style={{ stroke: 'url(#division-profile-water-gradient)' }} d="M90 0 C90 72 108 104 108 164 C108 204 96 224 90 244" />
                      <path className="division-profile-story__line-base water-flow-base" style={{ stroke: 'url(#division-profile-water-gradient)' }} d="M90 396 C84 430 72 452 72 514 C72 578 88 604 90 640" />
                      <path className="division-profile-story__line division-profile-story__line--upper water-flow-line" style={{ stroke: 'url(#division-profile-water-gradient)' }} pathLength="1" d="M90 0 C90 72 108 104 108 164 C108 204 96 224 90 244" />
                      <path className="division-profile-story__line division-profile-story__line--lower water-flow-line" style={{ stroke: 'url(#division-profile-water-gradient)' }} pathLength="1" d="M90 396 C84 430 72 452 72 514 C72 578 88 604 90 640" />
                    </svg>

                    <div className="division-profile-story__advisor-title">
                      <h2>Meet the <em>faculty advisor</em></h2>
                      <p>The guiding mind behind {selectedTeam.name} research, safety, and engineering direction.</p>
                    </div>
                  </div>
                </div>
              </header>

              <ScrollReveal className="org-feature-wrap org-feature-wrap--advisor">
                <FeaturedPerson person={selectedTeam.advisor} division={selectedTeam} kind="advisor" imageSide="right" />
              </ScrollReveal>
            </>
          )}

          <header ref={divisionLeadershipStoryRef} className="division-leadership-story">
            <div className="division-leadership-story__stage">
              <svg viewBox="0 0 180 620" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="division-leadership-water-gradient" gradientUnits="userSpaceOnUse" x1="90" y1="0" x2="90" y2="620">
                    <stop offset="0" stopColor="#12c6e4" />
                    <stop offset="0.52" stopColor="#557fe9" />
                    <stop offset="1" stopColor="#ff8667" />
                  </linearGradient>
                </defs>
                <path className="division-leadership-story__line-base water-flow-base" style={{ stroke: 'url(#division-leadership-water-gradient)' }} d="M90 0 C90 72 64 98 64 166 C64 218 82 240 90 264" />
                <path className="division-leadership-story__line-base water-flow-base" style={{ stroke: 'url(#division-leadership-water-gradient)' }} d="M90 356 C98 392 120 422 120 492 C120 550 98 586 90 620" />
                <path className="division-leadership-story__line division-leadership-story__line--upper water-flow-line" style={{ stroke: 'url(#division-leadership-water-gradient)' }} pathLength="1" d="M90 0 C90 72 64 98 64 166 C64 218 82 240 90 264" />
                <path className="division-leadership-story__line division-leadership-story__line--lower water-flow-line" style={{ stroke: 'url(#division-leadership-water-gradient)' }} pathLength="1" d="M90 356 C98 392 120 422 120 492 C120 550 98 586 90 620" />
              </svg>

              <div className="division-leadership-story__title">
                <h2>Meet the <em>{selectedTeam.name}</em> leader</h2>
              </div>
            </div>
          </header>

          <ScrollReveal className="org-feature-wrap org-feature-wrap--chair">
            <FeaturedPerson person={selectedTeam.chair} division={selectedTeam} kind="chair" imageSide="right" />
          </ScrollReveal>

          {selectedTeam.subdivisions ? (
            <SubdivisionExplorer team={selectedTeam} />
          ) : (
            <ScrollReveal className="division-members">
              <div className="division-members__heading">
                <span>Our crew</span>
                <h2>Anggota divisi {selectedTeam.name}</h2>
                <p>Tim lintas disiplin yang bekerja sebagai satu kesatuan.</p>
              </div>
              <div className="humaan-team-grid">
                {selectedTeam.members.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </ScrollReveal>
          )}
        </section>
      )}
    </main>
  );
}
