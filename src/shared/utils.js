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
