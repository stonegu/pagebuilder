import { Component, OnDestroy, OnInit } from '@angular/core';
import { Page, PageWithoutBody, Project } from '../../models/page.model';
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

  // subscription
  getAllPagesSubscription: Subscription;

  // services
  pageService: PageService = inject(PageService);

  ngOnInit(): void {

    this.getAllPagesSubscription = this.pageService.getAllPages().subscribe({
      next: (data: PageWithoutBody[]) => {
        console.log(JSON.stringify(data));
        this.pageService.allPagesSignal.set(data);
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

  onSelectPage(pageId: string, uuid: string) {
    this.pageService.setSelectedPageId({id: pageId, uuid: uuid});
  }

}
