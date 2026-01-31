// Mock travel data for demonstration
// In production, this would use pre-computed embeddings and real travel data
const travelData = {
	madrid: {
		attractions: ['Museo del Prado', 'Palacio Real', 'Parque del Retiro', 'Plaza Mayor', 'Puerta del Sol'],
		restaurants: ['Sobrino de Botín', 'Casa Lucio', 'Mercado de San Miguel', 'La Latina'],
		transport: 'Metro de Madrid, autobuses, taxis. Tarjeta Multi recomendada.',
		tips: 'Mejor época: primavera y otoño. Siesta de 14-16h. Cena tarde (22h+).'
	},
	barcelona: {
		attractions: ['Sagrada Familia', 'Parque Güell', 'Las Ramblas', 'Barrio Gótico', 'Casa Batlló'],
		restaurants: ['Cal Pep', 'Quimet & Quimet', 'Mercado de la Boquería', 'Els Quatre Gats'],
		transport: 'Metro TMB, autobuses, Bicing (bicicletas). Hola Barcelona Card.',
		tips: 'Playa urbana disponible. Catalán y español. Pickpockets en Las Ramblas.'
	},
	roma: {
		attractions: ['Coliseo', 'Foro Romano', 'Vaticano', 'Fontana di Trevi', 'Panteón'],
		restaurants: ['Da Enzo al 29', 'Checchino dal 1887', 'Mercato Centrale', 'Trastevere'],
		transport: 'Metro ATAC, autobuses, tranvías. Roma Pass recomendada.',
		tips: 'Siesta 13-15h. Dress code en Vaticano. Agua gratis en fuentes públicas.'
	},
	amsterdam: {
		attractions: ['Rijksmuseum', 'Casa de Ana Frank', 'Canales', 'Vondelpark', 'Red Light District'],
		restaurants: ['Café de Reiger', 'Restaurant Greetje', 'Foodhallen', 'Winkel 43'],
		transport: 'Bicicletas (principal), tranvías GVB, metro. OV-chipkaart.',
		tips: 'Bicicleta es obligatoria. Coffeeshops legales. Propinas no obligatorias.'
	},
	paris: {
		attractions: ['Torre Eiffel', 'Louvre', 'Notre-Dame', 'Sacré-Cœur', 'Champs-Élysées'],
		restaurants: ['L\'As du Fallafel', 'Du Pain et des Idées', 'Marché Saint-Germain', 'Le Comptoir du Relais'],
		transport: 'Metro RATP, RER, autobuses. Navigo Easy o Passe Navigo.',
		tips: 'Museos gratis primer domingo del mes. Propina incluida. Bonjour obligatorio.'
	},
	venecia: {
		attractions: ['Plaza San Marcos', 'Puente de Rialto', 'Palacio Ducal', 'Gondolas', 'Murano y Burano'],
		restaurants: ['Osteria alle Testiere', 'Cantina Do Spade', 'Mercato di Rialto', 'Bacari típicos'],
		transport: 'Vaporetto (barco-bus), a pie. ACTV travel card.',
		tips: 'Acqua alta en invierno. Reservar restaurantes. Evitar trampas turísticas.'
	},
	florencia: {
		attractions: ['Duomo', 'Uffizi', 'Ponte Vecchio', 'Palazzo Pitti', 'Piazzale Michelangelo'],
		restaurants: ['Trattoria Mario', 'All\'Antico Vinaio', 'Mercato Centrale', 'Santo Spirito'],
		transport: 'A pie (centro histórico), autobuses ATAF. Firenzecard.',
		tips: 'Reservar Uffizi con anticipación. Aperitivo 18-20h. Gelato artesanal.'
	}
};

const responseTemplates = {
	attractions: [
		"Para **{city}** te recomiendo visitar:\n\n{attractions}\n\n{tips}",
		"En **{city}** no te puedes perder:\n\n{attractions}\n\n💡 {tips}"
	],
	restaurants: [
		"Para comer bien en **{city}**:\n\n{restaurants}\n\n🍽️ {tips}",
		"Restaurantes recomendados en **{city}**:\n\n{restaurants}\n\n{tips}"
	],
	transport: [
		"Para moverte en **{city}**:\n\n{transport}\n\n{tips}",
		"Transporte en **{city}**:\n\n{transport}\n\n💡 {tips}"
	],
	general: [
		"En **{city}** puedes:\n\n**🏛️ Atracciones:** {attractions}\n\n**🍽️ Restaurantes:** {restaurants}\n\n**🚇 Transporte:** {transport}\n\n💡 **Tips:** {tips}"
	]
};

function detectCity(query) {
	const cities = {
		'madrid': ['madrid', 'prado', 'retiro', 'sol'],
		'barcelona': ['barcelona', 'sagrada', 'güell', 'ramblas', 'gaudí'],
		'roma': ['roma', 'coliseo', 'vaticano', 'trevi', 'romano'],
		'amsterdam': ['amsterdam', 'rijks', 'canales', 'ana frank', 'vondelpark'],
		'paris': ['paris', 'parís', 'eiffel', 'louvre', 'notre', 'champs'],
		'venecia': ['venecia', 'venice', 'san marcos', 'rialto', 'gondola'],
		'florencia': ['florencia', 'florence', 'uffizi', 'duomo', 'ponte vecchio']
	};

	const lowerQuery = query.toLowerCase();
	
	for (const [city, keywords] of Object.entries(cities)) {
		if (keywords.some(keyword => lowerQuery.includes(keyword))) {
			return city;
		}
	}
	
	return null;
}

function detectIntent(query) {
	const lowerQuery = query.toLowerCase();
	
	if (lowerQuery.includes('comer') || lowerQuery.includes('restaurante') || lowerQuery.includes('comida')) {
		return 'restaurants';
	}
	if (lowerQuery.includes('transporte') || lowerQuery.includes('mover') || lowerQuery.includes('metro') || lowerQuery.includes('aeropuerto')) {
		return 'transport';
	}
	if (lowerQuery.includes('ver') || lowerQuery.includes('visitar') || lowerQuery.includes('hacer') || lowerQuery.includes('museo')) {
		return 'attractions';
	}
	
	return 'general';
}

function formatList(items) {
	return items.map(item => `• ${item}`).join('\n');
}

function getRandomTemplate(templates) {
	return templates[Math.floor(Math.random() * templates.length)];
}

export async function travelSearch(query) {
	// Simulate processing time
	await new Promise(resolve => setTimeout(resolve, 300));
	
	const city = detectCity(query);
	const intent = detectIntent(query);
	
	if (!city) {
		return "🤔 No pude identificar la ciudad específica. ¿Podrías mencionar Madrid, Barcelona, Roma, Amsterdam, París, Venecia o Florencia?";
	}
	
	const cityData = travelData[city];
	const templates = responseTemplates[intent];
	const template = getRandomTemplate(templates);
	
	return template
		.replace(/{city}/g, city.charAt(0).toUpperCase() + city.slice(1))
		.replace(/{attractions}/g, formatList(cityData.attractions.slice(0, 5)))
		.replace(/{restaurants}/g, formatList(cityData.restaurants))
		.replace(/{transport}/g, cityData.transport)
		.replace(/{tips}/g, cityData.tips);
}