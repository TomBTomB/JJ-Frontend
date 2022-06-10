import axios from "axios"
import {FullPost, NewPost, Post, PostData} from "../posts";
import UserService from "../../utils/UserService";

export class ApiPostData implements PostData{

    createPost(post: NewPost): Promise<Post> {
        return postAxios.post<NewPost, Post>("/", post)
    }

    getFullPostById(id: string): Promise<FullPost | undefined> {
        return postAxios.get(`/${id}`).then(res => res.data);
    }

    getFeedPosts(): Promise<Post[]> {
        return postAxios.get("/").then(res => res.data);
    }

    answerPost(postId: string, answer: NewPost): Promise<FullPost> {
        return postAxios.post<NewPost, FullPost>(`/${postId}`, answer)
    }

    getPostsByUser(userId: string): Promise<Post[]> {
        return postAxios.get("/user");
    }

}

const postAxios = axios.create(
    {
        baseURL: "http://localhost:8084/post",
        headers: {
            // "Authorization": "Bearer " + UserService.getToken(),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "crossDomain": true
        }
    }
)

postAxios.interceptors.request.use((config) => {
    if (UserService.isLoggedIn()) {
        const cb = () => {
            // @ts-ignore
            config.headers.Authorization = `Bearer ${UserService.getToken()}`;
            return Promise.resolve(config);
        };
        return UserService.updateToken(cb);
    }
});

export const getPostsFor = async (userId: string) => {
    return await postAxios.get(`/user/${userId}`)
}

export const deletePost = async (postId: string) => {
    return await postAxios.delete(`/${postId}`)
}