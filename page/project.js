import header from "../components/header"
import projectList from "../components/projectList"
import { useEffect, useState } from "../lib"
import { getCategories } from "./admin/config/categories";
import { getProjects } from "./admin/config/projects";
import Category from "./category";

const project = () => {
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectInCategory, setProjectInCategory] = useState([]);
  const [id, setId] = useState(null);
  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data))
  }, [])
  useEffect(() => {
    getProjects().then(({ data }) => setProjects(data));
  }, [])
  useEffect(() => {

  }, [id])
  const onHandleClick = async (id) => {
    if (id != 0) {

      const data = await (await fetch(`http://localhost:3000/categories/${id}?_embed=projects`)).json();
      setProjectInCategory(data)
    } else {
      getProjects().then(({ data }) => { setProjectInCategory(data) })
    }
  }
  return `
    <div id="project">
    <div class="circle-s-project"></div>
    <div class="container">
      <h1 class="project_title">My projects</h1>
      ${Category({ categories, onClick: onHandleClick })}
      <div class="carts">
      ${projectInCategory.projects ? `
      ${projectInCategory.projects.map((project) => `
      <div class="cart">
        <div class="cart_img">
          <img src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2018/09/how-to-design-a-website-21-1024x500.png" alt="" class="cart_photo">
        </div>
        <div class="cart_nav">
          <h1 class="cart_nav-title">${project.name}<span>${project.date}</span></h1>
          <div class="cart_nav-languagues">
          ${categories.map((category) => `
            ${project.categoryId == category.id ? `<span>${category.name}</span>` : ''}
          `).join("")}
          </div>
          <div class="cart_nav-dsc">${project.description}</div>
          <div class="cart_nav-button">
            <button class="cart_btn"><a class="cart_nav-btn">Visit source</a></button>
            <button class="cart_btn"><a class="cart_nav-btn">Visit website</a></button>
          </div>
        </div>
      </div>
      `).join("")}
      `
      // Thì
      : `
      ${projects.map((project) => `
      <div class="cart">
        <div class="cart_img">
          <img src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2018/09/how-to-design-a-website-21-1024x500.png" alt="" class="cart_photo">
        </div>
        <div class="cart_nav">
          <h1 class="cart_nav-title">${project.name}<span>${project.date}</span></h1>
          <div class="cart_nav-languagues">
          ${categories.map((category) => `
            ${project.categoryId == category.id ? `<span>${category.name}</span>` : ''}
          `).join("")}
          </div>
          <div class="cart_nav-dsc">${project.description}</div>
          <div class="cart_nav-button">
            <button class="cart_btn"><a class="cart_nav-btn">Visit source</a></button>
            <button class="cart_btn"><a class="cart_nav-btn">Visit website</a></button>
          </div>
        </div>
      </div>
      `).join("")}
      `}
      </div>
    </div>
  </div>
    `
}

export default project
