const urlBase = "https://mindicador.cl/api";
const inputPesos = document.getElementById('input-pesos');
const selectMoneda = document.getElementById('select-moneda');
const btnBuscar = document.getElementById('btn');
const resultadoSpan = document.getElementById('resultado-span');

async function obtenerTiposDeCambio() {
  try {
    const response = await fetch(`${urlBase}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los tipos de cambio:', error);
    throw error;
  }
}

btnBuscar.addEventListener('click', async () => {
  const cantidadPesos = parseFloat(inputPesos.value);
  const monedaSeleccionada = selectMoneda.value;

  try {
    const tiposDeCambio = await obtenerTiposDeCambio();

    if (!tiposDeCambio[monedaSeleccionada]) {
      throw new Error('Moneda seleccionada no encontrada.');
    }

    const valorMoneda = tiposDeCambio[monedaSeleccionada].valor;
    const conversion = cantidadPesos / valorMoneda;

    resultadoSpan.textContent = conversion.toFixed(2);

  } catch (error) {
    console.error('Error al realizar la conversión:', error);
    resultadoSpan.textContent = 'Error al realizar la conversión';
  }
});
