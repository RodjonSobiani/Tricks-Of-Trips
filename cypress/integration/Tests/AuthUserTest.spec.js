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

let login = getRandom();
let name = getRandom();
let email = getRandom() + '@mail.com';
let password = getRandom();
let oneNumber = randomInteger(0, 9);
const adminMail = 'admin@mail.com';
const adminPassword = '123qwe';


context('Авторизация пользователя.', () => {
    beforeEach(() => {
        cy.viewport(1980, 1080);
        cy.visit('http://redjeetrips.com/auth/login')
            .request('http://redjeetrips.com/auth/login')
            .should((response) => {
                expect(response.status).to.eq(200)
            });
    });

    it('Авторизация без почты: ', () => {
        cy.get('#login-form').should('have.text', 'Вход');
        cy.get('#password').type(adminPassword).should('have.value', adminPassword);
        cy.get('.auth').submit();
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
        cy.get('#form').should('not.have.text', 'Вход');
        cy.get('.navbar').should('not.have.text', 'Мой профиль');
    });

    it('Авторизация без пароля: ', () => {
        cy.get('#login-form').should('have.text', 'Вход');
        cy.get('#email').type(adminMail).should('have.value', adminMail);
        cy.get('.auth').submit();
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
                expect(value).to.include('обязательно для заполнения.');
            });
        cy.get('#form').should('not.have.text', 'Вход');
        cy.get('.navbar').should('not.have.text', 'Мой профиль')
    });

    it('Авторизация и выход администратора: ', () => {
        cy.get('#login-form').should('have.text', 'Вход');
        cy.get('#email').type(adminMail).should('have.value', adminMail);
        cy.get('#password').type(adminPassword).should('have.value', adminPassword);
        cy.get('.auth').submit();
        cy.contains('Мой профиль').should('have.text', 'Мой профиль');
        cy.get('.navbar').contains('Администрирование');
        cy.contains('Выход').click();
    });

    it('Авторизация с несуществующими данными: ', () => {
        cy.get('#login-form').should('have.text', 'Вход');
        cy.get('#email').type(email).should('have.value', email);
        cy.get('#password').type(password).should('have.value', password);
        cy.get('.auth').submit();
        cy.get('#info')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('Информация:');
            });
        cy.get('#info').contains('Неправильный логин или пароль.')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('Неправильный');
            });
        cy.get('#form').should('not.have.text', 'Вход');
        cy.get('.navbar').should('not.have.text', 'Мой профиль')
    });

    it('Регистрация, последующая авторизация и выход пользователя: ', () => {
        cy.visit('http://redjeetrips.com/auth/register')
            .request('http://redjeetrips.com/auth/register')
            .should((response) => {
                expect(response.status).to.eq(200)
            });
        cy.get('#form').contains('Регистрация').should('have.text', 'Регистрация');
        cy.get('#login').type(login).should('have.value', login);
        cy.get('#name').type(name).should('have.value', name);
        cy.get('#email').type(email).should('have.value', email);
        cy.get('#password').type(password + oneNumber).should('have.value', password + oneNumber);
        cy.get('#password_confirmation').type(password + oneNumber).should('have.value', password + oneNumber);
        cy.get('.register').submit();
        cy.get('#info')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('Информация:');
            });
        cy.get('#info').contains('Регистрация прошла успешно, теперь вы можете войти в систему.')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('Регистрация прошла успешно');
            });
        cy.get('#form').should('not.have.text', 'Регистрация');
        cy.get('#email').type(email).should('have.value', email);
        cy.get('#password').type(password + oneNumber).should('have.value', password + oneNumber);
        cy.get('.auth').submit();
        cy.contains('Мой профиль').should('have.text', 'Мой профиль');
        cy.get('.navbar').should('not.have.text', 'Администрирование');
    });
});
