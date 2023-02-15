import { useEffect, useState } from "../../lib"
import axios from "axios";
import { deleteProjects, getProjects } from "./config/projects";
const projectAdmin = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    // axios.get("http://localhost:3000/projects").then(({ data }) => setProjects(data))
    getProjects().then(({ data }) => setProjects(data))
  }, [])
  useEffect(() => {
    const btns = document.querySelectorAll(".btn");
    for (const btn of btns) {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        deleteProjects(id).then(() => { const newProject = projects.filter((project) => project.id != id); setProjects(newProject) })
        // axios.delete(`http://localhost:3000/projects/${id}`).then(() => {
        //   const newProject = projects.filter((project) => project.id != id);
        //   setProjects(newProject);
        // })
        // fetch(`http://localhost:3000/projects/${id}`, { method: "DELETE" })
        //   .then(() => { const newProjects = projects.filter((project) => project.id != id); setProjects(newProjects) })
      })
    }
  })
  return `
    <table class="table table-light container">
      <thead class="thead-light">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th colspan="2" width="75px"><button class="btn btn-success"><a href="/admin/projectAdmin/add">ADD</a></button></th>
        </tr>
      </thead>
      <tbody>
      ${projects.map((project, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${project.name}</td>
            <td width="75px"><button class="btn btn-danger" data-id="${project.id}">remove</button></td>
            <td width="75px"><button class="btn btn-warning"><a href="/admin/projectAdmin/${project.id}/edit">EDIT</a></button></td>
        </tr>
      `)}
      </tbody>
    </table>
  `
}

export default projectAdmin
