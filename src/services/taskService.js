import axios from "axios";

export const getAllTasksService = async () => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todos`)
    return data
  } catch (e) {
    throw e.response
  }
}

export const createTaskService = async (body) => {
  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todos`, body)
    return data
  } catch (e) {
    throw e.response
  }
}

export const updateTaskService = async (id, body) => {
  try {
    const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todos/${id}`, body)
    return data
  } catch (e) {
    throw e.response
  }
}


export const deleteTaskService = async (id) => {
  try {
    const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todos/${id}`)
    return data
  } catch (e) {
    throw e.response
  }
}

