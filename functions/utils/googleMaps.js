const { Client } = require('@googlemaps/google-maps-services-js');
const mapsClient = new Client();

async function geocodeAddress(address, key) {
	try {
		const response = await mapsClient.geocode({
			params: { address, key },
		});
		const coordinates = response.data.results[0].geometry;
		return coordinates.location;
	} catch (error) {
		return error;
	}
}

module.exports = { geocodeAddress };
