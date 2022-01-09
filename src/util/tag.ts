import nodejieba from 'nodejieba';

const tag = (text: string) => {
    const tokens = nodejieba.tag(text);
    const outTokens = [];
    for (const { word, tag } of tokens) {
        if (word.length > 1 && (tag === 'x' || (tag === 'n' && word.includes('吗')))) {
            for (const char of word) {
                outTokens.push(nodejieba.tag(char)[0]);
            }
        } else outTokens.push({ word, tag });
    }
    return outTokens;
};

export { tag };
