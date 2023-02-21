import axios from "axios"
import { useEffect, useState } from "../../../lib"

const ContactAdmin = () => {
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3000/contact")
            .then(({ data }) => setContacts(data))
    }, [])
    useEffect(() => {
        const btns = document.querySelectorAll(".btn-danger")
        for (const btn of btns) {
            btn.addEventListener("click", () => {
                const id = btn.dataset.id;
                axios.delete(`http://localhost:3000/contact/${id}`)
                    .then(() => {
                        const newContact = contacts.filter((contact) => contact.id != id);
                        setContacts(newContact);
                    })
            })
        }
    })
    return `
    <table class="table table-light container">
    <thead class="thead-light">
      <tr>
        <th>#</th>
        <th>Title contacts</th>
        <th width="200px">Img</th>
        <th>Info contacts</th>
        <th>Url</th>
        <th width="75px" colspan="3"><button class="btn btn-success"><a href="/admin/contactAdmin/add">ADD</a></button></th>
      </tr>
    </thead>
    <tbody>
    ${contacts.map((contact, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${contact.contactName}</td>
      <td><img src="${contact.contactImg}" width="100px" height="100px"></td>
      <td>${contact.contactInfo}</td>
      <td>${contact.contactUrl}</td>
      <td width="75px"><button class="btn btn-danger" data-id="${contact.id}">Remove</button></td>
      <td width="75px"><button class="btn btn-warning"><a href="/admin/contactAdmin/${contact.id}/edit">EDIT</a></button></td>
    </tr>
    `)}
    </tbody>
  </table>
    `
}

export default ContactAdmin
