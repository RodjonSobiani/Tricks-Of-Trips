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
Cypress.Commands.add("text", {prevSubject: true}, (subject, options) => {
    return subject.text();
});
let name = getRandom();
let login = getRandom();
let email = getRandom() + '@mail.com';
const existsMail = email;
let password = getRandom();
let oneNumber = randomInteger(0, 9);
let about = getRandom() + ' ' + getRandom() + ' ' + getRandom();
const currentAbout = about;
const currentPassword = password;
let comment = repeatStr(about, randomInteger(1, 9));
const myComment = comment;
const adminMail = 'admin@mail.com';
const adminPassword = '123qwe';
const userName = 'TestUserName';
const userMail = 'testuser@mail.com';
const userPassword = 'TestUser007';
let postTitle = getRandom();
let tagTitle = getRandom();
let lastTagTitle = tagTitle;
let postDescription = about;
let postContent = comment;
let categoryTitle = getRandom();
let lastCategory = categoryTitle;
let brokeEmail = getRandom() + '#mail.com';
context('Тесты администратора:', () => {
    beforeEach(() => {
        cy.viewport(1980, 1080);
        cy.visit('http://redjeetrips.com/auth/login')
            .request('http://redjeetrips.com/auth/login')
            .should((response) => {
                expect(response.status).to.eq(200)
            });
        cy.get('#login-form').should('have.text', 'Вход');
        cy.get('#email').type(adminMail).should('have.value', adminMail);
        cy.get('#password').type(adminPassword).should('have.value', adminPassword)
            .request('http://redjeetrips.com/blog')
            .should((response) => {
                expect(response.status).to.eq(200)
            });
        cy.get('.auth').submit();
        cy.visit('http://redjeetrips.com/admin')
            .request('http://redjeetrips.com/admin')
            .should((response) => {
                expect(response.status).to.eq(200)
            });
    });
    describe("Создание, просмотр, изменение и удаление пользователей: ", () => {
        describe("Создание пользователей: ", () => {
            it('Создание нового пользователя (без логина): ', () => {
                cy.get(':nth-child(8) > a').click();
                cy.get('.form-group > .btn').click();
                cy.get('#name').click().type(name);
                cy.get('#email').click().type(email);
                cy.get('#about').click().type(about);
                cy.get('#password').click().type(password);
                const filepath = 'images/Oblaka.jpg'
                cy.get('input[type="file"]').attachFile(filepath);
                cy.get('.btn-success').click();
                cy.get('#warning')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Ошибка!');
                    });
                cy.get('#warning').contains('Поле Логин обязательно для заполнения.')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('обязательно для заполнения');
                    });
                cy.get('#closeButton > span').click();
            });
            it('Создание нового пользователя (без электронной почты): ', () => {
                cy.get(':nth-child(8) > a').click();
                cy.get('.form-group > .btn').click();
                cy.get('#login').click().type(login);
                cy.get('#name').click().type(name);
                cy.get('#about').click().type(about);
                cy.get('#password').click().type(password);
                const filepath = 'images/Oblaka.jpg'
                cy.get('input[type="file"]').attachFile(filepath);
                cy.get('.btn-success').click();
                cy.get('#warning')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Ошибка!');
                    });
                cy.get('#warning').contains('Поле Электронная почта обязательно для заполнения.')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('обязательно для заполнения');
                    });
                cy.get('#closeButton > span').click();
            });
            it('Создание нового пользователя (без пароля): ', () => {
                cy.get(':nth-child(8) > a').click();
                cy.get('.form-group > .btn').click();
                cy.get('#login').click().type(login);
                cy.get('#name').click().type(name);
                cy.get('#email').click().type(email);
                cy.get('#about').click().type(about);
                const filepath = 'images/Oblaka.jpg'
                cy.get('input[type="file"]').attachFile(filepath);
                cy.get('.btn-success').click();
                cy.get('#warning')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Ошибка!');
                    });
                cy.get('#warning').contains('Поле Пароль обязательно для заполнения.')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('обязательно для заполнения');
                    });
                cy.get('#closeButton > span').click();
            });
            it('Создание нового пользователя (успешное): ', () => {
                cy.get(':nth-child(8) > a').click();
                cy.get('.form-group > .btn').click();
                cy.get('#login').click().type(login);
                cy.get('#name').click().type(name);
                cy.get('#email').click().type(email);
                cy.get('#about').click().type(about);
                cy.get('#password').click().type(password);
                const filepath = 'images/Oblaka.jpg'
                cy.get('input[type="file"]').attachFile(filepath);
                cy.get('.btn-success').click();
                cy.get('#info')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Информация:');
                    });
                cy.get('#info').contains('Пользователь успешно создан!')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('успешно');
                    });
                cy.get('#closeButton > span').click();
            });
        });
        describe("Просмотр и изменение пользователей: ", () => {
            it('Изменение пользователя (без логина): ', () => {
                cy.get(':nth-child(8) > a').click();
                cy.get(':nth-child(2) > :nth-child(7) > .fa-pencil').click();
                cy.get('#login').click().clear().type(login).clear();
                cy.get('#name').click().clear().type(name);
                cy.get('#email').click().clear().type(getRandom() + '@mail.com');
                cy.get('#about').click().clear().type(about);
                cy.get('#password').click().clear().type(password);
                const filepath = 'images/Oblaka.jpg'
                cy.get('input[type="file"]').attachFile(filepath);
                cy.get('.btn-warning').click();
                cy.get('#warning')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Ошибка!');
                    });
                cy.get('#warning').contains('Поле Логин обязательно для заполнения.')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('обязательно для заполнения');
                    });
                cy.get('#closeButton > span').click();
            });
            it('Изменение пользователя (без электронной почты): ', () => {
                cy.get(':nth-child(8) > a').click();
                cy.get(':nth-child(2) > :nth-child(7) > .fa-pencil').click();
                cy.get('#login').click().clear().type(getRandom());
                cy.get('#name').click().clear().type(name);
                cy.get('#email').click().clear().type(email).clear();
                cy.get('#about').click().clear().type(about);
                cy.get('#password').click().clear().type(password);
                const filepath = 'images/Oblaka.jpg'
                cy.get('input[type="file"]').attachFile(filepath);
                cy.get('.btn-warning').click();
                cy.get('#warning')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Ошибка!');
                    });
                cy.get('#warning').contains('Поле Электронная почта обязательно для заполнения.')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('обязательно для заполнения');
                    });
                cy.get('#closeButton > span').click();
            });
            it('Изменение пользователя (с занятым логином): ', () => {
                cy.get(':nth-child(8) > a').click();
                cy.get(':nth-child(2) > :nth-child(7) > .fa-pencil').click();
                cy.get('#login').click().clear().type(login);
                cy.get('#name').click().clear().type(name);
                cy.get('#email').click().clear().type(getRandom() + '@mail.com');
                cy.get('#about').click().clear().type(about);
                cy.get('#password').click().clear().type(password).clear();
                const filepath = 'images/Oblaka.jpg'
                cy.get('input[type="file"]').attachFile(filepath);
                cy.get('.btn-warning').click();
                cy.get('#warning')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Ошибка!');
                    });
                cy.get('#warning').contains('Такое значение поля Логин уже существует.')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('уже существует');
                    });
                cy.get('#closeButton > span').click();
            });
            it('Изменение пользователя (с занятой почтой): ', () => {
                cy.get(':nth-child(8) > a').click();
                cy.get(':nth-child(2) > :nth-child(7) > .fa-pencil').click();
                cy.get('#login').click().clear().type(getRandom());
                cy.get('#name').click().clear().type(name);
                cy.get('#email').click().clear().type(email);
                cy.get('#about').click().clear().type(about);
                cy.get('#password').click().clear().type(password).clear();
                const filepath = 'images/Oblaka.jpg'
                cy.get('input[type="file"]').attachFile(filepath);
                cy.get('.btn-warning').click();
                cy.get('#warning')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Ошибка!');
                    });
                cy.get('#warning').contains('Такое значение поля Электронная почта уже существует.')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('уже существует');
                    });
                cy.get('#closeButton > span').click();
            });
            it('Изменение пользователя (без пароля): ', () => {
                cy.get(':nth-child(8) > a').click();
                cy.get(':nth-child(2) > :nth-child(7) > .fa-pencil').click();
                cy.get('#login').click().clear().type(getRandom());
                cy.get('#name').click().clear().type(name);
                cy.get('#email').click().clear().type(getRandom() + '@mail.com');
                cy.get('#about').click().clear().type(about);
                cy.get('#password').click().clear().type(password).clear();
                const filepath = 'images/Oblaka.jpg'
                cy.get('input[type="file"]').attachFile(filepath);
                cy.get('.btn-warning').click();
                cy.get('#info')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Информация:');
                    });
                cy.get('#info').contains('Пользователь успешно отредактирован!')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('успешно');
                    });
                cy.get('#closeButton > span').click();
            });
            it('Изменение пользователя (успешное): ', () => {
                cy.get(':nth-child(8) > a').click();
                cy.get(':nth-child(2) > :nth-child(7) > .fa-pencil').click();
                cy.get('#login').click().clear().type(getRandom());
                cy.get('#name').click().clear().type(name);
                cy.get('#email').click().clear().type(getRandom() + '@mail.com');
                cy.get('#about').click().clear().type(about);
                cy.get('#password').click().clear().type(password);
                const filepath = 'images/Oblaka.jpg'
                cy.get('input[type="file"]').attachFile(filepath);
                cy.get('.btn-warning').click();
                cy.get('#info')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Информация:');
                    });
                cy.get('#info').contains('Пользователь успешно отредактирован!')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('успешно');
                    });
                cy.get('#closeButton > span').click();
            });
        });
        describe("Удаление пользователей: ", () => {
            it('Удаление пользователя: ', () => {
                cy.get(':nth-child(8) > a').click();
                cy.get('.pagination > :nth-child(8) > a').click();
                cy.get(':last-child > :last-child > form > .delete > .fa').click();
                cy.get('#info')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Информация:');
                    });
                cy.get('#info').contains('Пользователь успешно удалён!')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('успешно');
                    });
                cy.get('#closeButton > span').click();
            });
        });
    });
    describe("Создание, просмотр, изменение и удаление категорий: ", () => {
        describe("Создание категорий: ", () => {
            it('Создание новой категории (без названия): ', () => {
                cy.get(':nth-child(5) > a').click();
                cy.get('.form-group > .btn').click();
                cy.get('.btn-success').click();
                cy.get('#warning')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Ошибка!');
                    });
                cy.get('#warning').contains('Поле Наименование обязательно для заполнения.')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('обязательно для заполнения');
                    });
                cy.get('#closeButton > span').click();
            });
            it('Создание новой категории: ', () => {
                cy.get(':nth-child(5) > a').click();
                cy.get('.form-group > .btn').click();
                cy.get('#categoryTitle').click().type(categoryTitle);
                cy.get('.btn-success').click();
                cy.get('#info')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Информация:');
                    });
                cy.get('#info').contains('Категория успешно создана!')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('успешно');
                    });
                cy.get('#closeButton > span').click();
            });
        });
        describe("Просмотр и изменение категорий: ", () => {
            it('Просмотр всех категорий, выбор последней созданной категории и её изменение (неудачное): ', () => {
                cy.get(':nth-child(5) > a').click();
                cy.get(':nth-last-child(1) > :nth-child(2)').contains(lastCategory).should('have.text', lastCategory);
                cy.get(':last-child > :nth-child(3) > .fa-pencil').click();
                cy.get('#categoryTitle').click().type(categoryTitle).clear();
                cy.get('.btn-warning').click();
                cy.get('#warning')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Ошибка!');
                    });
                cy.get('#warning').contains('Поле Наименование обязательно для заполнения.')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('обязательно для заполнения');
                    });
                cy.get('#closeButton > span').click();
            });
            it('Просмотр всех категорий, выбор последней созданной категории и её изменение (удачное): ', () => {
                cy.get(':nth-child(5) > a').click();
                cy.get(':nth-last-child(1) > :nth-child(2)').contains(lastCategory).should('have.text', lastCategory);
                cy.get(':last-child > :nth-child(3) > .fa-pencil').click();
                cy.get('#categoryTitle').click().clear().type(categoryTitle + lastCategory);
                cy.get('.btn-warning').click();
                cy.get('#info')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Информация:');
                    });
                cy.get('#info').contains('Категория успешно изменена!')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('успешно');
                    });
                cy.get('#closeButton > span').click();
            });
        });
        describe("Удаление категории: ", () => {
            it('Удаление категории: ', () => {
                cy.get(':nth-child(5) > a').click();
                cy.get(':nth-last-child(1) > :nth-child(2)').contains(categoryTitle + lastCategory).should('have.text', categoryTitle + lastCategory);
                cy.get(':last-child > :last-child > form > .delete > .fa').click();
                cy.get('#info')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Информация:');
                    });
                cy.get('#info').contains('Категория успешно удалена!')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('успешно');
                    });
                cy.get('#closeButton > span').click();
            });
        });
    });
    describe("Блокировка, разблокировка и удаление комментариев: ", () => {
        describe("Разблокировка комментариев: ", () => {
            it('Разблокировка комментария ', () => {
                cy.get(':nth-child(7) > a').click();
                cy.get('#example1_next > a').click();
                cy.get(':nth-child(2) > :nth-child(4) > .fa-thumbs-o-up').click();
            });
        });
        describe("Добавления комментария для удаления администратором: ", () => {
            it('Добавление комментария: ', () => {
                cy.visit('http://redjeetrips.com/auth/logout');
                cy.visit('http://redjeetrips.com/auth/login')
                    .request('http://redjeetrips.com/auth/login')
                    .should((response) => {
                        expect(response.status).to.eq(200)
                    });
                cy.get('#login-form').should('have.text', 'Вход');
                cy.get('#email').type(userMail).should('have.value', userMail);
                cy.get('#password').type(userPassword).should('have.value', userPassword)
                    .request('http://redjeetrips.com/blog')
                    .should((response) => {
                        expect(response.status).to.eq(200)
                    });
                cy.get('.auth').submit();
                cy.get(':nth-child(1) > .post-thumb > .post-thumb-overlay').click().wait(1000);
                cy.get('.footer-widget-section').scrollIntoView({duration: 1000})
                cy.get('#comments').scrollIntoView({duration: 1000})
                cy.get('.col-md-8 > :nth-child(6)').scrollIntoView({duration: 1000})
                    .contains('Оставить комментарий')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('комментарий');
                    });
                cy.get('.col-md-12 > .form-control').click();
                cy.get('.comment').type(comment);
                cy.get('.sendComment').submit();
                cy.get('#info')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Информация:');
                    });
                cy.get('#info').contains('Ваш комментарий отправлен!')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('отправлен');
                    });
                cy.get('#closeButton > span').click();
                cy.get('#comments').scrollIntoView({duration: 1000})
                cy.get('#comments > :nth-last-child(3)').scrollIntoView({duration: 1000})
            });
        });
        describe("Удаление комментариев: ", () => {
            it('Удаление комментария: ', () => {
                cy.visit('http://redjeetrips.com/blog')
                    .request('http://redjeetrips.com/blog')
                    .should((response) => {
                        expect(response.status).to.eq(200)
                    });
                cy.get(':nth-child(1) > .post-thumb > .post-thumb-overlay').click().wait(1000);
                cy.get('.footer-widget-section').scrollIntoView({duration: 1000});
                cy.get('#comments').scrollIntoView({duration: 1000});
                cy.get('#comments').scrollIntoView({duration: 1000})
                cy.get('#comments > :nth-last-child(3)').scrollIntoView({duration: 1000});
                cy.get('#comments > :last-child').contains('Удалить').click();
                cy.get('#info')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Информация:');
                    });
                cy.get('#info').contains('Ваш комментарий удалён!')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('удалён');
                    });
                cy.get('#closeButton > span').click();
            });
        });
        describe("Блокировка комментариев: ", () => {
            it('Блокировка комментария ', () => {
                cy.get(':nth-child(7) > a').click();
                cy.get('#example1_next > a').click();
                cy.get(':nth-child(2) > :nth-child(4) > .fa-lock').click();
                cy.visit('http://redjeetrips.com/blog')
                    .request('http://redjeetrips.com/blog')
                    .should((response) => {
                        expect(response.status).to.eq(200)
                    });
                cy.get(':nth-child(1) > .post-thumb > .post-thumb-overlay').click().wait(1000);
                cy.get('.footer-widget-section').scrollIntoView({duration: 1000});
                cy.get('#comments').scrollIntoView({duration: 1000});
                cy.get('#comments').scrollIntoView({duration: 1000})
            });
        });
    });
    describe("Добавление и удаление подписчиков:", () => {
        describe("Добавление подписчика:", () => {
            it('Добавление подписчика (без заполнения почты)', () => {
                cy.get(':nth-child(9) > a').click();
                cy.get('.form-group > .btn').click();
                cy.get('.btn-success').click();
                cy.get('#warning')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Ошибка!');
                    });
                cy.get('#warning').contains('Поле Электронная почта обязательно для заполнения.')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('обязательно для заполнения.');
                    });
                cy.get('#closeButton > span').click();
            });
            it('Добавление подписчика (с уже существующей почтой)', () => {
                cy.get(':nth-child(9) > a').click();
                cy.get('.form-group > .btn').click();
                cy.get('#subsMail').click().type(adminMail);
                cy.get('.btn-success').click();
                cy.get('#warning')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Ошибка!');
                    });
                cy.get('#warning').contains('Такое значение поля Электронная почта уже существует.')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('уже существует');
                    });
                cy.get('#closeButton > span').click();
            });
            it('Добавление подписчика (с неправильно введённой почтой)', () => {
                cy.get(':nth-child(9) > a').click();
                cy.get('.form-group > .btn').click();
                cy.get('#subsMail').click().type(brokeEmail);
                cy.get('.btn-success').click();
                cy.get('#warning')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Ошибка!');
                    });
                cy.get('#warning').contains('Поле Электронная почта должно быть действительным электронным адресом.')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('должно быть действительным');
                    });
                cy.get('#closeButton > span').click();
            });
            it('Добавление подписчика (успешно)', () => {
                cy.get(':nth-child(9) > a').click();
                cy.get('.form-group > .btn').click();
                cy.get('#subsMail').click().type(email);
                cy.get('.btn-success').click();
                cy.get('#info')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Информация:');
                    });
                cy.get('#info').contains('Подписчик успешно добавлен!')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('успешно');
                    });
                cy.get('#closeButton > span').click();
            });
        });
        describe("Удаление подписчика:", () => {
            it('Удаление подписчика', () => {
                cy.get(':nth-child(9) > a').click();
                cy.get(':last-child > :nth-child(3) > form > .delete > .fa').click();
                cy.get('#info')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Информация:');
                    });
                cy.get('#info').contains('Подписчик успешно удалён!')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('успешно');
                    });
                cy.get('#closeButton > span').click();
            });
        });
    });
    describe("Создание, просмотр, изменение и удаление тегов: ", () => {
        describe("Создание тегов: ", () => {
            it('Создание нового тега (без названия): ', () => {
                cy.get(':nth-child(6) > a').click();
                cy.get('.form-group > .btn').click();
                cy.get('.btn-success').click();
                cy.get('#warning')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Ошибка!');
                    });
                cy.get('#warning').contains('Поле Наименование обязательно для заполнения.')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('обязательно для заполнения');
                    });
                cy.get('#closeButton > span').click();
            });
            it('Создание нового тега: ', () => {
                cy.get(':nth-child(6) > a').click();
                cy.get('.form-group > .btn').click();
                cy.get('#tagTitle').click().type(tagTitle);
                cy.get('.btn-success').click();
                cy.get('#info')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Информация:');
                    });
                cy.get('#info').contains('Тег успешно создан!')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('успешно');
                    });
                cy.get('#closeButton > span').click();
            });
        });
        describe("Просмотр и изменение тегов: ", () => {
            it('Просмотр всех тегов, выбор последнего созданного тега и его изменение (неудачное): ', () => {
                cy.get(':nth-child(6) > a').click();
                cy.get('.pagination > :nth-last-child(2) > a').click();
                cy.get(':nth-last-child(1) > :nth-child(2)').contains(lastTagTitle).should('have.text', lastTagTitle);
                cy.get(':last-child > :nth-child(3) > .fa-pencil').click();
                cy.get('#tagTitle').click().type(tagTitle).clear();
                cy.get('.btn-warning').click();
                cy.get('#warning')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Ошибка!');
                    });
                cy.get('#warning').contains('Поле Наименование обязательно для заполнения.')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('обязательно для заполнения');
                    });
                cy.get('#closeButton > span').click();
            });
            it('Просмотр всех категорий, выбор последней созданной категории и её изменение (удачное): ', () => {
                cy.get(':nth-child(6) > a').click();
                cy.get('.pagination > :nth-last-child(2) > a').click();
                cy.get(':nth-last-child(1) > :nth-child(2)').contains(lastTagTitle).should('have.text', lastTagTitle);
                cy.get(':last-child > :nth-child(3) > .fa-pencil').click();
                cy.get('#tagTitle').click().clear().type(tagTitle + lastTagTitle);
                cy.get('.btn-warning').click();
                cy.get('#info')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Информация:');
                    });
                cy.get('#info').contains('Тег успешно изменён!')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('успешно');
                    });
                cy.get('#closeButton > span').click();
            });
        });
        describe("Удаление тегов: ", () => {
            it('Удаление тега: ', () => {
                cy.get(':nth-child(6) > a').click();
                cy.get('.pagination > :nth-last-child(2) > a').click();
                cy.get(':nth-last-child(1) > :nth-child(2)').contains(tagTitle + lastTagTitle).should('have.text', tagTitle + lastTagTitle);
                cy.get(':last-child > :last-child > form > .delete > .fa').click();
                cy.get('#info')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Информация:');
                    });
                cy.get('#info').contains('Тег успешно удалён!')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('успешно');
                    });
                cy.get('#closeButton > span').click();
            });
        });
    });
    describe("Создание, просмотр, изменение и удаление постов:", () => {
        describe("Проверка создания поста.", () => {
            it('Добавление поста (без поля "Название"): ', () => {
                cy.get(':nth-child(4) > a').click();
                cy.get('.form-group > .btn').click();
                const filepath = 'images/Oblaka.jpg'
                cy.get('input[type="file"]').attachFile(filepath);
                cy.get(':nth-child(5) > :nth-child(1) > .icheckbox_minimal-blue > .iCheck-helper').click();
                cy.get(':nth-child(6) > :nth-child(1) > .icheckbox_minimal-blue > .iCheck-helper').click();
                cy.get('#adminPostDescription').click().type(postDescription);
                cy.get('.note-editable').click().type(postContent);
                cy.get('.btn-success').click();
                cy.get('#warning')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Ошибка!');
                    });
                cy.get('#warning').contains('Поле Наименование обязательно для заполнения.')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('обязательно для заполнения');
                    });
                cy.get('#closeButton > span').click();
            });
            it('Добавление поста c неподходящим форматом изображения: ', () => {
                cy.get(':nth-child(4) > a').click();
                cy.get('.form-group > .btn').click();
                cy.get('#adminPostTitle').type(postTitle);
                const filepath = 'images/test.pdf'
                cy.get('input[type="file"]').attachFile(filepath);
                cy.get(':nth-child(5) > :nth-child(1) > .icheckbox_minimal-blue > .iCheck-helper').click();
                cy.get(':nth-child(6) > :nth-child(1) > .icheckbox_minimal-blue > .iCheck-helper').click();
                cy.get('#adminPostDescription').click().type(postDescription);
                cy.get('.note-editable').click().type(postContent);
                cy.get('.btn-success').click();
                cy.get('#warning')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Ошибка!');
                    });
                cy.get('#warning').contains('Поле Лицевая картинка должно быть изображением.')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('должно быть изображением');
                    });
                cy.get('#closeButton > span').click();
            });
            it('Добавление поста (без контента): ', () => {
                cy.get(':nth-child(4) > a').click();
                cy.get('.form-group > .btn').click();
                cy.get('#adminPostTitle').type(postTitle);
                const filepath = 'images/Oblaka.jpg'
                cy.get('input[type="file"]').attachFile(filepath);
                cy.get(':nth-child(5) > :nth-child(1) > .icheckbox_minimal-blue > .iCheck-helper').click();
                cy.get(':nth-child(6) > :nth-child(1) > .icheckbox_minimal-blue > .iCheck-helper').click();
                cy.get('#adminPostDescription').click().type(postDescription);
                cy.get('.btn-success').click();
                cy.get('#warning')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Ошибка!');
                    });
                cy.get('#warning').contains('Поле Контент обязательно для заполнения.')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('обязательно для заполнения');
                    });
                cy.get('#closeButton > span').click();
            });
            it('Добавление поста (все поля правильно заполнены): ', () => {
                cy.get(':nth-child(4) > a').click();
                cy.get('.form-group > .btn').click();
                cy.get('#adminPostTitle').type(postTitle);
                const filepath = 'images/Oblaka.jpg'
                cy.get('input[type="file"]').attachFile(filepath);
                cy.get(':nth-child(5) > :nth-child(1) > .icheckbox_minimal-blue > .iCheck-helper').click();
                cy.get(':nth-child(6) > :nth-child(1) > .icheckbox_minimal-blue > .iCheck-helper').click();
                cy.get('#adminPostDescription').click().type(postDescription);
                cy.get('.note-editable').click().type(postContent);
                cy.get('.btn-success').click();
                cy.get('#info')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Информация:');
                    });
                cy.get('#info').contains('Пост успешно добавлен!')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('успешно');
                    });
                cy.get('#closeButton > span').click();
            });
        });
        describe("Проверка изменения поста.", () => {
            it('Изменение поста: ', () => {
                cy.get(':nth-child(4) > a').click();
                cy.get('.pagination > :nth-last-child(2) > a').click();
                cy.get(':last-child > :last-child > .fa-pencil').click();
                const filepath = 'images/forest.png'
                cy.get('input[type="file"]').attachFile(filepath);
                cy.get('#adminPostDescription').click().clear().type(postDescription);
                cy.get('.note-editable').click().clear().type(postContent);
                cy.get('.btn-warning').click();
                cy.get('#info')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Информация:');
                    });
                cy.get('#info').contains('Пост успешно изменён!')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('успешно');
                    });
                cy.get('#closeButton > span').click();
                cy.get('.pagination > :nth-last-child(2) > a').click();
            });
        });
        describe("Проверка удаления поста.", () => {
            it('Удаление поста: ', () => {
                cy.get(':nth-child(4) > a').click();
                cy.get('.pagination > :nth-last-child(2) > a').click();
                cy.get(':last-child > :last-child > form > .delete > .fa').click();
                cy.get('#info')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('Информация:');
                    });
                cy.get('#info').contains('Пост успешно удалён!')
                    .text()
                    .then(value => {
                        cy.log("Сообщение: " + value);
                        expect(value).to.include('успешно');
                    });
                cy.get('#closeButton > span').click();
                cy.get('.pagination > :nth-last-child(2) > a').click();
            });
        });
    });
});
// cypress open --config watchForFileChanges=false
