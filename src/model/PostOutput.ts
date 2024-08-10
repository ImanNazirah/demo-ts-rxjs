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


// Create instances of PostData
// const post1 = new PostData(1, 'First post content');
// const post2 = new PostData(2, 'Second post content');

// // Create an instance of PostOutput
// const postOutput = new PostOutput();
// postOutput.user = 'John Doe';
// postOutput.data.push(post1, post2);

// console.log(postOutput.user); // Outputs: John Doe
// console.log(postOutput.data); // Outputs: [PostData { id: 1, content: 'First post content' }, PostData { id: 2, content: 'Second post content' }]
