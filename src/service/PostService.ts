import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import axios from 'axios';
import { Post } from '../api/Post';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export function fetchPosts(): Observable<Post[]> {
    return from(axios.get<Post[]>(POSTS_URL)).pipe(
        map(response => response.data),
        catchError(error => {
            console.error('Error fetching posts:', error);
            throw error;
        })
    );
}
