import {createContext, useEffect, useState} from "react";

export interface Post{
    _id: string;
    author: string;
    content: string;
    likes: number;
    date: number;
    _v: number;
}

interface State{
    post: Post[]
    makeNewPost: (post: Post) => void;
    deletePost: (id: Post) => void;
    editPost: (id: Post) => void;
}

export const PostContext = createContext<State>({
    post:[],
    makeNewPost: () => {},
    deletePost: () => {},
    editPost: () => {},
})

interface Props {
    children: Object;
}

function PostProvider(props: Props){
    const [post, setPosts] = useState([] as Post[]);
    const url = "http://localhost:6969/api/posts"

    function makeNewPost(){

    }

    function deletePost(){

    }

    function editPost(){

    }

    useEffect( () => {
        const loadPosts = async () => {
          const response = await fetch(url)
          const posts = await response.json();
          setPosts(posts)
        }
        loadPosts()
    }, [])

    return (
        <PostContext.Provider
            value={{
                post: post,
                makeNewPost: makeNewPost,
                deletePost: deletePost,
                editPost: editPost,
            }}
        >
            {props.children}
        </PostContext.Provider>
    )
}

export const PostConsumer = PostContext.Consumer;
export default PostProvider;