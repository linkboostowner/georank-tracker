'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2, TrendingUp, ArrowRight, Zap, Check, Shield, BarChart3, Globe } from 'lucide-react';

const translations = {
  en: {
    hero: {
      title: 'Track Your AI Visibility',
      subtitle: 'GeoRank Tracker',
      description: 'Monitor how your site appears in AI search results for your target keywords.',
      freeScans: '3 free checks/day',
      aiPowered: 'AI-powered',
      history: 'Check history'
    },
    inputs: {
      url: 'Enter site URL (e.g., yoursite.com)',
      keywords: 'Keywords, comma separated (e.g., CRM, project management)',
      button: 'Check Rankings',
      checking: 'Checking...'
    },
    results: {
      title: 'Results for',
      visible: 'Visible',
      notVisible: 'Not visible',
      position: 'Position in results: #'
    },
    error: {
      default: 'An error occurred. Please try again.'
    },
    upgrade: {
      button: 'Upgrade to PRO',
      title: 'Unlock Unlimited Tracking',
      description: 'Get unlimited keyword checks, daily monitoring, and history.',
      price: '$19/month',
      subscribe: 'Subscribe with Stripe',
      maybeLater: 'Maybe later'
    },
    geoScanLink: 'Need a full AI visibility audit?',
    tryGeoScan: 'Try GeoScan',
    blogLink: 'Read our Blog'
  },
  ru: {
    hero: {
      title: 'Отслеживайте свою AI-видимость',
      subtitle: 'GeoRank Tracker',
      description: 'Мониторинг появления вашего сайта в результатах AI-поиска по ключевым словам.',
      freeScans: '3 бесплатных проверки/день',
      aiPowered: 'На основе AI',
      history: 'История проверок'
    },
    inputs: {
      url: 'Введите URL сайта (например, yoursite.com)',
      keywords: 'Ключевые слова через запятую (CRM, project management)',
      button: 'Проверить позиции',
      checking: 'Проверяем...'
    },
    results: {
      title: 'Результаты для',
      visible: 'Видим',
      notVisible: 'Не видим',
      position: 'Позиция в выдаче: #'
    },
    error: {
      default: 'Произошла ошибка. Попробуйте снова.'
    },
    upgrade: {
      button: 'Обновитесь до PRO',
      title: 'Безлимитный трекинг',
      description: 'Неограниченные проверки, ежедневный мониторинг и история.',
      price: '$19/мес',
      subscribe: 'Подписаться через Stripe',
      maybeLater: 'Может, позже'
    },
    geoScanLink: 'Нужен полный аудит AI-видимости?',
    tryGeoScan: 'Попробуйте GeoScan',
    blogLink: 'Читать блог'
  }
};

function LanguageSwitcher({ locale, setLocale }) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => setLocale('en')}
        className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${locale === 'en' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale('ru')}
        className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${locale === 'ru' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
      >
        RU
      </button>
    </div>
  );
}

export default function Home() {
  const [locale, setLocale] = useState('en'); // всегда начинаем с 'en', одинаково на сервере и клиенте

  useEffect(() => {
    const saved = localStorage.getItem('georank-locale');
    if (saved === 'en' || saved === 'ru') {
      setLocale(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('georank-locale', locale);
  }, [locale]);

  const t = translations[locale];

  const [url, setUrl] = useState('');
  const [keywords, setKeywords] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    if (!url || !keywords.trim()) return;
    const kwArray = keywords.split(',').map(k => k.trim()).filter(k => k);
    if (kwArray.length === 0) return;
    setLoading(true);
    setError('');
    setResults(null);
    try {
      const res = await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, keywords: kwArray }),
      });
      if (!res.ok) throw new Error('Tracking failed');
      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      setError(err.message || t.error.default);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgradeClick = () => {
    alert(t.upgrade.description);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-start px-4 py-16">
      <div className="max-w-3xl w-full space-y-8">
        {/* Header with language switcher and Upgrade button */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium">GeoRank</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} setLocale={setLocale} />
            <button
              onClick={handleUpgradeClick}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all duration-200"
            >
              {t.upgrade.button}
            </button>
          </div>
        </div>

        {/* Hero */}
        <div className="relative rounded-3xl bg-gradient-to-br from-blue-500/10 via-slate-800/50 to-purple-500/10 p-10 text-center border border-slate-700 shadow-2xl">
          <div className="absolute inset-0 bg-grid-slate-800/[0.05] rounded-3xl" />
          <div className="relative space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              {t.hero.title}{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {t.hero.subtitle}
              </span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              {t.hero.description}
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-1"><Check className="w-4 h-4 text-blue-400" /> {t.hero.freeScans}</span>
              <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-amber-400" /> {t.hero.aiPowered}</span>
              <span className="flex items-center gap-1"><BarChart3 className="w-4 h-4 text-purple-400" /> {t.hero.history}</span>
            </div>
          </div>
        </div>

        {/* Input fields */}
        <div className="space-y-4">
          <input
            type="url"
            placeholder={t.inputs.url}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 outline-none focus:border-blue-400 transition-all duration-200"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder={t.inputs.keywords}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 outline-none focus:border-blue-400 transition-all duration-200"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
          />
        </div>

        <button
          onClick={handleTrack}
          disabled={loading || !url || !keywords.trim()}
          className="w-full py-3 bg-blue-500 hover:bg-blue-400 text-black font-bold rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:scale-105"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          {loading ? t.inputs.checking : t.inputs.button}
        </button>

        {error && (
          <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-xl flex items-center justify-center gap-2">
            <Shield className="w-5 h-5" /> {error}
          </div>
        )}

        {results && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" /> {t.results.title} {url}
            </h2>
            {results.map((item, i) => (
              <div key={i} className="p-4 bg-slate-800 border border-slate-700 rounded-xl transition-all duration-200 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{item.keyword}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.appearing ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'}`}>
                    {item.appearing ? t.results.visible : t.results.notVisible}
                  </span>
                </div>
                {item.snippet && (
                  <p className="text-sm text-slate-400 italic">«{item.snippet}»</p>
                )}
                {item.position && (
                  <p className="text-xs text-slate-500 mt-1">{t.results.position}{item.position}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Ссылки на экосистему */}
        <div className="text-center pt-8 border-t border-slate-800 space-y-2">
          <p className="text-sm text-slate-500">{t.geoScanLink}</p>
          <a
            href="https://geoscan-a.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline inline-flex items-center gap-1 transition-all duration-200"
          >
            {t.tryGeoScan} <ArrowRight className="w-4 h-4" />
          </a>
          <br />
          <a
            href="https://geoscan-a.vercel.app/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline text-sm inline-flex items-center gap-1 transition-all duration-200"
          >
            {t.blogLink} <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </main>
  );
}