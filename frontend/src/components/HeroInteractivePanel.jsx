import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '../i18n';
import { Link } from 'react-router-dom';

export default function HeroInteractivePanel() {
  const { t } = useTranslation();
  const [tab, setTab] = useState('monitoring'); // monitoring | recruitment
  const [telemetry, setTelemetry] = useState({
    asv: { signal: 0, battery: 0, speed: 0, depth: 0, mode: 'STANDBY' },
   auv: { signal: 0, battery: 0, speed: 0, depth: 0, mode: 'STANDBY' },
  });

  // Simulate telemetry updates
  useEffect(() => {
    const interval = setInterval(() => {
      const updateTelemetry = {
        asv: {
          signal: Math.floor(Math.random() * 101),
          battery: Math.floor(Math.random() * 101),
          speed: Math.floor(Math.random() * 30),
          depth: Math.floor(Math.random() * 10),
          mode: Math.random() > 0.5 ? 'AUTO' : 'MANUAL',
        },
        auv: {
          signal: Math.floor(Math.random() * 101),
          battery: Math.floor(Math.random() * 101),
          speed: Math.floor(Math.random() * 20),
          depth: Math.floor(Math.random() * 15),
          mode: Math.random() > 0.5 ? 'AUTO' : 'MANUAL',
        },
      };
      setTelemetry(updateTelemetry);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleTabChange = useCallback((newTab) => {
    setTab(newTab);
  }, []);

  return (
    <div className="lg:w-1/4 lg:pl-4">
      <div className="space-y-4">
        {/* Tabs */}
        <div className="flex border-b border-olympic-200/30">
          <button
            onClick={() => handleTabChange('monitoring')}
            className={`px-4 py-2 text-sm font-medium ${tab === 'monitoring' ? 'text-white border-b-2 border-olympic-500' : 'text-olympic-300/50 hover:text-olympic-200'}`}
          >
            {t('hero.tabs.monitoring')}
          </button>
          <button
            onClick={() => handleTabChange('recruitment')}
            className={`px-4 py-2 text-sm font-medium ${tab === 'recruitment' ? 'text-white border-b-2 border-olympic-500' : 'text-olympic-300/50 hover:text-olympic-200'}`}
          >
            {t('hero.tabs.recruitment')}
          </button>
        </div>

        {/* Tab Content */}
        {tab === 'monitoring' ? (
          <div className="bg-olympic-900/20 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-olympic-300">ASV</span>
              <span className="animate-pulse inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-emerald-400">LIVE</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-olympic-200">
              <span>Signal:</span> <span className="font-mono">{telemetry.asv.signal}%</span>
              <span>Battery:</span> <span className="font-mono">{telemetry.asv.battery}%</span>
              <span>Speed:</span> <span className="font-mono">{telemetry.asv.speed} kt</span>
              <span>Depth:</span> <span className="font-mono">{telemetry.asv.depth} m</span>
              <span>Mode:</span> <span className="font-mono capitalize">{telemetry.asv.mode}</span>
            </div>
            <hr className="my-3 border-olympic-200/20" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-olympic-300">AUV</span>
              <span className="animate-pulse inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-emerald-400">LIVE</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-olympic-200">
              <span>Signal:</span> <span className="font-mono">{telemetry.auv.signal}%</span>
              <span>Battery:</span> <span className="font-mono">{telemetry.auv.battery}%</span>
              <span>Speed:</span> <span className="font-mono">{telemetry.auv.speed} kt</span>
              <span>Depth:</span> <span className="font-mono">{telemetry.auv.depth} m</span>
              <span>Mode:</span> <span className="font-mono capitalize">{telemetry.auv.mode}</span>
            </div>
            <Link to="/monitoring" className="mt-3 w-full text-center btn-secondary btn-sm">
              Enter Dashboard
            </Link>
          </div>
        ) : (
          <div className="bg-olympic-900/20 rounded-xl p-4 text-center space-y-4">
            <h3 className="font-display font-bold text-lg text-white">{t('hero.recruitment.title')}</h3>
            <p className="text-olympic-200">{t('hero.recruitment.desc')}</p>
            <Link to="/recruitment" className="w-full btn-primary btn-sm">
              {t('hero.recruitment.apply')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}