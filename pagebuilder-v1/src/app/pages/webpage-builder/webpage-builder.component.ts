import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-blocks-basic';
import gjsForms from 'grapesjs-plugin-forms';
import pluginTooltip from 'grapesjs-tooltip';
import preset from 'grapesjs-preset-webpage';
import customCodePlugin from 'grapesjs-custom-code';
import exportPlugin from '../../../scripts/grapesjs-plugins/export';
// import thePlugin from 'grapesjs-plugin-export';


@Component({
  selector: 'webpage-builder',
  standalone: true,
  imports: [],
  templateUrl: './webpage-builder.component.html',
  styleUrl: './webpage-builder.component.css'
})
export class WebpageBuilderComponent implements OnInit, AfterContentInit{

  #editor: any = null;
  #pageManager: any;

  pages: any[] = [];

  ngOnInit(): void {

    this.#editor = grapesjs.init({
      container : '#gjs',
      // fromElement: true,
      // height: '50%',
      // width: 'auto',
      storageManager: false,
      // panels: { defaults: []},

      plugins: [
        editor => preset(editor, { /* options */ }),
        editor => plugin(editor, { /* options */ }),
        editor => gjsForms(editor, {}),
        editor => pluginTooltip(editor, { /* options */ }),
        editor => customCodePlugin(editor, {}),
        editor => exportPlugin(editor, { 
          btnLabel: 'Save'
         })
      ],


      pageManager: {
        pages: [{
          id: 'page-1',
          name: 'Page 1',
          component: '<div id="comp1">Page 1</div>',
          styles: '#comp1 { color: red }',
        }, {
          id: 'page-2',
          name: 'Page 2',
          component: '<div id="comp2">Page 2</div>',
          styles: '#comp2 { color: green }',
        }, {
          id: 'page-3',
          name: 'Page 3',
          component: '<div id="comp3">Page 3</div>',
          styles: '#comp3 { color: blue }',
        }]
      },


    })

    

  }

  ngAfterContentInit(): void {
    this.#pageManager = this.#editor.Pages;
    this.pages = this.#pageManager.getAll();
    console.log(this.pages);
  }

  onSelectPage(pageId: string) {
    this.#pageManager.select(pageId);

    // this.#editor.setComponents('<span>' + pageId + '</span>');

    this.#editor.setComponents(
      {
        tagName: 'div',
        components: [
          {
            type: 'image',
            attributes: { src: 'https://icons.iconarchive.com/icons/martin-berube/flat-animal/256/bird-icon.png' },
          }, 
          {
            tagName: 'span',
            type: 'text',
            attributes: { title: 'foo' },
            components: [{
              type: 'textnode',
              content: 'Hello world!!!'
            }]
          }
        ]
      }      
    )

    // get all component's types
    let types = this.#editor.Components.getTypes();
    console.log(types);

    // get html
    let theHtml = this.#editor.getHtml();
    console.log(theHtml);

    // get components
    let components = this.#editor.getComponents();
    console.log(components);

    let theComponents = this.#editor.Components.getComponents();
    console.log(theComponents);

    // get wrapper
    let wrapper = this.#editor.Components.getWrapper();
    console.log(wrapper);

  }



}
