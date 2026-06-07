/* =============================
   APP.JS — Flor de Seúl GT
   Korean Skincare Store
============================= */

// ============ PRODUCT DATABASE ============
const PRODUCTS = [
  // --- ANUA ---
  {
    id: 1,
    brand: 'anua',
    brandName: 'Anua',
    name: 'Heartleaf Aceite Limpiador',
    nameLong: 'Heartleaf Pore Control Cleansing Oil',
    price: 145,
    img: 'public/assets/images/marcas/anua/heartleafaceite.png',
    desc: 'Aceite limpiador de doble limpieza con hojas de corazón para poros dilatados. Disuelve maquillaje, protector solar y suciedad sin resecar la piel.',
    tags: ['limpieza', 'poros', 'aceite'],
    badge: 'popular',
    categories: ['limpieza'],
    benefits: ['Control de poros', 'Doble limpieza', 'Sin sulfatos'],
  },
  {
    id: 2,
    brand: 'anua',
    brandName: 'Anua',
    name: 'Heartleaf Espuma Limpiadora',
    nameLong: 'Heartleaf Pore Control Cleansing Foam',
    price: 130,
    img: 'public/assets/images/marcas/anua/heartleafespuma.png',
    desc: 'Espuma suave con extracto de heartleaf. Limpia profundamente sin alterar el pH natural de la piel. Ideal para piel sensible y con acné.',
    tags: ['limpieza', 'espuma', 'sensible'],
    badge: 'new',
    categories: ['limpieza', 'acne'],
    benefits: ['Limpieza profunda', 'Suave con la piel', 'Anti-acné'],
  },

  // --- BEAUTY OF JOSEON ---
  {
    id: 3,
    brand: 'beautyofjoseon',
    brandName: 'Beauty of Joseon',
    name: 'Mascarilla de Miel y Arroz',
    nameLong: 'Revive Moisturizing Glow Honey & Rice Mask',
    price: 165,
    img: 'public/assets/images/marcas/beautyofjoseon/Mascarilla de miel y arroz .png',
    desc: 'Mascarilla de tejido con miel y arroz para una hidratación profunda y brillo instantáneo. Inspirada en los rituales de belleza de la corte Joseon.',
    tags: ['hidratacion', 'mascarilla', 'brillo'],
    badge: 'popular',
    categories: ['hidratacion'],
    benefits: ['Hidratación intensa', 'Efecto glow', 'Nutritiva'],
  },
  {
    id: 4,
    brand: 'beautyofjoseon',
    brandName: 'Beauty of Joseon',
    name: 'Bean Pore Mask',
    nameLong: 'Red Bean Refreshing Pore Mask',
    price: 150,
    img: 'public/assets/images/marcas/beautyofjoseon/beanporemask.jpg',
    desc: 'Mascarilla de arcilla con extracto de frijol rojo para minimizar poros y controlar el exceso de sebo. Limpia y refresca profundamente.',
    tags: ['poros', 'mascarilla', 'arcilla'],
    badge: null,
    categories: ['limpieza'],
    benefits: ['Minimiza poros', 'Control de sebo', 'Purificante'],
  },
  {
    id: 5,
    brand: 'beautyofjoseon',
    brandName: 'Beauty of Joseon',
    name: 'Sérum de Ginseng Jin',
    nameLong: 'Revive Serum: Ginseng + Snail Mucin',
    price: 230,
    img: 'public/assets/images/marcas/beautyofjoseon/serumjin.png',
    desc: 'Sérum con ginseng coreano y mucina de caracol para una piel firme, luminosa y con aspecto de cristal. El icónico sérum de K-Beauty.',
    tags: ['serum', 'antiedad', 'ginseng'],
    badge: 'popular',
    categories: ['hidratacion', 'manchas'],
    benefits: ['Firmeza', 'Luminosidad', 'Anti-edad'],
  },
  {
    id: 6,
    brand: 'beautyofjoseon',
    brandName: 'Beauty of Joseon',
    name: 'Sérum de Vitamina C Dynasty',
    nameLong: 'Glow Serum: Propolis + Niacinamide',
    price: 210,
    img: 'public/assets/images/marcas/beautyofjoseon/serumvita.png',
    desc: 'Sérum de brillo con propóleo y niacinamida al 2%. Unifica el tono, reduce manchas y aporta un brillo natural. Fórmula inspirada en la mítica belleza de la dinastía Joseon.',
    tags: ['serum', 'manchas', 'brillo'],
    badge: 'sale',
    categories: ['manchas', 'hidratacion'],
    benefits: ['Anti-manchas', 'Uniformidad de tono', 'Brillo glass skin'],
  },

  // --- MIXSOON ---
  {
    id: 7,
    brand: 'mixsoon',
    brandName: 'Mixsoon',
    name: 'Bean Essence 30ml',
    nameLong: 'Mixsoon Bean Essence 30ml',
    price: 175,
    img: 'public/assets/images/marcas/mixsoon/beanessence30.jpg',
    desc: 'Esencia minimalista de frijol fermentado para recuperar la barrera cutánea y lograr una piel hidratada y elástica. Fórmula limpia, 100% natural.',
    tags: ['esencia', 'barrera', 'fermentado'],
    badge: 'new',
    categories: ['hidratacion'],
    benefits: ['Barrera cutánea', 'Hidratación', 'Minimal clean'],
  },
  {
    id: 8,
    brand: 'mixsoon',
    brandName: 'Mixsoon',
    name: 'Bean Essence 50ml',
    nameLong: 'Mixsoon Bean Essence 50ml',
    price: 249,
    img: 'public/assets/images/marcas/mixsoon/beanessence50.png',
    desc: 'Versión grande de la icónica esencia de frijol fermentado. Hidrata, fortalece y recupera la vitalidad de la piel con solo un ingrediente estrella.',
    tags: ['esencia', 'barrera', 'fermentado'],
    badge: 'popular',
    categories: ['hidratacion'],
    benefits: ['Barrera cutánea', 'Hidratación profunda', 'Clean beauty'],
  },
  {
    id: 9,
    brand: 'mixsoon',
    brandName: 'Mixsoon',
    name: 'Crema Mixsoon',
    nameLong: 'Mixsoon Bean Cream',
    price: 210,
    img: 'public/assets/images/marcas/mixsoon/cremamixsoon.jpg',
    desc: 'Crema hidratante ligera con extracto de frijol fermentado. Proporciona una hidratación duradera sin sensación grasosa. Perfecta para el paso final de tu rutina.',
    tags: ['crema', 'hidratacion', 'ligera'],
    badge: null,
    categories: ['hidratacion'],
    benefits: ['Hidratación 24h', 'Sin comedógenos', 'Textura ligera'],
  },
  {
    id: 10,
    brand: 'mixsoon',
    brandName: 'Mixsoon',
    name: 'Glacier Water Essence',
    nameLong: 'Mixsoon Glacier Water Essence',
    price: 185,
    img: 'public/assets/images/marcas/mixsoon/glacierwater.jpg',
    desc: 'Esencia de agua glaciar ultraligera para una hidratación fresca e inmediata. Perfecta como primer paso después de limpiar, refresca y prepara la piel.',
    tags: ['esencia', 'hidratacion', 'agua'],
    badge: null,
    categories: ['hidratacion'],
    benefits: ['Hidratación rápida', 'Textura agua', 'Refrescante'],
  },
  {
    id: 11,
    brand: 'mixsoon',
    brandName: 'Mixsoon',
    name: 'Protector Solar SPF50',
    nameLong: 'Mixsoon Watery Sun Essence SPF50+',
    price: 160,
    img: 'public/assets/images/marcas/mixsoon/protectorsolar.jpg',
    desc: 'Protector solar en esencia con SPF 50+. Textura aguada, sin residuo blanco y con botón hidratante. El aliado perfecto para una vida libre de manchas.',
    tags: ['solar', 'spf50', 'esencia'],
    badge: 'popular',
    categories: ['solar'],
    benefits: ['SPF 50+', 'Sin oxido de zinc', 'Hidratante'],
  },
  {
    id: 12,
    brand: 'mixsoon',
    brandName: 'Mixsoon',
    name: 'Soondy Soothing Gel',
    nameLong: 'Mixsoon Soondy Cicatrizing Gel',
    price: 140,
    img: 'public/assets/images/marcas/mixsoon/soondy.jpg',
    desc: 'Gel calmante multifuncional con aloe vera y centella asiática. Calma irritaciones, hidrata y ayuda en la regeneración de la piel. Puede usarse en cara y cuerpo.',
    tags: ['gel', 'calmante', 'aloe'],
    badge: null,
    categories: ['hidratacion', 'acne'],
    benefits: ['Calmante', 'Regenerador', 'Multiuso'],
  },

  // --- PURITO ---
  {
    id: 13,
    brand: 'purito',
    brandName: 'Purito',
    name: 'Centella Green Level Buffet Sérum',
    nameLong: 'Purito Centella Green Level Buffet Serum',
    price: 195,
    img: 'public/assets/images/marcas/purito/puritoc.jpg',
    desc: 'Sérum con centella asiática al 20% y múltiples péptidos. Calma pieles sensibles, reduce rojeces y fortalece la barrera cutánea. Ideal para piel reactiva.',
    tags: ['serum', 'centella', 'sensible'],
    badge: 'popular',
    categories: ['acne', 'hidratacion'],
    benefits: ['Calmante', 'Péptidos', 'Barrera cutánea'],
  },

  // --- ROUND LAB ---
  {
    id: 14,
    brand: 'roundlab',
    brandName: 'Round Lab',
    name: 'Birch Foam Cleanser',
    nameLong: 'Round Lab Birch Juice Moisturizing Foam Cleanser',
    price: 145,
    img: 'public/assets/images/marcas/roundlab/foambean.png',
    desc: 'Espuma limpiadora hidratante con savia de abedul coreano. Limpia suavemente sin alterar el manto hidrolipídico. Deja la piel fresca y sin tensión.',
    tags: ['limpieza', 'espuma', 'abedul'],
    badge: null,
    categories: ['limpieza'],
    benefits: ['Limpieza suave', 'Hidratante', 'Sin sulfatos agresivos'],
  },
  {
    id: 15,
    brand: 'roundlab',
    brandName: 'Round Lab',
    name: 'Kit Round Lab',
    nameLong: 'Round Lab Birch Starter Kit',
    price: 320,
    img: 'public/assets/images/marcas/roundlab/kitroundlab.jpg',
    desc: 'Kit completo de inicio con los productos esenciales de la línea Birch Juice de Round Lab. Perfecto para comenzar tu rutina coreana desde cero.',
    tags: ['kit', 'abedul', 'rutina'],
    badge: 'new',
    categories: ['hidratacion', 'limpieza'],
    benefits: ['Kit completo', 'Ideal para principiantes', 'Ahorro especial'],
  },
  {
    id: 16,
    brand: 'roundlab',
    brandName: 'Round Lab',
    name: 'Mascarilla Round Lab',
    nameLong: 'Round Lab 1025 Dokdo Toner Mask',
    price: 175,
    img: 'public/assets/images/marcas/roundlab/macarillaround.png',
    desc: 'Mascarilla de tejido con agua del Mar de Dokdo ultrarica en minerales. Hidrata, calma y equilibra la piel en solo 20 minutos. Experiencia spa en casa.',
    tags: ['mascarilla', 'hidratacion', 'minerales'],
    badge: null,
    categories: ['hidratacion'],
    benefits: ['Hidratación intensa', 'Minerales marinos', 'Calmante'],
  },
  {
    id: 17,
    brand: 'roundlab',
    brandName: 'Round Lab',
    name: 'SPF50 Round Lab Sunscreen',
    nameLong: 'Round Lab Birch Juice Moisturizing Sun Cream SPF50+',
    price: 165,
    img: 'public/assets/images/marcas/roundlab/spf50roundlab.jpg',
    desc: 'Crema solar hidratante con savia de abedul y SPF 50+ PA++++. Sin residuo blanco, textura cremosa y ligera. Protege mientras hidrata profundamente.',
    tags: ['solar', 'spf50', 'crema'],
    badge: 'popular',
    categories: ['solar'],
    benefits: ['SPF 50+ PA++++', 'Hidratante', 'Sin residuo blanco'],
  },

  // --- SKIN1004 Acne ---
  {
    id: 18,
    brand: 'skin1004',
    brandName: 'Skin1004',
    name: 'Limpiador en Espuma para Acné',
    nameLong: 'Skin1004 Acne Foam Cleanser 125ml',
    price: 135,
    img: 'public/assets/images/marcas/skin1004/Acne/Limpiador en Espuma para Acne 125 ml.jpg',
    desc: 'Espuma limpiadora especialmente formulada para piel con acné. Con ácido salicílico y extracto de centella para limpiar poros y reducir brotes sin resecar.',
    tags: ['limpieza', 'acne', 'espuma'],
    badge: null,
    categories: ['limpieza', 'acne'],
    benefits: ['Ácido salicílico', 'Anti-acné', 'Limpieza profunda'],
  },
  {
    id: 19,
    brand: 'skin1004',
    brandName: 'Skin1004',
    name: 'Spot Cover Patch',
    nameLong: 'Skin1004 Spot Cover Patch',
    price: 85,
    img: 'public/assets/images/marcas/skin1004/Acne/Spotcover.png',
    desc: 'Parches invisibles de hidrogel para cubrir y tratar granos activos. Absorben el exceso de fluido, reducen inflamación y aceleran la cicatrización.',
    tags: ['parche', 'acne', 'spot'],
    badge: 'new',
    categories: ['acne'],
    benefits: ['Tratamiento localizado', 'Invisible', 'Cicatrizante'],
  },
  {
    id: 20,
    brand: 'skin1004',
    brandName: 'Skin1004',
    name: 'Crema Anti-Acné',
    nameLong: 'Skin1004 Zombie Beauty Acne Cream',
    price: 175,
    img: 'public/assets/images/marcas/skin1004/Acne/creamaacne.png',
    desc: 'Crema tratante con niacinamida y zinc para controlar brotes, reducir poros y matificar. Perfecta para piel grasa con tendencia al acné.',
    tags: ['crema', 'acne', 'niacinamida'],
    badge: null,
    categories: ['acne'],
    benefits: ['Niacinamida', 'Control de grasa', 'Anti-inflamatoria'],
  },
  {
    id: 21,
    brand: 'skin1004',
    brandName: 'Skin1004',
    name: 'Mascarilla Anti-Acné',
    nameLong: 'Skin1004 Zombie Beauty Acne Pack',
    price: 140,
    img: 'public/assets/images/marcas/skin1004/Acne/mascarillaacne.png',
    desc: 'Mascarilla de arcilla de caolín con centella y extracto de zombie para purificar poros, calmar granos y regular la producción de sebo.',
    tags: ['mascarilla', 'acne', 'arcilla'],
    badge: null,
    categories: ['acne', 'limpieza'],
    benefits: ['Purificante', 'Arcilla kaolín', 'Control de sebo'],
  },
  {
    id: 22,
    brand: 'skin1004',
    brandName: 'Skin1004',
    name: 'Spot Acne Serum',
    nameLong: 'Skin1004 Zombie Beauty Spot Serum',
    price: 160,
    img: 'public/assets/images/marcas/skin1004/Acne/spotacne.png',
    desc: 'Sérum spot corrector para tratamiento local de granos activos. Actúa rápidamente para reducir la inflamación y dejar marcas mínimas.',
    tags: ['serum', 'spot', 'acne'],
    badge: 'popular',
    categories: ['acne'],
    benefits: ['Acción rápida', 'Spot treatment', 'Sin marcas'],
  },
  {
    id: 23,
    brand: 'skin1004',
    brandName: 'Skin1004',
    name: 'Thé Trica Ampoule',
    nameLong: 'Skin1004 Tea-Trica Ampoule',
    price: 185,
    img: 'public/assets/images/marcas/skin1004/Acne/teatricaampoule.jpg',
    desc: 'Ampolla de alta concentración con árbol de té y centella asiática. Trata activamente el acné, calma la inflamación y previene nuevos brotes.',
    tags: ['ampolla', 'acne', 'arbol de te'],
    badge: null,
    categories: ['acne'],
    benefits: ['Alta concentración', 'Árbol de té', 'Preventivo'],
  },
  {
    id: 24,
    brand: 'skin1004',
    brandName: 'Skin1004',
    name: 'Tónico Anti-Acné',
    nameLong: 'Skin1004 Zombie Beauty Toner',
    price: 155,
    img: 'public/assets/images/marcas/skin1004/Acne/toneracne.png',
    desc: 'Tónico exfoliante suave con BHA y extracto de centella. Elimina células muertas, desobstruye poros y prepara la piel para absorber mejor los siguientes pasos.',
    tags: ['tonico', 'exfoliante', 'bha'],
    badge: null,
    categories: ['acne', 'limpieza'],
    benefits: ['BHA exfoliante', 'Desobstruye poros', 'Preparador'],
  },

  // --- SKIN1004 Centella ---
  {
    id: 25,
    brand: 'skin1004',
    brandName: 'Skin1004',
    name: 'Limpiador Aceite Centella',
    nameLong: 'Skin1004 Centella Asiatica Cleansing Oil 200ml',
    price: 170,
    img: 'public/assets/images/marcas/skin1004/Centella/Limpiador en Aceite Centella 200 ml.jpg',
    desc: 'Aceite limpiador de primera limpieza con centella asiática al 79%. Disuelve impurezas, maquillaje y SPF sin irritar. Deja la piel tersa y calmada.',
    tags: ['limpieza', 'aceite', 'centella'],
    badge: 'popular',
    categories: ['limpieza'],
    benefits: ['Centella 79%', 'Primera limpieza', 'Calmante'],
  },
  {
    id: 26,
    brand: 'skin1004',
    brandName: 'Skin1004',
    name: 'Limpiador Espuma Centella',
    nameLong: 'Skin1004 Centella Asiatica Cleansing Foam 125ml',
    price: 135,
    img: 'public/assets/images/marcas/skin1004/Centella/Limpiador en Espuma Centella 125 ml.jpg',
    desc: 'Espuma gentil de segunda limpieza con centella asiática. Remueve residuos, equilibra el pH y deja la piel lista para los siguientes pasos de la rutina.',
    tags: ['limpieza', 'espuma', 'centella'],
    badge: null,
    categories: ['limpieza'],
    benefits: ['Segunda limpieza', 'pH equilibrado', 'Con centella'],
  },
  {
    id: 27,
    brand: 'skin1004',
    brandName: 'Skin1004',
    name: 'Mascarilla Centella',
    nameLong: 'Skin1004 Centella Asiatica Pack',
    price: 145,
    img: 'public/assets/images/marcas/skin1004/Centella/mascarillacne.png',
    desc: 'Mascarilla calmante con centella asiática al 100% para pieles sensibles e irritadas. Reduce el enrojecimiento y aporta calma inmediata después de la exposición solar.',
    tags: ['mascarilla', 'centella', 'sensible'],
    badge: null,
    categories: ['hidratacion', 'acne'],
    benefits: ['Centella pura', 'Anti-rojeces', 'Calmante'],
  },

  // --- SKIN1004 Manchas ---
  {
    id: 28,
    brand: 'skin1004',
    brandName: 'Skin1004',
    name: 'Ampolla para Manchas',
    nameLong: 'Skin1004 Brightening Ampoule 100ml',
    price: 220,
    img: 'public/assets/images/marcas/skin1004/Manchas/Ampolla para Manchas 100ml.png',
    desc: 'Ampolla aclarante con niacinamida, kojic acid y vitamina C para unificar el tono, reducir manchas oscuras y dejar una piel luminosa y uniforme.',
    tags: ['ampolla', 'manchas', 'vitamina c'],
    badge: 'popular',
    categories: ['manchas'],
    benefits: ['Niacinamida', 'Anti-manchas', 'Vitamina C'],
  },

  // --- SKIN1004 Probio-Cica ---
  {
    id: 29,
    brand: 'skin1004',
    brandName: 'Skin1004',
    name: 'Crema Probio-Cica',
    nameLong: 'Skin1004 Probio-Cica Calming Cream',
    price: 195,
    img: 'public/assets/images/marcas/skin1004/Probiocica/Crema Probio-Cica.jpg',
    desc: 'Crema calmante con probióticos y centella asiatica. Restaura el microbioma de la piel, reduce sensibilidad extrema y fortalece la barrera protectora.',
    tags: ['crema', 'probioticos', 'sensible'],
    badge: null,
    categories: ['hidratacion'],
    benefits: ['Probióticos', 'Barrera cutánea', 'Anti-sensibilidad'],
  },
  {
    id: 30,
    brand: 'skin1004',
    brandName: 'Skin1004',
    name: 'Crema de Ojos Probio-Cica',
    nameLong: 'Skin1004 Probio-Cica Eye Cream with Bakuchiol',
    price: 210,
    img: 'public/assets/images/marcas/skin1004/Probiocica/Crema de Ojos Probio-Cica Bakuchiol.jpg',
    desc: 'Crema de ojos antiedad con probióticos y bakuchiol retinol natural. Reduce ojeras, bolsas y líneas de expresión alrededor del contorno de ojos.',
    tags: ['ojos', 'antiedad', 'bakuchiol'],
    badge: 'new',
    categories: ['hidratacion'],
    benefits: ['Anti-ojeras', 'Bakuchiol', 'Anti-edad'],
  },

  // --- SKIN1004 Mascarilla Hialur ---
  {
    id: 31,
    brand: 'skin1004',
    brandName: 'Skin1004',
    name: 'Mascarilla Hialurónica',
    nameLong: 'Skin1004 Hyaluron Sheet Mask',
    price: 80,
    img: 'public/assets/images/marcas/skin1004/mascarillahyalu.png',
    desc: 'Mascarilla de tejido con ácido hialurónico de triple peso molecular. Hidratación extrema en 20 minutos. Deja la piel de efecto glass skin.',
    tags: ['mascarilla', 'hialuronico', 'glass skin'],
    badge: 'popular',
    categories: ['hidratacion'],
    benefits: ['Ácido hialurónico', 'Glass skin', 'Rápida'],
  },

  // --- SKIN1004 Poremizing ---
  {
    id: 32,
    brand: 'skin1004',
    brandName: 'Skin1004',
    name: 'Crema en Gel Poremizing',
    nameLong: 'Skin1004 Poremizing Green Fit Cream',
    price: 180,
    img: 'public/assets/images/marcas/skin1004/poremizing/Crema en Gel Ligera Poremizing.png',
    desc: 'Crema gel ultraligera con extractos verdes para piel grasa y con poros dilatados. Matifica, hidrata y minimiza los poros visibles.',
    tags: ['crema', 'poros', 'gel'],
    badge: null,
    categories: ['acne', 'hidratacion'],
    benefits: ['Matificante', 'Minimiza poros', 'Textura gel'],
  },
  {
    id: 33,
    brand: 'skin1004',
    brandName: 'Skin1004',
    name: 'Limpiador Espuma Rosa',
    nameLong: 'Skin1004 Poremizing Foam Cleanser',
    price: 140,
    img: 'public/assets/images/marcas/skin1004/poremizing/limpiadorespumarosa.png',
    desc: 'Espuma limpiadora con extracto de rosa y ácido salicílico para limpiar poros dilatados y reducir el exceso de grasa sin resecar.',
    tags: ['limpieza', 'rosa', 'poros'],
    badge: null,
    categories: ['limpieza'],
    benefits: ['Rosa & BHA', 'Anti-poros', 'Equilibrante'],
  },
  {
    id: 34,
    brand: 'skin1004',
    brandName: 'Skin1004',
    name: 'Sérum Rosa Poremizing',
    nameLong: 'Skin1004 Poremizing Rose Serum',
    price: 185,
    img: 'public/assets/images/marcas/skin1004/poremizing/serumrosa.png',
    desc: 'Sérum con rosa y niacinamida para minimizar poros y controlar el exceso de sebo. Textura acuosa que se absorbe al instante, sin brillos.',
    tags: ['serum', 'rosa', 'poros'],
    badge: 'new',
    categories: ['acne'],
    benefits: ['Rosa & niacinamida', 'Control de poros', 'Matificante'],
  },
  {
    id: 35,
    brand: 'skin1004',
    brandName: 'Skin1004',
    name: 'Stick Pore Control',
    nameLong: 'Skin1004 Poremizing Cleansing Stick',
    price: 120,
    img: 'public/assets/images/marcas/skin1004/poremizing/stickpore.png',
    desc: 'Stick limpiador sólido en barra para limpieza profunda de poros. Práctico, sin desperdicio y perfecto para usar en viaje. Con extracto purificante de arcilla.',
    tags: ['limpieza', 'stick', 'poros'],
    badge: null,
    categories: ['limpieza'],
    benefits: ['Formato barra', 'Portátil', 'Purificante'],
  },

  // --- SULWHASOO ---
  {
    id: 36,
    brand: 'sulwhasoo',
    brandName: 'Sulwhasoo',
    name: 'Limpiador Aceite Sulwhasoo',
    nameLong: 'Sulwhasoo Gentle Cleansing Oil',
    price: 285,
    img: 'public/assets/images/marcas/sulwhasoo/limpiadoraceite.jpg',
    desc: 'Aceite limpiador de lujo con ingredientes botánicos coreanos tradicionales. Disuelve impurezas y nutre la piel con una textura sedosa y aroma floral sofisticado.',
    tags: ['limpieza', 'aceite', 'lujo'],
    badge: null,
    categories: ['limpieza'],
    benefits: ['Lujo Coreano', 'Ingredientes botánicos', 'Nutritivo'],
  },
  {
    id: 37,
    brand: 'sulwhasoo',
    brandName: 'Sulwhasoo',
    name: 'Limpiador Espuma Sulwhasoo',
    nameLong: 'Sulwhasoo Gentle Cleansing Foam',
    price: 265,
    img: 'public/assets/images/marcas/sulwhasoo/limpiadorespuma.jpg',
    desc: 'Espuma limpiadora de lujo con extractos de hierbas medicinales coreanas. Limpia delicadamente mientras nutre y prepara la piel para la rutina.',
    tags: ['limpieza', 'espuma', 'lujo'],
    badge: null,
    categories: ['limpieza'],
    benefits: ['Hierbas medicinales', 'Lujo K-Beauty', 'Nutritiva'],
  },
  {
    id: 38,
    brand: 'sulwhasoo',
    brandName: 'Sulwhasoo',
    name: 'First Care Mini Sérum',
    nameLong: 'Sulwhasoo First Care Activating Serum Mini',
    price: 245,
    img: 'public/assets/images/marcas/sulwhasoo/miniserum.jpg',
    desc: 'El icónico primer sérum de Sulwhasoo en versión mini. Activador del cuidado con 5 plantas medicinales coreanas para una piel revitalizada y con luminosidad profunda.',
    tags: ['serum', 'lujo', 'herbolaria'],
    badge: 'popular',
    categories: ['hidratacion', 'manchas'],
    benefits: ['5 plantas medicinales', 'Activador K-Beauty', 'Luminosidad'],
  },

  // --- TIRTIR ---
  {
    id: 39,
    brand: 'tirtir',
    brandName: 'Tirtir',
    name: 'Glow Lavender Cushion',
    nameLong: 'Tirtir Mask Fit Glow Cushion - Lavender',
    price: 195,
    img: 'public/assets/images/marcas/tirtir/glowlavanda.jpg',
    desc: 'Cushion foundation con acabado glow en tono lavanda de moda. Cobertura buildable, hidratante y con SPF 40. El cushion favorito de las influencers coreanas.',
    tags: ['cushion', 'makeup', 'glow'],
    badge: 'new',
    categories: ['hidratacion'],
    benefits: ['SPF 40', 'Efecto glow', 'Cobertura buildable'],
  },
  {
    id: 40,
    brand: 'tirtir',
    brandName: 'Tirtir',
    name: 'Glow Skin Tirtir Mask',
    nameLong: 'Tirtir Glow Luminous Mask',
    price: 115,
    img: 'public/assets/images/marcas/tirtir/masktirtir.png',
    desc: 'Mascarilla de tejido glow con ingredientes luminosos para una piel con aspecto de vidrio. Hidrata profundamente y aporta un brillo natural irresistible.',
    tags: ['mascarilla', 'glow', 'glass skin'],
    badge: null,
    categories: ['hidratacion'],
    benefits: ['Glass skin', 'Brillo natural', 'Hidratación'],
  },
  {
    id: 41,
    brand: 'tirtir',
    brandName: 'Tirtir',
    name: 'Matcha Repair Cream',
    nameLong: 'Tirtir My Signature Matcha Repair Cream',
    price: 220,
    img: 'public/assets/images/marcas/tirtir/matchacream.jpg',
    desc: 'Crema reparadora con té matcha, centella y pantenol. Regenera la barrera cutánea, calma pieles dañadas y aporta una hidratación nutritiva duradera.',
    tags: ['crema', 'matcha', 'reparadora'],
    badge: 'popular',
    categories: ['hidratacion'],
    benefits: ['Matcha antioxidante', 'Reparadora', 'Barrera cutánea'],
  },
  {
    id: 42,
    brand: 'tirtir',
    brandName: 'Tirtir',
    name: 'Mask Fit Red Cushion 13C',
    nameLong: 'Tirtir Mask Fit Red Cushion Foundation 13C',
    price: 210,
    img: 'public/assets/images/marcas/tirtir/tirtir13c.jpg',
    desc: 'El famoso cushion rojo de Tirtir en tono 13C (ivory fresco). Cobertura media-alta buildable, acabado semi-mate natural, resistente al agua y con protección solar.',
    tags: ['cushion', 'makeup', 'cobertura'],
    badge: 'popular',
    categories: ['hidratacion'],
    benefits: ['SPF 40 PA+++', 'Resistente al agua', 'Cobertura buildable'],
  },
];

// ============ STATE ============
let cart = JSON.parse(localStorage.getItem('flordseul_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('flordseul_wishlist') || '[]');
let currentBrand = 'todos';
let currentCategory = 'all';
let searchQuery = '';
let currentSlide = 0;
let sliderInterval;

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSlider();
  renderProducts();
  updateCartUI();
  createPetals();
  initScrollEffects();
  initPaymentToggle();
  initNavScroll();

  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.getElementById('cartBtn').addEventListener('click', openCart);
});

// ============ THEME ============
function initTheme() {
  const saved = localStorage.getItem('flordseul_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('flordseul_theme', next);
}

// ============ NAVBAR SCROLL ============
function initNavScroll() {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
      backToTop.classList.add('visible');
    } else {
      navbar.classList.remove('scrolled');
      backToTop.classList.remove('visible');
    }
    // Active nav link
    const sections = ['inicio','productos','nosotros','contacto'];
    let found = 'inicio';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) found = id;
    });
    document.querySelectorAll('.nav-link').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${found}`);
    });
  });
}

// ============ HAMBURGER MENU ============
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('navLinks').classList.remove('open');
}

// ============ HERO SLIDER ============
function initSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('sliderDots');
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Ir a slide ${i+1}`);
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  });
  startAutoSlide();
}

function startAutoSlide() {
  sliderInterval = setInterval(() => changeSlide(1), 5000);
}

function changeSlide(dir) {
  const slides = document.querySelectorAll('.hero-slide');
  slides[currentSlide].classList.remove('active');
  document.querySelectorAll('.slider-dot')[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + dir + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  document.querySelectorAll('.slider-dot')[currentSlide].classList.add('active');
  clearInterval(sliderInterval);
  startAutoSlide();
}

function goToSlide(i) {
  const slides = document.querySelectorAll('.hero-slide');
  slides[currentSlide].classList.remove('active');
  document.querySelectorAll('.slider-dot')[currentSlide].classList.remove('active');
  currentSlide = i;
  slides[currentSlide].classList.add('active');
  document.querySelectorAll('.slider-dot')[currentSlide].classList.add('active');
  clearInterval(sliderInterval);
  startAutoSlide();
}

// ============ CHERRY BLOSSOM PETALS ============
function createPetals() {
  const container = document.getElementById('petalsContainer');
  for (let i = 0; i < 18; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    const size = Math.random() * 12 + 6;
    petal.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${Math.random() * 8 + 6}s;
      animation-delay: ${Math.random() * 8}s;
      opacity: ${Math.random() * 0.6 + 0.2};
    `;
    container.appendChild(petal);
  }
}

// ============ SCROLL REVEAL ============
function initScrollEffects() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card, .category-card, .collage-item, .contact-item, .about-stats').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// ============ PRODUCTS RENDER ============
function getFilteredProducts() {
  return PRODUCTS.filter(p => {
    const matchBrand = currentBrand === 'todos' || p.brand === currentBrand;
    const matchCategory = currentCategory === 'all' || p.categories.includes(currentCategory);
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || 
      p.name.toLowerCase().includes(q) ||
      p.brandName.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q));
    return matchBrand && matchCategory && matchSearch;
  });
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');
  const filtered = getFilteredProducts();

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';

  grid.innerHTML = filtered.map(p => {
    const inWishlist = wishlist.includes(p.id);
    const cartItem = cart.find(c => c.id === p.id);
    return `
    <article class="product-card" data-id="${p.id}">
      <div class="product-img-wrap" onclick="openProductModal(${p.id})">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<span class="product-badge ${p.badge}">${
          p.badge === 'new' ? 'Nuevo' : p.badge === 'popular' ? 'Popular' : 'Oferta'
        }</span>` : ''}
        <button class="product-wishlist ${inWishlist ? 'active' : ''}" 
          onclick="toggleWishlist(event, ${p.id})" 
          aria-label="Favorito"
          title="${inWishlist ? 'Quitar de favoritos' : 'Agregar a favoritos'}">
          ${inWishlist ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="product-info">
        <span class="product-brand">${p.brandName}</span>
        <h3 class="product-name" onclick="openProductModal(${p.id})">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-tags">
          ${p.tags.slice(0,3).map(t => `<span class="product-tag">${t}</span>`).join('')}
        </div>
        <div class="product-footer">
          <span class="product-price">Q${p.price.toFixed(2)}</span>
          <button class="add-to-cart-btn" onclick="addToCart(${p.id})" id="addBtn-${p.id}">
            🛍 Agregar
          </button>
        </div>
      </div>
    </article>
    `;
  }).join('');
}

// ============ BRAND FILTER ============
function showBrand(brand) {
  currentBrand = brand;
  document.querySelectorAll('.brand-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.brand === brand);
  });
  renderProducts();
  document.getElementById('productos').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============ CATEGORY FILTER ============
function filterCategory(cat) {
  currentCategory = cat;
  renderProducts();
  document.getElementById('productos').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============ SEARCH ============
function searchProducts() {
  searchQuery = document.getElementById('searchInput').value;
  renderProducts();
}

// ============ WISHLIST ============
function toggleWishlist(e, id) {
  e.stopPropagation();
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(w => w !== id);
    showToast('💔 Eliminado de favoritos');
  } else {
    wishlist.push(id);
    showToast('❤️ Agregado a favoritos');
  }
  localStorage.setItem('flordseul_wishlist', JSON.stringify(wishlist));
  renderProducts();
}

// ============ CART ============
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }
  saveCart();
  updateCartUI();
  openCart();
  showToast(`🌸 ¡${product.name} agregado al carrito!`);
  // Animate button
  const btn = document.getElementById(`addBtn-${id}`);
  if (btn) {
    btn.textContent = '✓ Agregado';
    btn.style.background = 'linear-gradient(135deg, #5d8a63, #8aab8e)';
    setTimeout(() => {
      btn.textContent = '🛍 Agregar';
      btn.style.background = '';
    }, 1600);
  }
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else {
    saveCart();
    updateCartUI();
  }
}

function saveCart() {
  localStorage.setItem('flordseul_cart', JSON.stringify(cart));
}

function getCartTotal() {
  return cart.reduce((sum, c) => {
    const p = PRODUCTS.find(pr => pr.id === c.id);
    return sum + (p ? p.price * c.qty : 0);
  }, 0);
}

function getCartCount() {
  return cart.reduce((sum, c) => sum + c.qty, 0);
}

function updateCartUI() {
  const count = getCartCount();
  const total = getCartTotal();
  document.getElementById('cartCount').textContent = count;

  const cartItems = document.getElementById('cartItems');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartFooter = document.getElementById('cartFooter');
  const cartTotal = document.getElementById('cartTotal');

  if (cart.length === 0) {
    cartEmpty.style.display = 'flex';
    cartFooter.style.display = 'none';
    cartItems.innerHTML = '';
    cartItems.appendChild(cartEmpty);
    return;
  }

  cartEmpty.style.display = 'none';
  cartFooter.style.display = 'flex';
  cartTotal.textContent = `Q${total.toFixed(2)}`;

  const itemsHtml = cart.map(c => {
    const p = PRODUCTS.find(pr => pr.id === c.id);
    if (!p) return '';
    return `
    <div class="cart-item" id="cartItem-${c.id}">
      <div class="cart-item-img"><img src="${p.img}" alt="${p.name}" /></div>
      <div>
        <div class="cart-item-brand">${p.brandName}</div>
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQty(${c.id}, -1)" aria-label="Disminuir">−</button>
          <span class="qty-num">${c.qty}</span>
          <button class="qty-btn" onclick="changeQty(${c.id}, 1)" aria-label="Aumentar">+</button>
          <button class="remove-item" onclick="removeFromCart(${c.id})" aria-label="Eliminar">✕</button>
        </div>
      </div>
      <div class="cart-item-price">Q${(p.price * c.qty).toFixed(2)}</div>
    </div>
    `;
  }).join('');

  cartItems.innerHTML = '';
  cartItems.insertAdjacentHTML('beforeend', itemsHtml);
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ============ CHECKOUT ============
function openCheckout() {
  closeCart();
  updateSummary();
  document.getElementById('checkoutModal').classList.add('open');
  document.getElementById('checkoutOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  document.getElementById('checkoutModal').classList.remove('open');
  document.getElementById('checkoutOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function updateSummary() {
  const summaryItems = document.getElementById('summaryItems');
  const summarySubtotal = document.getElementById('summarySubtotal');
  const summaryTotal = document.getElementById('summaryTotal');
  const total = getCartTotal();

  summaryItems.innerHTML = cart.map(c => {
    const p = PRODUCTS.find(pr => pr.id === c.id);
    if (!p) return '';
    return `
    <div class="summary-item">
      <img src="${p.img}" alt="${p.name}" />
      <div class="summary-item-info">
        <div class="summary-item-name">${p.name}</div>
        <div class="summary-item-qty">x${c.qty} &nbsp;·&nbsp; ${p.brandName}</div>
      </div>
      <div class="summary-item-price">Q${(p.price * c.qty).toFixed(2)}</div>
    </div>
    `;
  }).join('');

  summarySubtotal.textContent = `Q${total.toFixed(2)}`;
  summaryTotal.textContent = `Q${total.toFixed(2)}`;
}

function initPaymentToggle() {
  document.querySelectorAll('input[name="pago"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const bankInfo = document.getElementById('bankInfo');
      bankInfo.classList.toggle('show', radio.value === 'deposito' && radio.checked);
    });
  });
  // Show bank info by default (deposito selected)
  document.getElementById('bankInfo').classList.add('show');
}

function placeOrder(e) {
  e.preventDefault();
  const nombre = document.getElementById('chkNombre').value;
  const tel = document.getElementById('chkTel').value;
  const dir = document.getElementById('chkDir').value;
  const pago = document.querySelector('input[name="pago"]:checked').value;

  const mensaje = `🌸 *Nuevo Pedido — Flor de Seúl GT*\n\n` +
    `👤 *Cliente:* ${nombre}\n📱 *Teléfono:* ${tel}\n📍 *Dirección:* ${dir}\n💳 *Pago:* ${pago === 'deposito' ? 'Depósito Previo' : 'Contra Entrega'}\n\n` +
    `🛍 *Productos:*\n${cart.map(c => {
      const p = PRODUCTS.find(pr => pr.id === c.id);
      return p ? `• ${p.name} x${c.qty} — Q${(p.price*c.qty).toFixed(2)}` : '';
    }).join('\n')}\n\n` +
    `💰 *Total: Q${getCartTotal().toFixed(2)}*`;

  const waUrl = `https://wa.me/50200000000?text=${encodeURIComponent(mensaje)}`;
  
  showToast('🌸 ¡Pedido enviado! Te contactaremos pronto.');
  setTimeout(() => {
    window.open(waUrl, '_blank');
    closeCheckout();
    cart = [];
    saveCart();
    updateCartUI();
    renderProducts();
  }, 1200);
}

// ============ PRODUCT MODAL ============
function openProductModal(id) {
  const p = PRODUCTS.find(pr => pr.id === id);
  if (!p) return;
  const content = document.getElementById('productModalContent');
  content.innerHTML = `
    <div class="product-modal-img">
      <img src="${p.img}" alt="${p.nameLong}" />
    </div>
    <div class="product-modal-info">
      <div class="product-modal-brand">${p.brandName} &nbsp;·&nbsp; K-Beauty</div>
      <h2 class="product-modal-title">${p.nameLong}</h2>
      <p class="product-modal-desc">${p.desc}</p>
      <div class="product-tags" style="margin: 0;">
        ${(p.benefits || p.tags).map(b => `<span class="product-tag">✓ ${b}</span>`).join('')}
      </div>
      <div class="product-modal-price">Q${p.price.toFixed(2)}</div>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <button class="btn-primary" onclick="addToCart(${p.id}); closeProductModal();" style="flex:1; min-width:160px;">
          🛍 Agregar al Carrito
        </button>
        <button class="btn-ghost" onclick="toggleWishlist(event, ${p.id}); renderProducts();" style="flex:1; min-width:100px; color: var(--accent-rose); border-color: var(--accent-rose);">
          ${wishlist.includes(p.id) ? '❤️ Favorito' : '🤍 Favorito'}
        </button>
      </div>
    </div>
  `;
  document.getElementById('productModal').classList.add('open');
  document.getElementById('productOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('open');
  document.getElementById('productOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ============ CONTACT FORM ============
function submitForm(e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const mensaje = document.getElementById('mensaje').value;
  showToast(`🌸 ¡Gracias ${nombre}! Te contactaremos pronto.`);
  e.target.reset();
  const wa = `https://wa.me/50200000000?text=${encodeURIComponent(`Hola! Me llamo ${nombre} (${email}). ${mensaje}`)}`;
  setTimeout(() => window.open(wa, '_blank'), 1500);
}

// ============ TOAST ============
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============ KEYBOARD CLOSE ============
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCart();
    closeCheckout();
    closeProductModal();
  }
});
