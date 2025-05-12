// Mantén tu código JS tal y como está, no lo toco
function guardar() {
  const servicio = document.getElementById("servicio").value.trim();
  const version = document.getElementById("version").value.trim();

  if (servicio && version) {
    localStorage.setItem(servicio, version);
    mostrar();
    document.getElementById("servicio").value = "";
    document.getElementById("version").value = "";
  } else {
    alert("Rellena ambos campos");
  }
}

function mostrar() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  for (let i = 0; i < localStorage.length; i++) {
    const clave = localStorage.key(i);
    const valor = localStorage.getItem(clave);

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${clave}</td>
      <td>${valor}</td>
      <td>
        <span onclick="editar('${clave}')">✏️</span>
        <span onclick="borrar('${clave}')">❌</span>
        <span onclick="buscar('${clave}', '${valor}')">🔍</span>
      </td>
    `;
    lista.appendChild(tr);
  }
}

function buscar(servicio, version) {
  const query = encodeURIComponent(`${servicio} ${version} vulnerabilities`);
  const url = `https://www.google.com/search?q=${query}`;
  window.open(url, '_blank');
}

function editar(servicio) {
  const dialog = document.getElementById('dialogo-editar');
  const input = document.getElementById('input-editar-version');
  const nombre = document.getElementById('nombre-servicio-editar');

  nombre.textContent = `Servicio: ${servicio}`;
  input.value = localStorage.getItem(servicio);

  dialog.showModal();

  const form = document.getElementById('form-editar');
  form.onsubmit = function () {
    const nuevaVersion = input.value.trim();
    if (nuevaVersion) {
      localStorage.setItem(servicio, nuevaVersion);
      mostrar();
    }
    dialog.close();
  };
}

function cerrarDialogoEditar() {
  document.getElementById('dialogo-editar').close();
}

function borrar(servicio) {
  const dialog = document.getElementById('dialogo-borrar');
  const mensaje = document.getElementById('mensaje-borrar');

  mensaje.textContent = `¿Estás seguro de borrar "${servicio}"?`;
  dialog.showModal();

  const form = document.getElementById('form-borrar');
  form.onsubmit = function () {
    localStorage.removeItem(servicio);
    mostrar();
    dialog.close();
  };
}

function cerrarDialogoBorrar() {
  document.getElementById('dialogo-borrar').close();
}


function exportar() {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    data[key] = localStorage.getItem(key);
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "datos_versiones.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importar(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const contenido = JSON.parse(e.target.result);
      for (const clave in contenido) {
        localStorage.setItem(clave, contenido[clave]);
      }
      mostrar();
      alert("Datos importados correctamente.");
    } catch (err) {
      alert("Error al importar los datos.");
    }
  };
  reader.readAsText(file);
}

function abrirDialogo() {
  const dialog = document.getElementById('dialogo-servicio');
  dialog.showModal();

  const form = document.getElementById('formulario-servicio');
  form.onsubmit = function () {
    const servicio = document.getElementById("nuevo-servicio").value.trim();
    const version = document.getElementById("nueva-version").value.trim();

    if (servicio && version) {
      localStorage.setItem(servicio, version);
      mostrar();
      form.reset();
      dialog.close();
    } else {
      alert("Rellena ambos campos");
    }
  };
}

function cerrarDialogo() {
  const dialog = document.getElementById('dialogo-servicio');
  dialog.close();
}


window.onload = mostrar;

