// https://script.google.com/macros/s/AKfycbwmM5d62aYv1p_ybR5i8l7lmHmUlxBZ2BrhZGnrYcqHOvbXJobGRp801BPgbdo_o5OV/exec - Pranzo
// https://script.google.com/macros/s/AKfycbzebC0Dsz3W8Gmsq_FDbr0QDcsusV-pGn5PxkL1FtGUGPO7q0aFebuJH1SFYzak9qs2Gw/exec - Sample
export async  function fetchDishesList() {
  const sheetId = "1luJmbsWfP-CtN16VV4grYt2MuAH1iRwVhnu6qez4EcI"; // ID твоей таблицы
  const apiKey = "AIzaSyAoqUP1XTXL7Y5zXyQ9rfEgMy4d30qDC-Q"; // Вставь сюда API-ключ
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    
    return processData(data.values); // Конвертируем в удобный формат
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
    return [];
  }
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

