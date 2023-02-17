import header from "../components/header"
import { projectGalleryAvt, projectGallerySplash } from "../components/projectGallery"
import about from "./about"
import contact from "./contact"
import footer from "./footer"
import project from "./project"
import skills from "./skills"
// import classes from "../css/home.module.css";

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
        ${projectGalleryAvt({ img: "https://scontent.fhan2-5.fna.fbcdn.net/v/t1.15752-9/330936436_718333636500243_2251567244537455205_n.png?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_ohc=h1koeivAw6gAX978VKu&tn=GoGhDz-qmistrldY&_nc_ht=scontent.fhan2-5.fna&oh=03_AdQsuc1kHa-a3PAvih9YVPeAJXRYzYG8lA7Z-GOOg4QMaQ&oe=6416B71C" })}
        </div>
        ${projectGallerySplash({ img: "https://scontent.fhan2-4.fna.fbcdn.net/v/t1.15752-9/331143122_714833346945511_1829775671821451125_n.png?_nc_cat=110&ccb=1-7&_nc_sid=ae9488&_nc_ohc=PKbohnEQdf0AX84Zhuo&_nc_ht=scontent.fhan2-4.fna&oh=03_AdQN2ysS_m40B5E3aeF7sonvXKUkI1qBQ5NbNTHX4jCczw&oe=6416D3BA" })}
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
