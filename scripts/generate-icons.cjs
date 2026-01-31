// Script para generar iconos de la PWA
// Ejecutar: node scripts/generate-icons.js

const fs = require('fs');

// SVG base para el icono (bandera europea simplificada)
const iconSVG = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#003399" rx="${size * 0.1}"/>
  <circle cx="${size * 0.5}" cy="${size * 0.5}" r="${size * 0.2}" fill="none" stroke="#FFCC00" stroke-width="${size * 0.02}"/>
  <g fill="#FFCC00">
    <circle cx="${size * 0.5}" cy="${size * 0.3}" r="${size * 0.02}"/>
    <circle cx="${size * 0.6}" cy="${size * 0.35}" r="${size * 0.02}"/>
    <circle cx="${size * 0.65}" cy="${size * 0.5}" r="${size * 0.02}"/>
    <circle cx="${size * 0.6}" cy="${size * 0.65}" r="${size * 0.02}"/>
    <circle cx="${size * 0.5}" cy="${size * 0.7}" r="${size * 0.02}"/>
    <circle cx="${size * 0.4}" cy="${size * 0.65}" r="${size * 0.02}"/>
    <circle cx="${size * 0.35}" cy="${size * 0.5}" r="${size * 0.02}"/>
    <circle cx="${size * 0.4}" cy="${size * 0.35}" r="${size * 0.02}"/>
  </g>
  <text x="${size * 0.5}" y="${size * 0.85}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size * 0.1}" fill="#FFCC00" font-weight="bold">TRAVEL</text>
</svg>
`;

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

console.log('📱 Generando iconos para PWA...');
console.log('⚠️  Nota: Necesitas convertir estos SVGs a PNG usando herramientas como ImageMagick o un editor gráfico');

// Crear directorio para iconos
if (!fs.existsSync('static/icons-svg')) {
    fs.mkdirSync('static/icons-svg', { recursive: true });
}

// Generar SVGs para cada tamaño
sizes.forEach(size => {
    const svg = iconSVG(size);
    fs.writeFileSync(`static/icons-svg/icon-${size}.svg`, svg);
    console.log(`✅ Creado icon-${size}.svg`);
});

console.log('\n🔧 Para convertir a PNG, ejecuta:');
console.log('# Con ImageMagick:');
sizes.forEach(size => {
    console.log(`convert static/icons-svg/icon-${size}.svg static/icon-${size}.png`);
});

console.log('\n🎨 O crea iconos personalizados en:');
console.log('- Figma: https://figma.com');
console.log('- Canva: https://canva.com');
console.log('- PWA Icon Generator: https://www.pwabuilder.com/imageGenerator');