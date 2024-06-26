import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const blogsDirectory = path.join(process.cwd(), "content","posts");
  const filenames = fs.readdirSync(blogsDirectory);

  const blogs = filenames.map((filename) => {
    const filePath = path.join(blogsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContents);
    const imagePath = data.image;

    return {
      slug: filename.replace(".md", ""),
      frontMatter: {
        ...data,
        image: imagePath,
      },
      content: content,
    };
  });

  const sortedBlogs = blogs.sort(
    (a, b) => new Date(b.frontMatter.date) - new Date(a.frontMatter.date)
  );
  const latestBlogs = sortedBlogs.slice(0, 3);

  res.status(200).json(latestBlogs);
}
