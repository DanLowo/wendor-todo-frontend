const get = async (url) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, { cache: "no-store" })
  return await response.json()
}

const post = async (url, body) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  });
  return await response.json();
}

const patch = async (url, body) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  });
  return await response.json();
}

const deleteMethod = async (url) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });
  return await response.json();
}

const api = { get, post, patch, delete: deleteMethod }
export default api