import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useUser from "./useUser";
import { useCurrentUser } from "../use-current-user";
import { User } from "@prisma/client";

const useFollow = (userId: string,currentFetchedUser:User) => {

  const isFollowing = useMemo(() => {
    const list = currentFetchedUser?.followingIds || [];

    return list.includes(userId);
  }, [currentFetchedUser, userId]);

  const toggleFollow = useCallback(async () => {
   
    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete(`/api/follow/${userId}`);
      } else {
        request = () => axios.post(`/api/follow/${userId}`);
      }

      await request();

      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [isFollowing, userId]);

  return {
    isFollowing,
    toggleFollow,
  }
}

export default useFollow;
