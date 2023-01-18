export interface IJob {
        id: number;
        customerId:number,
        teamId:number,
        resourceId:number,
    
        divisionID:number,
        jobAssetID:number,
        jobIssueTypeID:number,
        jobPriorityID:number,
        jobSourceID:number,
        jobProgressStatusID:number,
        jobTypeID:number,
        externalRefNo:number,
        StartDate:any,
        dateDue:any,
        dateClosed:any,
        jobTask:any,
        jobDocument:any,
        resourceJobCost:any,
        jobName:string,
        code: string,
        status: boolean,
        description: string,
        createdDate: Date,
        createdBy: string,
        modifyDate: Date,
        modifiedBy: string
    }