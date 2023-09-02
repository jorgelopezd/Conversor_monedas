//se declara la varialbe fuera del evento para que al momento de cargar la pagina este disponble en la funcion obetenertipodecambio
const urlBase = "https://mindicador.cl/api";

document.addEventListener("DOMContentLoaded", () => {
  const inputPesos = document.getElementById("input-pesos");
  const selectMoneda = document.getElementById("select-moneda");
  const resultadoSpan = document.getElementById("resultado-span");
  const btn = document.getElementById("btn");
  const tiposDeCambio = {};

  //funcion asincronica tipo de cambio
  async function obtenerTiposDeCambio() {
    try {
      const response = await fetch(`${urlBase}`);
      const data = await response.json();

      tiposDeCambio.dolar = data.dolar.valor;
      tiposDeCambio.uf = data.uf.valor;
    } catch (error) {
      console.error("Error al obtener tipos de cambio:", error);
      resultadoSpan.textContent = "Error al obtener tipos de cambio";
    }
  }

  //evento con validaciones y realiza calculos con el tipo de moneda selecionado
  btn.addEventListener("click", () => {
    const montoCLP = parseFloat(inputPesos.value);
    const monedaSeleccionada = selectMoneda.value;

    if (isNaN(montoCLP) || montoCLP <= 0) {
      resultadoSpan.textContent = "Ingrese un monto válido";
      return;
    }

    if (monedaSeleccionada === "dolar") {
      const montoUSD = montoCLP / tiposDeCambio.dolar;
      resultadoSpan.textContent = montoUSD.toFixed(2) + " USD";
    } else if (monedaSeleccionada === "uf") {
      const montoUF = montoCLP / tiposDeCambio.uf;
      resultadoSpan.textContent = montoUF.toFixed(2) + " UF";
    } else {
      resultadoSpan.textContent = "Seleccione una moneda válida";
    }
  });

  obtenerTiposDeCambio();
});

//grafico
