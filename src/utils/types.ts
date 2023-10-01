// Tipo para um Post de Notícia
export type Post = {
  id: number;
  title: string;
  content: string;
  summary: string;
  publicationDate: Date;
  author: string;
  category: string;
  tags: string[];
  coverImageURL: string;
  friendlyURL: string;
};

// Tipo para um Comentário
export type Comment = {
  id: number;
  authorName: string;
  authorEmail: string;
  content: string;
  commentDate: Date;
  postId: number;
};

// Tipo para um Usuário
export type User = {
  id: number;
  username: string;
  email: string;
  passwordHash: string; // Armazene a senha criptografada
  profileInfo: {
    avatarURL: string;
    bio: string;
  };
};

// Tipo para uma Categoria
export type Category = {
  id: number;
  categoryName: string;
};

// Tipo para uma Tag
export type Tag = {
  id: number;
  tagName: string;
};

// Tipo para Estatísticas
export type NewsStatistics = {
  postId: number;
  views: number;
  likes: number;
  shares: number;
  commentsCount: number;
};
