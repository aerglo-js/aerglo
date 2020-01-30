import { log } from "../utils";
import { ScriptLanguage } from "./types";

// Normalizes the logic for the langauge attribute, to ensure valid value
const normalizeLanguageAttribute = (lang: string | undefined): ScriptLanguage | boolean => {
  if (lang === 'typescript' || lang === 'ts') {
    return ScriptLanguage.Typescript;
  } else if (lang === 'babel') {
    return ScriptLanguage.Babel;
  } else {
    log.warning(`Unknown language '${lang}' provided to script tag.`)
    return false;
  }
};

export { normalizeLanguageAttribute as default };
