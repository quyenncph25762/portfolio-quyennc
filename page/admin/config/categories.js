import instance from "./config";

const getCategories = () => {
    return instance.get("/categories")
}
const getCategory = (id) => {
    return instance.get(`/categories/${id}`)
}
const addCategory = (category) => {
    return instance.post(`/categories`, category)
}
const setCategory = (project) => {
    return instance.put(`/categories/${project.id}`, project)
}
const deleteCategory = (id) => {
    return instance.delete(`/categories/${id}`)
}

export { getCategories, getCategory, addCategory, setCategory, deleteCategory }