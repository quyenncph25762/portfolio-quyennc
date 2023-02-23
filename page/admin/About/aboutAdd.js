import axios from "axios";
import { router, useEffect } from "../../../lib";

const aboutAdd = () => {
    useEffect(() => {
        const form = document.getElementById("port-form");
        const formTitle = document.getElementById("form-title");
        const formImg = document.getElementById("form-img");
        const formDsc1 = document.getElementById("form-dsc1");
        const formDsc2 = document.getElementById("form-dsc2");
        const formInters = document.getElementById("form-interests");
        const formTags = document.getElementById("form-tags");
        const formIcons = document.getElementById("form-icons");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const urls = await uploadFiles(formImg.files)
            const newAbout = {
                aboutTitle: formTitle.value,
                aboutImg: urls,
                aboutFirstDsc: formDsc1.value,
                aboutSecondDsc: formDsc2.value,
                aboutInter: formInters,
                aboutTag: formTags.value,
                formIcons: formIcons.value,
            }
            axios.post("http://localhost:3000/about", newAbout)
                .then(() => router.navigate("/admin/aboutAdmin"));
        })


    })

    const uploadFiles = async (files) => {
        if (files) {
            const cloud_Name = "doorujhxj";
            const preset_Name = "Project_Gallery";
            const folder_Name = "about_ECMA";
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
    <form class="form-group container" id="port-form">
        <label for="form-name"><h1 style="color:var(--color-main);text-align:center;width="100%";display:"block"">ADD PORTFOLIO</h1></label>
        <div class="projectadd_left col-lg-6">
        <div style="color:#fff;">Title About:</div>   
        <input type="text" class="form-control" id="form-title" required minlength="5" maxlength="100">
        <div style="color:#fff;">Image:</div>   
        <input type="file" id="form-img" required>
        <div style="color:#fff;">Description1:</div>   
        <textarea name="" cols="30" rows="5" id="form-dsc1" required></textarea>
        <div style="color:#fff;">Description2:</div>   
        <textarea name="" cols="30" rows="5" id="form-dsc2" required></textarea>
        <div style="color:#fff;">Title interests:</div>   
        <input type="test" class="form-control" id="form-interests">
        <div style="color:#fff;">Icons:</div>   
        <input type="text" class="form-control" id="form-icons">
        <div style="color:#fff;">Tags:</div>   
        <input type="text" class="form-control" id="form-tags" required minlength="5" maxlength="100">
        <button type="submit" class="btn btn-success" style="display:block">ADD</button>
        </form>
  `
}

export default aboutAdd
