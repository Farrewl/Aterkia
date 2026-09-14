import React from 'react';
import AboutHero from '../components/AboutHero';
import CompetedMap from '../components/CompetedMap';
import AboutMission from '../components/AboutMission';
import AboutAdvisors from '../components/AboutAdvisors';
import AboutRoadmap from '../components/AboutRoadmap';

export default function AboutPage() {
  return (
    <div className="bg-[#060D17] text-white">
      <AboutHero />
      <AboutMission />
      <CompetedMap />
      <AboutAdvisors />
      <AboutRoadmap />
    </div>
  );
}
