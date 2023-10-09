import React, { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios"; // Certifique-se de ter axios instalado
import { UserContext } from "./_app";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import Loading from "@/components/Loading";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Button from "@/components/Button";
import UploadImage from "@/components/UploadImage";
import { Editor } from '@tinymce/tinymce-react';

const NewPostPage = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    summary: "",
    author: "",
    category: "",
    tags: [],
  });
  const [newPostErrors, setNewPostErrors] = useState({
    title: false,
    content: false,
    summary: false,
    author: false,
    category: false,
    tags: false,
  });
  const titleRef = useRef<HTMLInputElement | null>(null);
  const summaryRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const authorRef = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLInputElement | null>(null);
  const tagsRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  /*useEffect(() => {
    if (user === undefined || user === null || user.length === 0) {
      router.push("/entrar");
    }
  }, []);*/

  // Função para lidar com a submissão do novo post
  const handleSubmit = async (e) => {
    e.preventDefault();

    setNewPostErrors((prev) => ({
      title: false,
    content: false,
    summary: false,
    author: false,
    category: false,
    tags: false,
  }));

    if (
      newPost.title === "" ||
      newPost.title === undefined ||
      newPost.title === null
    ) {
      setNewPostErrors((prev) => ({
        ...prev,
        title: true,
      }));
	  console.log(titleRef.current)
      titleRef.current?.focus();
      return;
    }
	
    try {
      // Envie os dados para o servidor usando uma chamada de API (substitua a URL pela sua própria)
      const response = await axios.post("/api/posts/create", newPost);

      // Verifique se a criação do post foi bem-sucedida
      if (response.status === 201) {
        // Redirecione para a página do post recém-criado
        router.push(`/noticias/${response.data.id}`);
      } else {
        console.error("Falha ao criar o post");
      }
    } catch (error) {
      console.error("Erro ao criar o post:", error);
    }
  };

  return (
    <>
      <Header></Header>
    <main className="container mx-auto p-4">
	<h1 className="text-center text-2xl font-bold mb-4">Criar Novo Post</h1>
	{/*<form onSubmit={handleSubmit}>
	  <UploadImage />
        <Input
              id="title"
              label="Título"
              type="text"
              placeholder="Digite o título da notícia"
              value={newPost.title}
              onChange={e=>setNewPost(prev=>({ ...newPost, title: e.target.value}))}
              error={newPostErrors.title}
              inputRef={titleRef}
            />
			<TextArea
            id="content"
            name="content"
			label="Conteúdo"
            placeholder="Digite o conteúdo da notícia"
            value={newPost.content}
              onChange={e=>setNewPost(prev=>({ ...newPost, content: e.target.value}))}
            error={newPostErrors.content}
            inputRef={contentRef}
          />
          <Input
            type="text"
            id="summary"
            placeholder="Digite o conteúdo da notícia"
			label="Resumo"
            name="summary"
            value={newPost.summary}
              onChange={e=>setNewPost(prev=>({ ...newPost, summary: e.target.value}))}
            inputRef={summaryRef}
          />
		  <Input
            type="text"
            id="author"
            placeholder="Digite o seu nome"
			label="Autor"
            name="author"
            value={newPost.author}
              onChange={e=>setNewPost(prev=>({ ...newPost, author: e.target.value}))}
            inputRef={authorRef}
          />
		  <Input
            type="text"
            id="category"
            placeholder="Categoria da notícia"
			label="Categoria"
            name="category"
            value={newPost.category}
              onChange={e=>setNewPost(prev=>({ ...newPost, category: e.target.value}))}
            inputRef={categoryRef}
          />
		  <Input
            type="text"
            id="tags"
            placeholder="Tags"
			label="Tags (separadas por vírgula)"
            name="tags"
            value={newPost.tags}
              onChange={e=>setNewPost(prev=>({ ...newPost, tags: e.target.value}))}
            inputRef={tagsRef}
          />
        <Button type="submit">Criar Post</Button>
      </form>
	  */}
    
      <Editor
        tinymceScriptSrc={'/tinymce/tinymce.min.js'}
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue='<p>This is the initial content of the editor.</p>'
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'link image | code' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
  image_title: true,
  automatic_uploads: true,
  file_picker_types: 'image',
  file_picker_callback: (cb, value, meta) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.addEventListener('change', (e) => {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        /*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
        const id = 'blobid' + (new Date()).getTime();
        const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
        const base64 = reader.result.split(',')[1];
        const blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        /* call the callback and populate the Title field with the file name */
        cb(blobInfo.blobUri(), { title: file.name });
      });
      reader.readAsDataURL(file);
    });

    input.click();
  },
      
        }}
	  />
      <Button onClick={log}>Log editor content</Button>
	</main>
      {isLoading && <Loading></Loading>}
      <Footer></Footer>
    </>
  );
};

export default NewPostPage;
