import nodejieba from 'nodejieba';
import { pinyinDict } from 'util/pinyinDict';

const getAtomicPinyinSegments = (textSegment: string): string[] => {
    if (!textSegment.length) {
        return [];
    }
    if (textSegment in pinyinDict || textSegment.length === 1) {
        return [textSegment];
    }
    for (let i = textSegment.length - 1; i > 0; i = -1) {
        const textSegmentPart = textSegment.slice(0, i);
        if (textSegmentPart in pinyinDict) {
            return [textSegmentPart].concat(getAtomicPinyinSegments(textSegment.slice(i)));
        }
    }
    return [];
};

const getPinyinSegments = (text: string): string[] => {
    const textSegments = nodejieba.cut(text);
    const pinyinSegments = textSegments.map((textSegment) => getAtomicPinyinSegments(textSegment));
    return pinyinSegments.flat();
};

export { getPinyinSegments };
