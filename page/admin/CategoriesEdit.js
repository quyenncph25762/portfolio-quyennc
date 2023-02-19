import { router, useEffect, useState } from "../../lib"
import { addCategory, getCategory, setCategory } from "./config/categories";
import { editProjects } from "./config/projects";

const CategoriesEdit = ({ id }) => {
    const [categoies, setCategories] = useState({});
    useEffect(() => {
        getCategory(id).then(({ data }) => setCategories(data));
    }, [])
    useEffect(() => {
        const form = document.querySelector(".form-group");
        const formName = document.querySelector("#form-name");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            try {
                const newCategory = {
                    id,
                    name: formName.value,
                }
                await setCategory(newCategory);
                router.navigate("/admin/Categories");
            } catch (error) {
                console.error(error);
            }
        })
    })
    return `
  <form class="form-group container">
        <label for="form-name"><h1>ADD CATEGORIES</h1></label>
        <div style="color:#fff;">Name:</div>   
        <input type="text" class="form-control" id="form-name" value="${categoies.name}">    
        <button class="btn btn-warning">UPDATE</button>
    </form>
  `
}

export default CategoriesEdit
