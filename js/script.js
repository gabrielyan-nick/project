
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
