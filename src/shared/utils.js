import React, { useMemo, useState } from 'react';

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
		[func]
	);
}
