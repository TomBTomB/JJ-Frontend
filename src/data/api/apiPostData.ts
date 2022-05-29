import axios from "axios"
import {FullPost, NewPost, Post, PostData} from "../posts";

export class ApiPostData implements PostData{

    createPost(post: NewPost): Promise<Post> {
        return postAxios.post<NewPost, Post>("/", post)
    }

    getFullPostById(id: string): Promise<FullPost | undefined> {
        return postAxios.get(`/${id}`);
    }

    getFeedPosts(): Promise<Post[]> {
        return postAxios.get("/");
    }

    answerPost(postId: string, answer: NewPost): Promise<FullPost> {
        return postAxios.post<NewPost, FullPost>(`/${postId}`, answer)
    }

}

const postAxios = axios.create(
    {
        baseURL: "http://localhost:8082/post",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "crossDomain": true
        }
    }
)

export const getPostsFor = async (userId: string) => {
    return await postAxios.get(`/user/${userId}`)
}

export const deletePost = async (postId: string) => {
    return await postAxios.delete(`/${postId}`)
}