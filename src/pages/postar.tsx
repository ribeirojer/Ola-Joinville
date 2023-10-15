import React, { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios"; // Certifique-se de ter axios instalado
import { UserContext } from "./_app";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import { Editor } from "@tinymce/tinymce-react";
declare var tinymce: any;

interface SeuTipoDeObjeto {
  // outras propriedades
  getContent: () => string; // ou o tipo de retorno adequado
}

const NewPostPage = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    summary: "",
    author: "",
    category: "",
    tags: "",
  });
  const [newPostErrors, setNewPostErrors] = useState({
    title: false,
    content: false,
    tags: false,
  });
  const titleRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef(null);
  const tagsRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        router.push("/");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  /*useEffect(() => {
    if (user === undefined || user === null || user.length === 0) {
      router.push("/entrar");
    }
  }, []);*/

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const { title, summary } = newPost;
    const content = editorRef.current as unknown as SeuTipoDeObjeto;

    setNewPostErrors({
      title: false,
      content: false,
      tags: false,
    });

    if (!title) {
      setNewPostErrors((prev) => ({
        ...prev,
        title: true,
      }));
      if (titleRef.current) {
        titleRef.current.focus();
      }
      return;
    }

    if (!content.getContent()) {
      setNewPostErrors((prev) => ({
        ...prev,
        content: true,
      }));
      return;
    }

    setIsLoading(true);

    const tagsToSend = newPost.tags.split(",").map((tag) => tag.trim());
    const data = {
      title,
      //content: editorRef.current?.contentDocument.activeElement.innerHTML,
      content: content.getContent(),
      summary,
      author: user?.name,
      tags: tagsToSend,
    };

    try {
      const response = await axios.post("/api/posts/create", data);

      if (response.status === 201) {
        setIsSuccess(true);
      } else {
        console.error("Falha ao criar o post");
      }
    } catch (error) {
      console.error("Erro ao criar o post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header></Header>
      <main className="container mx-auto p-4">
        <h1 className="text-center text-2xl font-bold mb-4">Criar Novo Post</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            id="title"
            label="Título"
            type="text"
            placeholder="Digite o título da notícia"
            value={newPost.title}
            onChange={(e) =>
              setNewPost((prev) => ({ ...newPost, title: e.target.value }))
            }
            error={newPostErrors.title}
            inputRef={titleRef}
          />
          <Editor
            tinymceScriptSrc={"/tinymce/tinymce.min.js"}
            onInit={(evt, editor) => (editorRef.current = editor as any)}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "preview",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "link image | code" +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
              image_title: true,
              automatic_uploads: true,
              file_picker_types: "image",
              file_picker_callback: (cb, value, meta) => {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");

                input.addEventListener("change", (e: any) => {
                  const file = e.target?.files[0];

                  const reader = new FileReader();
                  reader.addEventListener("load", () => {
                    const id = "blobid" + new Date().getTime();
                    const { activeEditor } = tinymce;
                    const { editorUpload } = activeEditor;
                    const { blobCache } = editorUpload;
                    const base64 = reader.result as string;
                    const blobInfo = blobCache?.create(
                      id,
                      file,
                      base64.split(",")[1]
                    ) as any;
                    blobCache?.add(blobInfo);

                    /* call the callback and populate the Title field with the file name */
                    cb(blobInfo.blobUri(), { title: file.name });
                  });
                  reader.readAsDataURL(file);
                });

                input.click();
              },
            }}
          />
          <Input
            type="text"
            id="tags"
            placeholder="Tags"
            label="Tags (separadas por vírgula)"
            name="tags"
            value={newPost.tags}
            onChange={(e) =>
              setNewPost((prev) => ({ ...newPost, tags: e.target.value }))
            }
            inputRef={tagsRef}
          />
          <Button type="submit">Criar Post</Button>
        </form>
      </main>
      {isLoading && <Loading></Loading>}
      {isSuccess && (
        <Alert type="success" message="Notícia criada com sucesso!" />
      )}
      <Footer></Footer>
    </>
  );
};

export default NewPostPage;
