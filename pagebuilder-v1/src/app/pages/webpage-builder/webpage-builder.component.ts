import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import grapesjs, { Editor, ProjectData } from 'grapesjs';
import plugin from 'grapesjs-blocks-basic';
import gjsForms from 'grapesjs-plugin-forms';
import pluginTooltip from 'grapesjs-tooltip';
import preset from 'grapesjs-preset-webpage';
import customCodePlugin from 'grapesjs-custom-code';
import shtjPlugin from '../../../scripts/grapesjs-plugins/saveHtmlToJson';
import { PageService } from '../../service/page.service';
import { Subscription } from 'rxjs';
import { Page, PageWithoutBody } from '../../models/page.model';
// import thePlugin from 'grapesjs-plugin-export';


@Component({
  selector: 'webpage-builder',
  standalone: true,
  imports: [],
  templateUrl: './webpage-builder.component.html',
  styleUrl: './webpage-builder.component.css'
})
export class WebpageBuilderComponent implements OnInit, OnDestroy, AfterContentInit{

  // init
  #editor: Editor = null;
  #pageManager: any;
  pages: any[] = [];

  
  // subscription
  getPageByIdSubscription: Subscription;
  selectedPageIdSubscription: Subscription;
  updatePageSubscription: Subscription;

  constructor(private pageService: PageService) {
    this.selectedPageIdSubscription = this.pageService.selectedPageId$.subscribe(pageId => {
      this.onSelectPage(pageId.id, pageId.uuid);
    })

  }

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
        // editor => exportPlugin(editor, { 
        //   btnLabel: 'Save'
        // }),
        editor => shtjPlugin(editor, { 
          btnLabel: 'Save',
          done: () => {
            let componentsInJsonString = JSON.stringify(this.getComponentsInJson(editor));
            let componentsCss = editor.getCss({avoidProtected: true});
            let pm = editor.Pages;
            // get uuid from page attribute
            let uuid = pm.getSelected()?.attributes['uuid'] as string;
            // get id
            let id = pm.getSelected()?.getId();
            // get pagename
            let pagename = pm.getSelected()?.getName();

            let page: Page = {
              id: id,
              uuid: uuid,
              name: pagename,
              components: componentsInJsonString,
              css: componentsCss
            };

            this.pageService.updatePage(page).subscribe({

              next: (data: PageWithoutBody) => {
                console.log('---------- from call back: ' + JSON.stringify(data));
              },
              error: (err) => {
                this.pageService.errorSignal.set(err);
                this.pageService.isLoadingSignal.set(false);
              },
              complete: () => {
                this.pageService.errorSignal.set("");
                this.pageService.isLoadingSignal.set(false);
              }

            })
          }
        })


      ],

      pageManager: {
        pages: [{
          id: 'page-1',
          name: 'Page 1',
          component: '<div id="comp1">Page 1</div>',
          styles: '#comp1 { color: red }',
        }
      ]
      },


    })

  }

  ngAfterContentInit(): void {
    this.#pageManager = this.#editor.Pages;
    this.pages = this.#pageManager.getAll();
    let mainPage = this.#pageManager.getSelected();
    console.log(this.pages);
    console.log(mainPage);
  }


  ngOnDestroy(): void {
    this.selectedPageIdSubscription?.unsubscribe();
    this.getPageByIdSubscription?.unsubscribe();
    this.updatePageSubscription?.unsubscribe();
  }


  onSelectPage(id: string, uuid: string) {

    // get page from DB
    this.getPageByIdSubscription = this.pageService.getPageById(id, uuid).subscribe({
      next: (data: Page) => {

        // this.editor.setComponents(JSON.parse(data.components)).setStyle(data.css);

        let pm = this.#editor.Pages;
        pm.getAll().forEach(p => {
          pm.remove(p);
        })

        let p = pm.add({
          id: data.id,
          name: data.name,
          styles: data.css,
          component: JSON.parse(data.components),
          'uuid': data.uuid
        });

        pm.select(p);

        console.log(this.#editor.Pages.getAll());
        console.log(this.#editor.Pages.getSelected());



      },
      error: (err) => {
        this.pageService.errorSignal.set(err);
        this.pageService.isLoadingSignal.set(false);
      },
      complete: () => {
        this.pageService.errorSignal.set("");
        this.pageService.isLoadingSignal.set(false);
      }
    });

  }

  getComponentsInJson(editor: Editor): any[] | [] {

    let projectData: ProjectData = editor.getProjectData();
    if (!!projectData) {
      return projectData['pages'][0].frames[0].component?.components;
    }
    return [];
  }




}
