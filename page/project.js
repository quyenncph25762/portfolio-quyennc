import header from "../components/header"
import { useEffect, useState } from "../lib"
import { getCategories } from "./admin/config/categories";
import { getProjects } from "./admin/config/projects";
import Category from "../components/Category";
import ProjectContent from "../components/ProjectContent";

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
      getProjects().then(({ data }) => setProjectInCategory(data))
    }
  }
  return `
    <div id="project">
    <div class="circle-s-project"></div>
    <div class="container">
      <h1 class="project_title">My projects</h1>
      ${Category({ categories, onClick: onHandleClick })}
      <div class="carts">
      ${ProjectContent({ categories, projects, projectInCategory })}
      </div>
    </div>
  </div>
    `
}

export default project
