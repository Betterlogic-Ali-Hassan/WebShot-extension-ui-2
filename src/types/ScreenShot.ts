export type screenShot =   {
    id: string,
    name: string,
    url: string,
    folder: string,
    date: string,
    tags: string[],
    trash?:boolean,
    uploadDate?: string;
    views?: number
  likes?: number
    isPrivate?: boolean
  }