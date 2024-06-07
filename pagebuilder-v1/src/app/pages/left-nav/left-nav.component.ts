import { Component, OnDestroy, OnInit } from '@angular/core';
import { Page, Project } from '../../models/page.model';
import { PageService } from '../../service/page.service';
import { Subscription } from 'rxjs';
import { inject } from '@angular/core';

@Component({
  selector: 'left-nav',
  standalone: true,
  imports: [],
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.css'
})
export class LeftNavComponent implements OnInit, OnDestroy {

  // init
  pages: Page[] = [];
  projects: Project[] = [{id: 'project-1', name: 'project #1', pages: this.pages}];

  // subscription
  getAllPagesSubscription: Subscription;

  // services
  pageService: PageService = inject(PageService);



  ngOnInit(): void {

    this.getAllPagesSubscription = this.pageService.getAllPages().subscribe({
      next: (data) => {
        console.log(JSON.stringify(data));
        // this.pageService.allPagesSignal.set(data);
      },
      error: (err) => {
        this.pageService.errorSignal.set(err);
        this.pageService.allPagesSignal.set([]);
        this.pageService.isLoadingSignal.set(false);
      },
      complete: () => {
        this.pageService.errorSignal.set("");
        this.pageService.isLoadingSignal.set(false);
      }

    });



  }

  ngOnDestroy(): void {

    !!this.getAllPagesSubscription ? this.getAllPagesSubscription.unsubscribe() : true;

  }

  onSelectPage(pageId: string) {

  }

}
