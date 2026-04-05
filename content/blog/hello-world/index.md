---
title: "Hello World"
date: "2026-04-05"
excerpt: "My first blog post — testing code, diagrams, and everything in between."
tags: ["meta", "web-dev"]
published: true
---

Welcome to my blog! Here's what this system supports.

## Code Highlighting

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

```python
def fibonacci(n: int) -> list[int]:
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result
```

## Mermaid Diagrams

```mermaid
graph LR
    A[Write .md] --> B[Drop in content/blog/]
    B --> C[Auto-rendered page]
```

## Images

![Alt text](/blog/hello-world/my-image.webp)

## Videos

<video src="/blog/hello-world/demo.mp4" autoPlay muted loop playsInline />

## Tables

| Feature | Supported |
|---------|-----------|
| Code    | Yes       |
| Mermaid | Yes       |
| Tables  | Yes       |
| Images  | Yes       |
| Videos  | Yes       |

## Blockquotes

> This is a blockquote. It can span multiple lines and supports **bold** and *italic* text.

## Task Lists

- [x] Set up blog infrastructure
- [x] Write first post
- [ ] Add more content
