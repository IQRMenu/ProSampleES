export async function fetchDishesList(sheetIdGlobal) {
  const sheetId = sheetIdGlobal;
  const proxyUrl = "https://menu-pro.interactivemenuqr.workers.dev";
  const type = 'tableGet';
  try {//если загрузиди с сервера
    let fullResponse = await fetch(`${proxyUrl}/${type}?${sheetId}`);
    let fullData = await fullResponse.json();
    const objectData = JSON.parse(fullData)
    const processedData = processData(objectData.values);
    console.log("v1");
    return processedData;
  } catch (error) {  // если с сервера нет ответа  
    const apiKey = "AIzaSyAoqUP1XTXL7Y5zXyQ9rfEgMy4d30qDC-Q"; // Вставь сюда API-ключ
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;
    try {//пытаемся загрузить с API таблицы
      let response = await fetch(url);
      let data = await response.json();
      console.log("v2");
      return processData(data.values); 
    } catch (error) {// если нет ответа  
      console.error("Ошибка загрузки данных:", error);
      return [];
    }
  }
}

// Функция обработки данных (без изменений)
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



