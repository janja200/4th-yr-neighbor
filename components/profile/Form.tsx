"use client"
import axios from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

import Avatar from './Avatar';
import Button from './Button';
import { useCurrentUser } from '@/hooks/use-current-user';
import usePosts from '@/hooks/profile/usePosts';
import usePost from '@/hooks/profile/usePost';

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const User =useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments/${postId}` : '/api/posts';

      await axios.post(url, { body });
      toast.success('Tweet created');
      setBody('');
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, isComment, postId, mutatePost]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={User?.id!} image={User?.image!}/>
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-white 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-black
              "
              placeholder={placeholder}>
            </textarea>
            <hr 
              className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border-neutral-800 
                transition"
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button disabled={isLoading || !body} onClick={onSubmit} label="Post" />
            </div>
          </div>
        </div>
    </div>
  );
};

export default Form;
