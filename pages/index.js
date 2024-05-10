import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Pagination from "@layouts/components/Pagination";
import Post from "@layouts/components/Post";
import { getSinglePage } from "@lib/contentParser";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
const { blog_folder } = config.settings;

const Home = ({ posts }) => {
  const { pagination } = config.settings;
  const sortPostByDate = sortByDate(posts);

  return (
    <Base>
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="mx-auto text-center lg:col-12">
              {markdownify(
            "Welcome to Vachan Blogs",
                "h5",
                "text-4xl lg:text-6xl"
              )}
            </div>
          </div>
        </div>
        <div className="mx-auto text-center lg:col-8">
              {markdownify(
            "Thoughts, Views and Faith",
                "h1",
                "mt-6 text-2xl lg:text-4xl"
              )}
            </div>
      </div>

      {/* posts */}
      <div className="pt-4">
        <div className="container">
          <div className="row">
            <div className="mx-auto lg:col-10">
              <div className="row">
                {sortPostByDate.slice(0, pagination).map((post, i) => (
                  <Post
                    className="col-12 mb-6 sm:col-6"
                    key={"key-" + i}
                    post={post}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12">
            <Pagination
              totalPages={Math.ceil(posts.length / pagination)}
              currentPage={1}
            />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const posts = getSinglePage(`content/${blog_folder}`);
  return {
    props: {
      posts: posts,
    },
  };
};
