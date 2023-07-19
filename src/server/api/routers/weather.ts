import { type } from "arktype";
import json from "./weather.json";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const weather = type({
  latitude: "number",
  longitude: "number",
  generationtime_ms: "number",
  utc_offset_seconds: "number",
  timezone: "string",
  timezone_abbreviation: "string",
  elevation: "number",
  current_weather: {
    temperature: "number",
    windspeed: "number",
    winddirection: "number",
    weathercode: "number",
    is_day: "number",
    time: "number",
  },
  hourly_units: {
    time: "string",
    temperature_2m: "string",
    apparent_temperature: "string",
    precipitation: "string",
    weathercode: "string",
    windspeed_10m: "string",
  },
  hourly: {
    time: "number[]",
    temperature_2m: "number[]",
    apparent_temperature: "number[]",
    precipitation: "number[]",
    weathercode: "number[]",
    windspeed_10m: "number[]",
  },
  daily_units: {
    time: "string",
    weathercode: "string",
    temperature_2m_max: "string",
    temperature_2m_min: "string",
    apparent_temperature_max: "string",
    apparent_temperature_min: "string",
    precipitation_sum: "string",
  },
  daily: {
    time: "number[]",
    weathercode: "number[]",
    temperature_2m_max: "number[]",
    temperature_2m_min: "number[]",
    apparent_temperature_max: "number[]",
    apparent_temperature_min: "number[]",
    precipitation_sum: "number[]",
  },
});

const getWeather = async (
  longitude: number,
  latitude: number,
  timeZone: string
) => {
  if (env.NODE_ENV !== "production") {
    return weather.assert(json);
  }
  return weather.assert(
    await fetch(
      `${env.WEATHER_API_URL}&longitude=${longitude}&latitude=${latitude}&timezone=${timeZone}`
    ).then((r) => r.json())
  );
};

export const weatherRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      type({ latitude: "number", longitude: "number", timeZone: "string" })
        .assert
    )
    .query(async ({ input: { latitude, longitude, timeZone } }) => {
      const data = await getWeather(longitude, latitude, timeZone);
      return parseWeather(data);
    }),
});

const parseWeather = (data: typeof weather.infer) => {
  const { daily, current_weather, hourly } = data;
  const {
    apparent_temperature_max: [maxFeelsLike],
    apparent_temperature_min: [minFeelsLike],
    precipitation_sum: [precip],
    temperature_2m_max: [maxTemp],
    temperature_2m_min: [minTemp],
  } = daily;

  const {
    apparent_temperature,
    precipitation,
    temperature_2m,
    time,
    weathercode,
    windspeed_10m,
  } = hourly;

  const {
    temperature: currentTemp,
    weathercode: iconCode,
    winddirection: windDirection,
    windspeed: windSpeed,
  } = current_weather;

  return {
    current: {
      currentTemp,
      highFeelsLike: Math.round(maxFeelsLike || 0),
      highTemp: Math.round(maxTemp || 0),
      iconCode,
      lowFeelsLike: Math.round(minFeelsLike || 0),
      lowTemp: Math.round(minTemp || 0),
      precip,
      windSpeed,
      windDirection,
    },
    daily: daily.time.map((t, i) => ({
      timestamp: t * 1000,
      iconCode: daily.weathercode[i],
      maxTemp: daily.temperature_2m_max[i],
    })),
    hourly: time
      .map((h, i) => ({
        timestamp: h * 1000,
        iconCode: weathercode[i],
        temp: Math.round(temperature_2m[i] || 0),
        feelsLike: Math.round(apparent_temperature[i] || 0),
        windSpeed: Math.round(windspeed_10m[i] || 0),
        precip: Math.round((precipitation[i] || 0) * 100) / 100,
      }))
      .filter(({ timestamp }) => timestamp >= current_weather.time * 1000),
  };
};
