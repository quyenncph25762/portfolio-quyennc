import { router, useEffect } from "../../lib"
import { addCategory } from "./config/categories";

const CategoriesAdd = () => {
    useEffect(() => {
        const form = document.querySelector(".form-group");
        const formName = document.querySelector("#form-name");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            try {
                const newCategory = {
                    name: formName.value,
                }
                await addCategory(newCategory);
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
        <input type="text" class="form-control" id="form-name">    
        <button class="btn btn-success">ADD</button>
    </form>
  `
}

export default CategoriesAdd
