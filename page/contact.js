import axios from "axios"
import { useEffect, useState } from "../lib"
const contact = () => {
  const [contacts, setContacts] = useState([])
  useEffect(() => {
    axios.get("http://localhost:3000/contact")
      .then(({ data }) => setContacts(data));
  }, [])
  return `
    <div id="contact">
    <div class="circle-l-contact"></div>
    <div class="container">
      <h1 class="contact_title">Contact</h1>
      <div class="contact_container">
      ${contacts.map((contact) => `
      <a class="contact_container_box" href="${contact.contactUrl ? contact.contactUrl : ''}">
        <div class="contact_container_box-icon">
          <img src="${contact.contactImg}" alt="" class="img_icon-contact">
        </div>
        <div class="contact_container_box-nav">
          <p class="contact_container_box-nav-title">${contact.contactName}</p>
          <span>${contact.contactInfo}</span>
        </div>
      </a>
      `)}
      </div>
    </div>
  </div>
    `
}

export default contact
