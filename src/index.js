/*
    1. Напиши функцию fetchCountries(name) которая делает HTTP-запрос на ресурс name 
и возвращает промис с массивом стран - результатом запроса. 

    2. Вынеси её в отдельный файл fetchCountries.js и сделай именованный экспорт.

    3. В ответе от бэкенда возвращаются объекты, большая часть свойств которых тебе не пригодится.
 Чтобы сократить объем передаваемых данных добавь строку параметров запроса - 
 так этот бэкенд реализует фильтрацию полей. Ознакомься с документацией синтаксиса фильтров. Тебе нужны 
 только следующие свойства:

name.official - полное имя страны
capital - столица
population - население
flags.svg - ссылка на изображение флага
languages - массив языков

    4.Название страны для поиска пользователь вводит в текстовое поле input#search-box. 
    HTTP-запросы выполняются при наборе имени страны, то есть по событию input. 
    Но, делать запрос при каждом нажатии клавиши нельзя, так как одновременно получится много запросов и
     они будут выполняться в непредсказуемом порядке.Необходимо применить приём Debounce 
     на обработчике события и делать HTTP-запрос спустя 300мс после того, 
     как пользователь перестал вводить текст. Используй пакет lodash.debounce.

    5. Если пользователь полностью очищает поле поиска, то HTTP-запрос не выполняется, 
    а разметка списка стран или информации о стране пропадает.

    6. Выполни санитизацию введенной строки методом trim(), 
    это решит проблему когда в поле ввода только пробелы или они есть в начале и в конце строки.

    7. Если результат запроса это массив с одной страной, 
    в интерфейсе отображается разметка карточки с данными о стране: флаг, название, столица, население и языки.

    8. Если бэкенд вернул от 2-х до 10-х стран, под тестовым полем отображается список найденных стран. 
    Каждый элемент списка состоит из флага и имени страны.

    9.Если в ответе бэкенд вернул больше чем 10 стран, в интерфейсе пояляется уведомление о том, 
    что имя должно быть более специфичным. Для уведомлений используй библиотеку notiflix и выводи 
    такую строку "Too many matches found. Please enter a more specific name."

    10. Если пользователь ввёл имя страны которой не существует, бэкенд вернёт не пустой массив, 
    а ошибку со статус кодом 404 - не найдено. Если это не обработать, то пользователь никогда не узнает 
    о том, что поиск не дал результатов. Добавь уведомление "Oops, there is no country with that name" 
    в случае ошибки используя библиотеку notiflix.

    11. Не забывай о том, что fetch не считает 404 ошибкой, поэтому необходимо явно отклонить промис 
    чтобы можно было словить и обработать ошибку.
*/
import './css/styles.css';
import singleCardTpl from '../src/singleCardInformation.hbs';
import multiCardTpl from '../src/multiCardInformation.hbs';
import { fetchCountries } from '../src/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { refs } from './refs';

const DEBOUNCE_DELAY = 300;

const searchingInputHandler = event => {
  let counrtyName = event.target.value.trim();

  fetchCountries(counrtyName).then(country => {
    if (country != undefined) {
      if (country.length === 1) {
        refs.countryInfo.innerHTML = singleCardTpl(...country);
      } else if (country.length > 1 && country.length < 11) {
        refs.countryInfo.innerHTML = multiCardTpl(country);
      } else {
        refs.countryInfo.innerHTML = '';
        Notify.info('Too many matches found. Please enter a more specific name.');
      }
    } else refs.countryInfo.innerHTML = '';
  });
};

refs.searchingInput.addEventListener('input', debounce(searchingInputHandler, DEBOUNCE_DELAY));
