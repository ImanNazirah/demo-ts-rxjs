import * as dotenv from 'dotenv';
import { GroupedObservable, from} from 'rxjs';
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

    try {

        // Sort users by name in ascending order
        userService.getUsers().pipe(
            tap((x: User[]) => console.log('Fetched Users From API:', x)),
            map((x: User[]) => {
                return x.sort((a: User, b: User) => a.name.localeCompare(b.name));
            })
        ).subscribe((x: User[]) => {
            console.log('Processed Users 1:', JSON.stringify(x, null, 2));
        });

        // Sort users by city in ascending order
        userService.getUsers().pipe(
            map((x: User[]) => {
                return x.sort((a: User, b: User) => a.address.city.localeCompare(b.address.city));
            }))
            .subscribe((x: User[]) => {
                console.log('Processed Users 2:', JSON.stringify(x, null, 2));
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
