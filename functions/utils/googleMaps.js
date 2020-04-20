const { Client } = require('@googlemaps/google-maps-services-js');
const googleClient = new Client();

async function geocodeAddress(address, key) {
	const response = await googleClient
		.geocode({
			params: { address, key },
		})
		.catch((e) => e);
	const coordinates = response.data.results[0].geometry.location;
	const place_id = response.data.results[0]['place_id'];
	return { ...coordinates, place_id };
}

module.exports = { geocodeAddress };
