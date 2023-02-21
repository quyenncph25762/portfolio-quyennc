import axios from "axios";
import { useEffect, useState } from "../../../lib"

const skillAdmin = () => {
  const [skills, setSkills] = useState([]);
  // console.log(skills);
  useEffect(() => {
    axios.get("http://localhost:3000/skill")
      .then(({ data }) => setSkills(data));
  }, [])
  useEffect(() => {
    const btns = document.querySelectorAll(".btn-danger");
    for (const btn of btns) {
      // console.log(btn);
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        axios.delete(`http://localhost:3000/skill/${id}`)
          .then(() => {
            const newSkill = skills.filter((skill) => skill.id != id);
            setSkills(newSkill);
          })
      })
    }
  })
  return `
    <table class="table table-light container">
    <thead class="thead-light">
      <tr>
        <th>#</th>
        <th>Title Skills</th>
        <th width="200px">Img</th>
        <th width="75px" colspan="10"><button class="btn btn-success"><a href="/admin/skill/add">ADD</a></button></th>
      </tr>
    </thead>
    <tbody>
    ${skills.map((skill, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${skill.skillTitle}</td>
      ${skill.skillImg && skill.skillImg.map((item) => `
      <td><img src="${item}" width="100px" height="100px"></td>
      `)}
      <td width="75px"><button class="btn btn-danger" data-id="${skill.id}">Remove</button></td>
      <td width="75px"><button class="btn btn-warning"><a href="/admin/skill/${skill.id}/edit">EDIT</a></button></td>
    </tr>
    `)}
    </tbody>
  </table>
    `
}

export default skillAdmin
