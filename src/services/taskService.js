import api from "@/config/api";

export const getAllTasksService = async () => {
  try {
    return await api.get("/todos")
  } catch (e) {
    throw e.response
  }
}

export const createTaskService = async (body) => {
  try {
    return await api.post("/todos", body)
  } catch (e) {
    throw e.response
  }
}

export const updateTaskService = async (id, body) => {
  try {
    return await api.patch(`/todos/${id}`, body)
  } catch (e) {
    throw e.response
  }
}


export const deleteTaskService = async (id) => {
  try {
    return await api.delete(`/todos/${id}`)
  } catch (e) {
    throw e.response
  }
}

