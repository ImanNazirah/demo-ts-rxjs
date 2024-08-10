import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AxiosStatic } from 'axios';
import { User } from '../api/User';

export class UserService {

    private readonly USERS_URL: string;

    constructor(private axios: AxiosStatic) {
        this.USERS_URL= `${process.env.API_BASE_URL}/users`;

    }
    
    getUsers() : Observable<User[]> {
        return from(this.axios.get<User[]>(this.USERS_URL)).pipe(
            map(response => response.data),
            catchError(error => {
                console.error('Error fetching user:', error);
                throw error;
            })
        );
    }

}