import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { MkmApiResponse, Page, PageId, PageWithoutBody } from "../models/page.model";
import { environment } from "../../environments/environment";
import { Observable, Subject, catchError, map, retry, shareReplay, tap } from "rxjs";
import { ErrorHandleService } from "./error-handle.service";

@Injectable({
   providedIn: 'root'
})
export class PageService {

   // predefined environments
   #searchBaseUrl: string | undefined;
   #searchAllPagesEndpoint: string | undefined;
   #updatePageEndpoint: string | undefined;
   #addPageEndpoint: string | undefined;
   #deletePageEndpoint: string | undefined;

   // signals
   allPagesSignal = signal<PageWithoutBody[]>([] as PageWithoutBody[]);
   isLoadingSignal = signal<boolean>(false);
   errorSignal = signal<string>('');

   // observable
   private selectedPageId = new Subject<PageId>();
   selectedPageId$ = this.selectedPageId.asObservable();
   setSelectedPageId(id: PageId) {
      this.selectedPageId.next(id);
   }
 

   // services
   #errorHandleService = inject(ErrorHandleService);

   constructor(private httpClient: HttpClient) {
      this.#searchBaseUrl = environment.searchBaseUrl;
      this.#searchAllPagesEndpoint = environment.searchAllPagesEndpoint;
      this.#updatePageEndpoint = environment.updatePageEndpoint;
      this.#addPageEndpoint = environment.addPageEndpoint;
      this.#deletePageEndpoint = environment.deletePageEndpoint;
   }

   getAllPages(): Observable<PageWithoutBody[]> {
      return this.httpClient
         .get<MkmApiResponse>(`${this.#searchBaseUrl}${this.#searchAllPagesEndpoint}`)
         .pipe(
            tap((resp) => {console.log('PageService.getAllPages: ' + JSON.stringify(resp))}),
            map((resp => {
               const pagesWithoutBody: PageWithoutBody[] = this.returnDataArrayFromMkmApiResponse(resp);
               return pagesWithoutBody;
            })),
            shareReplay(1),
            catchError((err) => {return this.#errorHandleService.handleError(err)})
         );
   }

   getPageById(id: string, uuid: string): Observable<Page> {
      return this.httpClient
         .get<MkmApiResponse>(`${this.#searchBaseUrl}${id}/${uuid}`)
         .pipe(
            tap((resp) => {console.log('PageService.getPageById: ' + JSON.stringify(resp))}),
            map((resp => {
               const page: Page = this.returnDataFromMkmApiResponse(resp) as Page;
               return page;
            })),
            shareReplay(1),
            catchError((err) => {return this.#errorHandleService.handleError(err)})
         );
   }

   // check this: https://www.concretepage.com/angular/angular-httpclient-put
   updatePage(page: Page): Observable<PageWithoutBody> {
      // const myHeaders = new HttpHeaders()
      //    .append("Content-Type", "application/json")
      //    .append("Content-Length", "70")
      //    .append('Authorization', `Bearer ${authToken}`);

      // const myParams = new HttpParams()
      //    .set("bookId", "101")
      //    .set("publisher", "XYZ");

      return this.httpClient.put<MkmApiResponse>(`${this.#searchBaseUrl}${this.#updatePageEndpoint}`, page
      // , {
      //    headers: myHeaders,
      //    params: myParams,
      //    observe: "response",
      //    responseType: "json",
      //    withCredentials: true
      // }
      ).pipe(
         tap((resp) => {console.log('PageService.updatePage: ' + JSON.stringify(resp))}),
         map((resp => {
            const page: PageWithoutBody = this.returnDataFromMkmApiResponse(resp) as PageWithoutBody;
            return page;
         })),
         retry(2),
         catchError((err) => {return this.#errorHandleService.handleError(err)})
      );
   }

   addNewPage(page: Page): Observable<PageWithoutBody> {
      return this.httpClient.post<MkmApiResponse>(`${this.#searchBaseUrl}${this.#addPageEndpoint}`, page)
      .pipe(
         tap((resp) => {console.log('PageService.addNewPage: ' + JSON.stringify(resp))}),
         map((resp => {
            const page: PageWithoutBody = this.returnDataFromMkmApiResponse(resp) as PageWithoutBody;
            return page;
         })),
         retry(2),
         catchError((err) => {return this.#errorHandleService.handleError(err)})
      )

   }

   deletePage(id: string, uuid: string): Observable<PageWithoutBody> {
      return this.httpClient.delete<MkmApiResponse>(`${this.#searchBaseUrl}${this.#deletePageEndpoint}/${id}/${uuid}`)
         .pipe(
            tap((resp) => {console.log('PageService.deletePage: ' + JSON.stringify(resp))}),
            map((resp => {
               const page: PageWithoutBody = this.returnDataFromMkmApiResponse(resp) as PageWithoutBody;
               return page;
            })),
            retry(2),
            catchError((err) => {return this.#errorHandleService.handleError(err)})   
         )
   }

   private returnDataArrayFromMkmApiResponse(resp: MkmApiResponse): PageWithoutBody[] {
      const pagesWithoutBody: PageWithoutBody[] = [];

      if (!!resp.dataset && resp.dataset.length > 0) {
         resp.dataset.forEach((item: PageWithoutBody) => {
            pagesWithoutBody.push(item);
         })
      }
      return pagesWithoutBody;
   }

   private returnDataFromMkmApiResponse(resp: MkmApiResponse): PageWithoutBody | Page {
      let page: Page | PageWithoutBody = null;
      if (!!resp.data) {
         page = resp.data as Page | PageWithoutBody;
      }
      return page;
   }

}