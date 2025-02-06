"use client"
import { Blogs } from "@/app/types";
import BlogsArray from "@/data/blogs";
import BlogBanner from "@/components/blogs/blogBanner";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MainNav } from "@/components/common/nav/main-navbar";
import Footer from "@/components/common/footer/footer";

const BlogPage = () => {
  const [currentBlog, setCurrentBlog] = useState<Blogs>(BlogsArray[0]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the top smoothly whenever the current blog is changed
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentBlog]);

  return (
    <div>
    <div ref={containerRef}></div>
    <MainNav />
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-6">
    <div className="max-w-screen-xl px-4 m-auto" >
      {/* Display the selected blog */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 lg:gap-10">
    
      {/* List of blog options excluding the currently selected blog */}
      <div className="w-full order-2 lg:order-1 col-span-1 lg:col-span-2 px-4 md:px-8">
      <h2 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-white mb-6 text-center relative">
        <span className="relative z-10">Read More</span>
        <span className="absolute inset-x-0 bottom-0 h-1 bg-blue-500 rounded-full blur-md opacity-75"></span>
      </h2>
      <div className=" grid grid-cols-1 auto-rows-min sm:grid-cols-2 lg:grid-cols-1 gap-4 ">
        {BlogsArray
          .map((blog, index) => (
            <BlogSelect
              key={index}
              blog={blog}
              onClick={() => setCurrentBlog(blog)}
            />
          ))}
      </div>
      </div>
      <div className="col-span-1 order-1 lg:order-2 lg:col-span-4">
      <BlogDisplay blog={currentBlog} />
        </div>
      </div>

    </div>
    </div>
    <Footer/>
    </div>
  );
};

export default BlogPage;

// BlogDisplay component
const BlogDisplay = ({ blog }: { blog: Blogs }) => {
  return (
    <div className=" px-4 md:px-8">
      {/* Blog Title with Neon Glow */}
      <h2 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-white mb-6 text-center relative">
        <span className="relative z-10">{blog.title}</span>
        <span className="absolute inset-x-0 bottom-0 h-1 bg-blue-500 rounded-full blur-md opacity-75"></span>
      </h2>

      {/* Blog Images */}
      <div className="mb-8">
        <BlogBanner images={blog.images} />
      </div>

      {/* Blog Body with Glassmorphism */}
      <div className="bg-white/10  p-6 rounded-lg shadow-lg text-white">
        <div dangerouslySetInnerHTML={{ __html: blog.body }}></div>
      </div>
    </div>
  );
};

// BlogSelect component
const BlogSelect = ({
  blog,
  onClick,
}: {
  blog: Blogs;
  onClick: () => void;
}) => {
  return (
    <div
      className="w-full h-[250px] relative cursor-pointer overflow-hidden rounded-xl group"
      onClick={onClick}
    >
      {/* Background Image */}
      <Image
        src={blog.images[0]}
        alt="blog-thumbnail"
        width={700}
        height={400}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />

      {/* Title with Glassmorphism */}
      <div className="absolute bottom-5 left-5 right-5 bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
        <h5 className="text-white text-2xl font-bold text-center tracking-wide">
          {blog.title}
        </h5>
      </div>
    </div>
  );
};
