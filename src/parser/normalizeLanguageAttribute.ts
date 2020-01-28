// Normalizes the logic for the langauge attribute, to ensure valid value
const normalizeLanguageAttribute = (lang: string | undefined) => {
  if (lang === 'typescript' || lang === 'ts') {
    return 'typescript';
  } else if (lang === 'babel') {
    return 'babel';
  } else {
    return false;
  }
};

export { normalizeLanguageAttribute as default };
