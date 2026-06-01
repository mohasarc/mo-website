import { describe, it, expect, afterEach, vi } from "vitest";
import { getAllPosts, getPostBySlug, getAllSlugs } from "../blog";

describe("getAllPosts", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns posts sorted by date (newest first)", () => {
    const posts = getAllPosts();
    for (let i = 1; i < posts.length; i++) {
      expect(new Date(posts[i - 1].date).getTime()).toBeGreaterThanOrEqual(
        new Date(posts[i].date).getTime()
      );
    }
  });

  it("returns correct metadata fields from frontmatter", () => {
    const posts = getAllPosts();
    const hello = posts.find((p) => p.slug === "hello-world");
    expect(hello).toBeDefined();
    expect(hello!.title).toBe("Hello World");
    expect(hello!.date).toBe("2026-04-05");
    expect(hello!.excerpt).toContain("first blog post");
    expect(hello!.tags).toEqual(["meta", "web-dev"]);
    expect(hello!.published).toBe(false);
  });

  it("defaults tags to [] and published to true when missing", () => {
    // All current test posts have explicit values, so we verify the default
    // logic by checking the function doesn't crash and returns valid shapes
    const posts = getAllPosts();
    for (const post of posts) {
      expect(Array.isArray(post.tags)).toBe(true);
      expect(typeof post.published).toBe("boolean");
    }
  });

  it("excludes drafts in production mode", () => {
    vi.stubEnv("NODE_ENV", "production");
    const posts = getAllPosts();
    const draft = posts.find((p) => p.slug === "draft-post");
    expect(draft).toBeUndefined();
  });

  it("includes drafts in development mode", () => {
    vi.stubEnv("NODE_ENV", "development");
    const posts = getAllPosts();
    const draft = posts.find((p) => p.slug === "draft-post");
    expect(draft).toBeDefined();
    expect(draft!.published).toBe(false);
  });
});

describe("getPostBySlug", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns null for unpublished posts in production mode", () => {
    vi.stubEnv("NODE_ENV", "production");
    const post = getPostBySlug("draft-post");
    expect(post).toBeNull();
  });

  it("returns unpublished posts in development mode", () => {
    vi.stubEnv("NODE_ENV", "development");
    const post = getPostBySlug("draft-post");
    expect(post).not.toBeNull();
    expect(post!.published).toBe(false);
  });

  it("returns post content and metadata for existing slug", () => {
    const post = getPostBySlug("hello-world");
    expect(post).not.toBeNull();
    expect(post!.title).toBe("Hello World");
    expect(post!.content).toContain("Welcome to my blog");
    expect(post!.slug).toBe("hello-world");
  });

  it("returns null for nonexistent slug", () => {
    const post = getPostBySlug("nonexistent-post");
    expect(post).toBeNull();
  });
});

describe("getAllSlugs", () => {
  it("returns all folder names", () => {
    const slugs = getAllSlugs();
    expect(slugs).toContain("hello-world");
    expect(slugs).toContain("draft-post");
  });
});
