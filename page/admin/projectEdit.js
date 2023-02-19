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
        const formUrlSource = document.querySelector("#form-url-source");
        const formUrlWebsite = document.querySelector("#form-url-website");
        // console.log(formUrl);
        const formImg = document.querySelector(".form-img");
        const formImgs = document.querySelector(".form-imgs");
        // console.log(formImgs);
        const formCate = document.querySelector("#my-select");
        const formDate = document.querySelector(".form-date");
        const formAuthor = document.getElementById("form-author");
        const dsc = document.querySelector(".dsc");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            // 

            try {
                // for (const file of urls) {
                //     formData.append("file", file);
                // }
                const urls = await uploadFiles(formImg.files)
                const urls_Projects = await uploadFiles(formImgs.files)
                // console.log(urls_Projects);
                const newProject = {
                    id,
                    name: formName.value,
                    url: formUrlSource.value,
                    urlWeb: formUrlWebsite.value,
                    galleryProjects: urls_Projects.length > 0 ? urls_Projects : projects.galleryProjects,
                    gallery: urls.length > 0 ? urls : projects.gallery,
                    categoryId: parseInt(formCate.value),
                    date: formDate.value,
                    author: formAuthor.value,
                    description: dsc.value
                }
                await editProjects(newProject);
                router.navigate("/admin/projectAdmin")
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
        <label for="form-name"><h1 style="color:var(--color-main);text-align:center;width="100%"">EDIT PROJECT</h1></label>
        <div class="row">
        <div class="col-lg-6">
            <div style="color:#fff;">Name:</div>   
            <input type="text" class="form-control" id="form-name" value="${projects.name ? projects.name : ''}"> 
            <div style="color:#fff;">Url Source:</div>   
            <input type="url" class="form-control" id="form-url-source" value="${projects.url ? projects.url : ''}"> 
            <div style="color:#fff;">Url Website:</div>   
            <input type="url" class="form-control" id="form-url-website" value="${projects.urlWeb ? projects.urlWeb : ''}"> 
            <div style="color:#fff;">Image:</div>   
            <input type="file" class="form-img"/>
            <img src="${projects.gallery && `${projects.gallery}`}" alt="preview"  width="150px" height="150px"/>
            <div style="color:#fff;">Gallery project:</div>   
            <input type="file" class="form-imgs" multiple>
            <div class="gallery" style="display:flex">
            ${projects.galleryProjects && projects.galleryProjects.map((item) =>
        `<img src="${item ? item : ''}" height="75px" width="75px"></img>`
    )}
            </div>
        </div>
        <div class="col-lg-6">
            <div style="color:#fff;">The loai:</div>   
            <select id="my-select" class="form-control" name="" value="${projects.categoryId}">
            ${categories.map((item) => `
                <option value="${Number(item.id)}" ${item.id == projects.categoryId ? 'selected' : ''}>${item.name}</option>
            `)}
            </select>
            <div style="color:#fff;">Ngay tao:</div>   
            <input type="date" class="form-date" value="${projects.date ? projects.date : ''}">
            <div style="color:#fff;">Tác giả:</div>   
            <input type="text" id="form-author" class="form-control" value="${projects.author ? projects.author : ''}">
        </div>
        </div>
        <div style="color:#fff;">mo ta:</div>   
        <textarea name="" id="dsc" cols="30" rows="10" class="dsc">${projects.description ? projects.description : ''}</textarea>      
        <button class="btn btn-success">UPDATE</button>
        </form>
        `
    // ${category.map((item) => `
    //     <option value="${item.id}">${item.name}</option>
    // `)}
}

export default projectEdit
