import axios from "axios"
import { router, useEffect, useState } from "../../lib"
import { getCategories } from "./config/categories"
import { editProjects, getProject } from "./config/projects"
const projectEdit = ({ id }) => {
    const [projects, setProjects] = useState({})
    const [categories, setCategories] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:3000/projects/${id}?_embed=categories`)
            .then(({ data }) => setProjects(data))
    }, [])
    useEffect(() => {
        getCategories().then(({ data }) => setCategories(data))
    }, [])
    useEffect(() => {
        const form = document.querySelector(".form-group");
        const formName = document.querySelector("#form-name");
        const formCate = document.querySelector("#my-select");
        const dsc = document.querySelector(".dsc");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const newProject = { id, name: formName.value, categoryId: formCate.value, description: dsc.value }
            editProjects(newProject).then(() => router.navigate("/admin/projectAdmin"))
        })
    })
    return `
    <form class="form-group container">
        <label for="form-name"><h1>ADD PROJECT</h1></label>
        <div style="color:#fff;">Name:</div>   
        <input type="text" class="form-control" id="form-name" value="${projects.name}"> 
        <div style="color:#fff;">The loai:</div>   
        <select id="my-select" class="form-control" name="" value="${projects.categoryId}">
        ${categories.map((item) => `
            <option value="${item.id}" ${item.id == projects.categoryId ? 'selected' : ''}>${item.name}</option>
        `)}
        </select>
        <div style="color:#fff;">mo ta:</div>   
        <textarea name="" id="dsc" cols="30" rows="10" class="dsc">${projects.description}</textarea>      
        <button class="btn btn-success">UPDATE</button>
        </form>
        `
    // ${category.map((item) => `
    //     <option value="${item.id}">${item.name}</option>
    // `)}
}

export default projectEdit
