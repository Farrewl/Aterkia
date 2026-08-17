import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { Mail, MapPin, Send, CheckCircle2, Building2 } from 'lucide-react';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    category: 'Sponsorship',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', category: 'Sponsorship', message: '' });
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
          KOLABORASI & KEMITRAAN
        </span>
        <h1 className="text-4xl sm:text-5xl font-black font-display text-white tracking-tight mb-3">
          Hubungi Tim Aterkia
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
          Kami terbuka untuk kerja sama sponsorship kompetisi, kolaborasi riset teknologi maritim bersama industri, serta pertanyaan umum seputar tim.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-4">
          <div className="clean-card rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="font-display font-bold text-xl text-white">
              Informasi Kontak Resmi
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-medium block">Email Utama</span>
                  <a href={`mailto:${siteConfig.email}`} className="text-white hover:text-sky-400 font-semibold transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-medium block">Sponsorship & Kemitraan</span>
                  <a href={`mailto:${siteConfig.partnershipEmail}`} className="text-sky-300 hover:text-sky-200 font-semibold transition-colors">
                    {siteConfig.partnershipEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-medium block">Markas Riset / Workshop</span>
                  <span className="text-slate-300 text-xs sm:text-sm block">
                    Laboratorium Robotika & Sistem Maritim, {siteConfig.affiliation}, {siteConfig.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 leading-relaxed font-light">
              Tanggapan email resmi tim akan dibalas dalam waktu 1x24 jam hari kerja.
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7">
          <div className="clean-card rounded-3xl p-6 sm:p-8">
            {isSubmitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white">Pesan Anda Berhasil Terkirim!</h4>
                <p className="text-slate-300 text-sm max-w-md mx-auto font-light">
                  Terima kasih telah menghubungi Tim Aterkia. Koordinator divisi terkait akan segera menindaklanjuti pesan Anda.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                >
                  Kirim Pesan Lainnya
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Nama Lengkap / Instansi *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Anda"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-navy-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@instansi.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-navy-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Kategori Keperluan *
                  </label>
                  <select
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-navy-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400 transition-colors"
                  >
                    <option value="Sponsorship">Tawaran Sponsorship / Kemitraan</option>
                    <option value="Riset ASV">Pertanyaan / Kolaborasi Divisi ASV</option>
                    <option value="Riset AUV">Pertanyaan / Kolaborasi Divisi AUV</option>
                    <option value="Media">Liputan Media / Wawancara</option>
                    <option value="Lainnya">Pertanyaan Umum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Pesan *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tuliskan pesan, penawaran kerja sama, atau pertanyaan Anda..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-navy-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md shadow-sky-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Mengirim...' : 'Kirim Pesan Kolaborasi'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
