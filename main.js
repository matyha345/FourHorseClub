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
        const results = document.querySelector(".slider")

        const createSlider = dataSlider.map((item) => `
            <div class="slide">
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

    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    const showSlides = () => {
        const startIndex = currentIndex * 3;
        const endIndex = Math.min(startIndex + 3, slides.length);

        slides.forEach((slide, index) => {
            const isVisible = index = startIndex && index < endIndex;
            slide.style.transition = 'transform 0.5s ease';
            slide.style.transform = isVisible ? 'translateX(-315%)' : 'translateX(0)';
        });

        const paginators = document.querySelectorAll('.paginator');

        paginators.forEach((paginator, index) => {
            if (index === currentIndex) {
                paginator.classList.add('paginator-isActive');
            } else {
                paginator.classList.remove('paginator-isActive');
            }
        });

        prevBtn.disabled = currentIndex === 0 ? true : false;
        prevBtn.style.opacity = currentIndex === 0 ? "0.3" : "1";

        nextBtn.disabled = currentIndex === 0 ? false : true;
        nextBtn.style.opacity = currentIndex === 0 ? "1" : "0.3";
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= 1;
            showSlides();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < Math.ceil(slides.length / 3) - 1) {
            currentIndex += 1;
            showSlides();
        }
    });

    showSlides();





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
        showSlides();
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