import "bootstrap/dist/css/bootstrap.min.css"
import { router, render } from "./lib"
import about from "./page/about";
import Categories from "./page/admin/Categories";
import CategoriesAdd from "./page/admin/CategoriesAdd";
import CategoriesEdit from "./page/admin/CategoriesEdit";
import projectAdd from "./page/admin/projectAdd";
import projectAdmin from "./page/admin/projectAdmin";
import projectEdit from "./page/admin/projectEdit";
import contact from "./page/contact";
import footer from "./page/footer";
import home from "./page/home"
import notFound from "./page/notFound";
import project from "./page/project"
import projectDetail from "./page/projectDetail";
import skills from "./page/skills";

const app = document.querySelector("#app");

router.on("/", () => render(home, app))
router.on("/project", () => render(project, app))
router.on("/about", () => render(about, app))
router.on("/contact", () => render(contact, app))
router.on("/footer", () => render(footer, app))
router.on("/skills", () => render(skills, app))
router.on("/project/:id", ({ data }) => render(() => projectDetail(data), app))


router.on("/admin/projectAdmin", () => render(projectAdmin, app))
router.on("/admin/projectAdmin/add", () => render(projectAdd, app))
router.on("/admin/projectAdmin/:id/edit", ({ data }) => render(() => projectEdit(data), app))
router.on("/admin/Categories", () => render(Categories, app))
router.on("/admin/Categories/add", () => render(CategoriesAdd, app))
router.on("/admin/Categories/:id/edit", ({ data }) => render(() => CategoriesEdit(data), app))
router.notFound(() => render(notFound, app));
router.resolve();