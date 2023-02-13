const projectInfo = ({ teams, name }) => {
    return `
    <h1>${name}</h1>
    <ul>
    ${teams ? `${teams.map((team) => `${team.name}`)}` : '<h1>Khong co ai</h1>'}
    </ul>
    `
}

export default projectInfo
