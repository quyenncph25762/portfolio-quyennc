import axios from "axios";
import { router, useEffect, useState } from "../../../lib"

const skillEdit = ({ id }) => {
    const [skills, setSkills] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:3000/skill/${id}`)
            .then(({ data }) => setSkills(data));
    }, [])
    useEffect(() => {
        const form = document.querySelector(".form-group");
        const formName = document.getElementById("formName");
        const formImg = document.getElementById("formImg");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const urls = await uploadFiles(formImg.files)
            // console.log();
            const newSkill = {
                skillTitle: formName.value,
                skillImg: urls.length > 0 ? urls : skills.skillImg,
            }
            axios.put(`http://localhost:3000/skill/${id}`, newSkill).then(() => router.navigate("/admin/skill"))
        })
    })
    const uploadFiles = async (files) => {
        if (files) {
            const cloud_Name = "doorujhxj";
            const preset_Name = "Project_Gallery";
            const folder_Name = "skill_ECMA";
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
        <label for="formName"><h1>ADD SKILL</h1></label>
        <div style="color:#fff;">Title Skill:</div>   
        <input type="text" class="form-control" id="formName" value="${skills.skillTitle}">
        <div style="color:#fff;">Image:</div>   

        <input type="file" name="" id="formImg" multiple>
        <div style="display:flex">
        ${skills.skillImg && skills.skillImg.map((item) => `
        <img src="${item}" width="100px" height="100px">
        `)}
        </div>
        <br>
        <button style="display:block;" class="btn btn-warning" style="display:block">UPDATE</button>
    </form>
  `
}

export default skillEdit
