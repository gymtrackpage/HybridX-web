import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://hybridx.club';

  return {
    rules: [
      // Default: allow all crawlers, block private routes
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/hyrox-alerts'],
      },

      // ── Traditional search engines ──────────────────────────────────────
      { userAgent: 'Googlebot',  allow: '/' },
      { userAgent: 'Bingbot',    allow: '/' },
      { userAgent: 'Slurp',      allow: '/' }, // Yahoo
      { userAgent: 'DuckDuckBot',allow: '/' },

      // ── OpenAI / ChatGPT ────────────────────────────────────────────────
      // GPTBot        → trains OpenAI models (future citations)
      // OAI-SearchBot → powers ChatGPT real-time web search
      // ChatGPT-User  → ChatGPT browsing plugin sessions
      { userAgent: 'GPTBot',       allow: '/' },
      { userAgent: 'OAI-SearchBot',allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },

      // ── Google AI (Gemini / AI Overviews) ───────────────────────────────
      // Google-Extended → feeds Gemini and Google AI Overviews
      { userAgent: 'Google-Extended', allow: '/' },

      // ── Anthropic / Claude ──────────────────────────────────────────────
      { userAgent: 'ClaudeBot',  allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },

      // ── Perplexity AI ───────────────────────────────────────────────────
      { userAgent: 'PerplexityBot', allow: '/' },

      // ── Meta AI ─────────────────────────────────────────────────────────
      { userAgent: 'FacebookBot', allow: '/' },

      // ── Microsoft Copilot / Bing AI ─────────────────────────────────────
      { userAgent: 'bingbot',    allow: '/' },
      { userAgent: 'MicrosoftBot', allow: '/' },

      // ── You.com ─────────────────────────────────────────────────────────
      { userAgent: 'YouBot', allow: '/' },

      // ── Cohere ──────────────────────────────────────────────────────────
      { userAgent: 'cohere-ai', allow: '/' },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
