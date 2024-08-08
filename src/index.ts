// import * as dotenv from 'dotenv';
import { fetchUsers } from './api/user';
import { tap, map } from 'rxjs/operators';
import { User } from './model/user';

// // Load environment variables
// dotenv.config();

async function main() {
    try {

        // Sort users by name in ascending order
        fetchUsers().pipe(
            tap((x: User[]) => console.log('Fetched Users From API:', x)),
            map((x: User[]) => {
                return x.sort((a: User, b: User) => a.name.localeCompare(b.name));
            })
        ).subscribe((x: User[]) => {
            console.log('Processed Users 1:', x);
        });

        // Sort users by city in ascending order
        fetchUsers().pipe(
            map((x: User[]) => {
                return x.sort((a: User, b: User) => a.address.city.localeCompare(b.address.city));
            })).subscribe((x: User[]) => {
                console.log('Processed Users 2:', x);
            });

    } catch (error) {
        console.error('Error in main function:', error);
    }
}

main();
