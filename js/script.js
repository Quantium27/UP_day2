var site = document.getElementById("site");

$('#up-button').click(function () {
    site.scrollTo({top: 0, behavior: 'smooth'});
    return false;
});

site.onscroll = function (e) {
    setScrollClass(site.scrollTop);
};
setScrollClass(site.scrollTop);

function setScrollClass(scrollValue) {
    if(scrollValue <= 50) {
        $(site).toggleClass('at-top', true);
    } else {
        $(site).toggleClass('at-top', false);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    $(".slider").each(function() {
        new ChiefSlider(this);
    });
});

//
// ЧАТ_БОТ
//

const configChatbot = {};
// CSS-селектор кнопки, посредством которой будем вызывать окно диалога с чат-ботом
configChatbot.btn = '.chatbot__btn';
// ключ для хранения отпечатка браузера
configChatbot.key = 'fingerprint';
// реплики чат-бота
configChatbot.replicas = {
    bot: {
        0: {
            content: 'Привет! Я Квантум - бот поддержки сайта <a href="https://praktika.neonc.ru" target="_blank">praktika.neonc.ru</a>', human: [0, 1, 2]
        },
        1: { content: 'Я тоже рад, как мне к Вам обращаться?', human: [3] },
        2: { content: 'Как мне к Вам обращаться?', human: [3] },
        3: { content: '{{name}}, что Вас интересует?', human: [4, 5] },
        4: { content: '{{name}}, для этого перейдите на <a href="https://itchief.ru/javascript/chatbot-for-website" target="_blank">эту страницу</a>. Она содержит подробную инструкцию по использованию этого чат-бота.', human: [6] },
        5: { content: "{{name}}, какой у Вас вопрос?", human: [7] },
        6: { content: '{{name}}, мы получили Ваш вопрос! Скажите, как с Вами удобнее будет связаться?', human: [8, 9] },
        7: { content: '{{name}}, укажите пожалуйста ваш телефон', human: [10] },
        8: { content: '{{name}}, укажите пожалуйста ваш Email ниже', human: [10] },
        9: { content: 'Готово! {{name}}, мы свяжемся с вами в ближайшее время по {{contact}}. Всего хорошего!', human: [6] },
    },
    human: {
        0: { content: 'Привет! Я рад с тобой познакомиться', bot: 1 },
        1: { content: 'Салют!', bot: 2 },
        2: { content: 'Приветик, Квантум!', bot: 2 },
        3: { content: '', bot: 3, name: 'name' },
        4: { content: 'Меня интересует, как я могу использовать этот чат-бот у себя на сайте', bot: 4 },
        5: { content: 'Хочу оставить запрос разработчику чат-бота', bot: 5 },
        6: { content: 'В начало', bot: 3 },
        7: { content: '', bot: 6, name: '' },
        8: { content: 'по телефону', bot: 7 },
        9: { content: 'по email', bot: 8 },
        10: { content: '', bot: 9, name: 'contact' },
    }
};
// корневой элемент
configChatbot.root = SimpleChatbot.createTemplate();
// URL chatbot.php
configChatbot.url = '/chatbot.php';
// создание SimpleChatbot
let chatbot = new SimpleChatbot(configChatbot);
// при клике по кнопке configChatbot.btn
document.querySelector(configChatbot.btn).onclick = function (e) {
    this.classList.add('d-none');
    const $tooltip = this.querySelector('.chatbot__tooltip');
    if ($tooltip) {
        $tooltip.classList.add('d-none');
    }
    configChatbot.root.classList.toggle('chatbot_hidden');
    chatbot.init();
};
// добавление ключа для хранения отпечатка браузера в LocalStorage
let fingerprint = localStorage.getItem(configChatbot.key);
if (!fingerprint) {
    Fingerprint2.get(function (components) {
        fingerprint = Fingerprint2.x64hash128(components.map(function (pair) {
            return pair.value
        }).join(), 31)
        localStorage.setItem(configChatbot.key, fingerprint)
    });
}


//
// ТОАСТЫ
//

//Взято из learn.javascript.ru
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

//Взято из learn.javascript.ru
function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

if(getCookie('cookie-toast') !== 'yes') {
    var toast = new Toast({
        title: 'Согласие на обработку Cookie',
        text: 'Мы используем Cookie файлы для работы сайта...',
        theme: 'dark',
        autohide: false,
    });
    toast._el.addEventListener('click', (e) => {
        if (e.target.classList.contains('toast__close')) {
            setCookie('cookie-toast', 'yes');
        }
    });
}