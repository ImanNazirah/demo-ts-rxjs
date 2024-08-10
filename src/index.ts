import * as dotenv from 'dotenv';
import { GroupedObservable, from, of} from 'rxjs';
import { Post } from './api/Post';
import { User } from './api/User';
import { PostData, PostOutput } from './model/PostOutput';
import { PostService} from './service/PostService';
import { UserService } from './service/UserService';
import { tap, map, groupBy, mergeMap, toArray, switchMap } from 'rxjs/operators';
import axios from 'axios';

// Load environment variables
dotenv.config();

async function main() {

    const postService = new PostService(axios);
    const userService = new UserService(axios);
    let transformedPost: PostOutput[] = [];
    let sortUserByName : User[];
    let sortUserByCity : User[];

    try {

        const processSortByName = (x: User[]) => {
            return of(x).pipe(
                map((users: User[]) => {
                    return users.sort((a: User, b: User) => a.name.localeCompare(b.name));
                })
            );
        };

        const processSortByCity = (x: User[]) => {
            return of(x).pipe(
                map((users: User[]) => {
                    return users.sort((a: User, b: User) => a.address.city.localeCompare(b.address.city));
                })
            );
        };
          
        // Fetch data and then process it
        userService.getUsers().subscribe({

            next: (x: User[]) => {
                
                console.log('Fetched Users From API : ', x);

                processSortByName(x).subscribe({
                    next: transformedData => {
                        sortUserByName = transformedData;
                        console.log('Processed processSortByName:', JSON.stringify(sortUserByName, null, 2))},
                    error: err => console.error('Error in Processing processSortByName:', err)
                });
            
                processSortByCity(x).subscribe({
                    next: transformedData => {
                        sortUserByCity = transformedData;
                        console.log('Processed processSortByCity:', JSON.stringify(sortUserByCity, null, 2))},
                    error: err => console.error('Error in Processing processSortByCity:', err)
                });

            },
            error: err => console.error('Error in Fetching x:', err)
        });
       
        //Group based on userId then display different type
        postService.getPosts().pipe(
            tap((x: Post[]) => console.log('Fetched Post From API:', x)),
            switchMap((posts: Post[]) => posts),
            // tap((x: Post) => console.log('Checking process switchMap:', x)),
            groupBy((x:Post) => x.userId),
            // tap((group: GroupedObservable<number, Post>) => group.subscribe((item: Post) => console.log('Checking process groupBy:', item))),
            mergeMap((y: GroupedObservable<number, Post>) => y.pipe(toArray())),
            map((x: Post[]) =>{

                const transformedPosts = x.map((post: Post) => 
                    new PostData(post.id, post.title, post.body)
                );

                const dataDisplay = new PostOutput();
                dataDisplay.userId = x[0].userId;
                dataDisplay.data = transformedPosts;
                
                return dataDisplay;
            }),
            toArray() 
        )
        .subscribe((x: PostOutput[])=>{
            transformedPost = x;
            console.log('Processed Post:', JSON.stringify(transformedPost, null, 2));
        });
        
    } catch (error) {
        console.error('Error in main function:', error);
    }


}


main();
