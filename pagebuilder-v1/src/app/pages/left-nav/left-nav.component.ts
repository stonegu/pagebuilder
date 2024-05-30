import { Component } from '@angular/core';
import { Page, Project } from '../../models/page.model';

@Component({
  selector: 'left-nav',
  standalone: true,
  imports: [],
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.css'
})
export class LeftNavComponent {

  pages: Page[] = [{id: 'page-1', name: 'page #1'}, {id: 'page-2', name: 'page #2'}, {id: 'page-3', name: 'page #3'}];
  projects: Project[] = [{id: 'project-1', name: 'project #1', pages: this.pages}];


  onSelectPage(pageId: string) {

  }

}
