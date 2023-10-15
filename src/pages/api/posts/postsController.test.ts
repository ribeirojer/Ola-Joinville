import { describe, it, expect } from "vitest";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "./postsController";

describe("postsController", () => {
  it("should create a new post", async () => {
    const newPost = await createPost(
      "Title Test Post",
      "Test Content",
      "summary",
      "author",
      "tags"
    );
    expect(newPost).toBeTruthy();
  });

  it("should get all posts", async () => {
    const posts = await getAllPosts();
    expect(posts).toBeTruthy();
    expect(posts?.length).toBeGreaterThan(0);
  });

  it("should get a post by ID", async () => {
    const postId = "18";
    const post = await getPostById(postId);
    expect(post).toBeTruthy();
    expect(post?.id).toBe(postId); // Verifique se o ID do post corresponde ao ID solicitado
  });

  it("should update a post", async () => {
    const postId = 18;
    const updatedTitle = "Updated Title";
    const updatedContent = "Updated Content";
    const updatedPost = await updatePost(postId, updatedTitle, updatedContent);
    expect(updatedPost).toBeTruthy();
    expect(updatedPost?.title).toBe(updatedTitle);
    expect(updatedPost?.content).toBe(updatedContent);
  });

  it("should delete a post", async () => {
    const postIdToDelete = "20";
    await deletePost(postIdToDelete);

    const deletedPost = await getPostById(postIdToDelete);
    expect(deletedPost).toBeNull();
  });
});
