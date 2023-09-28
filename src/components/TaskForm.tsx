import React, { useState } from "react";

type Props = {
  onAdd?: any;
};

function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (title.trim() === "") return;

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (response.status === 201) {
      const task = await response.json();
      onAdd(task);
      setTitle("");
    } else {
      console.error("Erro ao adicionar tarefa.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nova tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default TaskForm;
