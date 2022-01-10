/* eslint-disable */
import {TagResult} from 'nodejieba';

declare namespace HanziTools {
    interface PinyinDetailed {
        pinyin: string
        pinyinSegments: string[]
        pinyinSegmentsSyllables: string[][]
        segments: string[]
    }
}

function pinyinify(text: string, isDetailed: boolean = false): string | HanziTools.PinyinDetailed;

function getPinyinSegments(text: string): string[];

function simplify(text: string): string;

function traditionalize(text: string): string;

function getTextTags(text: string): TagResult[];

export {pinyinify, getPinyinSegments, simplify, traditionalize, getTextTags, HanziTools};
