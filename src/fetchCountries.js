import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './refs';

export const fetchCountries = name => {
  const searchParams = 'name,capital,population,flags,languages';
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=${searchParams}`).then(
    response => {
      if (!response.ok) {
        Notify.failure('Oops, there is no country with that name');
        refs.countryInfo.innerHTML = '';
      }
      return response.json();
    },
  );
  //.catch(Notify.failure('Oops, there is no country with that name'));
};
