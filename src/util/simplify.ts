import nodejieba from 'nodejieba';

import { s2tDict, t2sDict } from 'util/pinyinDict';
import { getPinyinSegments } from 'util/segmentation';

const SpecialCharacters = new Set(['只', '喂', '面', '发', '干']);

const traditionalizeSpecialCharacter = (character: string, textBeforeCharacter: string[], textAfterText: string[]): string => {
    if (character.length !== 1) {
        throw Error('TraditionalizeSpecialCharacter only takes a single character');
    }

    let previousCharacter: string;
    let followingCharacter: string;
    let lastTwoCharacters: string;

    switch (character) {
    case '只':
        previousCharacter = nodejieba.tag(textBeforeCharacter.join('')).slice(-1)[0].tag;
        followingCharacter = nodejieba.tag(textAfterText.join(''))[0].tag;
        if (previousCharacter === 'm') {
            return '隻';
        }
        if (followingCharacter === 'n') {
            return '隻';
        }
        return '只';
    case '喂':
        followingCharacter = nodejieba.tag(textAfterText.join(''))[0].tag;
        if (followingCharacter === 'n') {
            return '餵';
        }
        return '喂';
    case '面':
        previousCharacter = nodejieba.tag(textBeforeCharacter.join('')).slice(-1)[0].tag;
        if (previousCharacter === 'v') {
            return '麵';
        }
        return '面';
    case '发':
        lastTwoCharacters = textBeforeCharacter.join('').slice(-2);
        if (lastTwoCharacters.includes('理') || lastTwoCharacters.includes('头')) {
            return '髮';
        }
        return '發';
    case '干':
        lastTwoCharacters = textBeforeCharacter.join('').slice(-2);
        if (lastTwoCharacters.includes('变')) {
            return '乾';
        }
        return '幹';
    default:
        return character in s2tDict ? s2tDict[character] : character;
    }
};

const simplify = (text: string): string => {
    const pinyinSegments = getPinyinSegments(text).map((pinyinSegment) => {
        return pinyinSegment in t2sDict ? t2sDict[pinyinSegment] : pinyinSegment;
    });
    return pinyinSegments.join('');
};

const traditionalize = (text: string): string => {
    const pinyinSegments = getPinyinSegments(text).map((pinyinSegment, i, segments) => {
        if (SpecialCharacters.has(pinyinSegment)) {
            return traditionalizeSpecialCharacter(pinyinSegment, segments.slice(0, i), segments.slice(i + 1));
        }
        return pinyinSegment in s2tDict ? s2tDict[pinyinSegment] : pinyinSegment;
    });
    return pinyinSegments.join('');
};

export { simplify, traditionalize };
