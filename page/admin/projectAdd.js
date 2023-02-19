import axios from "axios";
import { router, useEffect, useState } from "../../lib"
import { getCategories } from "./config/categories";
import { addProjects } from "./config/projects";

const projectAdd = () => {
    const [category, setCategory] = useState([])
    useEffect(() => {
        getCategories().then(({ data }) => setCategory(data));
    }, [])
    useEffect(() => {
        const form = document.querySelector(".form-group");
        const formName = document.querySelector("#form-name");
        const formUrl = document.querySelector("#form-url");
        const formImg = document.querySelector(".form-img");
        const formImgs = document.querySelector(".form-imgs");
        const formCate = document.querySelector("#my-select");
        const formDate = document.querySelector(".form-date");
        const dsc = document.querySelector(".dsc");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            try {
                const urls = await uploadFiles(formImg.files)
                const urls_Gallery = await uploadFiles(formImgs.files)
                const newProject = {
                    name: formName.value,
                    url: formUrl.value,
                    gallery: urls,
                    galleryProjects: urls_Gallery,
                    categoryId: parseInt(formCate.value),
                    date: formDate.value,
                    description: dsc.value,
                }
                addProjects(newProject).then(() => {
                    router.navigate("/admin/projectAdmin")
                })
            } catch (error) {
                console.error(error);
            }
        })
    })
    const uploadFiles = async (files) => {
        if (files) {
            const cloud_Name = "doorujhxj";
            const preset_Name = "Project_Gallery";
            const folder_Name = "ASS_ECMA";
            const urls = [];
            const api = ` https://api.cloudinary.com/v1_1/${cloud_Name}/image/upload`;

            const formData = new FormData(); //key: value
            formData.append("upload_preset", preset_Name);
            formData.append("folder", folder_Name);

            for (const file of files) {
                formData.append("file", file);

                const response = await axios.post(api, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                urls.push(response.data.secure_url);
            }
            return urls;
        }
    }
    return `
    <form class="form-group container">
        <label for="form-name"><h1>ADD PROJECT</h1></label>
        <div style="color:#fff;">Name:</div>   
        <input type="text" class="form-control" id="form-name">
        <div style="color:#fff;">Url:</div>   
        <input type="url" class="form-control" id="form-url" placeholder="https://example.com"
        pattern="https://.*" size="30"
        required>
        <div style="color:#fff;">Image:</div>   
        <input type="file" class="form-img">
        <div style="color:#fff;">Gallery project:</div>   
        <input type="file" class="form-imgs" multiple>
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
