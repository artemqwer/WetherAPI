// Отримуємо елементи зі сторінки за id — поле вводу, кнопку і блок для результату
const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeather');
const resultDiv = document.getElementById('result');

// Додаємо обробник натискання на кнопку — коли користувач клікає, викликається функція getWeather
getWeatherBtn.addEventListener('click', getWeather);

// Основна асинхронна функція, яка виконує запит на наш сервер і показує результат
async function getWeather() {
  // Зчитуємо значення з input і прибираємо зайві пробіли з обох кінців
  const city = cityInput.value.trim();

  // Якщо поле порожнє — показуємо повідомлення і припиняємо виконання
  if (!city) {
    resultDiv.innerText = 'Введіть назву міста, будь ласка.';
    return;
  }

  // Показуємо користувачеві, що йде запит (фідбек)
  resultDiv.innerText = 'Завантаження...';

  try {
    // Виконуємо GET-запит до нашого бекенду: /weather?city=NAME
    // fetch повертає проміс — тут ми чекаємо на завершення мережевого запиту
    const response = await fetch(`/weather?city=${encodeURIComponent(city)}`);

    // Якщо статус відповіді не в діапазоні 200–299, викидаємо помилку щоб зайти в catch
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    // Розпарсуємо тіло відповіді як JSON (передбачаємо, що сервер повертає JSON)
    const data = await response.json();

    // Якщо сервер повернув поле error — показуємо його; інакше форматовано виводимо дані
    if (data.error) {
      resultDiv.innerText = `Помилка: ${data.error}`;
    } else {
      resultDiv.innerText =
        `Місто: ${data.city}\nТемпература: ${data.temp}\nПогода: ${data.weather}`;
    }
  } catch (err) {
    // Всі помилки (мережа, JSON, 404 і т.д.) потрапляють сюди — показуємо дружнє повідомлення
    console.error('Fetch error:', err);
    resultDiv.innerText = 'Сталася помилка при отриманні погоди. Спробуйте пізніше.';
  }
}
