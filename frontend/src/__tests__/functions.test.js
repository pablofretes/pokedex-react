import { capsFirstLetter, isEmpty } from '../utils/functions';
import '@testing-library/jest-dom/extend-expect';

describe('Both functions work as expected', () => {

    it('capsFirstLetter capitalices the first letter of every word and removes any hyphens', () => {
        const sentence = 'tomorrow-i-will-take-a-bath';
        const capsTest = capsFirstLetter(sentence);
        
        expect(capsTest).toEqual('Tomorrow I Will Take A Bath');
    });

    it('capsFirstLetter capitalices only first letter the first word if there are no hyphens', () => {
        const sentence = 'tomorrow i will take a bath';
        const capsTest = capsFirstLetter(sentence);

        expect(capsTest).toEqual('Tomorrow i will take a bath');
    });

    it('isEmpty returns true if the object is empty', () => {
        const object = {};
        const emptyTest = isEmpty(object);

        expect(emptyTest).toEqual(true);
    });

    it('isEmpty returns false if the object is not empty', () => {
        const object = { something: "something" };
        const emptyTest = isEmpty(object);

        expect(emptyTest).toEqual(false);
    });
});