export interface IPost {
    id: number;
    title: string,
    description: string,
    isCancelled: boolean,
    postDate: Date,
    createdBy: string,
    modifyDate: Date,
    modifiedBy: string
}