// https://script.google.com/macros/s/AKfycbwmM5d62aYv1p_ybR5i8l7lmHmUlxBZ2BrhZGnrYcqHOvbXJobGRp801BPgbdo_o5OV/exec - Pranzo
// https://script.google.com/macros/s/AKfycbzebC0Dsz3W8Gmsq_FDbr0QDcsusV-pGn5PxkL1FtGUGPO7q0aFebuJH1SFYzak9qs2Gw/exec - Sample
export function fetchDishesList() {
  return fetch('https://script.google.com/macros/s/AKfycbwmM5d62aYv1p_ybR5i8l7lmHmUlxBZ2BrhZGnrYcqHOvbXJobGRp801BPgbdo_o5OV/exec')
    .then(response => {
      if (!response.ok) {
        throw new Error('Сеть ответила с ошибкой: ' + response.status);
      }
      // Преобразуем ответ в JSON
      return response.json();
    })
    .then(data => {
      return processData(data);
    })
    .catch(error => {
      console.error('Ошибка:', error);
      return [];
    });
}


function processData(data) {
  const keys = data[0];
  const objectsArray = data.slice(2).map(row => {
    let obj = {};
    row.forEach((value, index) => {
      obj[keys[index]] = value;
    });
    return obj;
  });
  return objectsArray;
}
