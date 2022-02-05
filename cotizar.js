//1 Toma y validacion de inputs
const [nombreArchivo, extencionArchivo, indicadorInput, cantidadPesosInput] =
  process.argv.slice(2);
const cantidadPesos = +cantidadPesosInput;

function errorInputs() {
  console.log(
    'Argumentos invadidos/incompletos ingrese nombreArchivo, extencionArchivo, indicador, cantidadPesos'
  );
  process.exit(1);
}
if (!nombreArchivo || !extencionArchivo || !indicadorInput || !cantidadPesos)
  return errorInputs();

if (typeof cantidadPesos !== 'number') return errorInputs();

//2 Peticion a la api

const { default: axios } = require('axios');
const fs = require('fs');

const linkApi = 'https://mindicador.cl/api';
(async function app() {
  async function getData(link) {
    return await (
      await axios.get(link)
    ).data;
  }
  const data = await getData(linkApi);
  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  //2.2 Chequeo y dato del indicavor
  const indicador = data[`${indicadorInput}`];
  const valorIndicador = Number(indicador?.valor);
  if (!valorIndicador) return console.log('Indicador no encontrado');

  //3 creando archivo
  fs.writeFile(
    `${nombreArchivo}.${extencionArchivo}`,
    `   A la fecha: ${date}-${month}-${year}
    Fue realizada cotización con los siguientes datos:
    Cantidad de pesos a convertir: ${cantidadPesos} pesos
    Convertido a "${indicadorInput}" da un total de: ${(
      cantidadPesos / valorIndicador
    ).toFixed(2)} (unidad de medida: ${indicador.nombre})
    `,
    'utf8',
    () => {
      console.log(
        `Cotizacion creada en el archivo ${nombreArchivo}.${extencionArchivo} Indicador: ${indicadorInput} Cantidad de pesos convertidos: ${cantidadPesos}`
      );
    }
  );
  // 4. enviando el contenido del archivo a consola
  fs.readFile(
    `${nombreArchivo}.${extencionArchivo}`,
    'utf-8',
    (error, data) => {
      console.log(data);
    }
  );
})();
