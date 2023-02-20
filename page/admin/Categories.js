import { useEffect, useState } from "../../lib"
import { deleteCategory, getCategories } from "./config/categories"
const Categories = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data));
  }, [])
  useEffect(() => {
    const btns = document.querySelectorAll('.btn-danger');
    for (const btn of btns) {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        try {
          deleteCategory(id)
            .then(() => {
              const newCategories = categories.filter((newCategory) => newCategory.id === id)
              setCategories(newCategories);
            })
        } catch (error) {
          console.error(error);
        }
      })
    }
  })
  return `
  <table class="table table-light container" style="box-shadow: 0 0 10px #ccc;border-radius:10px;overflow:hidden">
      <thead class="thead-light">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th colspan="2" width="75px"><button class="btn btn-success"><a href="/admin/Categories/add">ADD</a></button></th>
        </tr>
      </thead>
      <tbody>
      ${categories.map((cate, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${cate.name}</td>
            <td width="75px"><button class="btn btn-danger" data-id="${cate.id}">remove</button></td>
            <td width="75px"><button class="btn btn-warning"><a href="/admin/Categories/${cate.id}/edit">EDIT</a></button></td>
        </tr>
      `).join("")}
      </tbody>
    </table>
  `
}

export default Categories
