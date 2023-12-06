let data = [
  {
    id: 1,
    nombre: "hola",
    propietario: "hola",
    telefono: "1234567890",
    tipo: "mamifero",
    fecha: "2023-12-21",
    hora: "08:22",
    sintomas: "xd",
    estado: 'En Proceso'
  },
  {
    id: 2,
    nombre: "hola",
    propietario: "hola",
    telefono: "1234567890",
    tipo: "reptil",
    fecha: "2023-12-21",
    hora: "08:22",
    sintomas: "xd",
    estado: 'Terminadas'
  },
  {
    id: 3,
    nombre: "hola",
    propietario: "hola",
    telefono: "1234567890",
    tipo: "ave",
    fecha: "2023-12-21",
    hora: "08:22",
    sintomas: "xd",
    estado: 'Anuladas'
  },
];

document.addEventListener("DOMContentLoaded", () => {
  pintar();
  filtrarPorEstado();
});

const limpiar = () => {
  document.querySelector("#nombre").value = "";
  document.querySelector("#propietario").value = "";
  document.querySelector("#telefono").value = "";
  document.querySelector("#tipo").value = "0";
  document.querySelector("#fecha").value = "";
  document.querySelector("#hora").value = "";
  document.querySelector("#sintomas").value = "";
};

let animals = [
  {
    nombre: "mamifero",
    img: "./vete/ciervo.jpg",
  },
  {
    nombre: "reptil",
    img: "./vete/serpiente.jpg",
  },
  {
    nombre: "anfibio",
    img: "./vete/rana.jpg",
  },
  {
    nombre: "ave",
    img: "./vete/ave.jpg",
  },
  {
    nombre: "pez",
    img: "./vete/pez.jpg",
  },
];

function pintar() {
  let fragment = document.createDocumentFragment();
  data.forEach((d, i) => {
    console.log("d", d);
    let contenedor = document.createElement("div");
    contenedor.setAttribute("class", "citas");

    let foto = document.createElement("img");
    foto.classList.add("foto");

    let detallesContainer = document.createElement("div");
    detallesContainer.classList.add("detalles-container");

    const crearDetalles = (label, text) => {
      const p = document.createElement("p");
      const labelSpan = document.createElement("span");
      labelSpan.textContent = label;
      labelSpan.classList.add("label");
      p.appendChild(labelSpan);
      p.appendChild(document.createTextNode(text));
      return p;
    };

    let estadoSeleccionado = document.getElementById("estadoFiltro").value;

    if (d.tipo && animals.find((animal) => animal.nombre === d.tipo)) {
      const animal = animals.find((animal) => animal.nombre === d.tipo);
      foto.src = animal.img;
    }

    let estadoCita = document.createElement("p");
    estadoCita.textContent = `Estado: ${d.estado}`;
    estadoCita.setAttribute("id", "estadio");

    detallesContainer.appendChild(crearDetalles("Nombre: ", d.nombre));
    detallesContainer.appendChild(crearDetalles("Tipo: ", d.tipo));
    detallesContainer.appendChild(
      crearDetalles("Propietario: ", d.propietario)
    );
    detallesContainer.appendChild(crearDetalles("Telefono: ", d.telefono));
    detallesContainer.appendChild(crearDetalles("Fecha: ", d.fecha));
    detallesContainer.appendChild(crearDetalles("Hora: ", d.hora));
    detallesContainer.appendChild(crearDetalles("Síntomas: ", d.sintomas));

    let btEditar = document.createElement("button");
    let btBorrar = document.createElement("button");

    btEditar.textContent = "Editar";
    btEditar.setAttribute("data-bs-toggle", "modal");
    btEditar.setAttribute("data-bs-target", "#exampleModal");
    btEditar.addEventListener("click", () => {
      editar(d);
    });
    btBorrar.textContent = "Borrar";
    btBorrar.addEventListener("click", () => {
      eliminar(i);
    });

    let botonesContainer = document.createElement("div");
    botonesContainer.classList.add("botones-container");
    botonesContainer.appendChild(btEditar);
    botonesContainer.appendChild(btBorrar);
    botonesContainer.appendChild(estadoCita);

    contenedor.appendChild(foto);
    contenedor.appendChild(detallesContainer);
    contenedor.appendChild(botonesContainer);
    fragment.appendChild(contenedor);
  });
  document.getElementById("contenedor").innerHTML = "";
  document.getElementById("contenedor").appendChild(fragment);
}

function mostrarTodasLasTarjetas() {
  const cartas = document.querySelectorAll(".citas");
  cartas.forEach((i) => {
    i.style.display = "block";
  });
}

function filtrarPorEstado() {
  const estadoSeleccionado = document.getElementById("estadoFiltro").value;
  const eleccionEstado = document.getElementById("check").value;
  if (estadoSeleccionado === "Todas") {
    mostrarTodasLasTarjetas();
    return;
  }
  const cartas = document.querySelectorAll(".citas");
  cartas.forEach((i) => {
    const estadoTexto = i.querySelector("#estadio").textContent;
    console.log(estadoTexto);
    if (eleccionEstado === "Todas" || estadoTexto.includes(eleccionEstado)) {
      i.style.display = "block";
    } else {
      i.style.display = "none";
    }
  });
}

let bd = 0;
let c = 0;
let id = 0;

function horario() {
  var horaInput = document.getElementById("hora").value;
  var horaIngresada = new Date();
  horaIngresada.setHours(
    parseInt(horaInput.substr(0, 2)),
    parseInt(horaInput.substr(3, 2))
  );
  var horaMinima = new Date();
  horaMinima.setHours(8, 0, 0); // Hora mínima: 8 AM
  var horaMaxima = new Date();
  horaMaxima.setHours(20, 0, 0); // Hora máxima: 8 PM

  if (horaIngresada < horaMinima || horaIngresada > horaMaxima) {
    return true;
  }
}

function valid() {
  if (document.getElementById("nombre").value.trim() === "") {
    document.getElementById("p1").style.display = "block";
    setTimeout(() => {
      document.getElementById("p1").style.display = "none";
    }, 3000);
  } else if (document.getElementById("propietario").value.trim() === "") {
    document.getElementById("p2").style.display = "block";
    setTimeout(() => {
      document.getElementById("p2").style.display = "none";
    }, 3000);
  } else if (document.getElementById("telefono").value.trim() === "") {
    document.getElementById("p3").style.display = "block";
    setTimeout(() => {
      document.getElementById("p3").style.display = "none";
    }, 3000);
  } else if (document.getElementById("telefono").value.length < 10) {
    document.getElementById("p4").style.display = "block";
    setTimeout(() => {
      document.getElementById("p4").style.display = "none";
    }, 3000);
  } else if (document.getElementById("tipo").value === "0") {
    document.getElementById("p5").style.display = "block";
    setTimeout(() => {
      document.getElementById("p5").style.display = "none";
    }, 3000);
  } else if (document.getElementById("fecha").value.trim() === "") {
    document.getElementById("p6").style.display = "block";
    setTimeout(() => {
      document.getElementById("p6").style.display = "none";
    }, 3000);
  } else if (new Date(document.getElementById("fecha").value) <= new Date()) {
    document.getElementById("p7").style.display = "block";
    setTimeout(() => {
      document.getElementById("p7").style.display = "none";
    }, 3000);
  } else if (document.getElementById("hora").value.trim() === "") {
    document.getElementById("p8").style.display = "block";
    setTimeout(() => {
      document.getElementById("p8").style.display = "none";
    }, 3000);
  } else if (horario() === true) {
    document.getElementById("p9").style.display = "block";
    setTimeout(() => {
      document.getElementById("p9").style.display = "none";
    }, 3000);
  } else if (document.getElementById("sintomas").value.trim() === "") {
    document.getElementById("p10").style.display = "block";
    setTimeout(() => {
      document.getElementById("p10").style.display = "none";
    }, 3000);
  } else {
    document.getElementById("p11").style.display = "block";
    setTimeout(() => {
      document.getElementById("p11").style.display = "none";
    }, 3000);
    return true;
  }
}

function guardar() {
  if (valid() === true) {
    if (bd == 1) {
      data.forEach((e, i) => {
        if (e.id === id) {
          e.nombre = document.getElementById("nombre").value;
          e.propietario = document.getElementById("propietario").value;
          e.telefono = document.getElementById("telefono").value;
          e.tipo = document.getElementById("tipo").value;
          e.fecha = document.getElementById("fecha").value;
          e.hora = document.getElementById("hora").value;
          e.sintomas = document.getElementById("sintomas").value;
          e.estado = document.getElementById('estadoFiltro').value

        }
      });
    } else {
      data.push({
        id: data.length + 1,
        nombre: document.getElementById("nombre").value,
        propietario: document.getElementById("propietario").value,
        telefono: document.getElementById("telefono").value,
        tipo: document.getElementById("tipo").value,
        fecha: document.getElementById("fecha").value,
        hora: document.getElementById("hora").value,
        sintomas: document.getElementById("sintomas").value,
        estado: document.getElementById('estadoFiltro').value
      });
      console.log(data);
      limpiar();
      document.getElementById("agendarCita").dataset.bsDismiss = "modal";
    }
    document.getElementById("contenedor").innerHTML = "";
    pintar();
  }
}

function editar(r) {
  bd = 1;
  console.log(r);
  id = r.id;
  document.getElementById("nombre").value = r.nombre;
  document.getElementById("propietario").value = r.propietario;
  document.getElementById("telefono").value = r.telefono;
  document.getElementById("tipo").value = r.tipo;
  document.getElementById("fecha").value = r.fecha;
  document.getElementById("hora").value = r.hora;
  document.getElementById("sintomas").value = r.sintomas;
}

function crear() {
  limpiar();
  bd = 0;
  id++;
}

function eliminar(i) {
  data.splice(i, 1);

  document.getElementById("contenedor").innerHTML = "";
  pintar();
}

console.log(data);
