import React from 'react';

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AnimeTrend",
    "url": "https://animetrend.in",
    "applicationCategory": "EntertainmentApplication",
    "genre": "Anime & Manga",
    "description": "AI-powered anime and manga recommendation system",
    "creator": {
      "@type": "Person",
      "name": "Sanjeev K",
      "email": "ksanjeev284@gmail.com"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 