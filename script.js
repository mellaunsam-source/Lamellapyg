const carreras = {
  ri: {
    color: "#b6d7a8",
    materias: [
      {id:1, nombre:"Historia General", correlativas:[]},
      {id:2, nombre:"Introducción a la Filosofía", correlativas:[]},
      {id:3, nombre:"Epistemología de las Ciencias Sociales", correlativas:[]},
      {id:4, nombre:"Introducción a la Ciencia Política", correlativas:[3]},
    ]
  },
  ap: {
    color: "#a2c4c9",
    materias: [
      {id:1, nombre:"Historia General", correlativas:[]},
      {id:2, nombre:"Introducción a la Filosofía", correlativas:[]},
      {id:3, nombre:"Epistemología de las Ciencias Sociales", correlativas:[]},
      {id:4, nombre:"Introducción a la Ciencia Política", correlativas:[3]},
    ]
  },
  cp: {
    color: "#ffe599",
    materias: [
      {id:1, nombre:"Historia General", correlativas:[]},
      {id:2, nombre:"Introducción a la Filosofía", correlativas:[]},
      {id:3, nombre:"Epistemología de las Ciencias Sociales", correlativas:[]},
      {id:4, nombre:"Introducción a la Ciencia Política", correlativas:[3]},
    ]
  },
  profcp: {
    color: "#c9daf8",
    materias: [
      {id:1, nombre:"Historia General", correlativas:[]},
      {id:2, nombre:"Introducción a la Filosofía", correlativas:[]},
      {id:3, nombre:"Epistemología de las Ciencias Sociales", correlativas:[]},
      {id:4, nombre:"Introducción a la Ciencia Política", correlativas:[3]},
    ]
  }
};

let carreraSeleccionada = "ri";

function renderMalla() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";
  const {materias, color} = carreras[carreraSeleccionada];
  materias.forEach(m => {
    const div = document.createElement("div");
    div.className = "materia";
    div.style.background = m.aprobada ? "#6aa84f" : color;
    div.textContent = m.nombre;
    div.onclick = () => toggleAprobada(m.id);
    malla.appendChild(div);
  });
}

function toggleAprobada(id) {
  const materias = carreras[carreraSeleccionada].materias;
  const materia = materias.find(m => m.id === id);
  materia.aprobada = !materia.aprobada;
  localStorage.setItem("mallaPYG_" + carreraSeleccionada, JSON.stringify(materias));
  renderMalla();
}

function loadData() {
  Object.keys(carreras).forEach(key => {
    const data = localStorage.getItem("mallaPYG_" + key);
    if(data) {
      carreras[key].materias = JSON.parse(data);
    }
  });
}

document.getElementById("careerSelect").addEventListener("change", e => {
  carreraSeleccionada = e.target.value;
  renderMalla();
});

loadData();
renderMalla();