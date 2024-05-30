export interface Project {
   id: string,
   name: string,
   pages: Page[]
}

export interface Page {
   id: string,
   name: string
}