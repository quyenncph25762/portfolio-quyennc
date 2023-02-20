import axios from "axios";
import { router, useEffect } from "../../../lib"

const PortAdd = () => {
    useEffect(() => {
        const form = document.getElementById("port-form");
        const formName = document.getElementById("form-name");
        const formJob = document.getElementById("form-job");
        const formUrl = document.getElementById("form-url-source");
        const formImg = document.querySelector(".form-img");
        const dsc = document.getElementById("dsc");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const urls = await uploadFiles(formImg.files)
            const newPort = {
                myName: formName.value,
                myJob: formJob.value,
                portImg: urls.length > 0 ? urls : ports.urlCv,
                urlCv: formUrl.value,
                info: dsc.value
            }
            axios.post("http://localhost:3000/portfolio", newPort)
                .then(() => router.navigate("/admin/portAdmin"));
        })


    })

    const uploadFiles = async (files) => {
        if (files) {
            const cloud_Name = "doorujhxj";
            const preset_Name = "Project_Gallery";
            const folder_Name = "Portfolio_ECMA";
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
        <div style="color:#fff;">My Name:</div>   
        <input type="text" class="form-control" id="form-name" required minlength="5" maxlength="100">
        <div style="color:#fff;">My Job:</div>   
        <input type="text" class="form-control" id="form-job" required minlength="5" maxlength="100">
        <div style="color:#fff;">Url Source:</div>   
        <input type="url" class="form-control" id="form-url-source" placeholder="https://example.com"
        pattern="https://.*" size="30">
        <div style="color:#fff;">Image:</div>   
        <input type="file" class="form-img" required>
        <div style="color:#fff;">mo ta:</div>   
        <textarea name="" id="dsc" cols="30" rows="10" class="dsc" required></textarea>      
        <button type="submit" class="btn btn-success" style="display:block">ADD</button>
        </form>
  `
}

export default PortAdd
