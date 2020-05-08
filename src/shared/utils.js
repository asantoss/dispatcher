import { useMemo, useState } from 'react';

export function useDebounce(func, delay) {
	const [value, setValue] = useState(null);

	return useMemo(
		(...args) => {
			if (value) {
				clearTimeout(value);
			} else {
				setValue(
					setTimeout(() => {
						setValue(null);
						func(...args);
					}, delay)
				);
			}
		},
		[func, delay, value]
	);
}

export function sleep(time) {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
}

const urlRegEx = /http[s]+:\/\//g;
const location = /[mMyY]+\+[Ll]ocation/g;
export function mapsOpener(url, origin) {
	const browserLocation = origin
		? origin?.latitude + ',' + origin?.longitude
		: null;

	const isIphone = navigator.platform.indexOf('Iphone') !== -1;
	if (isIphone) {
		url = url.replace(urlRegEx, 'maps');
	}
	if (browserLocation) {
		url = url.replace(location, browserLocation);
	}
	return window.open(url);
}
