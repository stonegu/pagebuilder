export interface Project {
   id: string,
   name: string,
   pages: Page[]
}

export interface Page {
   id: string,
   name: string,
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