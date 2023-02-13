import { projects } from "../data"
const projectList = () => {
    return `
    ${projects.map((project) => `<li><a href="/project/${project.id}">${project.name}</a></li>`).join("")}
  `
}

export default projectList
