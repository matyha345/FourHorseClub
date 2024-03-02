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

const dataStagesSwiper = [
    {
        blocks: [
            { text: 'Строительство железнодорожной магистрали Москва-Васюки', span: 1 },
            { text: 'Открытие фешенебельной гостиницы «Проходная пешка» и других небоскрёбов', span: 2 }
        ]
    },
    {
        blocks: [
            { text: 'Поднятие сельского хозяйства в радиусе на тысячу километров: производство овощей, фруктов, икры, шоколадных конфет', span: 3 }
        ]
    },
    {
        blocks: [
            { text: 'Строительство дворца для турнира', span: 4 },
            { text: 'Размещение гаражей для гостевого автотранспорта', span: 5 }
        ]
    },
    {
        blocks: [
            { text: 'Постройка сверхмощной радиостанции для передачи всему миру сенсационных результатов', span: 6 }
        ]
    },
    {
        blocks: [
            { text: 'Создание аэропорта «Большие Васюки» с регулярным отправлением почтовых самолётов и дирижаблей во все концы света, включая Лос-Анжелос и Мельбурн', span: 7 }
        ]
    }
];

document.addEventListener("DOMContentLoaded", function () {
    loadContent("header", "/components/_header.html");
    loadContent("runningLine", "/components/_running-line.html");
    loadContent("stages", "/components/_stages.html");
    loadContent("runningLineFooter", "/components/_running-line.html");
    loadContent("footer", "/components/_footer.html");

    const createStagesSlider = () => {
        const results = document.getElementById("stagesSwiperResults");

        const createSlider = dataStagesSwiper.map((item) => {
            const blocksHTML = item.blocks.map((block) => `
                <div class="stages__aside-children">
                    <span class="children-span">${block.span}</span>
                    <span class="children-text">${block.text}</span>
                </div>
            `).join("");

            // Добавляем родительский элемент вокруг разметки слайда
            return `
                <div class="swiper-slide">
                    <div data-parent-element>
                        ${blocksHTML}
                    </div>
                </div>
            `;
        });

        results.innerHTML = createSlider.join("");
    };

    createStagesSlider()

    const stagesSwiper = new Swiper("#stagesSwiper", {
        slidesPerView: 1,

        pagination: {
            el: '.stages__paginator',
            clickable: true,
        },
        navigation: {
            nextEl: ".stages__next",
            prevEl: ".stages__prev",
        },
    })

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
                        bullet.classList.add('paginator-isActive');
                    } else {
                        bullet.classList.remove('paginator-isActive');
                    }
                });
            },
        },
    })

    const updatePaginatorContent = () => {

        const currentSlideIndexWidth = window.innerWidth <= 1280 ? 1 : 3

        const currentSlideIndex = swiper.realIndex + currentSlideIndexWidth;
        const totalSlides = swiper.slides.length;

        const paginatorContent = `${currentSlideIndex} <span>/</span> ${totalSlides}`;

        document.querySelectorAll('.paginator').forEach(paginator => {
            paginator.innerHTML = paginatorContent;
        });
    };

    updatePaginatorContent();
    swiper.on('slideChange', updatePaginatorContent);

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