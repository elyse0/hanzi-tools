import { traditionalize } from 'util/simplify';

describe('Traditionalize', () => {
    it('works on simple input', () => {
        expect(traditionalize('旧石器时代（英语：Paleolithic age）是石器时代的早期阶段，一般划定此时期为距今约260万年[1]或250万年[2]（能人首次制造出石器）至1.2万年前[3][4]（农业文明的出现）。地质时代属于上新世晚期至更新世。其时期划分一般采用三分法，即旧石器时代早期、中期和晚期，大体上分别对应于人类体质进化的能人和直立人阶段、早期智人阶段、晚期智人阶段。旧石器时代之后为中石器时代[5]。'))
            .toEqual('舊石器時代（英語：Paleolithic age）是石器時代的早期階段，一般劃定此時期為距今約260萬年[1]或250萬年[2]（能人首次製造出石器）至1.2萬年前[3][4]（農業文明的出現）。地質時代屬於上新世晚期至更新世。其時期劃分一般採用三分法，即舊石器時代早期、中期和晚期，大體上分別對應於人類體質進化的能人和直立人階段、早期智人階段、晚期智人階段。舊石器時代之後為中石器時代[5]。');
        expect(traditionalize('为为为是是哪里哪里')).toEqual('為為為是是哪裡哪裡');
        expect(traditionalize('又在梦里见到你')).toEqual('又在夢裡見到你');
        expect(traditionalize('我只有三只狗。')).toEqual('我只有三隻狗。');
        expect(traditionalize('房间里有一个男人在给一个老人理头发')).toEqual('房間裡有一個男人在給一個老人理頭髮');
    });
    it('chooses right ambiguous character', () => {
        expect(traditionalize('你对那个女的干了什么？')).toEqual('你對那個女的幹了什麼？');
        // 干
        expect(traditionalize('你没把面包包好，它变干了。')).toEqual('你沒把麵包包好，它變乾了。');
        // 面
        expect(traditionalize('房间里有一个坐着的男人看着一个在吃面的男人')).toEqual('房間裡有一個坐著的男人看著一個在吃麵的男人');
        expect(traditionalize('我吃面。')).toEqual('我吃麵。');
    });
});
