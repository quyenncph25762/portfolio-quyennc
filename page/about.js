import axios from "axios";
import { useEffect, useState } from "../lib"

const about = () => {
  const [abouts, setabouts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/about")
      .then(({ data }) => setabouts(data))
  }, [])
  return `
    <div id="about">
    <div class="circle-l-about"></div>
    <div class="container">
      ${abouts.map((about) => `
      <div class="row">
        <div class="col-lg-5">
          <div class="about_img">
            <img src="${about.aboutImg}" alt=""
              class="about_photo">
          </div>
        </div>
        <div class="col-lg-7 about_row-right">
          <h1 class="about_top">${about.aboutTitle}</h1>
          <div class="about_body">${about.aboutFirstDsc}
            <br>
            <br>
            ${about.aboutSecondDsc}
          </div>
          <div class="about_footer">
            <h1 class="about_footer-title">${about.aboutInter}</h1>
            <div class="interests">
                <i class="about_footer-icon"><ion-icon name="basketball-outline"></ion-icon><span class="about_ticket">${about.aboutTag}</span></i>

            </div>
          </div>
        </div>
      </div>
      `)}
    </div>
  </div>
  `
}

export default about
