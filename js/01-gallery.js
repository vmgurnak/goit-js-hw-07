// Задание 1 - галерея изображений

// Создай галерею с возможностью клика по её элементам и просмотра полноразмерного изображения в модальном окне. Посмотри демо видео работы галереи.

// Выполняй это задание в файлах 01-gallery.html и 01-gallery.js. Разбей его на несколько подзадач:

// 1. Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
// 2. Реализация делегирования на ul.gallery и получение url большого изображения.
// 3. Подключение скрипта и стилей библиотеки модального окна basicLightbox. Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
// 4. Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
// 5. Замена значения атрибута src элемента <img> в модальном окне перед открытием. Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.

// Разметка элемента галереи

// Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе <img>, и указываться в href ссылки. Не добавляй другие HTML теги или CSS классы кроме тех, что есть в этом шаблоне.

//  <li class="gallery__item">
//    <a class="gallery__link" href="large-image.jpg">
//      <img
//        class="gallery__image"
//        src="small-image.jpg"
//        data-source="large-image.jpg"
//        alt="Image description"
//      />
//    </a>
//  </li>;

// Обрати внимание на то, что изображение обернуто в ссылку, а значит при клике по умолчанию пользователь будет перенаправлен на другую страницу. Запрети это поведение по умолчанию.

// Закрытие с клавиатуры
// Этот функционал не обязателен при сдаче задания, но будет хорошей дополнительной практикой.
// Добавь закрытие модального окна по нажатию клавиши Escape. Сделай так, чтобы прослушивание клавиатуры было только пока открыто модальное окно. У библиотеки basicLightbox есть метод для программного закрытия модального окна.

import { galleryItems } from './gallery-items.js';
// Change code below this line

// 1. Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.

// Поиск ul.list
const container = document.querySelector('.gallery');
// console.log(container);

// Создание разметки, метод ma,p преобразование массива galleryItems, создание нового массива с элементом строки, деструктуризация объекта, метод join преобразование массива в строку

function createMarkup(arr) {
  // функция возвращает строку с разметкой
  return arr
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    )
    .join('');
}

// Добавление строки разметки в DOM дерево, метод insertAdjacentHTML, "beforebegin" - внутри elem, после всех детей
// Вызов функции reateMarkup(arr) с параметром galleryItems

container.insertAdjacentHTML('beforeend', createMarkup(galleryItems));

// 2. Реализация делегирования на ul.gallery и получение url большого изображения.
// 3. Подключение скрипта и стилей библиотеки модального окна basicLightbox. Используется CDN сервис jsdelivr, добавлены в проект ссылки на минифицированные (.min) файлы библиотеки.
// console.log(basicLightbox);

// Слушатель по click на ul.gallery, делегирование клика
container.addEventListener('click', handlerImageClick);

// Коллбєк-функция для клика
function handlerImageClick(evt) {
  // Сброс стандартных действий при клике
  evt.preventDefault();

  // Проверка, где делается клик по названию класса img - gallery__image
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }

  // Получение data атрибута(ссылка на оригинальное изображение) при клике
  // Деструктуризация data-source
  const { source } = evt.target.dataset;
  console.log(source);

  // Получение выбранного объекта при клике, метод Find поиск по атрбуту data-source
  const galleryItem = galleryItems.find(({ original }) => original === source);
  console.log(galleryItem);

  // Подключение модального окна с разметкой, библиотека basicLightbox
  const instance = basicLightbox.create(`
     <div class="modal">
        <img src="${galleryItem.original}" alt="${galleryItem.description}" width="1280">
     </div>
  `);

  //   console.log(instance);

  instance.show();

  // Закрытие модального окна клавишей Esc
  // Слушатель события нажатия клавиши
  document.addEventListener('keydown', handlerEsc);
  // Коллбэк-функция при нажатии клавиши с проверкой Esc
  function handlerEsc(evt) {
    if (evt.code === 'Escape') {
      console.log('Нажата клавиша Esc');
      //  Закрытие модального окна
      instance.close();
    }
  }
}

const instance = basicLightbox.create(`
     <div class="modal">
        <img src="${galleryItem.original}" alt="${galleryItem.description}" width="1280">
     </div>
  ` {onShow: (instance) => {}, onClose: (instance) => {}});

  instance.show()