# Hanzi Tools

This repository is a fork of [Hanzi Tools](https://github.com/peterolson/hanzi-tools) that ports it to Typescript.
It differs a little bit from the original, so it's not a replacement.

Hanzi Tools is a collection of four different tools.

- `pinyinify()` - Convert chinese characters into pinyin.
- `getPinyinSegments()` - Divide text into words.
- `simplify()` - Convert traditional characters to simplified characters.
- `traditionalize()` - Convert simplified characters to traditional characters.
- `getTextTags()` - Part-of-speech tagging.

## Setup

    npm install @elyse0/hanzi-tools

## pinyinify()

Convert chinese characters into pinyin.

```js
import { pinyinify } from 'hanzi-tools';
    
pinyinify("转换汉字为拼音。")
// "zhuǎnhuàn hànzì wéi pīnyīn."
```

## getPinyinSegments()

Divide text into words.

```js
import { getPinyinSegments } from 'hanzi-tools';

getPinyinSegments("我在青岛市崂山区工作。");
// [ '我', '在', '青岛市', '崂山区', '工作', '。' ]
```

**Detailed output** 

```js
pinyinify("人人生而自由，在尊严和权利上一律平等。", true)
// { 
//   segments: ['人人', '生而自由', '，', '在', '尊严', '和', '权利', '上', '一律平等', '。'],
//   pinyinSegments: ['rénrén', 'shēngérzìyóu', ',', 'zài', 'zūnyán', 'hé', 'quánlì', 'shàng', 'yīlǜpíngděng', '.'],
//   pinyinSegmentsSyllables: [['rén', 'rén'], ['shēng', 'ér', 'zì', 'yóu'], [','], ['zài'], ['zūn', 'yán'], ['hé'], ['quán', 'lì'], ['shàng'], ['yī', 'lǜ', 'píng', 'děng', '.']],
//   pinyin: 'rénrén shēngérzìyóu, zài zūnyán hé quánlì shàng yīlǜpíngděng.' 
// }
```

## simplify()

Convert traditional characters to simplified characters.

```js
import { simplify } from 'hanzi-tools';

simplify("有朋自遠方來，不亦樂乎？");
// 有朋自远方来，不亦乐乎？
```

## traditionalize()

Convert simplified characters to traditional characters.

```js
import { traditionalize } from 'hanzi-tools';

traditionalize("起来！不愿做奴隶的人们！ 把我们的血肉，筑成我们新的长城！");
// 起來！不願做奴隸的人們！ 把我們的血肉，築成我們新的長城！
```

## getTextTags()

Part-of-speech tagging.

```js
import { getTextTags } from 'hanzi-tools';

getTextTags('你是我最喜欢的人。');
// [ { word: '你', tag: 'r' },
//  { word: '是', tag: 'v' },
//  { word: '我', tag: 'r' },
//  { word: '最', tag: 'd' },
//  { word: '喜欢', tag: 'v' },
//  { word: '的', tag: 'uj' },
//  { word: '人', tag: 'n' },
//  { word: '。', tag: 'x' } ]
```
