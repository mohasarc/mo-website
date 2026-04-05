import { getAllPosts } from "@/lib/blog";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software engineering, AI, design, and more.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen font-sans bg-background text-foreground max-w-3xl mx-auto px-6 pt-10 pb-20">
      <div className="fixed top-4 right-4 z-[100]">
        <ModeToggle />
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <h1 className="text-sm text-muted-foreground uppercase tracking-widest mb-3">
        Blog
      </h1>

      <Separator className="mb-8" />

      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">No posts yet.</p>
      ) : (
        <div className="space-y-0">
          {posts.map((post, i) => {
            const formattedDate = new Date(post.date).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );

            return (
              <div key={post.slug}>
                <div className="py-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-bold text-foreground hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <time className="text-xs text-muted-foreground">
                      {formattedDate}
                    </time>
                    {post.tags.length > 0 && (
                      <div className="flex gap-1">
                        {post.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {post.excerpt}
                  </p>
                </div>
                {i < posts.length - 1 && <Separator />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
