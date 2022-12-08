export interface IJob {
    id: number;
    jobName: string,
    code: string,
    status: boolean,
    jobType: string,
    description: string,
    createdDate: Date,
    createdBy: string,
    modifyDate: Date,
    modifiedBy: string
}