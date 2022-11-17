import { IProfile } from "./profile";

export interface IActivity {
    id:	number;
    title:	string;  
    description:string;   
    postDate: string;
    IsCancelled: boolean;
    
}
export interface IPost {
    id:	number;
    title:	string;  
    description:string;   
    postDate: Date | null;
    IsCancelled: boolean;
    hostUsername: string;
    postAttendees: IProfile[];
}

