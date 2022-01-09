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
    return [text[0]].concat(segmentPart(text.slice(1)));
};

const segment = (text: string): string[] => {
    const cut = nodejieba.cut(text);
    let segments: string[] = [];
    cut.forEach((text) => {
        segments = segments.concat(segmentPart(text));
    });
    return segments;
};

export { segment };
