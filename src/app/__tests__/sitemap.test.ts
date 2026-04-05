import { describe, it, expect } from "vitest";
import sitemap from "../sitemap";
import { getAllPosts } from "@/lib/blog";

describe("sitemap", () => {
  const entries = sitemap();

  it("includes the root URL", () => {
    const root = entries.find((e) => e.url === "https://moyaseen.com");
    expect(root).toBeDefined();
    expect(root!.priority).toBe(1);
  });

  it("includes /blog URL", () => {
    const blog = entries.find((e) => e.url === "https://moyaseen.com/blog");
    expect(blog).toBeDefined();
    expect(blog!.priority).toBe(0.8);
    expect(blog!.changeFrequency).toBe("weekly");
  });

  it("includes an entry for each published blog post", () => {
    const posts = getAllPosts();
    for (const post of posts) {
      const entry = entries.find(
        (e) => e.url === `https://moyaseen.com/blog/${post.slug}`
      );
      expect(entry).toBeDefined();
    }
  });

  it("blog post entries have correct URL format", () => {
    const blogEntries = entries.filter(
      (e) =>
        e.url.startsWith("https://moyaseen.com/blog/") &&
        e.url !== "https://moyaseen.com/blog"
    );
    for (const entry of blogEntries) {
      expect(entry.url).toMatch(
        /^https:\/\/moyaseen\.com\/blog\/[a-z0-9-]+$/
      );
    }
  });

  it("blog post entries have lastModified matching post date", () => {
    const posts = getAllPosts();
    for (const post of posts) {
      const entry = entries.find(
        (e) => e.url === `https://moyaseen.com/blog/${post.slug}`
      );
      expect(entry).toBeDefined();
      expect(entry!.lastModified).toEqual(new Date(post.date));
    }
  });
});
