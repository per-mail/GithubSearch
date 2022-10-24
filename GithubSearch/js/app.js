const mainEl = document.querySelector('.main');
const wrapper = document.createElement('div')

const formEl = document.createElement('form');
formEl.addEventListener('submit', async (e) => {
  // сбрасываем стандартное поведение формы в браузере, чтобы при нажатии на кнопку поиск страница не обглвилась
  e.preventDefault();
  // забираем все значения из формы(полученные данные) в один обьект переменную inputsValue в виде массива массивов(двухуровневого)
  const inputsValue = Object.fromEntries(new FormData(e.target));
  // inputsValue.name - данные которые ввёл пользователь
  // ` - обратные кавычки нужны, чтобы работал код
  const response = await fetch(`
    https://api.github.com/users/${inputsValue.name}
  `);

  if (response.ok) {
    const data = await response.json();
    wrapper.appendChild(createProfileEl(data))
    mainEl.appendChild(wrapper);
 // удаляем значения в inputEl
    inputEl.value = '';
  } else {
    alert("Пользователь не найден")
  }
})

const inputEl = document.createElement('input');
// добавляем к inputEl класс  classList при помощи метода add
inputEl.classList.add('search-input');
// добавляем к inputEl атрибут name' с типом name при помощи метода setAttribute
inputEl.setAttribute('name', 'name')

const searchButtonEl = document.createElement('button')
searchButtonEl.classList.add('search-button');
// добавляем к inputEl класс  атрибуты 'type' с типом submit, этот тип нужен чтобы кнопка сработала приклике,  при помощи метода setAttribute
searchButtonEl.setAttribute('type', 'submit');
// задаём значение кнопки
searchButtonEl.innerHTML = "Поиск";

// добавляем к форме formEl кнопку searchButtonEl и поле ввода inputEl
formEl.appendChild(inputEl);
formEl.appendChild(searchButtonEl);
// добавляем форму formEl к mainEl
mainEl.appendChild(formEl);

// создаём карточку добавляем в неё div при помощи reateProfileEl и помещаем его в переменную
function createProfileEl(profileData) {
  const element = document.createElement('div');
  // добавляем в div элемент profile
  element.classList.add('profile');
  // добавляем в element код, то из чего будет состоять profile
  // profileData - берём из data из response - запроса
  element.innerHTML = `
    <img class="search-image" src=${profileData.avatar_url}></img>
    <p class="search-text"><span>Имя: </span>${profileData.name}</p>
    <p class="search-text"><span>Город: </span>${profileData.location}</p>
    <p class="search-text"><span>О себе: </span>${profileData.bio}</p>
  `
  // добавляем к форме кнопку удалить
  element.appendChild(createDeleteBtnEl())
  return element;
}
// добавляем кнопку удалить
function createDeleteBtnEl() {
  const element = document.createElement('button');
  element.classList.add('delete-button');
  element.innerText = "Удалить";
  element.addEventListener('click', (e) => {
    wrapper.innerHTML = ''
  })

  return element
}