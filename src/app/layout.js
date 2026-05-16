import './globals.css';

export const metadata = {
  title: 'Flor de Seúl — Skincare Coreano Auténtico',
  description: 'Flor de Seúl — Tu tienda de skincare coreano en Guatemala. Descubre las mejores marcas como Anua, Beauty of Joseon, Skin1004, Tirtir y más. Cuidado de piel auténtico, directo desde Corea.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Noto+Sans+KR:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
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
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
