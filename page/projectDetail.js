import header from '../components/header'
import projectInfo from '../components/projectInfo'
import { projects } from '../data'
import { router } from '../lib';

const projectDetail = ({ id }) => {
  const currentProject = projects.find((project) => project.id == id);
  if (!currentProject) return router.navigate("/project");
  return `
    ${header()}
    ${projectInfo(currentProject)}
  `
}

export default projectDetail
