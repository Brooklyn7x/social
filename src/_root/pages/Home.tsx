import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesMutation";
import { Models } from "appwrite";

const Home = () => {
  const {
    data: posts,
    isLoading: isPostLoading,
    // isError: isErrorPosts,
  } = useGetRecentPosts();
  console.log(posts);

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14">
        <div className="max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9">
          <h2>Home</h2>
          {isPostLoading && !posts ? (
            <div>Loading...</div>
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.$id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
