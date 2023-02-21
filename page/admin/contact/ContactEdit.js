import axios from "axios"
import { router, useEffect, useState } from "../../../lib"

const ContactEdit = ({ id }) => {
    const [contacts, setContacts] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:3000/contact/${id}`)
            .then(({ data }) => setContacts(data))
    }, [])
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
                contactImg: urls.length > 0 ? urls : contacts.contactImg,
            }
            axios.put(`http://localhost:3000/contact/${id}`, newContact)
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
        <input type="text" class="form-control" id="formName" value="${contacts.contactName ? contacts.contactName : ''}">
        <div style="color:#fff;">Image:</div>   
        <img src="${contacts.contactImg ? contacts.contactImg : ''}">
        <input type="file" name="" id="formImg">
        <div style="color:#fff;">contact Info:</div>   
        <input type="text" class="form-control" id="formInfo" value="${contacts.contactInfo ? contacts.contactInfo : ''}">
        <div style="color:#fff;">contact Url:</div>   
        <input type="url" class="form-control" id="formUrl" value="${contacts.contactUrl ? contacts.contactUrl : ''}">
        <br>
        <button style="display:block;" class="btn btn-warning">UPDATE</button>
    </form>
    `
}

export default ContactEdit
