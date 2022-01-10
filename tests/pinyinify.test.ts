import pinyinify from 'util/pinyinify';

describe('Pinyinify', () => {
    it('works on very simple input', () => {
        expect(pinyinify('好'))
            .toEqual('hǎo');
        expect(pinyinify('妈'))
            .not.toEqual('mǎ');
    });

    it('selects the correct pronunciation for 多音字', () => {
        expect(pinyinify('我受不了了'))
            .toEqual('wǒ shòu​bù​liǎo le');
        expect(pinyinify('我觉得睡觉是很重要的。我睡了一个好觉有很好的感觉。'))
            .toEqual('wǒ jué​de shuì​jiào shì hěn zhòng​yào de. wǒ shuì le yí gè hǎo jiào yǒu hěn hǎo de gǎn​jué.');
        expect(pinyinify('你看她干吗？她是你的女朋友吗？'))
            .toEqual('nǐ kàn tā gàn​má? tā shì nǐ de nǚ​péng​you ma?');
        expect(pinyinify('他给我发了个短信：“我长大的时候我的头发很长。但是现在我喜欢理发。'))
            .toEqual('tā gěi wǒ fā le gè duǎn​xìn: ``wǒ zhǎng​dà de shí​hou wǒ de tóu​fa hěn cháng. dàn​shì xiàn​zài wǒ xǐ​huan lǐ​fà.');
        expect(pinyinify('我们都想去首都玩。'))
            .toEqual('wǒ​men dōu xiǎng qù shǒu​dū wán.');
        expect(pinyinify('不要应该睡觉时不睡觉。'))
            .toEqual('bù​yào yīng​gāi shuì​jiào shí bú shuì​jiào.');
        expect(pinyinify('你找到什么吃的了么？'))
            .toEqual('nǐ zhǎo​dào shén​me chī de le me?');
        expect(pinyinify('一个穿着神色的裤子的男人坐在火车上。'))
            .toEqual('yí gè chuān zhe shén​sè de kù​zi de nán​rén zuò zài huǒ​chē shàng.');
        expect(pinyinify('东西'))
            .toEqual('dōng​xi');
        // 得
        expect(pinyinify('我们得现在就谈吗？'))
            .toEqual('wǒ​men děi xiàn​zài jiù tán ma?');
        expect(pinyinify('你得听我的。'))
            .toEqual('nǐ děi tīng wǒ de.');
        expect(pinyinify('我得去。'))
            .toEqual('wǒ děi qù.');
        expect(pinyinify('我说得快。'))
            .toEqual('wǒ shuō de kuài.');
        expect(pinyinify('你们觉得我画得怎么样？'))
            .toEqual('nǐ​men jué​de wǒ huà de zěn​me​yàng?');
        expect(pinyinify('喂，睡得还好吗？'))
            .toEqual('wèi, shuì de hái​hǎo ma?');
        expect(pinyinify('你得做个决定。'))
            .toEqual('nǐ děi zuò gè jué​dìng.');
        expect(pinyinify('你得在这儿休息。'))
            .toEqual('nǐ děi zài zhè​r xiū​xi.');
        expect(pinyinify('我现在富得能买我想要的任何东西。'))
            .toEqual('wǒ xiàn​zài fù de néng mǎi wǒ xiǎng​yào de rèn​hé dōng​xi.');
        expect(pinyinify('我们就得这么做。'))
            .toEqual('wǒ​men jiù děi zhè​me zuò.');
        expect(pinyinify('你现在得把门打开。正在动手。'))
            .toEqual('nǐ xiàn​zài děi bǎ​mén dǎ​kāi. zhèng​zài dòng​shǒu.');
        expect(pinyinify('听着，我得先见见这人'))
            .toEqual('tīng zhe, wǒ děi xiān jiàn jiàn zhè rén');
        expect(pinyinify('我得了什么病？'))
            .toEqual('wǒ dé le shén​me bìng?');
        // 还
        expect(pinyinify('我有钱了就还你。'))
            .toEqual('wǒ yǒu​qián le jiù huán nǐ.');
        expect(pinyinify('我还给你。'))
            .toEqual('wǒ huán​gěi nǐ.');
        expect(pinyinify('你还喜欢她吗？'))
            .toEqual('nǐ hái xǐ​huan tā ma?');
        expect(pinyinify('你得还我的东西。'))
            .toEqual('nǐ děi huán wǒ de dōng​xi.');
        expect(pinyinify('他还会把钱还律师吗？'))
            .toEqual('tā hái huì bǎ qián huán lǜ​shī ma?');
        expect(pinyinify('好吧，我至少还有些朋友。'))
            .toEqual('hǎo ba, wǒ zhì​shǎo hái yǒu​xiē péng​you.');
        expect(pinyinify('你还爱我吗？'))
            .toEqual('nǐ hái ài wǒ ma?');
        expect(pinyinify('把我小孩还来！'))
            .toEqual('bǎ wǒ xiǎo​hái huán lái!');
        // 只
        expect(pinyinify('他是一只鸟。'))
            .toEqual('tā shì yì zhī niǎo.');
        // 长
        expect(pinyinify('她长着一张圆脸和一双明亮的眼睛。'))
            .toEqual('tā zhǎng zhe yì zhāng yuán liǎn hé yì shuāng míng​liàng de yǎn​jing.');
        expect(pinyinify('不是他干的，警长。'))
            .toEqual('bù​shì tā gàn de, jǐng zhǎng.');
        expect(pinyinify('你的头发太长了。'))
            .toEqual('nǐ de tóu​fa tài cháng le.');
        expect(pinyinify('我后背上长了个东西。'))
            .toEqual('wǒ hòu bèi shàng zhǎng le gè dōng​xi.');
        // 系
        expect(pinyinify('这女孩要我给她把衣服从后面系上。'))
            .toEqual('zhè nǚ​hái yào wǒ gěi tā bǎ yī​fu cóng hòu​miàn jì shàng.');
        expect(pinyinify('一个人的后面有一个系着领带的男人走在道路上'))
            .toEqual('yí gè rén de hòu​miàn yǒu yí gè jì zhe lǐng​dài de nán​rén zǒu zài dào​lù shàng');

        // 地
        expect(pinyinify('我说过我不会卖那块地的！'))
            .toEqual('wǒ shuō guò wǒ bù​huì mài nà kuài dì de!');
        expect(pinyinify('一定要了解这些需求并明确地定义它们。'))
            .toEqual('yī​dìng yào liǎo​jiě zhè​xiē xū​qiú bìng míng​què de dìng​yì tā​men.');

        // 重
        expect(pinyinify('我重入了房间并且去了工作。'))
            .toEqual('wǒ chóng rù le fáng​jiān bìng​qiě qù le gōng​zuò.');

        // 弹
        expect(pinyinify('一个双手弹着吉他的男人在舞台上表演'))
            .toEqual('yí gè shuāng​shǒu tán zhe jí​tā de nán​rén zài wǔ​tái shàng biǎo​yǎn');

        expect(pinyinify('行了吗？'))
            .toEqual('xíng le ma?');
        expect(pinyinify('人要是行干一行行一行。'))
            .toEqual('rén yào​shi xíng gàn yì háng xíng yì háng.');
        expect(pinyinify('几行代码？两行代码。行还是不行？行！'))
            .toEqual('jǐ háng dài​mǎ? liǎng háng dài​mǎ. xíng hái​shi bù​xíng? xíng!');

        expect(pinyinify('结果'))
            .toEqual('jié​guǒ');
        expect(pinyinify('很美的运动。'))
            .toEqual('hěn měi de yùn​dòng.');
        expect(pinyinify('雪地上有好东西。'))
            .toEqual('xuě​dì​ shàng yǒu hǎo dōng​xi.');
    });

    it('converts punctuation and spacing', () => {
        expect(pinyinify('什么？！我绝对 不 想 去！！你问我“你想去吗”干吗 不要问我了。哎哟（哈哈）晚安~'))
            .toEqual("shén​me?! wǒ jué​duì  bù  xiǎng  qù!! nǐ wèn wǒ ``nǐ xiǎng qù ma\" gàn​má  bù​yào wèn wǒ le. āi​yō (hā​hā) wǎn​'ān~");
    });

    it('add apostrophe when needed', () => {
        expect(pinyinify('西安')).toEqual("Xī​'ān");
    });

    it("doesn't mangle numbers or non-Chinese text", () => {
        expect(pinyinify('我有2个。他有540！50%的意思是百分之五十。'))
            .toEqual('wǒ yǒu 2 gè. tā yǒu 540! 50% de yì​si shì bǎi fēn zhī wǔ​shí.');
        expect(pinyinify('我叫Dr. Smith。他是Señor López。他是Владимир Влидимирович给我们介绍的。'))
            .toEqual('wǒ jiào Dr. Smith. tā shì Señor López. tā shì Владимир Влидимирович gěi wǒ​men jiè​shào de.');
    });

    it('preserves spaces in input', () => {
        const details = pinyinify(' - 你好？ 这是什么？', true);
        if (typeof details === 'string') {
            throw Error();
        }
        expect(details.segments).toEqual([' ', '-', ' ', '你好', '？', ' ', '这', '是', '什么', '？']);
    });

    it('returns detailed output when given a second parameter', () => {
        let details = pinyinify('他们为什么没有这样做？这真是他所想要的吗？', true);
        if (typeof details === 'string') {
            throw Error();
        }
        expect(details.segments).toEqual(['他们', '为什么', '没有', '这样', '做', '？', '这', '真是', '他', '所', '想要', '的', '吗', '？']);
        expect(details.pinyinSegments).toEqual(['tā​men', 'wèi​shén​me', 'méi​yǒu', 'zhè​yàng', 'zuò', '?', 'zhè', 'zhēn​shi', 'tā', 'suǒ', 'xiǎng​yào', 'de', 'ma', '?']);
        expect(details.pinyinSegmentsSyllables).toEqual([['tā', 'men'],
            ['wèi', 'shén', 'me'],
            ['méi', 'yǒu'],
            ['zhè', 'yàng'],
            ['zuò'],
            ['?'],
            ['zhè'],
            ['zhēn', 'shi'],
            ['tā'],
            ['suǒ'],
            ['xiǎng', 'yào'],
            ['de'],
            ['ma'],
            ['?']]);
        expect(details.pinyin).toEqual('tā​men wèi​shén​me méi​yǒu zhè​yàng zuò? zhè zhēn​shi tā suǒ xiǎng​yào de ma?');

        details = pinyinify('我们是五个太好的门。', true);
        if (typeof details === 'string') {
            throw Error();
        }
        expect(details.pinyinSegmentsSyllables).toEqual([['wǒ', 'men'],
            ['shì'],
            ['wǔ'],
            ['gè'],
            ['tài'],
            ['hǎo'],
            ['de'],
            ['mén'],
            ['.']]);
    });
});
