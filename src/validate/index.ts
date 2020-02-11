import { safeLoad } from 'js-yaml';
import { open } from '../utils/file';

interface ValidationOutput {
	valid: boolean;
	message?: string;
}

interface ValidationInput {
	required: boolean;
	default: string;
	validation: string;
	errorMessage: string;
}

interface DefaultSettings {
	[key: string]: DefaultSettings | ValidationInput;
}

const defaults = {
	name: {
		required: true,
		default: 'new-website',
		validation: '^[\\w\\-]{4,32}$',
		errorMessage: `'name' should be alpha numeric, or dashes. It should be 4-32 characters in length. `,
	},
	description: {
		required: false,
		default: 'new-website',
		validation: '^.{0,128}$',
		errorMessage: `'description' should be alpha numeric with dashes, and a max of 128 characters.`,
	},
	domain: {
		required: true,
		default: 'new-website.com',
		validation: '^[\\w\\-\\.\\d]{4,70}$',
		errorMessage: `'domain' should be a valid domain name.`,
	},
	target: {
		required: true,
		default: 'netlify',
		validation: '^(netlify|zeit|amplify)$',
		errorMessage: `'target' should be either 'netlify', 'zeit', or 'amplify'.`,
	},
	inputs: {
		components: {
			required: true,
			default: '/components',
			validation: '^\\/[\\w\\-\\.\\d]{1,32}$',
			errorMessage: `'inputs.components' should be a valid folder name with leading slash, and no more than 32 characters`,
		},
		functions: {
			required: true,
			default: '/endpoints',
			validation: '^\\/[\\w\\-\\.\\d]{1,32}$',
			errorMessage: `'inputs.functions' should be a valid folder name with leading slash, and no more than 32 characters`,
		},
		pages: {
			required: true,
			default: '/pages',
			validation: '^\\/[\\w\\-\\.\\d]{1,32}$',
			errorMessage: `'inputs.pages' should be a valid folder name with leading slash, and no more than 32 characters`,
		},
		partials: {
			required: true,
			default: '/partials',
			validation: '^\\/[\\w\\-\\.\\d]{1,32}$',
			errorMessage: `'inputs.partials' should be a valid folder name with leading slash, and no more than 32 characters`,
		},
		static: {
			required: true,
			default: '/static',
			validation: '^\\/[\\w\\-\\.\\d]{1,32}$',
			errorMessage: `'inputs.static' should be a valid folder name with leading slash, and no more than 32 characters`,
		},
	},
	outputs: {
		lambda: {
			required: true,
			default: '/api',
			validation: '^\\/[\\w\\-\\.\\d]{1,32}$',
			errorMessage: `'outputs.lambda' should be a valid folder name with leading slash, and no more than 32 characters`,
		},
		dist: {
			required: true,
			default: '/dist',
			validation: '^\\/[\\w\\-\\.\\d]{1,32}$',
			errorMessage: `'outputs.dist' should be a valid folder name with leading slash, and no more than 32 characters`,
		},
		404: {
			required: true,
			default: '404.html',
			validation: '^[\\w\\-\\d]{1,24}\\.html$',
			errorMessage: `'outputs.404' should be a valid html file name, no more than 24 characters, plus .html extension`,
		},
		500: {
			required: true,
			default: '500.html',
			validation: '^[\\w\\-\\d]{1,24}\\.html$',
			errorMessage: `'outputs.500' should be a valid html file name, no more than 24 characters, plus .html extension`,
		},
		offline: {
			required: true,
			default: 'offline.html',
			validation: '^[\\w\\-\\d]{1,24}\\.html$',
			errorMessage: `'outputs.offline' should be a valid html file name, no more than 24 characters, plus .html extension`,
		},
	},
	partials: {
		prefix: {
			required: true,
			default: '/partials-',
			validation: '^[\\w\\-]{1,12}$',
			errorMessage: `'partials.prefix' should be alpha numeric, or dashes. It should be 1-12 characters in length. `,
		},
	},
} as DefaultSettings;

// Validate specific entry
const validate = (
	key: string,
	val: any,
	settings: ValidationInput
): ValidationOutput => {
	// Validate it Exists
	if (settings.required && val === undefined) {
		return {
			valid: false,
			message: `'${key}' is a required field`,
		};
	}

	// Validate RegEx passes
	const re = new RegExp(settings.validation, 'i');
	if (!re.test(val)) {
		return {
			valid: false,
			message: settings.errorMessage,
		};
	}

	return { valid: true };
};

const errors: ValidationOutput[] = [];

// Process over the YAML contents and lookup the settings for each field
const process = (
	obj: object,
	namespace: string[] = []
): ValidationOutput | ValidationOutput[] => {
	Object.entries(obj).forEach(([key, val]) => {
		// Recursive call because it's child is a object
		if (typeof val === 'object' && val !== null) {
			const [...newNamespace] = namespace;
			newNamespace.push(key);
			return process(val, newNamespace);
		}

		let defaultBase = defaults;
		if (namespace.length > 0) {
			namespace.forEach(name => {
				defaultBase = defaultBase[name] as DefaultSettings;
			});
		}

		if (defaultBase[key] === undefined) {
			const objectPath = [...namespace];
			objectPath.push(key);
			errors.push({
				valid: false,
				message: `Unknown field '${objectPath.join(
					'.'
				)}' found within 'aerglo.yml'`,
			});
		} else {
			const outcome = validate(key, val, defaultBase[key] as ValidationInput);
			if (!outcome.valid) {
				errors.push(outcome);
			}
		}
	});

	return errors.length ? errors : { valid: true };
};

export default (
	path: string = 'aerglo.yml'
): ValidationOutput | ValidationOutput[] => {
	const file = open(path);
	if (!file) {
		return { valid: false, message: "Problem opening 'aerglo.yml` file." };
	}

	// Parse YAML and Validate (replacing tabs with double spaces to avoid common indent error)
	const data = safeLoad(file.replace(/\t/gi, ' '));
	return process(data);
};
