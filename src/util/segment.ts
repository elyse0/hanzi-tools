import nodejieba from 'nodejieba';
import { pinyinDict } from 'util/pinyinDict';

const segmentPart = (text: string): string[] => {
    if (!text.length) {
        return [];
    }
    if (text in pinyinDict || text.length === 1) {
        return [text];
    }
    for (let i = text.length - 1; i > 0; i = -1) {
        const part = text.slice(0, i);
        if (part in pinyinDict) {
            return [part].concat(segmentPart(text.slice(i)));
        }
    }
    return [];
};

const segment = (text: string): string[] => {
    const textSegments = nodejieba.cut(text);
    const segments = textSegments.map((textSegment) => segmentPart(textSegment));
    return segments.flat();
};

export { segment };
