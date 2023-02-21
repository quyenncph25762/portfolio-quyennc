import axios from "axios"
import { router, useEffect } from "../../../lib"

const ContactAdd = () => {
    useEffect(() => {
        const form = document.querySelector(".form-group");
        const formName = document.getElementById("formName");
        const formInfo = document.getElementById("formInfo");
        const formImg = document.getElementById("formImg")
        const formUrl = document.getElementById("formUrl");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const urls = await uploadFiles(formImg.files);
            const newContact = {
                contactName: formName.value,
                contactInfo: formInfo.value,
                contactUrl: formUrl.value,
                contactImg: urls,
            }
            axios.post("http://localhost:3000/contact", newContact)
                .then(() => router.navigate("/admin/contactAdmin"));
        })
    })
    const uploadFiles = async (files) => {
        if (files) {
            const cloud_Name = "doorujhxj";
            const preset_Name = "Project_Gallery";
            const folder_Name = "contact_ECMA";
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
        <label for="formName"><h1>ADD CONTACT</h1></label>
        <div style="color:#fff;">Name:</div>   
        <input type="text" class="form-control" id="formName">
        <div style="color:#fff;">Image:</div>   
        <input type="file" name="" id="formImg">
        <div style="color:#fff;">contact Info:</div>   
        <input type="text" class="form-control" id="formInfo">
        <div style="color:#fff;">contact Url:</div>   
        <input type="url" class="form-control" id="formUrl">
        <br>
        <button style="display:block;" class="btn btn-success">ADD</button>
    </form>
    `
}

export default ContactAdd
