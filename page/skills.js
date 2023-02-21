import axios from "axios";
import { useEffect, useState } from "../lib"

const skills = () => {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/skill")
      .then(({ data }) => setSkills(data));
  }, [])
  return `
    <div id="skill">
    <div class="row_skill">
    ${skills.map((sk) => `
    <h1 class="skill_title">
      ${sk.skillTitle}
    </h1>
    `)}
      <div class="skill_container">
        <ul class="row_li">
        ${skills.map((item) => `
          ${item.skillImg && item.skillImg.map((img) => `
          <li><img src="${img}" alt=""></li>
          `)}
        `)}
        </ul>
      </div>
    </div>
  </div>
  `
}

export default skills
