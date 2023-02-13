import { router, useEffect, useState } from "../../lib"

const projectEdit = ({ id }) => {
    const [projects, setProjects] = useState({})
    useEffect(() => {
        fetch(`http://localhost:3000/projects/${id}`)
            .then((response) => response.json())
            .then((data) => setProjects(data))
    }, [])
    useEffect(() => {
        const form = document.querySelector(".form-group");
        const formName = document.querySelector("#form-name");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const newProject = { name: formName.value }
            fetch(`http://localhost:3000/projects/${id}`, { method: "PUT", headers: { "Content-Type": "Application/json" }, body: JSON.stringify(newProject) }).then(() => router.navigate("/admin/projectAdmin"))
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
