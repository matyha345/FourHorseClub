const dataSlider = [
    {
        image: './images/image/avatar.png',
        title: 'Хозе-Рауль Капабланка',
        text: 'Чемпион мира по шахматам'
    },
    {
        image: './images/image/avatar.png',
        title: 'Эммануил Ласкер',
        text: 'Чемпион мира по шахматам'
    },
    {
        image: './images/image/avatar.png',
        title: 'Александр Алехин',
        text: 'Чемпион мира по шахматам'
    },
    {
        image: './images/image/avatar.png',
        title: 'Арон Нимцович',
        text: 'Чемпион мира по шахматам'
    },
    {
        image: './images/image/avatar.png',
        title: 'Рихард Рети',
        text: 'Чемпион мира по шахматам'
    },
    {
        image: './images/image/avatar.png',
        title: 'Остап Бендер',
        text: 'Чемпион мира по шахматам'
    },

]

document.addEventListener("DOMContentLoaded", function () {
    loadContent("header", "/components/_header.html");
    loadContent("runningLine", "/components/_running-line.html");
    loadContent("runningLineFooter", "/components/_running-line.html");
    loadContent("footer", "/components/_footer.html");


    const createDataSlider = () => {
        const results = document.getElementById("mainSwiperResults")

        const createSlider = dataSlider.map((item) => `
            <div class="swiper-slide">
                <div class="slide__body">
                    <picture class="slide__images">
                        <img src="${item.image}" alt="Аватарка пользователя">
                    </picture>
                    <h3 class="slide__title">${item.title}</h3>
                    <p class="slide__text">${item.text}</p>
                    <div class="slide__button">Подробнее</div>
                </div>
            </div>
        `)

        results.innerHTML = createSlider.join("")
    }
    createDataSlider()


    const swiper = new Swiper("#mainSwiper", {

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index * 3 + 1) + '</span>';
            },
        },
        slidesPerGroup: 3,
        slidesPerView: 3,
        navigation: {
            nextEl: ".next",
            prevEl: ".prev",
        },

        breakpoints: {
            1366: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            280: {
                slidesPerView: 1,
                slidesPerGroup: 1,
            }
        },
        on: {
            slideChange: function () {
                const swiper = this;
                const bullets = document.querySelectorAll('.paginator');
                const currentIndex = swiper.activeIndex;
                bullets.forEach((bullet, index) => {
                    if (index * 3 <= currentIndex && currentIndex < (index + 1) * 3) {
                        bullet.classList.add('paginator-isActive'); // Добавляем класс активного пагинатора
                    } else {
                        bullet.classList.remove('paginator-isActive');
                    }
                });
            },
        },
    })

    const updatePaginatorContent = () => {
        const currentSlideIndex = swiper.realIndex + 1; // Увеличиваем на 1, так как индексация начинается с 0
        const totalSlides = swiper.slides.length;

        const paginatorContent = `${currentSlideIndex} <span>/</span> ${totalSlides}`;

        document.querySelectorAll('.paginator').forEach(paginator => {
            paginator.innerHTML = paginatorContent;
        });
    };

    // Вызываем функцию при инициализации и при изменении слайда
    updatePaginatorContent();
    swiper.on('slideChange', updatePaginatorContent);

    // Вызываем функцию при инициализации и изменении размеров окна
    updatePaginatorContent();
    window.addEventListener('resize', updatePaginatorContent);





    var mediaRequestText = document.getElementById("media--request")
    var mediaRequestTextChange = document.getElementById("media--request-change")


    const changeText = () => {
        if (window.innerWidth >= 440) {
            mediaRequestText.textContent = "Стоимость входных билетов:";
            mediaRequestTextChange.textContent = 'Плата за игру:'
        } else {
            mediaRequestText.textContent = "Плата за игру:";
            mediaRequestTextChange.textContent = 'Стоимость входных билетов:'
        }
    }

    changeText();

    window.addEventListener('resize', () => {
        changeText();
    });




})


// Этот скрипт выполняет асинхронную загрузку содержимого файла.
// elementId (идентификатор элемента, в который будет вставлен контент) 
// и contentFile (путь к файлу с контентом).
async function loadContent(elementId, contentFile) {
    try {
        const response = await fetch(contentFile); // Выполняем GET запрос
        if (!response.ok) { // Проверяем, успешно ли выполнился запрос
            throw new Error('Network response was not ok');
        }
        const data = await response.text(); // Получаем текст ответа
        document.getElementById(elementId).innerHTML = data; // Вставляем текст в указанный элемент
    } catch (error) {
        console.error('Error fetching content:', error);
    }
}