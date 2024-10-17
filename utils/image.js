function getFilePath(file){
  const filePath = file.path;

  // Reemplaza las barras invertidas (\) por barras normales (/)
  const normalizedPath = filePath.replace(/\\/g, '/');

  // Divide la ruta por las barras normales
  const fileSplit = normalizedPath.split('/');

  // Extraer el nombre de la carpeta y el archivo y unirlos en una sola cadena
  const result = `${fileSplit[fileSplit.length - 2]}/${fileSplit[fileSplit.length - 1]}`;

  console.log(result); // Muestra 'avatar/tQmt_bLoZYYCjFRqtXolnT9s.jpg' en la consola
  return result;
}

module.exports = {
  getFilePath,
};