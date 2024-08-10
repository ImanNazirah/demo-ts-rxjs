import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import axios from 'axios';
import { Comment } from '../api/Comment';

const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

export function fetchComments(): Observable<Comment[]> {
    return from(axios.get<Comment[]>(COMMENTS_URL)).pipe(
        map(response => response.data),
        catchError(error => {
            console.error('Error fetching comments:', error);
            throw error;
        })
    );
}
