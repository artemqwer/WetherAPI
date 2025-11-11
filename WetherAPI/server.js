const express = require("express");
const app = express();
const axios = require("axios");

const API_KEY = "c0822c0a12193f47952ee7902af330a1"; 

// 1️⃣ Додаємо це перед усіма маршрутами
app.use(express.static('public'));

// 2️⃣ Маршрут для погоди
app.get("/weather", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).send("Enter city name, e.g. /weather?city=London");
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    res.json({
      city: response.data.name,
      temp: response.data.main.temp + "°C",
      weather: response.data.weather[0].description
    });

  } catch (error) {
    res.status(500).send("City not found or API error");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
