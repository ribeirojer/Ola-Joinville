import { supabase } from "../../lib/supabase";

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    // Buscar todas as tarefas
    const { data, error } = await supabase.from("tasks").select("*");

    if (error) {
      return res.status(500).json({ error: "Erro ao buscar tarefas." });
    }

    return res.status(200).json(data);
  } else if (req.method === "POST") {
    // Adicionar uma nova tarefa
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res
        .status(400)
        .json({ error: "O título da tarefa é obrigatório." });
    }

    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title }])
      .single();

    if (error) {
      return res.status(500).json({ error: "Erro ao adicionar a tarefa." });
    }

    return res.status(201).json(data);
  } else if (req.method === "DELETE") {
    // Excluir uma tarefa
    const { id } = req.query;

    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      return res.status(500).json({ error: "Erro ao excluir a tarefa." });
    }

    return res.status(204).end();
  } else {
    return res.status(405).json({ error: "Método não permitido." });
  }
}
