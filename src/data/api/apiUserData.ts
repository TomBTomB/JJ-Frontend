import axios from "axios"
import UserService from "../../utils/UserService";
import {User, UserData} from "../users";

export class ApiUserData implements UserData{
    getCurrentUser(): Promise<User | undefined> {
        return userAxios.get("/").then(res => res.data);
    }

    getUserById(userId: string): Promise<User | undefined> {
        return userAxios.get(`/${userId}`).then(res => res.data);
    }

    searchUser(searchString: string): Promise<User[]> {
        return userAxios.get(`/search/${searchString}`).then(res => res.data);
    }

    isFollowed(userId: string): Promise<boolean | undefined> {
        return followAxios.get(`/${userId}`).then(res => res.data);
    }

    toggleFollow(userId: string): Promise<void> {
        return followAxios.post(`/${userId}`);
    }
}

const userAxios = axios.create(
    {
        baseURL: "https://jjtombtomb.ml/user",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "crossDomain": true
        }
    }
)

const followAxios = axios.create(
    {
        baseURL: "https://jjtombtomb.ml/follow",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "crossDomain": true
        }
    }
)

userAxios.interceptors.request.use((config) => {
    if (UserService.isLoggedIn()) {
        const cb = () => {
            // @ts-ignore
            config.headers.Authorization = `Bearer ${UserService.getToken()}`;
            return Promise.resolve(config);
        };
        return UserService.updateToken(cb);
    }
});

followAxios.interceptors.request.use((config) => {
    if (UserService.isLoggedIn()) {
        const cb = () => {
            // @ts-ignore
            config.headers.Authorization = `Bearer ${UserService.getToken()}`;
            return Promise.resolve(config);
        };
        return UserService.updateToken(cb);
    }
});
