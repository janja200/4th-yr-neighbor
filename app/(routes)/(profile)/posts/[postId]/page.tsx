"use client"
import Form from "@/components/profile/Form";
import Header from "@/components/profile/Header";
import CommentFeed from "@/components/profile/posts/CommentFeed";
import PostItem from "@/components/profile/posts/PostItem";
import usePost from "@/hooks/profile/usePost";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";

const PostView = () => {
  const params=useParams();

  const { data: fetchedPost, isLoading } = usePost(params.postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    )
  }

  return ( 
    <>
      <Header showBackArrow label="Comment" />
      <PostItem data={fetchedPost} />
      <Form postId={params.postId as string} isComment placeholder="Reply to this post" />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
   );
}
 
export default PostView;