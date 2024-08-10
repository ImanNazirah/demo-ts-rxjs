// import * as dotenv from 'dotenv';
import { GroupedObservable} from 'rxjs';
import { Post } from './api/Post';
import { User } from './api/User';
import { PostData, PostOutput } from './model/PostOutput';
import { fetchPosts } from './service/PostService';
import { fetchUsers } from './service/UserService';
import { tap, map, groupBy, mergeMap, toArray, switchMap } from 'rxjs/operators';

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
            console.log('Processed Users 1:', JSON.stringify(x, null, 2));
        });

        // Sort users by city in ascending order
        fetchUsers().pipe(
            map((x: User[]) => {
                return x.sort((a: User, b: User) => a.address.city.localeCompare(b.address.city));
            }))
            .subscribe((x: User[]) => {
                console.log('Processed Users 2:', JSON.stringify(x, null, 2));
            });
        
        //Group based on userId then display different type
        fetchPosts().pipe(
            tap((x: Post[]) => console.log('Fetched Post From API:', x)),
            switchMap((posts: Post[]) => posts),
            groupBy((x:Post) => x.userId),
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
            console.log('Processed Post:', JSON.stringify(x, null, 2));
        });
        
    } catch (error) {
        console.error('Error in main function:', error);
    }
}


main();
