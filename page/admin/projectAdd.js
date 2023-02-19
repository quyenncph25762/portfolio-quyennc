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
        const formUrlSource = document.querySelector("#form-url-source");
        const formUrlWebsite = document.querySelector("#form-url-website");
        const formImg = document.querySelector(".form-img");
        const formImgs = document.querySelector(".form-imgs");
        const formCate = document.querySelector("#my-select");
        const formDate = document.querySelector(".form-date");
        const formAuthor = document.getElementById("form-author");
        const dsc = document.querySelector(".dsc");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            try {
                const urls = await uploadFiles(formImg.files)
                const urls_Gallery = await uploadFiles(formImgs.files)

                const newProject = {
                    name: formName.value,
                    url: formUrlSource.value,
                    urlWeb: formUrlWebsite.value,
                    gallery: urls,
                    galleryProjects: urls_Gallery,
                    categoryId: parseInt(formCate.value),
                    date: formDate.value,
                    author: formAuthor.value,
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
    <form class="form-group container" id="project-form">
    <div class="row">
    <label for="form-name"><h1 style="color:var(--color-main);text-align:center;width="100%";display:"block"">ADD PROJECT</h1></label>
    <div class="projectadd_left col-lg-6">
    <div style="color:#fff;">Name:</div>   
    <input type="text" class="form-control" id="form-name" required minlength="5" maxlength="100">
    <div style="color:#fff;">Url Source:</div>   
    <input type="url" class="form-control" id="form-url-source" placeholder="https://example.com"
    pattern="https://.*" size="30">
    <div style="color:#fff;">Url Website:</div>   
    <input type="url" class="form-control" id="form-url-website" placeholder="https://example.com"
    pattern="https://.*" size="30">
    <div style="color:#fff;">Image:</div>   
    <input type="file" class="form-img" required>
    <div style="color:#fff;">Gallery project:</div>   
    <input type="file" class="form-imgs" multiple required>
</div>
<div class="projectadd_right col-lg-6">
    <div style="color:#fff;">The loai:</div>   
    <div class="btn-group-toggle" data-toggle="buttons">
        <select id="my-select" class="form-control" name="" required>
            ${category.map((item) => `
                <option value="${Number(item.id)}">${item.name}</option>
            `).join("")}
        </select>
    </div>
    <div style="color:#fff;">Ngay tao:</div>   
    <input type="date" class="form-date" required>
    <div style="color:#fff;">Tác giả:</div>   
    <input type="text" id="form-author" class="form-control" required>
</div>
    </div>
    <div style="color:#fff;">mo ta:</div>   
    <textarea name="" id="dsc" cols="30" rows="10" class="dsc" required></textarea>      
    <button type="submit" class="btn btn-success" style="display:block">ADD</button>
</form>

        `
}

export default projectAdd
