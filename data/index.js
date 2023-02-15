const menus = [
    { name: "Home", path: "#" },
    { name: "About", path: "#about" },
    { name: "Skills", path: "#skill" },
    { name: "project", path: "#project" },
    { name: "Contact", path: "#contact" },
    // { name: "Posts", path: "/posts" },
    // { name: "ADMIN", path: "/admin/projectAdmin" },
];
// const menus = [
//     { name: "Home", path: "/" },
//     { name: "About", path: "/about" },
//     { name: "project", path: "/project" },
//     // { name: "Posts", path: "/posts" },
//     { name: "Contact", path: "/contact" },
//     // { name: "ADMIN", path: "/admin/projectAdmin" },
// ];

const projects = [
    {
        id: 1,
        name: "Dự án 1",
        teams: [
            { id: 1, name: "Đạt" },
            { id: 2, name: "Kiên" },
            { id: 3, name: "Trung" },
        ],
    },
    { id: 2, name: "Dự án mẫu" },
    {
        id: 3,
        name: "Dự án tốt nghiệp",
        teams: [
            { id: 1, name: "Đạt" },
            { id: 2, name: "Kiên" },
            { id: 3, name: "Trung" },
        ],
    },
];
export { projects, menus };
