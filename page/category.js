// import { useEffect, useState } from "../lib"
// const Category = ({ categories, onClick }) => {
//     useEffect(() => {
//         const btns = document.querySelectorAll('.btn-category');
//         for (const btn of btns) {
//             btn.addEventListener('click', function (e) {
//                 e.preventDefault();
//                 const id = btn.dataset.id;
//                 onClick(id)
//             })
//         }
//     }, [categories, onClick])
//     return `
//     <div class="row">
//         <div class="project_categories">
//             <ul class="project_categories-list">
//                 <li><a class="btn-category" data-id="0">All</a></li>
//                 ${categories && categories.map((item) => `
//                 <li><a class="btn-category" data-id="${item.id}">${item.name}</a></li>
//                 `).join('')}
//             </ul>
//         </div>
//     </div>
//     `

// }

// export default Category