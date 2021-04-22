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
}

interface ContextValue extends State{
    makeNewPost: (post: Post) => void;
    deletePost: (id: Post) => void;
    editPost: (id: Post) => void;
}

export const PostContext = createContext<ContextValue>({
    post:[],
    makeNewPost: () => {},
    deletePost: () => {},
    editPost: () => {},
})

interface Props {
    children: Object;
}

function PostProvider(props: Props){
    const [post, setPost] = useState([] as Post[]);

    function makeNewPost(){

    }

    function deletePost(){

    }

    function editPost(){

    }

    useEffect(() => {

    })

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