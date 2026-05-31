'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2, TrendingUp, ArrowRight, Globe } from 'lucide-react';

const translations = {
  en: {
    hero: {
      title: 'Track Your AI Visibility',
      subtitle: 'GeoRank Tracker',
      description: 'Monitor how your site appears in AI search results for your target keywords.',
      freeScans: '3 free checks/day',
      aiPowered: 'AI-powered'
    },
    inputs: {
      url: 'Enter site URL (e.g., yoursite.com)',
      keywords: 'Keywords, comma separated (e.g., CRM, project management)',
      button: 'Check Rankings',
      checking: 'Checking...'
    },
    results: { title: 'Results for', visible: 'Visible', notVisible: 'Not visible' },
    geoScanLink: 'Need a full AI visibility audit?',
    tryGeoScan: 'Try GeoScan'
  },
  ru: {
    hero: {
      title: 'Отслеживайте свою AI-видимость',
      subtitle: 'GeoRank Tracker',
      description: 'Мониторинг появления вашего сайта в результатах AI-поиска по ключевым словам.',
      freeScans: '3 бесплатных проверки/день',
      aiPowered: 'На основе AI'
    },
    inputs: {
      url: 'Введите URL сайта (например, yoursite.com)',
      keywords: 'Ключевые слова через запятую (CRM, project management)',
      button: 'Проверить позиции',
      checking: 'Проверяем...'
    },
    results: { title: 'Результаты для', visible: 'Видим', notVisible: 'Не видим' },
    geoScanLink: 'Нужен полный аудит AI-видимости?',
    tryGeoScan: 'Попробуйте GeoScan'
  }
};

export default function Home() {
  const [locale, setLocale] = useState('en');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('georank-locale');
    if (saved === 'en' || saved === 'ru') setLocale(saved);
    setReady(true);
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
      // Пока используем тестовые данные
      const mockResults = kwArray.map(kw => ({
        keyword: kw,
        appearing: Math.random() > 0.5,
        snippet: Math.random() > 0.5 ? `Sample snippet about ${kw}` : null,
        position: Math.random() > 0.5 ? Math.ceil(Math.random() * 10) : null,
      }));
      setResults(mockResults);
    } catch (err) {
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  if (!ready) return null;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={20} color="#60a5fa" />
            <span style={{ fontWeight: 500 }}>GeoRank</span>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={() => setLocale('en')}
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: locale === 'en' ? '#2563eb' : '#1e293b',
                color: locale === 'en' ? 'white' : '#94a3b8',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              EN
            </button>
            <button
              onClick={() => setLocale('ru')}
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: locale === 'ru' ? '#2563eb' : '#1e293b',
                color: locale === 'ru' ? 'white' : '#94a3b8',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              RU
            </button>
          </div>
        </div>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {t.hero.title}{' '}
            <span style={{ color: '#60a5fa' }}>{t.hero.subtitle}</span>
          </h1>
          <p style={{ color: '#cbd5e1', maxWidth: '600px', margin: '0 auto' }}>{t.hero.description}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem', color: '#94a3b8', fontSize: '0.875rem' }}>
            <span>✅ {t.hero.freeScans}</span>
            <span>⚡ {t.hero.aiPowered}</span>
          </div>
        </div>

        {/* Inputs */}
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="url"
            placeholder={t.inputs.url}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: 'white',
              marginBottom: '0.5rem',
              outline: 'none',
            }}
          />
          <input
            type="text"
            placeholder={t.inputs.keywords}
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: 'white',
              outline: 'none',
            }}
          />
        </div>

        <button
          onClick={handleTrack}
          disabled={loading || !url || !keywords.trim()}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#2563eb',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> {t.inputs.checking}
            </>
          ) : (
            <>
              <Search size={18} /> {t.inputs.button}
            </>
          )}
        </button>

        {error && (
          <div style={{ color: '#f87171', marginTop: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {results && (
          <div style={{ marginTop: '1.5rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <TrendingUp size={20} color="#60a5fa" /> {t.results.title} {url}
            </h2>
            {results.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '16px',
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  marginBottom: '8px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 500 }}>{item.keyword}</span>
                  <span
                    style={{
                      padding: '2px 12px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: item.appearing ? 'rgba(96,165,250,0.2)' : 'rgba(248,113,113,0.2)',
                      color: item.appearing ? '#60a5fa' : '#f87171',
                    }}
                  >
                    {item.appearing ? t.results.visible : t.results.notVisible}
                  </span>
                </div>
                {item.snippet && (
                  <p style={{ color: '#94a3b8', fontStyle: 'italic', marginTop: '8px' }}>«{item.snippet}»</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* GeoScan link */}
        <div style={{ textAlign: 'center', marginTop: '3rem', color: '#94a3b8', fontSize: '0.875rem' }}>
          <p>{t.geoScanLink}</p>
          <a
            href="https://geoscan-a.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#60a5fa', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            {t.tryGeoScan} <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </main>
  );
}