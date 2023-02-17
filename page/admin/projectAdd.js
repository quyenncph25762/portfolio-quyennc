import axios from "axios";
import { router, useEffect, useState } from "../../lib"
import { getCategories } from "./config/categories";
import { addProjects } from "./config/projects";

const projectAdd = () => {
    const [category, setCategory] = useState([])
    useEffect(() => {
        getCategories().then(({ data }) => setCategory(data))
    }, [])
    useEffect(() => {
        const form = document.querySelector(".form-group");
        const formName = document.querySelector("#form-name");
        const formCate = document.querySelector("#my-select");
        const formDate = document.querySelector(".form-date");
        const dsc = document.querySelector(".dsc");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const newProject = {
                name: formName.value,
                categoryId: formCate.value,
                date: formDate.value,
                description: dsc.value,
            }
            addProjects(newProject).then(() => router.navigate("/admin/projectAdmin"))
        })
    })
    return `
    <form class="form-group container">
        <label for="form-name"><h1>ADD PROJECT</h1></label>
        <div style="color:#fff;">Name:</div>   
        <input type="text" class="form-control" id="form-name">
        <div style="color:#fff;">The loai:</div>   
        <div class="btn-group-toggle" data-toggle="buttons">
        <select id="my-select" class="form-control" name="">
            ${category.map((item) => `
                <option value="${item.id}">${item.name}</option>
            `).join("")}
        </select>
        </div>
        <div style="color:#fff;">Ngay tao:</div>   
        <input type="date" class="form-date">
        <div style="color:#fff;">mo ta:</div>   
        <textarea name="" id="dsc" cols="30" rows="10" class="dsc"></textarea>      
        <button class="btn btn-success">ADD</button>
        </form>
        `
}

export default projectAdd
