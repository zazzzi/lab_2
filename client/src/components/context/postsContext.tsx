import { createContext, useEffect, useState } from "react";
export interface Post {
  _id: string;
  author: string;
  content: string;
  likes: number;
  date: number;
  _v: number;
}
interface State {
  posts: Post[];
  makeNewPost: (post: Post) => void;
  deletePost: (id: string) => void;
  editPost: (id: Post) => void;
}

export const PostContext = createContext<State>({
  posts: [],
  makeNewPost: () => {},
  deletePost: () => {},
  editPost: () => {},
});

interface Props {
  children: Object;
}

function PostProvider(props: Props) {
  const [query, setQuery] = useState(null);
  const [posts, setPosts] = useState([] as Post[]);
  const url = "http://localhost:6969";

  async function makeNewPost() {}

  async function deletePost(id: string) {
    makeRequest(`${url}/api/posts/${id}`, "DELETE");
  }

  async function editPost() {}

  useEffect(() => {
    const loadPosts = async () => {
      const allPosts = await makeRequest(`${url}/api/posts`, "GET");
      setPosts(allPosts);
    };
    loadPosts();
  }, [posts]);

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
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
}

export const PostConsumer = PostContext.Consumer;
export default PostProvider;
