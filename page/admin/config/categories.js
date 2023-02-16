import instance from "./config";

const getCategories = () => {
    return instance.get("/categories")
}
const getCategory = (id) => {
    return instance.get(`/categories/${id}`)
}

export { getCategories, getCategory }