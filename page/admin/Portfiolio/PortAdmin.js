import axios from "axios";
import { useEffect, useState } from "../../../lib"

const PortAdmin = () => {
  const [ports, setPorts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/portfolio")
      .then(({ data }) => setPorts(data));
  }, [])
  useEffect(() => {
    const btns = document.querySelectorAll(".btn-danger");
    for (const btn of btns) {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        axios.delete(`http://localhost:3000/portfolio/${id}`)
          .then(() => {
            const newPortfolio = ports.filter((port) => port.id != id);
            setPorts(newPortfolio);
          })
      })
    }
  }, [])
  return `
    <table class="table table-light container" style="box-shadow: 0 0 10px #ccc;border-radius:10px;overflow:hidden">
      <thead class="thead-light">
        <tr>
          <th>#</th>
          <th>My name</th>
          <th>My job</th>
          <th>Url</th>
          <th>Image</th>
          <th>description</th>
          <th colspan="2" width="75px"><button class="btn btn-success"><a href="/admin/portAdmin/add">ADD</a></button></th>
        </tr>
      </thead>
      <tbody>
      ${ports.map((port, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${port.myName ? port.myName : '...'}</td>
            <td>${port.myJob ? port.myJob : '....'}</td>
            <td>${port.urlCv}</td>
            <td><img src="${port.portImg}" height="75px" style="border:1px solid #ccc;" width="75px"></td>
            <td>${port.info ? port.info : '...'}</td>
            <td width="75px"><button class="btn btn-danger" data-id="${port.id}">remove</button></td>
            <td width="75px"><button class="btn btn-warning"><a href="/admin/portAdmin/${port.id}/edit">EDIT</a></button></td>
        </tr>
      `).join("")
    }
      </tbody >
    </table >
    `
}

export default PortAdmin
