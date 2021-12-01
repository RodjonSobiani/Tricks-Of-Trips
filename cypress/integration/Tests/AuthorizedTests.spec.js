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
let email = getRandom() + '@mail.com';
const existsMail = email;
let password = getRandom();
let oneNumber = randomInteger(0, 9);
let about = getRandom() + ' ' + getRandom() + ' ' + getRandom();
const currentAbout = about;
const currentPassword = password;
let comment = repeatStr(about, randomInteger(1, 9));
const myComment = comment;
const userMail = 'testuser@mail.com';
const userPassword = 'TestUser007';
const userName = 'TestUserName';
let postTitle = getRandom();
let postDescription = about;
let postContent = comment;


context('Тесты авторизованного пользователя:', () => {
    beforeEach(() => {
        cy.viewport(1980, 1080);
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
    });

    describe("Проверка личного кабинета (профиль пользователя).", () => {
        it('Вход в профиль', () => {
            cy.contains('Мой профиль').should('have.text', 'Мой профиль').click();
            cy.get('.leave-comment > .text-uppercase').contains('Мой профиль').should('have.text', 'Мой профиль');
            cy.get('.leave-comment').contains('Ваш логин: ')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('TestUser');
                });
        });

        it('Изменение данных профиля (имя)', () => {
            cy.contains('Мой профиль').should('have.text', 'Мой профиль').click();
            cy.get('.leave-comment > .text-uppercase').contains('Мой профиль').should('have.text', 'Мой профиль');
            cy.get('#name').type('text').clear();
            cy.get('#name').type(name);
            cy.get('.profile').submit();
            cy.get('#info')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('Информация:');
                });
            cy.get('#info').contains('Профиль успешно обновлен')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('успешно');
                });
            cy.get('#closeButton > span').click();
            cy.contains('Главная').should('have.text', 'Главная').click();
            cy.contains('Мой профиль').should('have.text', 'Мой профиль').click();
            cy.get('#name').should('have.value', name);
            cy.get('#name').type('text').clear();
            cy.get('#name').type(userName);
            cy.get('.profile').submit();
        });

        it('Изменение данных профиля (электронная почта), выход и повторный вход с новыми данными.', () => {
            cy.contains('Мой профиль').should('have.text', 'Мой профиль').click();
            cy.get('.leave-comment > .text-uppercase').contains('Мой профиль').should('have.text', 'Мой профиль');
            cy.get('#email').type('text').clear();
            cy.get('#email').type(email);
            cy.get('.profile').submit();
            cy.get('#info')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('Информация:');
                });
            cy.get('#info').contains('Профиль успешно обновлен')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('успешно');
                });
            cy.get('#closeButton > span').click();
            cy.contains('Выход').click();
            cy.visit('http://redjeetrips.com/auth/login')
                .request('http://redjeetrips.com/auth/login')
                .should((response) => {
                    expect(response.status).to.eq(200)
                });
            cy.get('#login-form').should('have.text', 'Вход');
            cy.get('#email').type(existsMail).should('have.value', existsMail);
            cy.get('#password').type(userPassword).should('have.value', userPassword)
                .request('http://redjeetrips.com/blog')
                .should((response) => {
                    expect(response.status).to.eq(200)
                });
            cy.get('.auth').submit();
            cy.contains('Мой профиль').should('have.text', 'Мой профиль').click();
            cy.get('#email').should('have.value', email);
            cy.get('#email').type('text').clear();
            cy.get('#email').type(userMail);
            cy.get('.profile').submit();
        });

        it('Изменение данных профиля (пароль), выход и повторный вход с новыми данными.', () => {
            cy.contains('Мой профиль').should('have.text', 'Мой профиль').click();
            cy.get('.leave-comment > .text-uppercase').contains('Мой профиль').should('have.text', 'Мой профиль');
            cy.get('#password').type('text').clear();
            cy.get('#password').type(password);
            cy.get('.profile').submit();
            cy.get('#info')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('Информация:');
                });
            cy.get('#info').contains('Профиль успешно обновлен')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('успешно');
                });
            cy.get('#closeButton > span').click();
            cy.contains('Выход').click();
            cy.visit('http://redjeetrips.com/auth/login')
                .request('http://redjeetrips.com/auth/login')
                .should((response) => {
                    expect(response.status).to.eq(200)
                });
            cy.get('#login-form').should('have.text', 'Вход');
            cy.get('#email').type(userMail).should('have.value', userMail);
            cy.get('#password').type(currentPassword).should('have.value', currentPassword)
                .request('http://redjeetrips.com/blog')
                .should((response) => {
                    expect(response.status).to.eq(200)
                });
            cy.get('.auth').submit();
            cy.contains('Мой профиль').should('have.text', 'Мой профиль').click();
            cy.get('#email').should('have.value', userMail);
            cy.get('#password').type('text').clear();
            cy.get('#password').type(userPassword);
            cy.get('.profile').submit();
        });

        it('Изменение данных профиля (о себе).', () => {
            cy.contains('Мой профиль').should('have.text', 'Мой профиль').click();
            cy.get('.leave-comment > .text-uppercase').contains('Мой профиль').should('have.text', 'Мой профиль');
            cy.get('#about').type('text').clear();
            cy.get('#about').type(about);
            cy.get('.profile').submit();
            cy.get('#info')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('Информация:');
                });
            cy.get('#info').contains('Профиль успешно обновлен')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('успешно');
                });
            cy.get('#closeButton > span').click();
            cy.get('#about').should('have.value', currentAbout);
        });

        it('Изменение данных профиля (аватар).', () => {
            cy.contains('Мой профиль').should('have.text', 'Мой профиль').click();
            cy.get('.leave-comment > .text-uppercase').contains('Мой профиль').should('have.text', 'Мой профиль');
            const filepath = 'images/forest.png'
            cy.get('input[type="file"]').attachFile(filepath);
            cy.get('.profile').submit();
            cy.get('#info')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('Информация:');
                });
            cy.get('#info').contains('Профиль успешно обновлен')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('успешно');
                });
            cy.get('#closeButton > span').click();
        });

        it('Изменение данных профиля (аватар, ещё раз, наглядно).', () => {
            cy.contains('Мой профиль').should('have.text', 'Мой профиль').click();
            cy.get('.leave-comment > .text-uppercase').contains('Мой профиль').should('have.text', 'Мой профиль');
            const filepath = 'images/Oblaka.jpg'
            cy.get('input[type="file"]').attachFile(filepath);
            cy.get('.profile').submit();
            cy.get('#info')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('Информация:');
                });
            cy.get('#info').contains('Профиль успешно обновлен')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('успешно');
                });
            cy.get('#closeButton > span').click();
        });
    });
    describe("Проверка комментариев.", () => {
        it('Добавление комментария: ', () => {
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

        it('Удаление своего комментария: ', () => {
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

        it('Добавление ещё одного комментария (для удаления администратором): ', () => {
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

    describe("Проверка создания поста.", () => {
        it('Добавление поста (без поля "Название"): ', () => {
            cy.get('#addPost').click();
            const filepath = 'images/Oblaka.jpg'
            cy.get('input[type="file"]').attachFile(filepath);
            cy.get('.minimal').click();
            cy.get('#postDescription').click().type(postDescription);
            cy.get('.note-editable').click().type(postContent);
            cy.get('.addPost').click();
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

        it('Добавление поста (без изображения): ', () => {
            cy.get('#addPost').click();
            cy.get('#title').type(postTitle);
            cy.get('.minimal').click();
            cy.get('#postDescription').click().type(postDescription);
            cy.get('.note-editable').click().type(postContent);
            cy.get('.addPost').click();
            cy.get('#info')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('Информация:');
                });
            cy.get('#info').contains('Ваш пост успешно добавлен и ожидает модерации.')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('добавлен и ожидает');
                });
            cy.get('#closeButton > span').click();
        });

        it('Добавление поста c неподходящим форматом изображения: ', () => {
            cy.get('#addPost').click();
            cy.get('#title').type(postTitle);
            const filepath = 'images/test.pdf'
            cy.get('input[type="file"]').attachFile(filepath);
            cy.get('.minimal').click();
            cy.get('#postDescription').click().type(postDescription);
            cy.get('.note-editable').click().type(postContent);
            cy.get('.addPost').click();
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

        it('Добавление поста (без описания): ', () => {
            cy.get('#addPost').click();
            cy.get('#title').type(postTitle);
            const filepath = 'images/Oblaka.jpg';
            cy.get('input[type="file"]').attachFile(filepath);
            cy.get('.minimal').click();
            cy.get('.note-editable').click().type(postContent);
            cy.get('.addPost').click();
            cy.get('#info')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('Информация:');
                });
            cy.get('#info').contains('Ваш пост успешно добавлен и ожидает модерации.')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('добавлен и ожидает');
                });
            cy.get('#closeButton > span').click();
        });

        it('Добавление поста (без контента): ', () => {
            cy.get('#addPost').click();
            cy.get('#title').type(postTitle);
            const filepath = 'images/Oblaka.jpg'
            cy.get('input[type="file"]').attachFile(filepath);
            cy.get('.minimal').click();
            cy.get('#postDescription').click().type(postDescription);
            cy.get('.addPost').click();
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

        it('Добавление поста (без рекомендаций): ', () => {
            cy.get('#addPost').click();
            cy.get('#title').type(postTitle);
            const filepath = 'images/Oblaka.jpg'
            cy.get('input[type="file"]').attachFile(filepath);
            cy.get('#postDescription').click().type(postDescription);
            cy.get('.note-editable').click().type(postContent);
            cy.get('.addPost').click();
            cy.get('#info')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('Информация:');
                });
            cy.get('#info').contains('Ваш пост успешно добавлен и ожидает модерации.')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('добавлен и ожидает');
                });
            cy.get('#closeButton > span').click();
        });

        it('Добавление поста (все поля правильно заполнены): ', () => {
            cy.get('#addPost').click();
            cy.get('#title').type(postTitle);
            const filepath = 'images/Oblaka.jpg'
            // const filepath = 'images/test.pdf'
            cy.get('input[type="file"]').attachFile(filepath);
            cy.get('.minimal').click();
            cy.get('#postDescription').click().type(postDescription);
            cy.get('.note-editable').click().type(postContent);
            cy.get('.addPost').click();
            cy.get('#info')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('Информация:');
                });
            cy.get('#info').contains('Ваш пост успешно добавлен и ожидает модерации.')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('добавлен и ожидает');
                });
            cy.get('#closeButton > span').click();
        });
    });

    afterEach(() => {
        cy.contains('Выход').click();
    });
});
