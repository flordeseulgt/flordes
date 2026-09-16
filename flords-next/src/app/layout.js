import './globals.css';

export const metadata = {
  metadataBase: new URL('https://flordeseulgt.shop'),
  title: 'Flor de Seúl 🌸 Skincare Coreano Auténtico en Guatemala | K-Beauty Envíos Todo el País',
  description: 'Tienda #1 de Skincare Coreano en Guatemala. Cosmética 100% original de Corea del Sur: Skin1004, Round Lab, Beauty of Joseon, Anua, Tirtir, Medicube y más. Envíos rápidos a toda Guatemala y pago contra entrega.',
  keywords: [
    'skincare coreano guatemala',
    'cosmética coreana guatemala',
    'k-beauty guatemala',
    'tienda de skincare guatemala',
    'productos coreanos guatemala',
    'skin1004 guatemala',
    'round lab guatemala',
    'beauty of joseon guatemala',
    'anua guatemala',
    'tirtir guatemala',
    'medicube guatemala',
    'torriden guatemala',
    'bloqueador coreano guatemala',
    'mascarilla centella skin1004 guatemala',
    'pago contra entrega guatemala',
    'cuidado de la piel guatemala',
    'flor de seul gt',
    'maquillaje coreano guatemala'
  ],
  alternates: {
    canonical: 'https://flordeseulgt.shop',
  },
  other: {
    'geo.region': 'GT',
    'geo.placename': 'Guatemala',
    'geo.position': '14.6349;-90.5069',
    'ICBM': '14.6349, -90.5069',
  },
  openGraph: {
    title: 'Flor de Seúl 🌸 Skincare Coreano Auténtico en Guatemala | K-Beauty',
    description: 'Tu tienda #1 de Skincare Coreano en Guatemala. Productos 100% auténticos de Corea del Sur con envíos a todos los departamentos y pago contra entrega.',
    url: 'https://flordeseulgt.shop',
    siteName: 'Flor de Seúl GT',
    locale: 'es_GT',
    type: 'website',
    images: [
      {
        url: '/assets/images/logos/fk.png?v=2',
        width: 800,
        height: 800,
        alt: 'Flor de Seúl Guatemala Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flor de Seúl 🌸 Skincare Coreano Auténtico en Guatemala',
    description: 'Skincare coreano 100% original en Guatemala. Skin1004, Beauty of Joseon, Round Lab, Anua, Tirtir y más. Envíos a todo el país.',
    images: ['/assets/images/logos/fk.png?v=2'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  const storeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': 'https://flordeseulgt.shop/#store',
    'name': 'Flor de Seúl GT — Skincare Coreano Guatemala',
    'alternateName': ['Flor de Seúl', 'Flor de Seul Guatemala', 'Flor de Seul Skincare', 'K-Beauty Guatemala'],
    'url': 'https://flordeseulgt.shop',
    'logo': 'https://flordeseulgt.shop/assets/images/logos/fk.png',
    'image': 'https://flordeseulgt.shop/assets/images/logos/fk.png',
    'description': 'Tienda de skincare coreano auténtico en Guatemala. Marcas líderes de K-Beauty: Skin1004, Round Lab, Beauty of Joseon, Anua, Medicube, Tirtir. Envíos a toda Guatemala y pago contra entrega.',
    'currenciesAccepted': 'GTQ',
    'paymentAccepted': 'Cash on Delivery, Bank Transfer',
    'priceRange': 'Q45 - Q350',
    'areaServed': {
      '@type': 'AdministrativeArea',
      'name': 'Guatemala'
    },
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Ciudad de Guatemala',
      'addressRegion': 'Guatemala',
      'addressCountry': 'GT'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'customer service',
      'areaServed': 'GT',
      'availableLanguage': ['Spanish', 'es']
    },
    'sameAs': [
      'https://www.tiktok.com/@flor.de.seul.gt',
      'https://www.instagram.com/flordeseul_gt',
      'https://www.facebook.com/flordeseulgt'
    ]
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': '¿Dónde comprar skincare coreano auténtico en Guatemala?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'En Flor de Seúl (flordeseulgt.shop) puedes comprar productos de skincare coreano 100% auténticos importados de Corea del Sur, con marcas como Skin1004, Round Lab, Beauty of Joseon, Anua, Tirtir y Medicube con envíos a toda Guatemala.'
        }
      },
      {
        '@type': 'Question',
        'name': '¿Hacen envíos a todos los departamentos de Guatemala?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Sí, realizamos envíos seguros y rápidos a los 22 departamentos de Guatemala, incluyendo Ciudad de Guatemala, Mixco, Quetzaltenango, Escuintla, Sacatepéquez, Chimaltenango, Petén y más.'
        }
      },
      {
        '@type': 'Question',
        'name': '¿Ofrecen pago contra entrega en Guatemala?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Sí, en Flor de Seúl puedes pagar en efectivo contra entrega al momento de recibir tu paquete en la puerta de tu casa u oficina.'
        }
      },
      {
        '@type': 'Question',
        'name': '¿Los productos de Flor de Seúl son 100% originales?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Todos nuestros productos son 100% originales garantizados, importados directamente de los fabricantes oficiales en Corea del Sur con lotes y fechas de vencimiento verificables.'
        }
      }
    ]
  };

  return (
    <html lang="es" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,400;1,700&family=Noto+Serif+KR:wght@500;700;900&family=Noto+Sans+KR:wght@300;400;500;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
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
          })(window, document, "clarity", "script", "xktdlzftou");
        ` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="editorial-theme">
        {children}
      </body>
    </html>
  );
}
