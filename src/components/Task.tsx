import React from "react";

type Props = {
  task?: any;
  onDelete?: any;
};

function Task({ task, onDelete }: Props) {
  return (
    <div>
      <span>{task.title}</span>
      <button onClick={() => onDelete(task.id)}>Excluir</button>
    </div>
  );
}

export default Task;
