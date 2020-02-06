import { deepRemoveKeys } from '../';
import { deepCopy } from '../../../helpers/deepCopy';

const objectToDeepRemove = {
	a: {
		b: 'b',
		c: [{ e: 'key to delete' }]
	}
};

const arrayToDeepRemove = [
	{
		b: 'b',
		c: [{ e: 'key to delete' }]
	}
];

// Tests
describe('deepRemoveKeys', () => {
	it('deletes a key', () => {
		const copiedCollection = deepCopy(objectToDeepRemove);

		const newCollection = deepRemoveKeys(copiedCollection, 'b');

		expect(newCollection).toEqual({
			a: {
				c: [{ e: 'key to delete' }]
			}
		});
	});

	it('deletes multiple keys', () => {
		const copiedCollection = deepCopy(objectToDeepRemove);

		const newCollection = deepRemoveKeys(copiedCollection, ['b', 'c']);

		expect(newCollection).toEqual({
			a: {}
		});
	});

	it('delete deep key in object', () => {
		const copiedCollection = deepCopy(objectToDeepRemove);

		const newCollection = deepRemoveKeys(copiedCollection, 'e');

		expect(newCollection).toEqual({
			a: {
				b: 'b',
				c: [{}]
			}
		});
	});

	it('delete deep key in an array', () => {
		const copiedCollection = deepCopy(arrayToDeepRemove);

		const newCollection = deepRemoveKeys(copiedCollection, 'c');

		expect(newCollection).toEqual([
			{
				b: 'b'
			}
		]);
	});
});
