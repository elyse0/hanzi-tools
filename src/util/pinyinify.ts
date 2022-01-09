import pinyin from 'pinyin';

import { getPinyinSegments } from 'util/segmentation';
import { pinyinDict } from 'util/pinyinDict';
import { getNormalizedEnglishText } from 'util/punctuation';
import { isCharacterText } from 'util/util';
import { getTextTags } from 'util/tag';

import { HanziTools } from 'types';

// Use tones[tone - 1] to get all possible characters with that tone
const ToneMarks = [
    ['ā', 'ē', 'ī', 'ō', 'ū', 'ǖ', 'Ā', 'Ē', 'Ī', 'Ō', 'Ū', 'Ǖ'],
    ['á', 'é', 'í', 'ó', 'ú', 'ǘ', 'Á', 'É', 'Í', 'Ó', 'Ú', 'Ǘ'],
    ['ǎ', 'ě', 'ǐ', 'ǒ', 'ǔ', 'ǚ', 'Ǎ', 'Ě', 'Ǐ', 'Ǒ', 'Ǔ', 'Ǚ'],
    ['à', 'è', 'ì', 'ò', 'ù', 'ǜ', 'À', 'È', 'Ì', 'Ò', 'Ù', 'Ǜ'],
    ['a', 'e', 'i', 'o', 'u', 'ü', 'A', 'E', 'I', 'O', 'U', 'Ü'],
];

const getTone = (char: string): number => {
    // Getting and destructuring the pinyin string
    const pinyinChars = Array.from(pinyinDict[char]);

    // Going through the four tones and checking if there is a match
    for (let i = 0; i < 4; i += 1) {
        if (ToneMarks[i].some((toneCharacter) => pinyinChars.includes(toneCharacter))) {
            return i + 1;
        }
    }
    return 5;
};

const decideAmbiguousChar = (char: string, cuts: string[], cutIndex: number): string | undefined => {
    const previousText = cuts.slice(Math.max(0, cutIndex - 10), cutIndex);
    const afterText = cuts.slice(cutIndex + 1, cutIndex + 10);
    let nextTags;
    let prevTags;

    switch (char) {
    case '觉':
    case '覺':
        if (previousText.join('').includes('睡')) {
            return 'jiào';
        }
        return 'jué';
    case '长':
    case '長':
        prevTags = getTextTags(previousText.join(''));
        nextTags = getTextTags(afterText.join(''));
        const nextTag = nextTags && nextTags.length && nextTags[0].tag;
        if (nextTag === 'uz') {
            return 'zhǎng';
        }
        const prevTag = prevTags && prevTags.length && prevTags[prevTags.length - 1].tag;
        if (prevTag === 'n') {
            return 'zhǎng';
        }
        if (prevTag !== 'd' && nextTag === 'ul') {
            return 'zhǎng';
        }
        // zhǎng has higher frequency due to compond words,
        // but cháng is more common as an individual character.
        return 'cháng';
    case '得':
        nextTags = getTextTags(afterText.join(''));
        prevTags = getTextTags(previousText.join(''));
        if (nextTags && nextTags.length) {
            const afterTag = nextTags[0].tag;
            const prevTag = prevTags.length && prevTags[prevTags.length - 1].tag;
            if (prevTag === 'v') {
                break;
            }
            if (prevTag === 'a' || prevTag === 'b' || prevTag === 'nr') {
                break;
            }
            if (afterTag === 'ul') {
                return 'dé';
            }
            if (prevTag === 'd' || prevTag === 'r') {
                return 'děi';
            }

            if (nextTags[0].word === '还' || nextTags[0].word === '還') {
                if ((nextTags[1] && nextTags[1].tag[0] === 'r') || nextTags[1].tag[0] === 'n') {
                    return 'děi';
                }
            }
            if (afterTag[0] === 't' || afterTag[0] === 'v' || afterTag[0] === 'p' || afterTag[0] === 'l' || afterTag[0] === 'n') {
                return 'děi';
            }
        }
        break;
    case '还':
    case '還':
        if (previousText.join('').includes('把')) {
            return 'huán';
        }
        nextTags = getTextTags(afterText.join(''));
        if (nextTags && nextTags.length) {
            const afterTag = nextTags[0].tag;
            if (afterText[0][0] === '有') {
                break;
            }
            if (afterTag[0] === 'r' || afterTag[0] === 'n') {
                return 'huán';
            }
        }
        break;
    case '行':
        prevTags = getTextTags(previousText.join(''));
        nextTags = getTextTags(afterText.join(''));
        if (prevTags.length && prevTags[prevTags.length - 1].tag === 'm') {
            return 'háng';
        }
        break;
    case '只':
        const prev = getTextTags(previousText.join('')).slice(-1)[0];
        const after = getTextTags(afterText.join(''))[0];
        if (prev && prev.tag === 'm') {
            return 'zhī';
        }
        if (after && after.tag === 'n') {
            return 'zhī';
        }
        return 'zhǐ';
    case '系':
        nextTags = getTextTags(afterText.join(''));
        if (nextTags && nextTags.length) {
            const afterTag = nextTags[0].tag;
            if (afterTag === 'f' || afterTag[0] === 'u') {
                return 'jì';
            }
        }
        return 'xì';
    case '地':
        prevTags = getTextTags(previousText.join(''));
        nextTags = getTextTags(afterText.join(''));
        if (prevTags.length && prevTags[prevTags.length - 1].tag === 'r') {
            return 'dì';
        }
        break;
    case '弹':
        nextTags = getTextTags(afterText.join(''));
        if (afterText.includes('吉他')) {
            return 'tán';
        }
        if (nextTags && nextTags.length) {
            const afterTag = nextTags[0].tag;
            if (afterTag[0] === 'n') {
                return 'tán';
            }
        }
        break;
    case '重':
        nextTags = getTextTags(afterText.join(''));
        if (nextTags && nextTags.length) {
            const afterTag = nextTags[0].tag;
            if (afterTag[0] === 'v') return 'chóng';
        }
        break;
    case '不':
        if (afterText.length > 0) {
            const nextTone = getTone(afterText[0].charAt(0));
            if (nextTone === 4) {
                return 'bú';
            }
        }
        break;
    case '一':
        if (afterText.length > 0) {
            const nextTone = getTone(afterText[0].charAt(0));
            if (nextTone === 1 || nextTone === 2 || nextTone === 3) {
                return 'yì';
            }
            if (nextTone === 4) {
                return 'yí';
            }
        }
        break;
    default:
    }
    return undefined;
};

const shouldPutSpaceBetween = (word1: string, word2: string): boolean => {
    if (!word2) {
        return false;
    }
    if (word2 === ' ') {
        return false;
    }
    if (isCharacterText(word1) && isCharacterText(word2)) {
        return true;
    }
    if (isCharacterText(word1) && /[ `"'“‘([（【0-9]/.test(word2)) {
        return true;
    }
    if (/[`"'“‘([（【]/.test(word1)) {
        return false;
    }

    const punctuationPattern = /[0-9.?!)\]}！？，。：；’”）%~@#^&*]/;
    const numberPattern = /[0-9]/;

    if (numberPattern.test(word1) && numberPattern.test(word2)) {
        return false;
    }
    if (punctuationPattern.test(word1) && !punctuationPattern.test(word2)) {
        return true;
    }
    if (punctuationPattern.test(word1) && numberPattern.test(word2)) {
        return true;
    }
    if (isCharacterText(word1) && punctuationPattern.test(word2)) {
        return false;
    }
    return isCharacterText(word1) !== isCharacterText(word2);
};

function pinyinifyChar(text: string, cuts: string[], cutIndex: number) {
    const disambiguatedChar = decideAmbiguousChar(text, cuts, cutIndex);
    if (disambiguatedChar) {
        return disambiguatedChar;
    }
    const word = pinyinDict[text];
    if (word) {
        return word;
    }
    const arr = pinyin(text, {
        heteronym: true,
        segment: true,
    });
    const syllables = arr.map((x) => x[0]);
    return syllables.join('\u200B');
}

const pinyinify = (text: string, isDetailed: boolean = false): string | HanziTools.PinyinDetailed => {
    const segments = getPinyinSegments(text);
    let pinyinSegments: string[] = [];
    segments.forEach((text, i, segments) => {
        if (text.length === 1) {
            pinyinSegments.push(pinyinifyChar(text, segments, i));
        } else {
            pinyinSegments.push(pinyinDict[text]);
        }
    });

    const out: string[] = [];
    pinyinSegments.forEach((text, i) => {
        if (shouldPutSpaceBetween(segments[i], segments[i + 1])) {
            out.push(`${text} `);
        } else {
            out.push(text);
        }
    });
    const joinedOutput = out.join('').trim();
    if (isDetailed) {
        pinyinSegments = pinyinSegments.map(getNormalizedEnglishText);
        return {
            segments,
            pinyinSegments,
            pinyinSegmentsSyllables: pinyinSegments.map((segment) => segment.split('\u200B')),
            pinyin: getNormalizedEnglishText(joinedOutput),
        };
    }
    return getNormalizedEnglishText(joinedOutput);
};

export default pinyinify;
