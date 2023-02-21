import { useEffect, useState } from "../../lib"
import axios from "axios";
import { deleteProjects, getProjects } from "./config/projects";
import { getCategories } from "./config/categories";
import Category from "../../components/Category";
const projectAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [projectInCategory, setProjectInCategory] = useState([]);
  useEffect(() => {
    // axios.get("http://localhost:3000/projects").then(({ data }) => setProjects(data))
    getProjects().then(({ data }) => setProjects(data))
  }, [])
  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data));
  }, [])
  useEffect(() => {
    const btns = document.querySelectorAll(".btn-danger");
    for (const btn of btns) {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        if (window.confirm("Are you sure ?")) {
          try {
            deleteProjects(id).then(() => { const newProject = projects.filter((project) => project.id != id); setProjects(newProject) })
          } catch (error) {
            console.error(error);
          }
        }
      })
    }
  }, [projects])
  const onHandleClick = async (id) => {
    if (id != 0) {

      const data = await (await fetch(`http://localhost:3000/categories/${id}?_embed=projects`)).json();
      setProjectInCategory(data)
    } else {
      getProjects().then(({ data }) => setProjectInCategory(data))
    }
  }
  return `
  ${Category({ categories, onClick: onHandleClick })}
  <a href="/admin/Categories">Categories</a>
  <a href="/admin/portAdmin">Portfolio</a>
  <a href="/admin/aboutAdmin">About</a>
  <a href="/admin/skill">Skills</a>
  <a href="/admin/contactAdmin">Contact</a>
    <table class="table table-light container" style="box-shadow: 0 0 10px #ccc;border-radius:10px;overflow:hidden">
      <thead class="thead-light">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Image</th>
          <th>category</th>
          <th>Date</th>
          <th>Author</th>
          <th>description</th>
          <th colspan="2" width="75px"><button class="btn btn-success"><a href="/admin/projectAdmin/add">ADD</a></button></th>
        </tr>
      </thead>
      <tbody>
      ${projectInCategory.projects ? `
      ${projectInCategory.projects.map((item, index) => `
      <tr>
            <td>${index + 1}</td>
            <td>${item.name ? item.name : '...'}</td>
            <td><img src="${item.gallery}" height="75px" style="border:1px solid #ccc;" width="75px"></td>
            <td>${categories.map((category) => `
            ${item.categoryId == category.id ? category.name : ''}
            `).join("")}</td>
            <td>${item.date}</td>
            <td>${item.author ? item.author : '...'}</td>
            <td>${item.description}</td>
            <td width="75px"><button class="btn btn-danger" data-id="${item.id}">remove</button></td>
            <td width="75px"><button class="btn btn-warning"><a href="/admin/itemAdmin/${item.id}/edit">EDIT</a></button></td>
        </tr>
      `).join(" ")}
      ` : `
      ${projects.map((project, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${project.name ? project.name : '...'}</td>
            <td><img src="${project.gallery}" height="75px" style="border:1px solid #ccc;" width="75px"></td>
            <td>${categories.map((category) => `
            ${project.categoryId == category.id ? category.name : ''}
            `).join("")}</td>
            <td>${project.date}</td>
            <td>${project.author ? project.author : '...'}</td>
            <td>${project.description}</td>
            <td width="75px"><button class="btn btn-danger" data-id="${project.id}">remove</button></td>
            <td width="75px"><button class="btn btn-warning"><a href="/admin/projectAdmin/${project.id}/edit">EDIT</a></button></td>
        </tr>
      `).join("")
    }
      `}
      </tbody >
    </table >
  `
}

export default projectAdmin
