import nodejieba from 'nodejieba';

const getTextTags = (text: string) => {
    const tagResults = nodejieba.tag(text);

    const tags = tagResults.map(({ word, tag }) => {
        if (word.length > 1 && (tag === 'x' || (tag === 'n' && word.includes('吗')))) {
            return Array.from(word).map((char) => nodejieba.tag(char)[0]);
        }

        return { word, tag };
    });

    return tags.flat();
};

export { getTextTags };
