import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import usePost from "./usePost";
import usePosts from "./usePosts";
import { useCurrentUser } from "../use-current-user";

const useLike = ({ postId, userId }: { postId: string, userId?: string }) => {
  const currentUser  = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);


  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [fetchedPost, currentUser]);

  const toggleLike = useCallback(async () => {

    try {
      let request;

      if (hasLiked) {
        request = () => axios.delete(`/api/like/${postId}`);
      } else {
        request = () => axios.post(`/api/like/${postId}`);
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [currentUser, hasLiked, postId, mutateFetchedPosts, mutateFetchedPost]);

  return {
    hasLiked,
    toggleLike,
  }
}

export default useLike;
