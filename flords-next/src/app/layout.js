import './globals.css';

export const metadata = {
  metadataBase: new URL('https://flordeseulgt.shop'),
  title: 'Flor de Seúl — Skincare Coreano Auténtico',
  description: 'Flor de Seúl — Tu tienda de skincare coreano en Guatemala. Descubre las mejores marcas como Anua, Beauty of Joseon, Skin1004, Tirtir y más. Cuidado de piel auténtico, directo desde Corea.',
  keywords: [
    'skincare coreano guatemala',
    'cosmética coreana guatemala',
    'k-beauty guatemala',
    'tienda de skincare guatemala',
    'marcas coreanas guatemala',
    'flor de seul gt',
    'anua guatemala',
    'beauty of joseon guatemala',
    'skin1004 guatemala',
    'tirtir guatemala',
    'cuidado de la piel guatemala'
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Flor de Seúl — Skincare Coreano Auténtico',
    description: 'Flor de Seúl — Tu tienda de skincare coreano en Guatemala. Descubre las mejores marcas como Anua, Beauty of Joseon, Skin1004, Tirtir y más. Cuidado de piel auténtico, directo desde Corea.',
    url: 'https://flordeseulgt.shop',
    siteName: 'Flor de Seúl GT',
    locale: 'es_GT',
    type: 'website',
    images: [
      {
        url: '/assets/images/logos/fk.png?v=2',
        width: 800,
        height: 800,
        alt: 'Flor de Seúl Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flor de Seúl — Skincare Coreano Auténtico',
    description: 'Flor de Seúl — Tu tienda de skincare coreano en Guatemala. Descubre las mejores marcas como Anua, Beauty of Joseon, Skin1004, Tirtir y más.',
    images: ['/assets/images/logos/fk.png?v=2'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    '@id': 'https://flordeseulgt.shop/#website',
    'name': 'Flor de Seúl GT',
    'url': 'https://flordeseulgt.shop',
    'logo': 'https://flordeseulgt.shop/assets/images/logos/fk.png',
    'description': 'Flor de Seúl — Tu tienda de skincare coreano en Guatemala. Descubre las mejores marcas como Anua, Beauty of Joseon, Skin1004, Tirtir y más. Cuidado de piel auténtico, directo desde Corea.',
    'sameAs': [
      'https://instagram.com/flordeseulgt',
      'https://facebook.com/flordeseulgt'
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+50200000000',
      'contactType': 'customer service',
      'areaServed': 'GT',
      'availableLanguage': 'Spanish'
    },
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Guatemala City',
      'addressCountry': 'GT'
    },
    'priceRange': '$$'
  };

  return (
    <html lang="es" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Noto+Sans+KR:wght@300;400;500&family=Inter:wght@300;400;500;600&family=Dancing+Script:wght@500;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              if (!theme) {
                theme = 'light';
                localStorage.setItem('theme', theme);
              }
              document.documentElement.setAttribute('data-theme', theme);
            } catch (e) {}
          })();
        ` }} />
        <script dangerouslySetInnerHTML={{ __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "x9tr06o0rq");
        ` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
