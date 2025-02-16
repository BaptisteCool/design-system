import ruleMessage from '../../helpers/ruleMessage';

import { defaultErrorMessages } from './locales';

/** Check that the field does not exceeds the max length */
export function maxLength(max: number, errorMessages = defaultErrorMessages) {
	// Return the validation function
	return (value: string) => {
		// If the value is empty, return true (valid)
		if (!value) {
			return true;
		}

		return value.length < max || ruleMessage(errorMessages, 'default', [max]);
	};
}

export default maxLength;
