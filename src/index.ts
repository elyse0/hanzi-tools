import { simplify, traditionalize } from 'util/simplify';
import { isCharacterText } from 'util/util';
import pinyinify from 'util/pinyinify';
import { getPinyinSegments } from 'util/segmentation';
import { getTextTags } from 'util/tag';

export {
    pinyinify, getPinyinSegments, simplify, traditionalize, getTextTags, isCharacterText,
};
// @ts-ignore
module.exports = {
    pinyinify, getPinyinSegments, simplify, traditionalize, getTextTags, isCharacterText,
};
