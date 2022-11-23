import { useState, useEffect } from 'react';
import DropDown from './components/DropDown';
import Button from './components/Button';
import TextInput from './components/TextInput';
import Table from './components/Table';
import { getWeatherForcaste, LOCATIONPOSITIONS, WEATHERCODE, DISPLAYTITLE, convertTime } from './utils/helpers';
import classes from './App.module.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();



function App() {

  const [weatherData, setWeatherData] = useState({});
  const [weatherUnites, setWeatherUnits] = useState({});
  const [inputState, setInputState] = useState(true);
  const [city, setCity] = useState('dallas');
  const [location, setLocation] = useState({
    latitude: 32.78,
    longitude: -96.81
  });
  const [loading, setLoading] = useState(false);
  const [toastState, setToastState] = useState('');

  useEffect(() => {
    if (city !== 'custom') {
      setInputState(true);
      setLocation(LOCATIONPOSITIONS[city])
    } else {
      setLocation({
    latitude: 0,
    longitude: 0
  })
      setInputState(false);
    }
  },[city])

  
  const seeWeatherForcasteHandler = async () => {
    setLoading(true);
    try {
      const [marshalledWeatherData, daily_units] = await getWeatherForcaste(location);
      setWeatherData(marshalledWeatherData);
      setWeatherUnits(daily_units);
    } catch (error) {
      console.log(error.response.data.reason);
      setToastState(error.response.data.reason)
    }
    setLoading(false);
  }

  const customLocationHandler = (event) => {
    setLocation({
      ...location,
      [event.target.name]: event.target.value
    })
  }

  if (toastState) {
    console.log(toastState)
    toast.error(toastState);

    setToastState('')
  }
  
  return (
    <div className={classes.app}>
      <div className={classes.appHeader}>
        <div className={classes.dropDownDiv}>
          <DropDown setCity={setCity} value={ city } />
          <Button className={classes.button} onClick={seeWeatherForcasteHandler} loading={loading} loadingText='Loading...' buttonText='See weather forecast' />
        </div>
      </div>
      {!inputState && <div className={ classes.inputDiv }>
          <TextInput placeholder='latitude' label='Latitude' type='number' disabled={inputState} value={location.latitude} name='latitude' onChange={ customLocationHandler } />
          <TextInput placeholder='longitude' label='Longitude' type='number' disabled={inputState} value={location.longitude} name='longitude' onChange={ customLocationHandler } />
        </div>}
      <div className={classes.outputDiv}>
        {Object.keys(weatherData).map((key) => {

          const row = {
            weathercode: WEATHERCODE[weatherData[key].weathercode],
            temperature_2m_max: `${weatherData[key].temperature_2m_max} ${ weatherUnites.temperature_2m_max }`,
            temperature_2m_min: `${weatherData[key].temperature_2m_min} ${ weatherUnites.temperature_2m_min }`,
            precipitation_sum: `${weatherData[key].precipitation_sum} ${ weatherUnites.precipitation_sum }`,
            sunrise: convertTime(weatherData[key].sunrise),
            sunset: convertTime(weatherData[key].sunset),
            windspeed_10m_max: `${weatherData[key].windspeed_10m_max} ${ weatherUnites.windspeed_10m_max }`,
            winddirection_10m_dominant: `${weatherData[key].winddirection_10m_dominant}${ weatherUnites.winddirection_10m_dominant }`,
          }

         return ( <div key={key} className={classes.resDiv}>
            <h2>
              {`${DISPLAYTITLE[key]} Date: ${weatherData[key].time}`}
           </h2>
           <Table row={row} />
          </div>)
        })}
      </div>
    </div>
  );
}

export default App;
