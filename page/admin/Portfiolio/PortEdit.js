import axios from "axios";
import { router, useEffect, useState } from "../../../lib"

const PortEdit = ({ id }) => {
    const [ports, setPorts] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:3000/portfolio/${id}`)
            .then(({ data }) => setPorts(data))
    }, [])
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
                portImg: urls.length > 0 ? urls : ports.portImg,
                urlCv: formUrl.value,
                info: dsc.value
            }
            axios.put(`http://localhost:3000/portfolio/${id}`, newPort)
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
        <input type="text" class="form-control" id="form-name" required minlength="5" maxlength="100" value="${ports.myName}">
        <div style="color:#fff;">My Job:</div>   
        <input type="text" class="form-control" id="form-job" required minlength="5" maxlength="100" value="${ports.myJob}">
        <div style="color:#fff;">Url Source:</div>   
        <input type="url" class="form-control" id="form-url-source" placeholder="https://example.com"
        pattern="https://.*" size="30" value="${ports.urlCv}">
        <div style="color:#fff;">Image:</div>   
        <img src="${ports.portImg && ports.portImg}" height="75px">
        <input type="file" class="form-img">
        <div style="color:#fff;">mo ta:</div>   
        <textarea name="" id="dsc" cols="30" rows="10" class="dsc" required>${ports.info}</textarea>      
        <button type="submit" class="btn btn-success" style="display:block">update</button>
        </form>
  `
}

export default PortEdit
