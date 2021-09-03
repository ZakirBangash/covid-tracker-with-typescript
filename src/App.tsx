import { useEffect, useState } from 'react'
import './App.css';
import Linee from './components/Charts';
import CountryPicker from './components/CountryPicker';
import NavBar from './components/Navbar';
import FullWidthGrid from './components/Paper';
import { FetchDaily }  from './Services/api';
import { covid_types } from './Types/covid_types'


function App() {

  const [covidData, setcovidData] = useState<covid_types | undefined>();
  const [country, setcountry] = useState('')

  useEffect(() => {

      const fetchData = async () => {
      const Fetchdata = await FetchDaily();
      setcovidData(Fetchdata);
    }
    fetchData();
  }, [])

   const handleCountryChange = async (country : string) => {
     const data = await FetchDaily(country);
     setcovidData(data);
     setcountry(country);
   }

  return (
    <div className="App">

      <NavBar />
      <FullWidthGrid confirmed={covidData?.confirmed!} recovered={covidData?.recovered!} deaths={covidData?.deaths!} />
      <CountryPicker callback={handleCountryChange} />
      <Linee confirmed={covidData?.confirmed!} recovered={covidData?.recovered!} deaths={covidData?.deaths!} country={country}  />

    </div>

  );
}

export default App;