export const toBase64 = async (file) => {
    if (file) {
        return await new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onloadend = function () {
                resolve(fileReader.result);
            };

            fileReader.onerror = function () {
                reject('Error en la conversion a base64');
            };
        });
    }
};
