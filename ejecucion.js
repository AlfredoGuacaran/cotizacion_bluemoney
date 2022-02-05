const child_process = require('child_process');
const fs = require('fs');

async function cotizar(
  archivo,
  nombreArchivo,
  extencionArchivo,
  indicadorInput,
  cantidadPesosInput
) {
  await child_process.exec(
    `node ${archivo} ${nombreArchivo} ${extencionArchivo} ${indicadorInput} ${cantidadPesosInput}`,
    (error, result) => {
      console.log('Cotizacion creada');

      fs.readFile(
        `${nombreArchivo}.${extencionArchivo}`,
        'utf-8',
        (error, data) => {
          console.log(data);
        }
      );
    }
  );
}

cotizar('cotizar.js', 'cotizacionExterna', 'txt', 'dolar', '20000');
