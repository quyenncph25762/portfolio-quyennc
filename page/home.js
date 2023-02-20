import axios from "axios"
import header from "../components/header"
import { projectGalleryAvt, projectGallerySplash } from "../components/projectGallery"
import { useEffect, useState } from "../lib"
import about from "./about"
import contact from "./contact"
import footer from "./footer"
import project from "./project"
import skills from "./skills"
// import classes from "../css/home.module.css";

const home = () => {
  const [ports, setPorts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/portfolio")
      .then(({ data }) => setPorts(data))
  }, [])
  return `
  ${header()}
  <main class="container homePage_main">
    <div class="homePage">
      <div class="circle-l-home"></div>
      <div class="circle-s-home"></div>
      <div class="row homePage_row">
        ${ports.map((port) => `
        <div class="col-lg-6 homePage_row_left">
          <p class="homePage_row_left-top" id="intro_name">Xin chào!  tôi là ${port.myName}</p>
          <div class="homePage_row_left-intro">Tôi làm<p>${port.myJob}</p>
          </div>
          <div class="homePage_row_left-dsc">${port.info}</div>
          <div class="homePage_row_left-bottom">
            <button class="homePage_btn"><a href="${port.urlCv}">My resume</a></button>
          </div>
        </div>
        <div class="col-lg-6 homePage_row_right">
        <div class="homePage_row_right-img">
        ${projectGalleryAvt({ img: `${port.portImg}` })}
        </div>
        ${projectGallerySplash({ img: "https://scontent.fhan2-4.fna.fbcdn.net/v/t1.15752-9/331143122_714833346945511_1829775671821451125_n.png?_nc_cat=110&ccb=1-7&_nc_sid=ae9488&_nc_ohc=PKbohnEQdf0AX84Zhuo&_nc_ht=scontent.fhan2-4.fna&oh=03_AdQN2ysS_m40B5E3aeF7sonvXKUkI1qBQ5NbNTHX4jCczw&oe=6416D3BA" })}
        </div>
        `)}
      </div>
    </div>
    </main>
  ${about()}
  ${skills()}
  ${project()}
  ${contact()}
  ${footer()}
  `
}

export default home
