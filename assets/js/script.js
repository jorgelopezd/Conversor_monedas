const urlBase = "https://mindicador.cl/api";
const selectMoneda = document.getElementById("select-moneda");
const inputPesos = document.getElementById("input-pesos");
const btn = document.getElementById("btn");
const resultadoSpan = document.getElementById("resultado-span");
const graficoCanvas = document.getElementById("grafico");

// Función para obtener los tipos de cambio desde mindicador.cl
const obtenerTiposDeCambio = async () => {
  try {
    const response = await fetch(urlBase);
    if (!response.ok) {
      throw new Error("Error al obtener tipos de cambio");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error al obtener tipos de cambio: " + error.message);
  }
};
// Función para calcular el cambio y mostrarlo en el DOM
const calcularCambio = (tipoMoneda, montoCLP) => {
  const tiposDeCambio = obtenerTiposDeCambio();
  tiposDeCambio.then(data => {
    const tipoCambio = data[tipoMoneda].valor;
    const resultado = montoCLP / tipoCambio;
    resultadoSpan.textContent = resultado.toFixed(2);
  }).catch(error => {
    resultadoSpan.textContent = "Error en el cálculo";
    console.error(error.message);
  });
};
// Agregar evento click al botón
btn.addEventListener("click", () => {
  const tipoMoneda = selectMoneda.value;
  const montoCLP = parseFloat(inputPesos.value);
  calcularCambio(tipoMoneda, montoCLP);
});