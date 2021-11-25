export const toBase64 = (file) => {
  if (file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = function () {
        resolve(fileReader.result);
      };

      fileReader.onerror = function () {
        reject("Error en la conversion a base64");
      };
    });
  }
};
