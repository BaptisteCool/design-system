import ruleMessage from '../../helpers/ruleMessage';

import { defaultErrorMessages } from './locales';

import isDateAfterNow from './isDateAfterNow';

/** Check that the date is not before today (expects ##/##/#### format) */
export function notBeforeToday(errorMessages = defaultErrorMessages) {
	return (value: string) => {
		// If the value is empty, return true (valid)
		if (!value) {
			return true;
		}

		// If the date is after now, it's a future date, it's valid,
		// else, the date is before today, it's invalid
		return isDateAfterNow(value) || ruleMessage(errorMessages, 'default');
	};
}

export default notBeforeToday();
