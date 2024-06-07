import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { MkmApiResponse, Page, PageWithoutBody } from "../models/page.model";
import { environment } from "../../environments/environment";
import { catchError, map, shareReplay, tap } from "rxjs";
import { ErrorHandleService } from "./error-handle.service";

@Injectable({
   providedIn: 'root'
})
export class PageService {

   // predefined environments
   #searchBaseUrl: string | undefined;
   #searchAllPagesEndpoint: string | undefined;

   // signals
   allPagesSignal = signal<PageWithoutBody[]>([] as PageWithoutBody[]);
   isLoadingSignal = signal<boolean>(false);
   errorSignal = signal<string>('');
 

   // services
   #errorHandleService = inject(ErrorHandleService);

   constructor(private httpClient: HttpClient) {
      this.#searchBaseUrl = environment.searchBaseUrl;
      this.#searchAllPagesEndpoint = environment.searchAllPagesEndpoint;
   }

   getAllPages() {
      return this.httpClient
         .get<MkmApiResponse>(`${this.#searchBaseUrl}${this.#searchAllPagesEndpoint}`)
         .pipe(
            tap((resp) => {console.log('Pageservice.getAllPages: ' + JSON.stringify(resp))}),
            map((resp => {
               let pagesWithoutBody: PageWithoutBody[] = this.processPagesRespToPage(resp);
               return pagesWithoutBody;
            })),
            shareReplay(1),
            catchError( (err) => {return this.#errorHandleService.handleError(err)} )
         )
   }

   private processPagesRespToPage(resp: MkmApiResponse): PageWithoutBody[] {
      let pagesWithoutBody: PageWithoutBody[] = [];

      if (!!resp.dataset && resp.dataset.length > 0) {
         resp.dataset.forEach((item: PageWithoutBody) => {
            pagesWithoutBody.push(item);
         })
      }
      return pagesWithoutBody;
   }

}