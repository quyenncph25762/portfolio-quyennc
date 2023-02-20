import axios from "axios";
import { useEffect, useState } from "../../../lib";

const aboutAdmin = () => {
    const [abouts, setabouts] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/about")
            .then(({ data }) => setabouts(data));
    }, [])
    useEffect(() => {
        const btns = document.querySelectorAll(".btn-danger");
        for (const btn of btns) {
            btn.addEventListener("click", () => {
                const id = btn.dataset.id;
                axios.delete(`http://localhost:3000/about/${id}`)
                    .then(() => {
                        const newAbout = abouts.filter((about) => about.id != id);
                        setabouts(newAbout);
                    })
            })
        }
    }, [abouts])
    return `
    <table class="table table-light container" style="box-shadow: 0 0 10px #ccc;border-radius:10px;overflow:hidden">
      <thead class="thead-light">
        <tr>
          <th>#</th>
          <th>About title</th>
          <th>Image</th>
          <th>dsc 1</th>
          <th>dsc 2</th>
          <th>Title bottom</th>
          <th>icon</th>
          <th>aboutTag</th>
          <th colspan="2" width="75px"><button class="btn btn-success"><a href="/admin/aboutAdmin/add">ADD</a></button></th>
        </tr>
      </thead>
      <tbody>
      ${abouts.map((about, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${about.aboutTitle ? about.aboutTitle : '...'}</td>
            <td><img src="${about.aboutImg}" height="75px" style="border:1px solid #ccc;" width="75px"></td>
            <td><p>${about.aboutFirstDsc ? about.aboutFirstDsc : '...'}</p></td>
            <td><p>${about.aboutSecondDsc ? about.aboutSecondDsc : '...'}</p></td>
            <td>${about.aboutInter}</td>
            <td>${about.formIcons}</td>
            <td>${about.aboutTag ? about.aboutTag : ''}</td>
            <td width="75px"><button class="btn btn-danger" data-id="${about.id}">remove</button></td>
            <td width="75px"><button class="btn btn-warning"><a href="/admin/aboutAdmin/${about.id}/edit">EDIT</a></button></td>
        </tr>
      `).join("")}
      </tbody >
    </table >
    `
}

export default aboutAdmin
