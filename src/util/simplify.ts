import nodejieba from 'nodejieba';

import { s2tDict, t2sDict } from 'util/pinyinDict';
import { getPinyinSegments } from 'util/segmentation';

const simplify = (text: string): string => {
    return getPinyinSegments(text).map((x) => {
        if (x in t2sDict) {
            return t2sDict[x];
        }
        return x;
    }).join('');
};

const specialChars = new Set(['只', '喂', '面', '发', '干']);

const traditionalizeSpecialChar = (char: string, beforeText: string[], afterText: string[]) => {
    let prev; let after; let
        last2;
    switch (char) {
    case '只':
        prev = nodejieba.tag(beforeText.join('')).slice(-1)[0];
        after = nodejieba.tag(afterText.join(''))[0];
        if (prev && prev.tag === 'm') {
            return '隻';
        }
        if (after && after.tag === 'n') {
            return '隻';
        }
        return '只';
    case '喂':
        after = nodejieba.tag(afterText.join(''))[0];
        if (after && after.tag === 'n') {
            return '餵';
        }
        return '喂';
    case '面':
        prev = nodejieba.tag(beforeText.join('')).slice(-1)[0];
        if (prev && prev.tag === 'v') {
            return '麵';
        }
        return '面';
    case '发':
        last2 = beforeText.join('').slice(-2);
        if (last2.includes('理') || last2.includes('头')) {
            return '髮';
        }
        return '發';
    case '干':
        last2 = beforeText.join('').slice(-2);
        if (last2.includes('变')) {
            return '乾';
        }
        return '幹';
    default:
        return char in s2tDict ? s2tDict[char] : char;
    }
};

const traditionalize = (text: string): string => {
    return getPinyinSegments(text).map((x, i, segments) => {
        if (specialChars.has(x)) {
            return traditionalizeSpecialChar(x, segments.slice(0, i), segments.slice(i + 1));
        }
        if (x in s2tDict) return s2tDict[x];
        return x;
    }).join('');
};

export { simplify, traditionalize };
