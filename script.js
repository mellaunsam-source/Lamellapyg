// Demo de carreras
const careers = {
  ri: [
    { id: 1, name: "Historia General", correl: [] },
    { id: 2, name: "Introducción a la Filosofía", correl: [] },
  ],
  ap: [
    { id: 1, name: "Historia General", correl: [] },
    { id: 2, name: "Elementos de Economía", correl: [] },
  ],
  cp: [
    { id: 1, name: "Historia General", correl: [] },
    { id: 2, name: "Teoría del Estado", correl: [1] },
  ],
  profcp: [
    { id: 1, name: "Historia General", correl: [] },
    { id: 2, name: "Pedagogía I", correl: [1] },
  ]
};

const careerSelect = document.getElementById("careerSelect");
const gridContainer = document.getElementById("gridContainer");

// Guardar progreso por carrera en localStorage
function getProgress(career) {
  return JSON.parse(localStorage.getItem("progress_" + career)) || [];
}
function saveProgress(career, approved) {
  localStorage.setItem("progress_" + career, JSON.stringify(approved));
}

// Renderizar materias
function renderCareer(careerKey) {
  document.body.className = careerKey; // cambia color
  gridContainer.innerHTML = "";

  const subjects = careers[careerKey];
  const approved = getProgress(careerKey);

  subjects.forEach(subj => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Estado: aprobado o bloqueado
    if (approved.includes(subj.id)) {
      card.classList.add("approved");
    } else if (subj.correl.length > 0 && !subj.correl.every(c => approved.includes(c))) {
      card.classList.add("locked");
    }

    card.innerHTML = `<strong>${subj.name}</strong>`;
    
    // Clic solo si no está bloqueada
    card.addEventListener("click", () => {
      if (card.classList.contains("locked")) return;
      if (approved.includes(subj.id)) {
        // desmarcar
        const idx = approved.indexOf(subj.id);
        approved.splice(idx, 1);
      } else {
        approved.push(subj.id);
      }
      saveProgress(careerKey, approved);
      renderCareer(careerKey);
    });

    gridContainer.appendChild(card);
  });
}

// Evento cambio de carrera
careerSelect.addEventListener("change", e => {
  renderCareer(e.target.value);
});

// Cargar inicial
renderCareer(careerSelect.value);