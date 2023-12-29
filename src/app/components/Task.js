"use client"

import taskStyles from "@/styles/task.module.scss"
import {dateFormatterFn} from "@/utils/dataFormatter";

export default function Task({ onDelete, onEdit, task }){
  return (
    <div className={taskStyles.task_card}>
      <div>
        <h3>{task.title}</h3>
        <div>
          <i className="fa-solid fa-pencil" onClick={() => onEdit(task)} />
          <i className="fa-solid fa-trash" onClick={() => onDelete(task.id)} />
        </div>
      </div>
      <p>{dateFormatterFn(task.createdAt)}</p>
    </div>
  )
}