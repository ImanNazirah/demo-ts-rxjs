import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AxiosStatic } from 'axios';
import { Post } from '../api/Post';

export class PostService {

    private readonly POSTS_URL: string;

    constructor(private axios: AxiosStatic) {
        this.POSTS_URL= `${process.env.API_BASE_URL}/posts`;
    }
    
    getPosts() : Observable<Post[]> {
        return from(this.axios.get<Post[]>(this.POSTS_URL)).pipe(
            map(response => response.data),
            catchError(error => {
                console.error('Error fetching posts:', error);
                throw error;
            })
        );
    }

}
