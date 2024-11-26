/**
 * Initial file generated with `npx ts-jest config:init`
 * 
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
module.exports = {
	testEnvironment: 'node',
	moduleDirectories: [ 'node_modules', '<rootDir>/' ],
	/**
	 * If you're using [Module Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases),
	 * you will have to add the moduleNameMapper in order for jest to resolve your absolute paths.
	 * The paths have to be matching with the paths option within the compilerOptions in the tsconfig.json
	 */
	moduleNameMapper: {
		'@/(.*)$': '<rootDir>/src/$1',
	},
	transform: {
		'^.+.tsx?$': [ 'ts-jest', {} ],
	},
}