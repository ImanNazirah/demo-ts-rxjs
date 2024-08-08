import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import axios from 'axios';
import { User } from '../model/user';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export function fetchUsers(): Observable<User[]> {
    return from(axios.get<User[]>(USERS_URL)).pipe(
        map(response => response.data),
        catchError(error => {
            console.error('Error fetching User:', error);
            throw error;
        })
    );
}
