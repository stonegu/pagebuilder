import FileSaver from 'file-saver';
import { Editor, Plugin, ProjectData } from 'grapesjs';
import JSZip from 'jszip';
import axios from 'axios';

export type RootType = Record<string, unknown>;

export type PluginOptions = {
  /**
   * Add a button inside the export dialog
   * @default true
   */
  addExportBtn?: boolean,

  /**
   * Export designed content in zip file
   * @default false
   */
  exportFilesInZip?: boolean,

  /**
   * Label of the export button
   * @default 'Save'
   */
  btnLabel?: string

  /**
   * ZIP filename prefix
   * @default 'grapesjs_template'
   */
  filenamePfx?: string

  /**
   * Use a function to generate the filename, eg. `filename: editor => 'my-file.zip',`
   */
   filename?: (editor: Editor) => string,

   /**
    * Callback to execute once the export is completed
    */
   done?: () => void,

   /**
    * Callback to execute on export error
    */
   onError?: (error: Error) => void,

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
   root?: RootType | ((editor: Editor) => Promise<RootType>),

   /**
    * Custom function for checking if the file content is binary
    */
   isBinary?: (content: string, name: string) => boolean,
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


const plugin: Plugin<PluginOptions> = (editor, opts = {}) => {
  const pfx = editor.getConfig('stylePrefix');
  const commandName = 'gjs-save-api';

  const config: PluginOptions = {
    addExportBtn: true,
    exportFilesInZip: false,
    btnLabel: 'Save',
    filenamePfx: 'grapesjs_template',
    filename: undefined,
    done: () => {},
    onError: console.error,
    root: {
      css: {
        'style.css': (editor: Editor) => editor.getCss(),
      },
      'index.html': (editor: Editor) =>
        `<!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <link rel="stylesheet" href="./css/style.css">
          </head>
          <body>${editor.getHtml()}</body>
        </html>`,
    },
    isBinary: undefined,
    ...opts,
  };

  // Add command
  editor.Commands.add(commandName, {
    run(editor, s, opts: PluginOptions = {}) {
      const zip = new JSZip();
      const onError = opts.onError || config.onError;
      const root = opts.root || config.root;
      const exportFilesInZip = opts.exportFilesInZip || config.exportFilesInZip;

      // create json structure based on the designed contents

      let componentsInJsonString = JSON.stringify(this.getComponentsInJson(editor));

      let componentsCss = editor.getCss({avoidProtected: true});

      console.log('components: ' + componentsInJsonString);
      console.log('css: ' + componentsCss);





      // https://devapps.markham.ca/mkmpropertydetailssearchws/api/v1.0/propertysearchcontroller/hello
      axios.get('https://devapps.markham.ca/mkmpropertydetailssearchws/api/v1.0/propertysearchcontroller/hello')
        .then(function (response) {
          console.log('... response: ' + response);
        }).catch(function (error) {
          console.log('... error: ' + error);
        })
        .finally(function() {
          console.log('... finally ...');
        })

      if (exportFilesInZip) {
        this.createDirectory(zip, root)
        .then(async () => {
          const content = await zip.generateAsync({ type: 'blob' });
          const filenameFn = opts.filename || config.filename;
          const done = opts.done || config.done;
          const filenamePfx = opts.filenamePfx || config.filenamePfx;
          const filename = filenameFn ? filenameFn(editor) : `${filenamePfx}_${Date.now()}.zip`;
          FileSaver.saveAs(content, filename);
          done?.();
        })
        .catch(onError);
      }

    },

    createFile(zip: JSZip, name: string, content: string) {
      const opts: JSZip.JSZipFileOptions = {};
      const ext = name.split('.')[1];
      const isBinary = config.isBinary ?
        config.isBinary(content, name) :
        !(ext && ['html', 'css'].indexOf(ext) >= 0) &&
        !/^[\x00-\x7F]*$/.test(content);

      if (isBinary) {
        opts.binary = true;
      }

      editor.log('Create file', { ns: 'plugin-export',
        // @ts-ignore
        name, content, opts
      });
      zip.file(name, content, opts);
    },

    async createDirectory(zip: JSZip, root: PluginOptions["root"]) {
      root = typeof root === 'function' ? await root(editor) : root;

      for (const name in root) {
        if (root.hasOwnProperty(name)) {
          let content = root[name];
          content = typeof content === 'function' ? await content(editor) : content;
          const typeOf = typeof content;

          if (typeOf === 'string') {
            this.createFile(zip, name, content as string);
          } else if (typeOf === 'object') {
            const dirRoot = zip.folder(name)!;
            await this.createDirectory(dirRoot, content as RootType);
          }
        }
      }
    },

    getComponentsInJson(editor: Editor): any[] | [] {
      let projectData: ProjectData = editor.getProjectData();
      if (!!projectData) {
        return projectData.pages[0].frames[0].component?.components;
      }
      return [];
    },

  });


  editor.onReady(() => {
    // test to add component

    // editor.setComponents([{"name":"Row","droppable":".gjs-cell","resizable":{"tl":0,"tc":0,"tr":0,"cl":0,"cr":0,"bl":0,"br":0,"minDim":1},"classes":[{"name":"gjs-row","private":1}],"attributes":{"id":"igal"},"components":[{"name":"Cell","draggable":".gjs-row","resizable":{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2},"classes":[{"name":"gjs-cell","private":1}],"components":[{"name":"Row","droppable":".gjs-cell","resizable":{"tl":0,"tc":0,"tr":0,"cl":0,"cr":0,"bl":0,"br":0,"minDim":1},"classes":[{"name":"gjs-row","private":1}],"attributes":{"id":"iggr"},"components":[{"name":"Cell","draggable":".gjs-row","resizable":{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2},"classes":[{"name":"gjs-cell","private":1}],"components":[{"type":"text","attributes":{"id":"iw6j"},"components":[{"type":"textnode","content":"Insert your text here 1"}]}]},{"name":"Cell","draggable":".gjs-row","resizable":{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2},"classes":[{"name":"gjs-cell","private":1}],"components":[{"type":"text","attributes":{"id":"iz5pe"},"components":[{"type":"textnode","content":"Insert your text here 2"}]}]},{"name":"Cell","draggable":".gjs-row","resizable":{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2},"classes":[{"name":"gjs-cell","private":1}],"components":[{"type":"text","attributes":{"id":"iwcvi"},"components":[{"type":"textnode","content":"Insert your text here 3"}]}]}]}]},{"name":"Cell","draggable":".gjs-row","resizable":{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2},"classes":[{"name":"gjs-cell","private":1}],"components":[{"type":"text","attributes":{"id":"i6912"},"components":[{"type":"textnode","content":"Insert your text here 4"}]}]}]}]).setStyle('.gjs-row{display:table;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;width:100%;}.gjs-cell{width:8%;display:table-cell;height:75px;}#iw6j{padding:10px;}#iz5pe{padding:10px;}#iwcvi{padding:10px;}#i6912{padding:10px;}@media (max-width: 768px){.gjs-cell{width:100%;display:block;}}');


    // Add button inside export dialog
    if (config.addExportBtn) {
      const btnExp = document.createElement('button');
      btnExp.innerHTML = config.btnLabel!;
      btnExp.className = `${pfx}btn-prim`;
      btnExp.type = 'button';

      editor.on('run:export-template', () => {
        const el = editor.Modal.getContentEl();
        el?.appendChild(btnExp);
        btnExp.onclick = () => editor.runCommand(commandName);
      });
    }
  })
};

export default plugin;
