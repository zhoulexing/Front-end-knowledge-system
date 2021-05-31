module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: [
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript",
		"plugin:jsx-a11y/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"airbnb",

		"prettier/@typescript-eslint",
		"plugin:prettier/recommended",
	],
	globals: {
		// 全局变量的配置
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 11,
		sourceType: "module",
	},
	plugins: ["@typescript-eslint"],
	settings: {
		"import/resolver": {
			webpack: {
				config: "config/webpack.config.js",
			},
		},
	},
	rules: {
		"linebreak-style": 0,
		quotes: [0, "double"],
	},
};
