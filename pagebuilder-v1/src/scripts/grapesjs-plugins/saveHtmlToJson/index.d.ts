import { Editor, Plugin } from 'grapesjs';

export type RootType = Record<string, unknown>;
export type PluginOptions = {
	/**
	 * Add a button inside the export dialog
	 * @default true
	 */
	addExportBtn?: boolean;
	/**
	 * Export designed content in zip file
	 * @default false
	 */
	exportFilesInZip?: boolean;
	/**
	 * Label of the export button
	 * @default 'Save'
	 */
	btnLabel?: string;
	/**
	 * ZIP filename prefix
	 * @default 'grapesjs_template'
	 */
	filenamePfx?: string;
	/**
	 * Use a function to generate the filename, eg. `filename: editor => 'my-file.zip',`
	 */
	filename?: (editor: Editor) => string;
	/**
	 * Callback to execute once the export is completed
	 */
	done?: () => void;
	/**
	 * Callback to execute on export error
	 */
	onError?: (error: Error) => void;
	/**
	 * Use the root object to create the folder structure of your zip (async functions are supported)
	 * @example
	 * root: {
	 *   css: {
	 *     'style.css': ed => ed.getCss(),
	 *     'some-file.txt': 'My custom content',
	 *   },
	 *   img: async ed => {
	 *     const images = await fetchImagesByStructue(ed.getComponents());
	 *     return images;
	 *     // Where `images` is an object like this:
	 *     // { 'img1.png': '...png content', 'img2.jpg': '...jpg content' }
	 *   },
	 *   'index.html': ed => `<body>${ed.getHtml()}</body>`
	 * }
	 */
	root?: RootType | ((editor: Editor) => Promise<RootType>);
	/**
	 * Custom function for checking if the file content is binary
	 */
	isBinary?: (content: string, name: string) => boolean;
};
export interface ComponentPropertiesInDb {
	/**
	 * Component type, eg. `text`, `image`, `video`, etc.
	 * @default ''
	 */
	type?: string;
	/**
	 * HTML tag of the component, eg. `span`. Default: `div`
	 * @default 'div'
	 */
	tagName?: string;
	/**
	 * Content of the component (not escaped) which will be appended before children rendering. Default: `''`
	 * @default ''
	 */
	content?: string;
	classes?: string[];
}
declare const plugin: Plugin<PluginOptions>;

export {
	plugin as default,
};

export {};
