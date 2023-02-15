import header from "../components/header"
import { projectGalleryAvt, projectGallerySplash } from "../components/projectGallery"
import about from "./about"
import contact from "./contact"
import footer from "./footer"
import project from "./project"
import skills from "./skills"

const home = () => {
  return `
  ${header()}
  <main class="container homePage_main">
    <div class="homePage">
    <div class="circle-l-home"></div>
    <div class="circle-s-home"></div>
      <div class="row homePage_row">
        <div class="col-lg-6 homePage_row_left">
          <p class="homePage_row_left-top" id="intro_name">Xin chào!  tôi là Công Quyền</p>
          <div class="homePage_row_left-intro">Tôi làm<p>Web Developer</p>
          </div>
          <div class="homePage_row_left-dsc">Tôi là một developer trẻ tuổi đẹp trai nhất thế giới Tôi là một developer trẻ tuổi đẹp trai nhất thế giới Tôi là một developer trẻ tuổi đẹp trai nhất thế giới Tôi là một developer trẻ tuổi đẹp trai nhất thế giới</div>
          <div class="homePage_row_left-bottom">
            <button class="homePage_btn"><a href="">My resume</a></button>
          </div>
        </div>
        <div class="col-lg-6 homePage_row_right">
        <div class="homePage_row_right-img">
        ${projectGalleryAvt({ img: "../images/imgHome/meo-removebg-preview.png" })}
        </div>
        ${projectGallerySplash({ img: "../images/imgHome/splash_red.png" })}
        </div>
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
