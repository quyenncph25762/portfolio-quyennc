import axios from "axios"
import { router, useEffect, useState } from "../../lib"
import { editProjects, getProject } from "./config/projects"
const projectEdit = ({ id }) => {
    const [projects, setProjects] = useState({})
    useEffect(() => {
        // fetch(`http://localhost:3000/projects/${id}`)
        //     .then((response) => response.json())
        //     .then((data) => setProjects(data))
        // axios.get(`http://localhost:3000/projects/${id}`).then(({ data }) => setProjects(data))
        getProject(id).then(({ data }) => setProjects(data))
    }, [])
    useEffect(() => {
        const form = document.querySelector(".form-group");
        const formName = document.querySelector("#form-name");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const newProject = { id, name: formName.value }
            editProjects(newProject).then(() => router.navigate("/admin/projectAdmin"))
            // axios.put(`http://localhost:3000/projects/${id}`, newProject).then(() => router.navigate("/admin/projectAdmin"))
            // fetch(`http://localhost:3000/projects/${id}`, { method: "PUT", headers: { "Content-Type": "Application/json" }, body: JSON.stringify(newProject) }).then(() => router.navigate("/admin/projectAdmin"))
        })
    })
    return `
    <form class="form-group container">
        <label for="form-name"><h1>ADD PROJECT</h1></label>
        <input type="text" class="form-control" id="form-name" value="${projects.name}">
        <button class="btn btn-success">ADD</button>
    </form>
    `
}

export default projectEdit
