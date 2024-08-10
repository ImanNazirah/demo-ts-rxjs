import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AxiosStatic } from 'axios';
import { Comment } from '../api/Comment';

export class CommentService {

    private readonly COMMENTS_URL: string;

    constructor(private axios: AxiosStatic) {
        this.COMMENTS_URL= `${process.env.API_BASE_URL}/comments`;

    }
    
    getComments() : Observable<Comment[]> {
        return from(this.axios.get<Comment[]>(this.COMMENTS_URL)).pipe(
            map(response => response.data),
            catchError(error => {
                console.error('Error fetching comments:', error);
                throw error;
            })
        );
    }

}
