import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Post } from "../types";

export function usePosts() {
    return useQuery(["posts"], async (): Promise<Array<Post>> => {
        const { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/posts"
        );
        return data;
    });
}

const getPostById = async (id: number): Promise<Post> => {
    const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return data;
};

export function usePost(postId: number) {
    return useQuery(["post", postId], () => getPostById(postId), {
        enabled: !!postId,
    });
}

