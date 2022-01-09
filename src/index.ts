import { simplify, traditionalize } from 'util/simplify';
import { isCharacterText } from 'util/util';
import pinyinify from 'util/pinyinify';
import { getPinyinSegments } from 'util/segmentation';
import { tag } from 'util/tag';

export {
    pinyinify, getPinyinSegments, simplify, traditionalize, tag, isCharacterText,
};
// @ts-ignore
module.exports = {
    pinyinify, getSegmentedText: getPinyinSegments, simplify, traditionalize, tag, isCharacterText,
};
