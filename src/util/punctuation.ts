const englishReplacements: Record<string, string> = {
    '！': '!',
    '？': '?',
    '。': '.',
    '，': ',',
    '：': ':',
    '；': ';',
    '‘': '`',
    '’': "'",
    '“': '``',
    '”': '"',
    '（': '(',
    '）': ')',
    '【': '[',
    '】': ']',
};

const chineseReplacements: Record<string, string> = {};
for (const k in englishReplacements) {
    chineseReplacements[englishReplacements[k]] = k;
}

const normalizeText = (text: string, replacements: Record<string, string>): string => {
    let newString = '';
    for (const char of text) {
        if (char in replacements) {
            newString += replacements[char];
        } else {
            newString += char;
        }
    }
    return newString;
};

const normalizeEnglish = (text: string): string => {
    return normalizeText(text, englishReplacements);
};

const normalizeChinese = (text: string): string => {
    return normalizeText(text, chineseReplacements);
};

export { normalizeEnglish, normalizeChinese };
