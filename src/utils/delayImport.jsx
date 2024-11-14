export const delayImport = (importFunction, delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(importFunction());
        }, delay);
    });
};