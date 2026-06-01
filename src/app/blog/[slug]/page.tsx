import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import remarkGfm from "remark-gfm";
import rehypeShiki from "@shikijs/rehype";
import rehypeMermaid from "@/lib/rehype-mermaid";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen font-sans bg-background text-foreground max-w-3xl mx-auto px-6 pt-10 pb-20">
      <div className="fixed top-4 right-4 z-[100]">
        <ModeToggle />
      </div>

      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to blog
      </Link>

      <header className="mb-6">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={post.date}>{formattedDate}</time>
          {post.tags.length > 0 && (
            <div className="flex gap-1.5">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </header>

      <Separator className="mb-8" />

      <article>
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeMermaid,
                [
                  rehypeShiki,
                  {
                    themes: { light: "github-light", dark: "github-dark" },
                    defaultColor: false,
                  },
                ],
              ],
            },
          }}
        />
      </article>

      <Separator className="mt-12 mb-8" />

      <footer className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full overflow-hidden border border-border shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/personal/moyaseen-profile-1.webp"
            alt="Mohammed Yaseen"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            Mohammed Yaseen
          </p>
          <p className="text-xs text-muted-foreground">
            Full-stack software engineer. Writing about software, AI, design,
            and things I find interesting.
          </p>
        </div>
      </footer>
    </div>
  );
}
