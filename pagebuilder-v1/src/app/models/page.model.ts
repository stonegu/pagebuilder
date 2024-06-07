export interface Project {
   id: string,
   name: string,
   pages: Page[]
}

export interface PageWithoutBody {
   id: string,
   name: string
}

export interface Page extends PageWithoutBody {
   components: string,
   css: string
}

export interface ApiError {
   logId: string,
   httpStatus: number,
   timestamp: string,
   message: string,
   path: string
}

export interface MkmApiResponse {
   logId: string,
   timestamp: string,
   data: any | null,
   dataset: any[] | null
}
