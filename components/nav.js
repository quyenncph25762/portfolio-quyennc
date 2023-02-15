import { menus } from "../data"

const nav = () => {
  // <a href="/">Home</a>
  // <a href="/project">project</a>
  // <a href="/admin/projectAdmin">admin</a>
  return `
  <nav class="col-lg-9">
  <ul class="header_nav-content mb0">
  ${menus.map((menu) => `<li class="header_nav-content-e"><a href="${menu.path}">${menu.name}</a></li>`).join(" ")}
  </ul>
  </nav>
  `
}

export default nav
