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

const TEAM_GROUP_PHOTO = '/images/team/aterkia-team-group.png';
const PRESIDENT_PHOTO = '/images/team/president/muhammad-bintang-tri-surya.png';

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

function MemberCard({ member, order }) {
  const cardRef = useRef(null);
  const firstName = member.fullName.split(' ')[0];
  const divisionName = member.division?.toLowerCase() || '';
  const divisionKey = divisionName.includes('auv')
    ? 'auv'
    : divisionName.includes('nontek')
      ? 'nontek'
      : 'asv';

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.add('is-visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.classList.add('is-visible');
        observer.unobserve(element);
      },
      { threshold: 0.12, rootMargin: '0px 0px -4% 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className="humaan-card-reveal"
      style={{ '--card-delay': `${(order % 4) * 80}ms` }}
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
  const revealRef = useRef(null);

  useEffect(() => {
    const element = revealRef.current;
    if (!element) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.add('is-visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.classList.add('is-visible');
        observer.unobserve(element);
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={revealRef} className={`org-scroll-reveal ${className}`}>
      {children}
    </div>
  );
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
  const resultFlowRef = useRef(null);
  const subdivisions = Object.values(team.subdivisions || {});
  const selectedSubdivision = subdivisions.find((item) => item.id === activeSubdivision) || null;
  const selectedMembers = selectedSubdivision
    ? team.members.filter((member) => selectedSubdivision.memberIds.includes(member.id))
    : [];

  useEffect(() => {
    setActiveSubdivision(null);
  }, [team.id]);

  useEffect(() => {
    const flow = flowRef.current;
    if (!flow) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      flow.style.setProperty('--sub-heading', '1');
      flow.style.setProperty('--sub-trunk', '1');
      flow.style.setProperty('--sub-branches', '1');
      flow.style.setProperty('--sub-cards', '1');
      return undefined;
    }

    let frameId;
    let currentProgress = 0;
    let targetProgress = 0;

    const applyProgress = (progress) => {
      flow.style.setProperty('--sub-heading', Math.min(1, progress / 0.25).toFixed(3));
      flow.style.setProperty('--sub-trunk', Math.max(0, Math.min(1, (progress - 0.12) / 0.34)).toFixed(3));
      flow.style.setProperty('--sub-branches', Math.max(0, Math.min(1, (progress - 0.38) / 0.38)).toFixed(3));
      flow.style.setProperty('--sub-cards', Math.max(0, Math.min(1, (progress - 0.62) / 0.38)).toFixed(3));
    };

    const updateTarget = () => {
      const bounds = flow.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const distance = Math.max(viewportHeight * 0.52, bounds.height - viewportHeight * 0.04);
      targetProgress = Math.max(0, Math.min(1, (viewportHeight * 0.96 - bounds.top) / distance));
    };

    const render = () => {
      currentProgress += (targetProgress - currentProgress) * 0.1;
      applyProgress(currentProgress);
      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress;
        applyProgress(currentProgress);
        frameId = undefined;
        return;
      }
      frameId = window.requestAnimationFrame(render);
    };

    const requestUpdate = () => {
      updateTarget();
      if (frameId === undefined) frameId = window.requestAnimationFrame(render);
    };

    updateTarget();
    currentProgress = targetProgress;
    applyProgress(currentProgress);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [team.id]);

  useEffect(() => {
    const flow = resultFlowRef.current;
    if (!flow || !selectedSubdivision) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      flow.style.setProperty('--sub-result-upper', '1');
      flow.style.setProperty('--sub-result-title', '1');
      flow.style.setProperty('--sub-result-lower', '1');
      return undefined;
    }

    let frameId;
    let currentProgress = 0;
    let targetProgress = 0;

    const applyProgress = (progress) => {
      flow.style.setProperty('--sub-result-upper', Math.min(1, progress / 0.46).toFixed(3));
      flow.style.setProperty('--sub-result-title', Math.max(0, Math.min(1, (progress - 0.27) / 0.34)).toFixed(3));
      flow.style.setProperty('--sub-result-lower', Math.max(0, Math.min(1, (progress - 0.44) / 0.56)).toFixed(3));
    };

    const updateTarget = () => {
      const bounds = flow.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const distance = Math.max(viewportHeight * 0.54, bounds.height - viewportHeight * 0.06);
      targetProgress = Math.max(0, Math.min(1, (viewportHeight * 0.95 - bounds.top) / distance));
    };

    const render = () => {
      currentProgress += (targetProgress - currentProgress) * 0.1;
      applyProgress(currentProgress);
      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress;
        applyProgress(currentProgress);
        frameId = undefined;
        return;
      }
      frameId = window.requestAnimationFrame(render);
    };

    const requestUpdate = () => {
      updateTarget();
      if (frameId === undefined) frameId = window.requestAnimationFrame(render);
    };

    updateTarget();
    currentProgress = targetProgress;
    applyProgress(currentProgress);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [selectedSubdivision]);

  const selectSubdivision = (subdivisionId) => {
    setActiveSubdivision(subdivisionId);
    window.setTimeout(() => {
      document.getElementById(`${team.id.toLowerCase()}-subdivision-detail`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 360);
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

        <div className={`subdivision-options ${activeSubdivision ? 'has-selection' : ''}`}>
          {subdivisions.map((subdivision) => {
            const isActive = activeSubdivision === subdivision.id;
            const isCollapsed = activeSubdivision && !isActive;
            return (
              <button
                key={subdivision.id}
                type="button"
                className={`subdivision-option subdivision-option--${subdivision.id.toLowerCase()} ${isActive ? 'is-active' : ''} ${isCollapsed ? 'is-collapsed' : ''}`}
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
          className={`subdivision-result subdivision-result--${selectedSubdivision.id.toLowerCase()}`}
        >
          <header ref={resultFlowRef} className="subdivision-result__story">
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
              {selectedMembers.map((member, index) => (
                <MemberCard key={member.id} member={member} order={index} />
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
  const [pendingTrack, setPendingTrack] = useState(null);
  const [isReturningToTracks, setIsReturningToTracks] = useState(false);
  const [activeDivision, setActiveDivision] = useState(null);
  const groupSectionRef = useRef(null);
  const groupPhotoRef = useRef(null);
  const groupTitleRef = useRef(null);
  const leaderStoryRef = useRef(null);
  const structureBridgeRef = useRef(null);
  const divisionStoryRef = useRef(null);
  const divisionProfileStoryRef = useRef(null);
  const divisionLeadershipStoryRef = useRef(null);
  const trackTransitionTimerRef = useRef(null);
  const selectedTeam = activeDivision ? divisionTeams[activeDivision] : null;
  const selectedTrack = activeTrack ? teamTracks[activeTrack] : null;
  const visibleDivisions = selectedTrack
    ? selectedTrack.divisions.map((divisionId) => divisionTeams[divisionId])
    : [];
  const presidentContacts = [
    { icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: InstagramIcon, label: 'Instagram', value: '@roboboat_undip', href: siteConfig.socials.instagram },
    { icon: LinkedinIcon, label: 'LinkedIn', value: 'Aterkia RoboBoat', href: siteConfig.socials.linkedin }
  ];

  const handleBackToDivisions = () => {
    const selector = document.querySelector('.division-selector');
    setActiveDivision(null);
    window.requestAnimationFrame(() => {
      selector?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleBackToTracks = () => {
    if (isReturningToTracks) return;

    const transitionDelay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 560;
    setIsReturningToTracks(true);
    trackTransitionTimerRef.current = window.setTimeout(() => {
      setActiveDivision(null);
      setActiveTrack(null);
      setIsReturningToTracks(false);
      trackTransitionTimerRef.current = null;
      window.requestAnimationFrame(() => {
        document.querySelector('.team-track-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }, transitionDelay);
  };

  const handleSelectTrack = (trackId) => {
    if (pendingTrack) return;

    const transitionDelay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 620;
    setPendingTrack(trackId);
    trackTransitionTimerRef.current = window.setTimeout(() => {
      setActiveDivision(null);
      setActiveTrack(trackId);
      setPendingTrack(null);
      trackTransitionTimerRef.current = null;
    }, transitionDelay);
  };

  useEffect(() => () => {
    if (trackTransitionTimerRef.current) {
      window.clearTimeout(trackTransitionTimerRef.current);
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frameId;
    let isHeroVisible = true;
    const updateGroupHero = () => {
      frameId = undefined;
      const section = groupSectionRef.current;
      if (!section || !isHeroVisible) return;

      const bounds = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -bounds.top / window.innerHeight));

      if (groupPhotoRef.current) {
        groupPhotoRef.current.style.transform = `translate3d(0, ${progress * -42}px, 0)`;
      }
      if (groupTitleRef.current) {
        groupTitleRef.current.style.transform = `translate3d(0, ${progress * -68}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!isHeroVisible) return;
      if (frameId === undefined) frameId = window.requestAnimationFrame(updateGroupHero);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isHeroVisible = entry.isIntersecting;
        entry.target.classList.toggle('is-parallax-active', isHeroVisible);
        if (isHeroVisible) onScroll();
      },
      { rootMargin: '120px 0px' }
    );

    updateGroupHero();
    if (groupSectionRef.current) visibilityObserver.observe(groupSectionRef.current);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
      visibilityObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const story = leaderStoryRef.current;
    if (!story) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      story.style.setProperty('--leader-scroll', '1');
      story.style.setProperty('--leader-upper', '1');
      story.style.setProperty('--leader-vision', '1');
      story.style.setProperty('--leader-lower', '1');
      return undefined;
    }

    let frameId;
    let currentProgress = 0;
    let targetProgress = 0;

    const applyLeaderProgress = (progress) => {
      story.style.setProperty('--leader-scroll', progress.toFixed(3));
      story.style.setProperty('--leader-upper', Math.min(1, progress / 0.56).toFixed(3));
      story.style.setProperty('--leader-vision', Math.max(0, Math.min(1, (progress - 0.24) / 0.34)).toFixed(3));
      story.style.setProperty('--leader-lower', Math.max(0, Math.min(1, (progress - 0.44) / 0.56)).toFixed(3));
    };

    const updateTargetProgress = () => {
      const bounds = story.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.94;
      const scrollDistance = Math.max(viewportHeight * 0.72, bounds.height - (viewportHeight * 0.1));
      targetProgress = Math.max(0, Math.min(1, (start - bounds.top) / scrollDistance));
    };

    const renderLeaderStory = () => {
      currentProgress += (targetProgress - currentProgress) * 0.11;

      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress;
        applyLeaderProgress(currentProgress);
        frameId = undefined;
        return;
      }

      applyLeaderProgress(currentProgress);
      frameId = window.requestAnimationFrame(renderLeaderStory);
    };

    const requestUpdate = () => {
      updateTargetProgress();
      if (frameId === undefined) frameId = window.requestAnimationFrame(renderLeaderStory);
    };

    updateTargetProgress();
    currentProgress = targetProgress;
    applyLeaderProgress(currentProgress);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  useEffect(() => {
    const bridge = structureBridgeRef.current;
    if (!bridge) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      bridge.classList.add('is-visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        bridge.classList.toggle('is-visible', entry.isIntersecting);
      },
      { threshold: 0.04, rootMargin: '0px 0px 28% 0px' }
    );

    observer.observe(bridge);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const story = divisionStoryRef.current;
    if (!story || !activeTrack) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      story.style.setProperty('--division-story-title', '1');
      story.style.setProperty('--division-story-trunk', '1');
      story.style.setProperty('--division-story-branches', '1');
      return undefined;
    }

    let frameId;
    let currentProgress = 0;
    let targetProgress = 0;

    const applyProgress = (progress) => {
      story.style.setProperty('--division-story-title', '1');
      story.style.setProperty('--division-story-trunk', Math.max(0, Math.min(1, (progress - 0.02) / 0.3)).toFixed(3));
      story.style.setProperty('--division-story-branches', Math.max(0, Math.min(1, (progress - 0.25) / 0.65)).toFixed(3));
    };

    const updateTarget = () => {
      const bounds = story.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.96;
      const distance = Math.max(viewportHeight * 0.56, bounds.height - viewportHeight * 0.06);
      targetProgress = Math.max(0, Math.min(1, (start - bounds.top) / distance));
    };

    const render = () => {
      currentProgress += (targetProgress - currentProgress) * 0.1;
      applyProgress(currentProgress);

      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress;
        applyProgress(currentProgress);
        frameId = undefined;
        return;
      }

      frameId = window.requestAnimationFrame(render);
    };

    const requestUpdate = () => {
      updateTarget();
      if (frameId === undefined) frameId = window.requestAnimationFrame(render);
    };

    updateTarget();
    currentProgress = targetProgress;
    applyProgress(currentProgress);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    const scrollTimer = window.setTimeout(() => {
      document.getElementById('division-options')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      requestUpdate();
    }, 80);

    return () => {
      window.clearTimeout(scrollTimer);
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [activeTrack]);

  useEffect(() => {
    const story = divisionProfileStoryRef.current;
    if (!story || !activeDivision) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      story.style.setProperty('--profile-intro', '1');
      story.style.setProperty('--profile-upper', '1');
      story.style.setProperty('--profile-advisor', '1');
      story.style.setProperty('--profile-lower', '1');
      return undefined;
    }

    let frameId;
    let currentProgress = 0;
    let targetProgress = 0;

    const applyProgress = (progress) => {
      story.style.setProperty('--profile-intro', Math.min(1, progress / 0.24).toFixed(3));
      story.style.setProperty('--profile-upper', Math.max(0, Math.min(1, (progress - 0.1) / 0.4)).toFixed(3));
      story.style.setProperty('--profile-advisor', Math.max(0, Math.min(1, (progress - 0.34) / 0.32)).toFixed(3));
      story.style.setProperty('--profile-lower', Math.max(0, Math.min(1, (progress - 0.46) / 0.54)).toFixed(3));
    };

    const updateTarget = () => {
      const bounds = story.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const entryLine = viewportHeight * 0.95;
      const distance = Math.max(viewportHeight * 0.6, bounds.height - viewportHeight * 0.08);

      // Start as soon as the story enters the viewport, then reveal every
      // segment in the same top-to-bottom direction as the reading flow.
      targetProgress = Math.max(0, Math.min(1, (entryLine - bounds.top) / distance));
    };

    const render = () => {
      currentProgress += (targetProgress - currentProgress) * 0.1;
      applyProgress(currentProgress);
      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress;
        applyProgress(currentProgress);
        frameId = undefined;
        return;
      }
      frameId = window.requestAnimationFrame(render);
    };

    const requestUpdate = () => {
      updateTarget();
      if (frameId === undefined) frameId = window.requestAnimationFrame(render);
    };

    updateTarget();
    currentProgress = targetProgress;
    applyProgress(currentProgress);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [activeDivision]);

  useEffect(() => {
    const story = divisionLeadershipStoryRef.current;
    if (!story || !activeDivision) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      story.style.setProperty('--lead-upper', '1');
      story.style.setProperty('--lead-title', '1');
      story.style.setProperty('--lead-lower', '1');
      return undefined;
    }

    let frameId;
    let currentProgress = 0;
    let targetProgress = 0;

    const applyProgress = (progress) => {
      story.style.setProperty('--lead-upper', Math.min(1, progress / 0.46).toFixed(3));
      story.style.setProperty('--lead-title', Math.max(0, Math.min(1, (progress - 0.28) / 0.34)).toFixed(3));
      story.style.setProperty('--lead-lower', Math.max(0, Math.min(1, (progress - 0.44) / 0.56)).toFixed(3));
    };

    const updateTarget = () => {
      const bounds = story.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const entryLine = viewportHeight * 0.95;
      const distance = Math.max(viewportHeight * 0.56, bounds.height - viewportHeight * 0.06);
      targetProgress = Math.max(0, Math.min(1, (entryLine - bounds.top) / distance));
    };

    const render = () => {
      currentProgress += (targetProgress - currentProgress) * 0.095;
      applyProgress(currentProgress);
      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress;
        applyProgress(currentProgress);
        frameId = undefined;
        return;
      }
      frameId = window.requestAnimationFrame(render);
    };

    const requestUpdate = () => {
      updateTarget();
      if (frameId === undefined) frameId = window.requestAnimationFrame(render);
    };

    updateTarget();
    currentProgress = targetProgress;
    applyProgress(currentProgress);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [activeDivision]);

  return (
    <main className="team-page">
      <section ref={groupSectionRef} className="team-group-section" aria-labelledby="team-title">
        <div className="team-group-stage">

          <div ref={groupTitleRef} className="team-group-title-motion">
            <h1 id="team-title" className="team-group-title">
              <span className="team-group-title__lead">We are</span>
              <span className="team-group-title__brand">Aterkia</span>
            </h1>
          </div>

          <div ref={groupPhotoRef} className="team-group-photo-motion">
            <img
              src={TEAM_GROUP_PHOTO}
              alt="Tim Aterkia bersama setelah meraih penghargaan"
              decoding="async"
              fetchPriority="high"
              className="team-group-photo"
            />
          </div>

          <div className="team-hero-footer centered">
            <a href="#meet-the-team" aria-label="View division options">
              <span>Meet the team</span>
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
            ref={structureBridgeRef}
            className={`team-structure__bridge ${selectedTrack ? 'is-selected' : ''}`}
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
            className={`team-track-grid ${pendingTrack ? 'is-transitioning' : ''}`}
            aria-label="Pilih jalur tim"
            aria-busy={Boolean(pendingTrack)}
          >
            {Object.entries(teamTracks).map(([trackId, track]) => (
              <button
                key={trackId}
                type="button"
                className={`team-track-card team-track-card--${trackId.toLowerCase()} ${pendingTrack === trackId ? 'is-entering' : pendingTrack ? 'is-leaving' : ''}`}
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
            ))}
          </div>
        ) : (
          <div
            id="division-options"
            className={`division-path division-path--${activeTrack.toLowerCase()} ${isReturningToTracks ? 'is-returning' : ''}`}
          >
            <article className={`track-chapter-card track-chapter-card--${activeTrack.toLowerCase()}`}>
              <span className="track-chapter-card__surface" aria-hidden="true" />
              <span className="track-chapter-card__rail" aria-hidden="true" />
              <button
                type="button"
                className="track-chapter-card__back"
                onClick={handleBackToTracks}
                disabled={isReturningToTracks}
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

            <div className={`division-split ${activeDivision ? 'has-selection' : ''}`}>
              {visibleDivisions.map((division) => {
                const isActive = activeDivision === division.id;
                const isCollapsed = activeDivision && !isActive;
                const presentation = divisionPresentation[division.id];

                return (
                  <React.Fragment key={division.id}>
                    <button
                      type="button"
                      onClick={() => (isActive ? handleBackToDivisions() : setActiveDivision(division.id))}
                      aria-pressed={isActive}
                      aria-controls="division-detail"
                      className={`division-choice division-choice--${division.id.toLowerCase()} ${isActive ? 'is-active' : ''} ${isCollapsed ? 'is-collapsed' : ''}`}
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
                      <span className={`division-choice__action ${isActive ? 'is-back' : ''}`}>
                        {isActive ? (
                          <><ArrowLeft /> Back</>
                        ) : (
                          <>Explore <ArrowRight /></>
                        )}
                      </span>
                    </button>

                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {selectedTeam && (
        <section key={selectedTeam.id} id="division-detail" className={`division-detail division-detail--${selectedTeam.id.toLowerCase()}`}>
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
                {selectedTeam.members.map((member, index) => (
                  <MemberCard key={member.id} member={member} order={index} />
                ))}
              </div>
            </ScrollReveal>
          )}
        </section>
      )}
    </main>
  );
}
