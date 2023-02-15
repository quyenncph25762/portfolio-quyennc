import nav from "./nav"

const header = () => {
  // <div class="header_contact col-lg-3">
  //   <a href="https://www.facebook.com/quyen.nguyencong.1610203"><ion-icon class="header_contact-icon" name="logo-facebook"></ion-icon></a>
  //   <a href="https://www.instagram.com/congquyen_1603/"><ion-icon class="header_contact-icon" name="logo-instagram"></ion-icon></a>
  //   <a href="https://www.tiktok.com/@_qinn_not_hinqinn"><ion-icon class="header_contact-icon" name="logo-tiktok"></ion-icon></a>
  // </div>
  return `
  <header>
  <div class="header_row container">
  <a class="header_logo col-lg-3">QUIN</a>
  ${nav()}
  </div>
  </header>
  `
}

export default header
