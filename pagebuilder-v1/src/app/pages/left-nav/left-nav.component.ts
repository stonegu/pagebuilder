import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageWithoutBody } from '../../models/page.model';
import { PageService } from '../../service/page.service';
import { Subscription } from 'rxjs';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewPageDialogComponent } from '../new-page-dialog/new-page-dialog.component';
import {MatListModule} from '@angular/material/list';
import { DeletePageDialogComponent } from '../delete-page-dialog/delete-page-dialog.component';

@Component({
  selector: 'app-left-nav',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.css'
})
export class LeftNavComponent implements OnInit, OnDestroy {

  // init
  newPageName: string;

  // subscription
  getAllPagesSubscription: Subscription;
  addNewPageSubscription: Subscription;
  deletePageSubscription: Subscription;

  // services
  pageService: PageService = inject(PageService);

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllPage();
  }

  ngOnDestroy(): void {
    this.getAllPagesSubscription?.unsubscribe();
    this.addNewPageSubscription?.unsubscribe();
    this.deletePageSubscription?.unsubscribe();
  }

  private getAllPage() {

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

  onSelectPage(pageId: string, uuid: string) {
    this.pageService.setSelectedPageId({id: pageId, uuid: uuid});
  }

  openAddPageDialog(): void {
    const dialogRef = this.dialog.open(NewPageDialogComponent, {
      data: this.newPageName,
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed: ' + result);
      if (!!result) {
        // create a new page
        const newPageToAdd = {
          id: null,
          uuid: null,
          name: result, 
          components: null,
          css: null
        }

        this.addNewPageSubscription = this.pageService.addNewPage(newPageToAdd).subscribe({

          next: (data: PageWithoutBody) => {
            console.log(JSON.stringify(data));
            // this.pageService.allPagesSignal.set(data);
            this.getAllPage();
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

    });    
  }

  openDeletePageDialog(pageId: string, uuid: string, pageName: string): void {

    const dialogRef = this.dialog.open(DeletePageDialogComponent, {
      data: pageName,
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('..... openDeletePageDialog: ' + result);

      if (result) {
        this.deletePageSubscription = this.pageService.deletePage(pageId, uuid).subscribe({
          next: (data: PageWithoutBody) => {
            console.log(JSON.stringify(data));
            // this.pageService.allPagesSignal.set(data);
            this.getAllPage();
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


  }

}
