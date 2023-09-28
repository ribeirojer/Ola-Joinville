import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import Task from "../components/Task";

type Props = {
  tasks?: any;
};

function CRUD({ tasks }: Props) {
  const [taskList, setTaskList] = useState(tasks);

  const handleAddTask = (task: any) => {
    setTaskList([...taskList, task]);
  };

  const handleDeleteTask = async (taskId: number) => {
    const response = await fetch(`/api/tasks?id=${taskId}`, {
      method: "DELETE",
    });

    if (response.status === 204) {
      const updatedTasks = taskList.filter((task: any) => task.id !== taskId);
      setTaskList(updatedTasks);
    } else {
      console.error("Erro ao excluir tarefa.");
    }
  };

  return (
    <div>
      <h1>CRUD de Tarefas</h1>
      <TaskForm onAdd={handleAddTask} />
      <div>
        {taskList.map((task: any) => (
          <Task key={task.id} task={task} onDelete={handleDeleteTask} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch("/api/tasks");

    if (response.status === 200) {
      const tasks = await response.json();
      return { props: { tasks } };
    }
  } catch {
    console.error("Erro ao buscar tarefas.");
    return { props: { tasks: [] } };
  }
}

export default CRUD;
