import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    fetchData("Sikar")
  }, []);

  function fetchData(city = "Sikar") {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=b87abf895c511c59dbf662c17d489357`)
      .then((respone) => respone.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch(error => {
        setError("error throw");
      })
  }

 const weatherIcon = () =>{
if (weatherData?.weather?.[0]?.description === "mist") {
  return <i className="fa-solid fa-smog mist"></i>
}

else if(weatherData?.weather?.[0]?.description === "clear sky"){
return <i className="fa-solid fa-sun sun_icon"></i>
}
else if(weatherData?.weather?.[0]?.description === "haze")
  return <i className="fa-solid fa-cloud-sun weather-icon"></i> }


  return (
    <>

      <div className='main md:max-w-[500px] w-screen m-auto md:p-7 text-center p-2'>
       
       <div className='input_div'>
       <i class="fa-solid fa-magnifying-glass serch"></i>
       <input type="text" placeholder='Enter Your City..'
          value={city}
          onInput={(e) => setCity(e.target.value)} onKeyDown={(e) => {
            if(e.key == "Enter"){
              fetchData(city)
            }
          }}
        />
       </div>

<div className='divv'>

  <p className='state_name'>{weatherData?.name} {weatherData?.sys?.country}</p>

<p className='md:text-lg text-sm time'>
  {time.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })} - {time.toLocaleTimeString()}
</p>

        <p className='weather'>{weatherData?.weather?.[0]?.description || "N/A"}</p>
        <div>{weatherIcon()}</div>
   
        <p className='temp'>{weatherData?.main?.temp || "N/A"}°C</p>

      <div className='min_max'>
      <p>Min : {weatherData?.main?.temp_min || "N/A"}</p>
      <p>Max : {weatherData?.main?.temp_max || "N/A"}</p>
      </div>

  <div className='flex justify-evenly feel_div w-[95%]'>
      <div className='dd'>
          <i className="fa-solid fa-droplet icon"></i>
          <p>feels like - {weatherData?.main?.feels_like|| "N/A"}</p>
      </div>
      <div className='dd'>
          <i className="fa-solid fa-droplet icon"></i>
          <p>Humidity - {weatherData?.main?.humidity|| "N/A"}</p>
      </div>
  </div>

        <div className='fle flex justify-evenly w-[95%]'>

          <div className='dd dd_secon'>
          <i className="fa-solid fa-wind icon"></i>
            <p>Wind - {weatherData?.wind?.speed|| "N/A"}m/s</p>
          </div>
          <div className='dd dd_secon'>
          <i className="fa-brands fa-slack icon"></i>
            <p>pressure - {weatherData?.main?.pressure|| "N/A"}</p>
          </div>
        </div>
</div>
        
      </div>
    </>
  )
}

export default App


