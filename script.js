// Datos mínimos de prueba (solo una materia por carrera)
const careers = {
  ri: [
    { id: 1, name: "Historia General", prereq: [] },
    { id: 2, name: "Introducción a la Filosofía", prereq: [] },
  ],
  ap: [
    { id: 1, name: "Historia General", prereq: [] },
    { id: 2, name: "Epistemología de las Ciencias Sociales", prereq: [] },
  ],
  cp: [
    { id: 1, name: "Historia General", prereq: [] },
    { id: 2, name: "Teoría del Estado", prereq: [1] },
  ],
  prof: [
    { id: 1, name: "Historia General", prereq: [] },
    { id: 2, name: "Pedagogía I", prereq: [1] },
  ],
};

const container = document.getElementById("gridContainer");
const select = document.getElementById("careerSelect");

function renderCareer(career) {
  container.innerHTML = "";
  const subjects = careers[career];
  subjects.forEach(subj => {
    const div = document.createElement("div");
    div.className = "subject locked";
    div.textContent = subj.name;
    if (subj.prereq.length === 0) {
      div.classList.remove("locked");
    }
    div.addEventListener("click", () => toggleApproval(div, subj, subjects));
    container.appendChild(div);
  });
}

function toggleApproval(div, subj, subjects) {
  if (div.classList.contains("locked")) return;
  div.classList.toggle("approved");
  if (div.classList.contains("approved")) {
    subjects.forEach(s => {
      if (s.prereq.includes(subj.id)) {
        const index = subjects.indexOf(s);
        container.children[index].classList.remove("locked");
      }
    });
  } else {
    // No bloqueamos al desmarcar en este prototipo
  }
}

select.addEventListener("change", e => {
  renderCareer(e.target.value);
});

// Render inicial
renderCareer("ri");
