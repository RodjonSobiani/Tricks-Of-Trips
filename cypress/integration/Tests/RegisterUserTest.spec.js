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

let login = getRandom();
let name = getRandom();
let email = getRandom() + '@mail.com';
let brokeEmail = getRandom() + '#mail.com';
let oneNumber = randomInteger(0, 9);
let password = oneNumber + getRandom();
let shortPassword = repeatStr(oneNumber, randomInteger(1, 7));
let passWithoutChar = password + oneNumber;
let existsLogin = login;
let existsMail = email;

context('Регистрация нового пользователя.', () => {
    beforeEach(() => {
        cy.viewport(1980, 1080);
        cy.visit('http://redjeetrips.com/auth/register')
            .request('http://redjeetrips.com/auth/register')
            .should((response) => {
                expect(response.status).to.eq(200)
            });
    });

    it('Регистрация нового пользователя без обязательного поля "Логин": ', () => {
        cy.get('#form').contains('Регистрация').should('have.text', 'Регистрация');
        cy.get('#name').type(name).should('have.value', name);
        cy.get('#email').type(email).should('have.value', email);
        cy.get('#password').type(password + oneNumber).should('have.value', password + oneNumber);
        cy.get('#password_confirmation').type(password + oneNumber).should('have.value', password + oneNumber);
        cy.get('.register').submit(true);
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
                expect(value).to.include('обязательно для заполнения.');
            });
        cy.get('#form').should('not.have.text', 'Вход');
    });

    it('Регистрация нового пользователя без обязательного поля "Электронная почта": ', () => {
        cy.get('#form').contains('Регистрация').should('have.text', 'Регистрация');
        cy.get('#login').type(login).should('have.value', login);
        cy.get('#name').type(name).should('have.value', name);
        cy.get('#password').type(password + oneNumber).should('have.value', password + oneNumber);
        cy.get('#password_confirmation').type(password + oneNumber).should('have.value', password + oneNumber);
        cy.get('.register').submit(true);
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
    });

    it('Регистрация нового пользователя без обязательного поля "Пароль": ', () => {
        cy.get('#form').contains('Регистрация').should('have.text', 'Регистрация');
        cy.get('#login').type(login).should('have.value', login);
        cy.get('#name').type(name).should('have.value', name);
        cy.get('#email').type(email).should('have.value', email);
        cy.get('#password_confirmation').type(password + oneNumber).should('have.value', password + oneNumber);
        cy.get('.register').submit();
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
    });

    it('Регистрация нового пользователя без обязательного поля "Подтверждение пароля": ', () => {
        cy.get('#form').contains('Регистрация').should('have.text', 'Регистрация');
        cy.get('#login').type(login).should('have.value', login);
        cy.get('#name').type(name).should('have.value', name);
        cy.get('#email').type(email).should('have.value', email);
        cy.get('#password').type(password + oneNumber).should('have.value', password + oneNumber);
        cy.get('.register').submit();
        cy.get('#warning')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('Ошибка!');
            });
        cy.get('#warning').contains('Поле Подтверждение пароля обязательно для заполнения.')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('обязательно для заполнения.');
            });
        cy.get('#warning').contains('Поле Пароль не совпадает с подтверждением.')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('не совпадает с подтверждением.');
            });
        cy.get('#form').should('not.have.text', 'Вход');
    });

    it('Регистрация нового пользователя с отличающимися полями "Пароль" и "Подтверждение пароля": ', () => {
        cy.get('#form').contains('Регистрация').should('have.text', 'Регистрация');
        cy.get('#login').type(login).should('have.value', login);
        cy.get('#name').type(name).should('have.value', name);
        cy.get('#email').type(email).should('have.value', email);
        cy.get('#password').type(password + oneNumber).should('have.value', password + oneNumber);
        cy.get('#password_confirmation').type(password).should('have.value', password);
        cy.get('.register').submit();
        cy.get('#warning')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('Ошибка!');
            });
        cy.get('#warning').contains('Поле Пароль не совпадает с подтверждением.')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('не совпадает с подтверждением.');
            });
        cy.get('#form').should('not.have.text', 'Вход');
    });

    it('Регистрация нового пользователя c коротким паролем: ', () => {
        cy.get('#form').contains('Регистрация').should('have.text', 'Регистрация');
        cy.get('#login').type(login).should('have.value', login);
        cy.get('#name').type(name).should('have.value', name);
        cy.get('#email').type(email).should('have.value', email);
        cy.get('#password').type(shortPassword).should('have.value', shortPassword);
        cy.get('#password_confirmation').type(shortPassword).should('have.value', shortPassword);
        cy.get('.register').submit();
        cy.get('#warning')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('Ошибка!');
            });
        cy.get('#warning').contains('Количество символов в поле Пароль должно быть не меньше 8.')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('должно быть не меньше 8.');
            });
        cy.get('#form').should('not.have.text', 'Вход');
    });

    it('Регистрация нового пользователя c пограничными значениями пароля (7 символов): ', () => {
        cy.get('#form').contains('Регистрация').should('have.text', 'Регистрация');
        cy.get('#login').type(login).should('have.value', login);
        cy.get('#name').type(name).should('have.value', name);
        cy.get('#email').type(email).should('have.value', email);
        cy.get('#password').type(password.substring(7, length)).should('have.value', password.substring(7, length));
        cy.get('#password_confirmation').type(password.substring(7, length)).should('have.value', password.substring(7, length));
        cy.get('.register').submit();
        cy.get('#warning')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('Ошибка!');
            });
        cy.get('#warning').contains('Количество символов в поле Пароль должно быть не меньше 8.')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('должно быть не меньше 8.');
            });
        cy.get('#form').should('not.have.text', 'Вход');
    });

    it('Регистрация нового пользователя c пограничными значениями пароля (9 символов): ', () => {
        cy.get('#form').contains('Регистрация').should('have.text', 'Регистрация');
        cy.get('#login').type(login).should('have.value', login);
        cy.get('#name').type(name).should('have.value', name);
        cy.get('#email').type(email).should('have.value', email);
        cy.get('#password').type(password.substring(9, length)).should('have.value', password.substring(9, length));
        cy.get('#password_confirmation').type(password.substring(9, length)).should('have.value', password.substring(9, length));
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
                expect(value).to.include('прошла успешно');
            });
        cy.get('#form').should('not.have.text', 'Вход');
    });

    it('Регистрация нового пользователя c паролем без цифр: ', () => {
        cy.get('#form').contains('Регистрация').should('have.text', 'Регистрация');
        cy.get('#login').type(login).should('have.value', login);
        cy.get('#name').type(name).should('have.value', name);
        cy.get('#email').type(email).should('have.value', email);
        cy.get('#password').type((repeatStr(password, 8)).replace(/[0-9]/g, '')).should('have.value', (repeatStr(password, 8)).replace(/[0-9]/g, ''));
        cy.get('#password_confirmation').type((repeatStr(password, 8)).replace(/[0-9]/g, '')).should('have.value', (repeatStr(password, 8)).replace(/[0-9]/g, ''));
        cy.get('.register').submit();
        cy.get('#warning')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('Ошибка!');
            });
        cy.get('#warning').contains('Пароль должен содержать хотя бы одну цифру.')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('хотя бы одну цифру.');
            });
        cy.get('#form').should('not.have.text', 'Вход');
    });

    it('Регистрация нового пользователя c паролем без букв: ', () => {
        cy.get('#form').contains('Регистрация').should('have.text', 'Регистрация');
        cy.get('#login').type(login).should('have.value', login);
        cy.get('#name').type(name).should('have.value', name);
        cy.get('#email').type(email).should('have.value', email);
        cy.get('#password').type((repeatStr(passWithoutChar, 8))
            .replace(/[A-Za-z]/g, '')).should('have.value', (repeatStr(passWithoutChar, 8))
            .replace(/[A-Za-z]/g, ''));
        cy.get('#password_confirmation').type((repeatStr(passWithoutChar, 8))
            .replace(/[A-Za-z]/g, '')).should('have.value', (repeatStr(passWithoutChar, 8))
            .replace(/[A-Za-z]/g, ''));
        cy.get('.register').submit();
        cy.get('#warning')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('Ошибка!');
            });
        cy.get('#warning').contains('Пароль должен содержать хотя бы одну букву.')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('хотя бы одну букву.');
            });
        cy.get('#form').should('not.have.text', 'Вход');
    });

    it('Регистрация нового пользователя c паролем без заглавных символов: ', () => {
        cy.get('#form').contains('Регистрация').should('have.text', 'Регистрация');
        cy.get('#login').type(login).should('have.value', login);
        cy.get('#name').type(name).should('have.value', name);
        cy.get('#email').type(email).should('have.value', email);
        cy.get('#password').type((password + oneNumber).toLowerCase())
            .should('have.value', (password + oneNumber).toLowerCase());
        cy.get('#password_confirmation').type((password + oneNumber).toLowerCase())
            .should('have.value', (password + oneNumber).toLowerCase());
        cy.get('.register').submit();
        cy.get('#warning')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('Ошибка!');
            });
        cy.get('#warning').contains('Пароль должен содержать хотя бы одну заглавную и одну строчную букву.')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('одну заглавную и одну строчную');
            });
        cy.get('#form').should('not.have.text', 'Вход');
    });

    it('Регистрация нового пользователя c паролем без строчных символов: ', () => {
        cy.get('#form').contains('Регистрация').should('have.text', 'Регистрация');
        cy.get('#login').type(login).should('have.value', login);
        cy.get('#name').type(name).should('have.value', name);
        cy.get('#email').type(email).should('have.value', email);
        cy.get('#password').type((password + oneNumber).toUpperCase())
            .should('have.value', (password + oneNumber).toUpperCase());
        cy.get('#password_confirmation').type((password + oneNumber).toUpperCase())
            .should('have.value', (password + oneNumber).toUpperCase());
        cy.get('.register').submit();
        cy.get('#warning')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('Ошибка!');
            });
        cy.get('#warning').contains('Пароль должен содержать хотя бы одну заглавную и одну строчную букву.')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('одну заглавную и одну строчную');
            });
        cy.get('#form').should('not.have.text', 'Вход');
    });

    it('Регистрация нового пользователя c неправильно введённой почтой: ', () => {
        cy.get('#form').contains('Регистрация').should('have.text', 'Регистрация');
        cy.get('#login').type(login).should('have.value', login);
        cy.get('#name').type(name).should('have.value', name);
        cy.get('#email').type(brokeEmail).should('have.value', brokeEmail);
        cy.get('#password').type(password + oneNumber).should('have.value', password + oneNumber);
        cy.get('#password_confirmation').type(password + oneNumber)
            .should('have.value', password + oneNumber);
        cy.get('.register').submit();
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
        cy.get('#form').should('not.have.text', 'Вход');
    });

    it('Регистрация нового пользователя: ', () => {
        let login = getRandom();
        let email = getRandom() + '@mail.com';

        cy.get('#form').contains('Регистрация').should('have.text', 'Регистрация');
        cy.get('#login').type(login).should('have.value', login);
        cy.get('#name').type(name).should('have.value', name);
        cy.get('#email').type(email).should('have.value', email);
        cy.get('#password').type(password + oneNumber).should('have.value', password + oneNumber);
        cy.get('#password_confirmation').type(password + oneNumber)
            .should('have.value', password + oneNumber);
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
    });

    it('Регистрация нового пользователя c занятым логином: ', () => {
        let email = getRandom() + '@mail.com';

        cy.get('#form').contains('Регистрация').should('have.text', 'Регистрация');
        cy.get('#login').type(existsLogin).should('have.value', existsLogin);
        cy.get('#name').type(name).should('have.value', name);
        cy.get('#email').type(email).should('have.value', email);
        cy.get('#password').type(password + oneNumber).should('have.value', password + oneNumber);
        cy.get('#password_confirmation').type(password + oneNumber)
            .should('have.value', password + oneNumber);
        cy.get('.register').submit();
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
        cy.get('#form').should('not.have.text', 'Вход');
    });

    it('Регистрация нового пользователя c занятой электронной почтой: ', () => {
        let login = getRandom();

        cy.get('#form').contains('Регистрация').should('have.text', 'Регистрация');
        cy.get('#login').type(login).should('have.value', login);
        cy.get('#name').type(name).should('have.value', name);
        cy.get('#email').type(existsMail).should('have.value', existsMail);
        cy.get('#password').type(password + oneNumber).should('have.value', password + oneNumber);
        cy.get('#password_confirmation').type(password + oneNumber).should('have.value', password + oneNumber);
        cy.get('.register').submit();
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
        cy.get('#form').should('not.have.text', 'Вход');
    });

    afterEach( () => {
        cy.get('#closeButton > span').click();
    });
});
