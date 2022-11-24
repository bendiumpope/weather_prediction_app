import Axios from 'axios';

const METRO_WEATHER_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const DROPDOWNOPTIONS = {
  umuahia: 'UMUAHIA',
  dallas: 'DALLAS',
  custom: 'CUSTOM'
};

export const WEATHERCODE = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'partly cloudy',
  3: 'overcast',
  45: 'Fog',
  48: 'depositing rime fog',
  51: 'Drizzle: Light',
  53: 'Drizzle: moderate',
  55: 'Drizzle: dense intensity',
  56: 'Freezing Drizzle: Light',
  57: 'Freezing Drizzle: dense intensity',
  61: 'Rain: Slight',
  63: 'Rain: moderate',
  65: 'Rain: heavy intensity',
  66: 'Freezing Rain: Light',
  67: 'Freezing Rain: heavy intensity',
  71: 'Snow fall: Slight',
  73: 'Snow fall: moderate',
  75: 'Snow fall: heavy intensity',
  77: 'Snow grains',
  80: 'Rain showers: Slight',
  81: 'Rain showers: moderate',
  82: 'Rain showers: violent',
  85: 'Snow showers slight',
  86: 'Snow heavy',
  95: 'Thunderstorm: Slight',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

export const DISPLAYTITLE = {
  day0: "TODAY's WEATHER FORCASTE",
  day1: "Next DAY's WEATHER FORCASTE",
  day2: "Next TWO DAY's WEATHER FORCASTE",
  day3: "Next THREE DAY's WEATHER FORCASTE",
  day4: "Next FOUR DAY's WEATHER FORCASTE",
};

//city:    latitude      longitude
  //Dallas:    32.78         -96.81
  //umuahia    5.52           7.49
  //Berlin     52.52          13.41
export const LOCATIONPOSITIONS = {
  dallas: {
    latitude: 32.78,
    longitude: -96.81
  },
  umuahia: {
    latitude: 5.52,
    longitude: 7.49
  }
};

export const getStartAndEndDate = () => {
    const EXPECTED_END_DATE_CONSTANT = 4 * 24 * 60 * 60 * 1000;
    
    const currentDate = new Date();
    const startDate = new Date().toISOString().slice(0, 10);
    const endDate = new Date(currentDate.getTime() + EXPECTED_END_DATE_CONSTANT).toISOString().slice(0, 10);

    return [startDate, endDate];
}
  
export const MarshalledWeatherData = (unMarshalledWeatherData) => {

    const { daily } = unMarshalledWeatherData;

    const marshalledWeatherData = {}

    Object.keys(daily).map((key) => {

      return daily[key].map((dailyKeyDetail, index) => {

        if (!marshalledWeatherData[`day${index}`]){
          marshalledWeatherData[`day${index}`] = {};
          marshalledWeatherData[`day${index}`][key] = dailyKeyDetail
        } else {
          marshalledWeatherData[`day${index}`][key] = dailyKeyDetail
        }
      })
    });

    return marshalledWeatherData;
};
  
export const getWeatherForcaste = async (location) => {

    const [startDate, endDate] = getStartAndEndDate();
    
    const weatherResponse = await Axios.get(
      `${METRO_WEATHER_BASE_URL}?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset,windspeed_10m_max,winddirection_10m_dominant,weathercode&timezone=auto&start_date=${startDate}&end_date=${endDate}`
    );

    return [MarshalledWeatherData(weatherResponse.data), weatherResponse.data.daily_units];
    
};
  
export const convertTime = (ISOTime) => {

  const time = ISOTime.split('T')[1];
  const hour = Number(time.split(':')[0]);
  const munite = time.split(':')[1];

  return hour === 12 ? `${time} PM`: hour > 12 ? `${hour - 12}:${munite} PM` : `${time} AM`;
}