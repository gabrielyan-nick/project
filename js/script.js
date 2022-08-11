/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const movieDB = {
      movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против...",
      ],
    },
    advBlock = document.querySelectorAll(".promo__adv img"),
    promoBg = document.querySelector(".promo__bg"),
    movieList = document.querySelector(".promo__interactive-list"),
    promoGenre = promoBg.querySelector(".promo__genre"),
    form = document.querySelector(".add"),
    formCheckbox = form.querySelector('[type="checkbox"]'),
    formInput = form.querySelector(".adding__input"),
    newGenre = document.createElement("li"),
    genreMenu = document.querySelector(".promo__menu-list ul"),
    delAdv = (arr) => {
      arr.forEach((item) => {
        item.remove();
      });
    },
    makeChanges = () => {
      promoGenre.textContent = "Драма";
      promoBg.style.backgroundImage = 'url("../img/bg.jpg")';
    },
    addGenre = (genre) => {
      newGenre.innerHTML = `<li><a class="promo__menu-item" href="#">${genre}</a></li>`;
      genreMenu.append(newGenre);
    },
    createMovieList = (films, parent) => {
        sortArr(films);
      parent.innerHTML = "";
 
      films.forEach((film, i) => {
        parent.innerHTML += `<li class="promo__interactive-item">${
          i + 1
        }. ${film}<div class="delete"></div></li>`;
      });

      document.querySelectorAll(".delete").forEach((btn, i) => {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            films.splice(i, 1);
            createMovieList(films, parent);
        });
      });

    },
    sortArr = (arr) => {
      arr.sort();
    };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let newFilm = formInput.value;
    const favorite = formCheckbox.checked;

    if (newFilm) {
      if (newFilm.length > 21) {
        newFilm = `${newFilm.substr(0, 21)}...`;
      }
      if (favorite) {
        console.log("Добавляем любимый фильм");
      }

      movieDB.movies.push(newFilm);
      sortArr(movieDB.movies);
      createMovieList(movieDB.movies, movieList);
      e.target.reset();
    }
  });

  createMovieList(movieDB.movies, movieList);
  delAdv(advBlock);
  makeChanges();
  addGenre("Спорт");
});
