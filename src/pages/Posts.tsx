import { useQueryClient } from "@tanstack/react-query";
import { usePosts, usePost } from "../store/posts";

export function Posts({
    setPostId,
}: {
    setPostId: React.Dispatch<React.SetStateAction<number>>;
}) {
    const queryClient = useQueryClient();
    const { status, data, error, isFetching } = usePosts();

    return (
        <>
            <h2>Posts</h2>
            <div>
                {status === "loading" ? (
                    "Loading..."
                ) : error instanceof Error ? (
                    <span>Error: {error.message} </span>
                ) : (
                    <>
                        <ul>
                            {data?.map((post) => (
                                <li key={post.id} >
                                    <a
                                        onClick={() => setPostId(post.id)}
                                        href="#"
                                        style={
                                            queryClient.getQueryData(["post", post.id])
                                                ? {
                                                    fontWeight: "bold",
                                                    color: "green",
                                                }
                                                : {}
                                        }>
                                        {post.title}
                                    </a>
                                </li>
                            ))
                            }
                        </ul>
                        < div > {isFetching ? "Background Updating..." : " "} </div>
                    </>
                )}
            </div>
        </>
    );
}

export function PostDetail({
    postId,
    setPostId,
}: {
    postId: number;
    setPostId: React.Dispatch<React.SetStateAction<number>>;
}) {
    const { status, data, error, isFetching } = usePost(postId);

    return (
        <div>
            <nav>
                <a onClick={() => setPostId(-1)} href="#">
                    Back
                </a>
            </nav>
            {
                !postId || status === "loading" ? (
                    "Loading..."
                ) : error instanceof Error ? (
                    <span>Error: {error.message} </span>
                ) : (
                    <>
                        <h1>{data?.title} </h1>
                        <div>
                            <p>{data?.body} </p>
                        </div>
                        < div > {isFetching ? "Background Updating..." : " "} </div>
                    </>
                )
            }
        </div>
    );
}