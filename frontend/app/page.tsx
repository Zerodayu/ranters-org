import Navbar from "@/components/navbar";
import PostBtn from "@/components/add-post";
import ShowPost from "@/components/post-display";

export default function Home() {
  return (
    <section className="grid min-h-screen w-full place-items-center">
      <div className="flex flex-col border-x border-dashed w-full mx-auto">
        <div className="sticky flex backdrop-blur items-center justify-center border-b border-dashed top-0 z-50">
          <Navbar />
        </div>

        <div className="flex justify-center border-b border-dashed">
          <div className="w-[80vw] border-x border-dashed p-4">
            <PostBtn />
          </div>
        </div>

        <div className="flex justify-center border-b border-dashed">
          <div className="w-[80vw] border-x border-dashed">
            {/* Posts will go here */}
            <ShowPost />
          </div>
        </div>

        <div className="flex justify-center px-4">
          <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
          <p className="mt-4 text-lg">Get started by editing <code>app/page.tsx</code></p>
        </div>
      </div>
    </section>
  );
}
