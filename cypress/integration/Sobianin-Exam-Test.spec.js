function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function getRandom() {
    let text = "";
    let possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i <= randomInteger(9, 16); i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function repeatStr(str, n) {
    let new_str = '';
    while (n-- > 0) new_str += str;
    return new_str;
}

context('Собянин Родион (484), тесты Cypress (экзамен)', () => {
    beforeEach(() => {
        cy.viewport(1980, 1080);
        cy.log('Вход на сайт:')
        cy.visit('https://tomsk.farfor.ru/')
            .request('https://tomsk.farfor.ru/')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
            .wait(1000);
    });

    describe("Тесты основного функционала: ", () => {
        describe("Прокрутка страницы: ", () => {
            it('В самый низ и в самый верх: ', () => {
                cy.log('Низ:');
                cy.get('.footer__main-box').scrollIntoView({duration: 1000});
                cy.log('Верх:');
                cy.get('.slick-track > .slick-active').scrollIntoView({duration: 1000});
            });
        });
        describe("Проверка ссылок и кнопок: ", () => {
            it('Боковое меню: ', () => {
                cy.log('Десерты: ')
                cy.get('[href="https://tomsk.farfor.ru/dessert/"]').click();
                cy.log('Пироги: ')
                cy.get('[href="https://tomsk.farfor.ru/pirogi/"]').click().wait(1000);
                cy.log('Пицца: ')
                cy.get('.b-foodMenu > [href="https://tomsk.farfor.ru/pizza/"]').click().wait(1000);
                cy.log('Сеты: ')
                cy.get('.b-foodMenu > [href="https://tomsk.farfor.ru/japan/sety/"]').click().wait(1000);
                cy.log('Напитки: ')
                cy.get('[href="https://tomsk.farfor.ru/napitki/"]').click().wait(1000);
                cy.log('Роллы: ')
                cy.get('[href="https://tomsk.farfor.ru/japan/rolly/"]').click().wait(1000);
                cy.log('Суши: ')
                cy.get('[href="https://tomsk.farfor.ru/japan/sushi/"]').click().wait(1000);
                cy.log('WOK: ')
                cy.get('[href="https://tomsk.farfor.ru/wok/"]').click().wait(1000);
                cy.log('Поке: ')
                cy.get('[href="https://tomsk.farfor.ru/poke/"]').click().wait(1000);
                cy.log('Закуски: ')
                cy.get('[href="https://tomsk.farfor.ru/zakuski/"]').click().wait(1000);
                cy.log('Салаты: ')
                cy.get('[href="https://tomsk.farfor.ru/salaty/"]').click().wait(1000);
                cy.log('Супы: ')
                cy.get('[href="https://tomsk.farfor.ru/japan/supy/"]').click().wait(1000);
                cy.log('Добавки: ')
                cy.get('[href="https://tomsk.farfor.ru/dobawky/"]').click().wait(1000);
                cy.log('Самовывоз: ')
                cy.get('[href="https://tomsk.farfor.ru/japan/samovyvoz/"]').click().wait(1000);
                cy.log('Пицца из половинок: ')
                cy.get('[href="https://tomsk.farfor.ru/halves/"]').click().wait(1000);
                cy.log('Конструктор WOK: ')
                cy.get('[href="https://tomsk.farfor.ru/make-wok/"]').click().wait(1000);
            });
        });
        describe("Проверка оформления заказа: ", () => {
            it('Переход по категориям и добавление: ', () => {
                cy.log('Переход в раздел пицц": ')
                cy.get('.b-foodMenu > [href="https://tomsk.farfor.ru/pizza/"]').click().wait(1000);
                cy.log('Выбор пиццы": ')
                cy.get('.tag-pizza-mecyaca > .price__info > .button').click().wait(3000);
                cy.log('Переход в раздел напитки: ')
                cy.get('[href="https://tomsk.farfor.ru/napitki/"]').click().wait(1000);
                cy.log('Выбор напитка": ')
                cy.get('.topLeftLit > .button').click().wait(3000);
                cy.log('Переход в корзину": ')
                cy.get('#basketButton').click();
                cy.log('Ввод промо-кода": ')
                cy.get('.orderSheet__promoCodeInput').type(getRandom());
                cy.log('Промотка до комментария": ')
                cy.get('.comments__title').scrollIntoView({duration: 1000});
                cy.log('Выбор способа оплаты": ')
                cy.get('.paymentMethod__online > .radioBtnGroup > .radioBtn > .radioBtn__inputCustom').click();
                cy.log('Ввод комментария": ')
                cy.get('.textarea').type(getRandom() + ' ' + getRandom() + ' ' + getRandom());
                cy.get('.input-form').click().type(9999999999);
                cy.get('.input-field > .button').focus();
            });
        });

        describe("Проверка сообщения об ошибках: ", () => {
            it(': ', () => {
                cy.get('.b-bug').scrollIntoView({duration: 1000});
                cy.get('.b-bug').click();
                cy.get('.t-input-group_nm > .t-input-block > .t-input').type(getRandom());
                cy.get('.t-input-group_em > .t-input-block > .t-input').type(getRandom() + '@mail.com');
                cy.get('.t-input-group_ph > .t-input-block > .t-input').type(getRandom());
                cy.get('.t-input-group_ta > .t-input-block > .t-input').type(getRandom() + ' ' + getRandom() + ' ' + getRandom());
                cy.get('.t-submit').focused();
            });
        });
    });
});
