export class PostOutput {  
    userId: number | undefined;
    data: PostData[];

      constructor() {
        this.userId; 
        this.data = []; 
    }
 
}

export class PostData {

    postId: number;
    postTitle: string;
    postBody: string;

    constructor(postId: number, postTitle: string, postBody: string) {
        this.postId = postId;
        this.postTitle = postTitle;
        this.postBody = postBody;
    }
}
