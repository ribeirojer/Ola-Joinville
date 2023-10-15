import { supabase } from "../../../lib/supabase";
import { Post } from "../../../utils/types"; // Importe a tipagem Post (defina a tipagem de acordo com seus dados)
import { createSlug, extractImageSrcFromHTML } from "../../../utils";

async function createPost(
  title: string,
  content: string,
  summary: string,
  author: string,
  tags: string
): Promise<Post | null> {
  console.log(title, content, summary, author, tags);

  const slug = createSlug(title);
  const cover_image_url = extractImageSrcFromHTML(content);

  try {
    const { data, error } = await supabase
      .from("posts")
      .insert({
        title,
        content,
        summary,
        author,
        tags,
        cover_image_url,
        friendly_url: slug,
      })
      .select("*");

    if (error) {
      console.error("Erro ao criar o post:", error.message);
      return null;
    }

    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Erro ao criar o post:", error);
    return null;
  }
}

async function getAllPosts(): Promise<Post[] | null> {
  try {
    const { data, error } = await supabase.from("posts").select("*");

    if (error) {
      console.error("Erro ao buscar os posts:", error.message);
      return null;
    }

    return data || [];
  } catch (error) {
    console.error("Erro ao buscar os posts:", error);
    return null;
  }
}

async function getPostById(slug: string): Promise<any | null> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("created_at, title, content, author, tags")
      .eq("friendly_url", slug)
      .single();

    if (error) {
      console.error("Erro ao buscar o post por ID:", error.message);
      return null;
    }

    return data || null;
  } catch (error) {
    console.error("Erro ao buscar o post por ID:", error);
    return null;
  }
}

async function updatePost(
  id: number,
  title: string,
  content: string
): Promise<Post | null> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .update({ title, content })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Erro ao atualizar o post:", error.message);
      return null;
    }

    return (data as unknown as Post) || null;
  } catch (error) {
    console.error("Erro ao atualizar o post:", error);
    return null;
  }
}

async function deletePost(id: string): Promise<void> {
  try {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      console.error("Erro ao excluir o post:", error.message);
      throw new Error("Erro ao excluir o post: " + error.message);
    }
  } catch (error) {
    console.error("Erro ao excluir o post:", error);
    throw new Error("Erro ao excluir o post: " + error);
  }
}

export { createPost, getAllPosts, getPostById, updatePost, deletePost };
