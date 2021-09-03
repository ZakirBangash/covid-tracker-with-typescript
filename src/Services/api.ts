import { covid_types, countryInfo } from "../Types/covid_types";

export const FetchDaily = async (prop?: String) => {
    let url = 'https://covid19.mathdro.id/api';
    if (prop) {
        url = `${url}/countries/${prop}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        let { confirmed, recovered, deaths } = data;

        const modifyData: covid_types = {
            confirmed: confirmed.value,
            deaths: deaths.value,
            recovered: recovered.value
        }
        return modifyData;

    } catch (error) {
        console.log(error)
    }

}


export const FetchDailyChart = async () => {

    let url = 'https://covid19.mathdro.id/api/daily';

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error)
    }

}





export const FetchCountry = async () => {

    try {
        const response = await fetch("https://covid19.mathdro.id/api/countries");
        const { countries } = await response.json();
        const arrayOfCountries: countryInfo[] = countries.map((ind: countryInfo) => ind)
        return arrayOfCountries;
    } catch (error) {
        console.log(error)
    }

}