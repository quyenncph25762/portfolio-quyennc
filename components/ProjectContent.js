const ProjectContent = ({ projectInCategory, projects, categories }) => {
  return `
    ${projectInCategory.projects ? `
      ${projectInCategory.projects.map((project) => `
      <div class="cart">
      <a href="${project.url}" style="text-decoration: none;color: var(--color-main);
      font-family: 'Poppins';
      ">
      <div class="cart_img">
      <img src="${project.gallery}" alt="" class="cart_photo">
    </div>
    <div class="cart_nav">
      <h1 class="cart_nav-title">${project.name}<span>${project.date}</span></h1>
      <div class="cart_nav-languagues">
      ${categories.map((category) => `
        ${project.categoryId == category.id ? `<span>${category.name}</span>` : ''}
      `).join("")}
      </div>
      <div class="cart_nav-dsc">${project.description}</div>
      <div class="cart_nav-button">
        <button class="cart_btn"><a class="cart_nav-btn">Visit source</a></button>
        <button class="cart_btn"><a class="cart_nav-btn">Visit website</a></button>
      </div>
    </div>
      <a/>
      </div>
      `).join("")}
      `
      // Thì
      : `
      ${projects.map((project) => `
      <div class="cart">
      <a href="${project.url}" style="text-decoration: none;color: var(--color-main);
      font-family: 'Poppins';
      ">
        <div class="cart_img">
          <img src="${project.gallery}" alt="" class="cart_photo">
        </div>
        <div class="cart_nav">
          <h1 class="cart_nav-title">${project.name}<span>${project.date}</span></h1>
          <div class="cart_nav-languagues">
          ${categories.map((category) => `
            ${project.categoryId == category.id ? `<span>${category.name}</span>` : ''}
          `).join("")}
          </div>
          <div class="cart_nav-dsc">${project.description}</div>
          <div class="cart_nav-button">
            <button class="cart_btn"><a class="cart_nav-btn">Visit source</a></button>
            <button class="cart_btn"><a class="cart_nav-btn">Visit website</a></button>
          </div>
        </div>
        </a>  
      </div>
      `).join("")}
      `}
    `
}

export default ProjectContent
