import header from '../components/header'
import { router, useEffect, useState } from '../lib';
import { getProject } from './admin/config/projects';
import footer from './footer';

const projectDetail = ({ id }) => {
  const [projects, setProjects] = useState([])
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getProject(id).then(({ data }) => setProjects(data));
  }, [])
  useEffect(() => {
    fetch(`http://localhost:3000/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
  }, [])
  // console.log(categories);
  return `
  ${header()}
  <div id="project_detail">
    <div class="project_detail_row">
      <div class="banner">
        <img class="banner_img" src="${projects.gallery ? projects.gallery : 'https://bizweb.dktcdn.net/100/081/999/themes/118044/assets/blog-no-image.jpg?1667298034855'}">
        <div class="banner_nav">
        <h1 class="project_detail_title">${projects.name ? projects.name : 'Đang cập nhật ...'}</h1>
        <span class="project_detail_post__date">${projects.date ? projects.date : '?? ?? ????'}</span>
        <p class="acthor">Designed and made by: <span>${projects.author ? projects.author : 'Hiện không rõ'}</span></p>
        <p>Ngôn ngữ sử dụng: 
        ${categories.map((item) => `
        <span style="font-weight:700;">${item.id == projects.categoryId ? item.name : ''}</span>
        `).join("")}
        
        </p>
        </div>
      </div>
      <main class="content_projectdetail">
      <h1 class="project_detail_title_body">Một số ảnh của dự án</h1>
      <div class="project_detail_gallery">
      ${projects.galleryProjects && projects.galleryProjects.map((item) => `
      <div class="project_detail_gallery-img">
        <img src="${item}" alt="" class="photo_project">
      </div>
      `)}
      </div>
      <p class="project_detail_dsc">${projects.description}.</p>
      </main>
      <div class="cart_nav-button project_detai-button">
        <button class="cart_btn project_detai-btn"><a class="cart_nav-btn" href="${projects.url}">Visit source</a></button>
        <button class="cart_btn project_detai-btn"><a class="cart_nav-btn" href="${projects.urlWeb ? projects.urlWeb : ''}">Visit website</a></button>
      </div>
    </div>
  </div>
  ${footer()}
  `
}

export default projectDetail
