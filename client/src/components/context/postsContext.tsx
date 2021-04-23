import { createContext, useEffect, useState } from "react";
export interface Post {
  _id: string;
  author: string;
  content: string;
  likes: number;
  date: number;
  name: string;
  _v: number;
}
interface State {
  posts: Post[];
  makeNewPost: (post: string) => void;
  deletePost: (id: string) => void;
  editPost: (id: Post) => void;
  likePost: (id: string) => void;
}

export const PostContext = createContext<State>({
  posts: [],
  makeNewPost: () => {},
  deletePost: () => {},
  editPost: () => {},
  likePost: () => {},
});

interface Props {
  children: Object;
}

function PostProvider(props: Props) {
  const [query, setQuery] = useState(null);
  const [posts, setPosts] = useState<any>([] as Post[]);
  const url = "http://localhost:6969";

  async function makeNewPost(content: string) {
    const body = {
      content: content,
    };
    const post = makeRequest(`${url}/api/posts/`, "POST", body);
    const newPost = [...posts, post]
    setPosts(newPost)
  }

  async function deletePost(id: string) {
    /* const deletedPost = await makeRequest(`${url}/api/posts/${id}`, "DELETE"); */
    const findPost = posts.find((p: { _id: string; }) => p._id === id)
  
    setPosts((prev: any[]) =>
      prev.reduce((ack: any, item: { id: string; }) => {
        if (item.id === findPost._id) {
          return ack;
        } else {
          return [...ack, item];
        }
      }, [] as Post[])
    );
  }

  async function editPost() {}

  async function likePost(id: string) {
    const likedPost = await makeRequest(`${url}/api/posts/${id}`, "POST");
    setPosts((prev: any) => {
        return prev.map((p: any) => 
          likedPost._id === p._id
          ? {...p, likes: p.likes + 1}
          : p 
      );
    })
  }

  useEffect(() => {
    const loadPosts = async () => {
      const allPosts = await makeRequest(`${url}/api/posts`, "GET");
      setPosts(allPosts);
    };
    loadPosts();
  }, []);

  async function makeRequest(url: RequestInfo, method: any, body?: any) {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  }

  return (
    <PostContext.Provider
      value={{
        posts: posts,
        makeNewPost: makeNewPost,
        deletePost: deletePost,
        editPost: editPost,
        likePost: likePost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
}

export const PostConsumer = PostContext.Consumer;
export default PostProvider;
