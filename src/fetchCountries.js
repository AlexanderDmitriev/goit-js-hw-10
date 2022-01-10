import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const fetchCountries = name => {
  const searchParams = 'name,capital,population,flags,languages';
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=${searchParams}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Oops, there is no country with that name');
    })
    .catch(error => Notify.failure(error.message));
};
