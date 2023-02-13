import "bootstrap/dist/css/bootstrap.min.css"
import { router, render } from "./lib"
import projectAdd from "./page/admin/projectAdd";
import projectAdmin from "./page/admin/projectAdmin";
import projectEdit from "./page/admin/projectEdit";
import home from "./page/home"
import notFound from "./page/notFound";
import project from "./page/project"
import projectDetail from "./page/projectDetail";

const app = document.querySelector("#app");

router.on("/", () => render(home, app))
router.on("/project", () => render(project, app))
router.on("/project/:id", ({ data }) => render(() => projectDetail(data), app))


router.on("/admin/projectAdmin", () => render(projectAdmin, app))
router.on("/admin/projectAdmin/add", () => render(projectAdd, app))
router.on("/admin/projectAdmin/:id/edit", ({ data }) => render(() => projectEdit(data), app))
router.notFound(() => render(notFound, app));
router.resolve();