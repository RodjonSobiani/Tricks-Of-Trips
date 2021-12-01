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

let email = getRandom() + '@mail.com';
let existsEmail = email;
let brokeEmail = getRandom() + '#mail.com';

context('Тесты неавторизованного пользователя:', () => {
    beforeEach(() => {
        cy.viewport(1980, 1080);
        cy.visit('http://redjeetrips.com/')
            .request('http://redjeetrips.com/')
            .should((response) => {
                expect(response.status).to.eq(200)
            });
    });

    describe("Проверка страниц 404", () => {
        it("Попытка перейти в админ-панель: ", () => {
            cy.visit("http://redjeetrips.com/admin", {failOnStatusCode: false});
            cy.server();
            cy.route({
                url: "http://redjeetrips.com/admin",
                method: "GET",
                response: {
                    statusCode: "Not Found",
                    code: 404
                }
            });
            cy.get('#errFOF').contains('404').should('have.text', '404');
            cy.get('#pageNotFound')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('Страница не найдена');
                });
            cy.contains('404');
        });

        it("Попытка перейти на несуществующую страницу: ", () => {
            cy.visit("http://redjeetrips.com/404", {failOnStatusCode: false});
            cy.server();
            cy.route({
                url: "http://redjeetrips.com/404",
                method: "GET",
                response: {
                    statusCode: "Not Found",
                    code: 404
                }
            });
            cy.get('#errFOF').contains('404').should('have.text', '404');
            cy.get('#pageNotFound')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('Страница не найдена');
                });
            cy.contains('404');
        });
    });

    describe("Проверка переходов на стартовой странице.", () => {
        it('Переход на страницу "Регистрация" со стартовой страницы: ', () => {
            cy.contains('Регистрация').click()
                .request('http://redjeetrips.com/auth/register')
                .should((response) => {
                    expect(response.status).to.eq(200)
                });
            cy.get('#form').contains('Регистрация').should('have.text', 'Регистрация');
        });

        it('Переход на страницу "Вход" со стартовой страницы: ', () => {
            cy.contains('Вход').click()
                .request('http://redjeetrips.com/auth/login')
                .should((response) => {
                    expect(response.status).to.eq(200)
                });
            cy.get('#form').contains('Вход').should('have.text', 'Вход');
        });

        it('Прокрутка стартовой страницы вниз и нажатие на кнопки боковой навигации: ', () => {
            cy.get('.footer-widget-section').scrollIntoView({duration: 3000}).wait(3000)
                .contains('О проекте');
            cy.get('.rightNav > [href="#fbsection1"]').click().wait(1000);
            cy.get('.rightNav > [href="#fbsection2"]').click().wait(1000);
            cy.get('.rightNav > [href="#fbsection3"]').click().wait(1000);
            cy.get('.rightNav > [href="#fbsection4"]').click().wait(1000);
            cy.get('.rightNav > [href="#fbsection5"]').click().wait(1000);
            cy.get('.rightNav > [href="#svg-map"]').click().wait(1000);
            cy.get('[href="#footer"]').click().wait(1000);
            cy.get('.rightNav > [href="#svg-map"]').click().wait(1000);
            cy.get('.form-group > .btn').click().wait(1000);
        });

        describe("Проверка главного меню:", () => {
            it('Проверка главного меню, пункт "Приключения начинаются здесь": ', () => {
                cy.get('.p-5').wait(1000).contains('Приключения начинаются здесь').click().wait(1000);
            });
            it('Проверка главного меню, пункт "Исследуйте мир с интересом": ', () => {
                cy.get('.p-5').wait(1000).contains('Исследуйте мир с интересом').click().wait(1000);
            });
            it('Проверка главного меню, пункт "Участвуйте в увлекательных конкурсах": ', () => {
                cy.get('.p-5').wait(1000).contains('Участвуйте в увлекательных конкурсах').click().wait(1000);
            });
            it('Проверка главного меню, пункт "Создавайте собственные приключения": ', () => {
                cy.get('.p-5').wait(1000).contains('Создавайте собственные приключения').click().wait(1000);
            });
            it('Проверка главного меню, пункт "Присоединяйтесь!": ', () => {
                cy.get('.p-5').wait(1000).contains('Присоединяйтесь!').click().wait(3000);
            });

        });
    });
});

describe("Проверка переходов на главной странице блога:", () => {
    beforeEach(() => {
        cy.viewport(1980, 1080);
        cy.visit('http://redjeetrips.com/blog')
            .request('http://redjeetrips.com/blog')
            .should((response) => {
                expect(response.status).to.eq(200)
            });
    });

    it('Переход на страницу "Регистрация" с главной страницы блога: ', () => {
        cy.contains('Регистрация').click()
            .request('http://redjeetrips.com/auth/register')
            .should((response) => {
                expect(response.status).to.eq(200)
            });
        cy.get('#form').contains('Регистрация').should('have.text', 'Регистрация');
    });

    it('Переход на страницу "Вход" с главной страницы блога: ', () => {
        cy.contains('Вход').click()
            .request('http://redjeetrips.com/auth/login')
            .should((response) => {
                expect(response.status).to.eq(200)
            });
        cy.get('#form').contains('Вход').should('have.text', 'Вход');
    });

    it('Прокрутка главной страницы блога в самый низ: ', () => {
        cy.get('.footer-widget-section').scrollIntoView({duration: 1000})
            .contains('О проекте');
    });

    describe("Проверка постов на страницах блога:", () => {
        it('Проверка, что на главной странице блога пять постов: ', () => {
            const expectedCountPost = 5;
            cy.get('.main-content > :nth-child(1)').get('.post-thumb').should('have.length', expectedCountPost);
        });

        it('Чтение поста с главной страницы блога и переход к комментариям: ', () => {
            cy.get(':nth-child(1) > .post-thumb > .post-thumb-overlay').click().wait(1000);
            cy.get('.footer-widget-section').scrollIntoView({duration: 1000})
            cy.get('#comments').scrollIntoView({duration: 1000})
            cy.get('.col-md-8 > :nth-child(6)').scrollIntoView({duration: 1000})
                .contains('Чтобы оставлять комментарии, пожалуйста, авторизуйтесь.')
                .text()
                .then(value => {
                    cy.log("Сообщение: " + value);
                    expect(value).to.include('авторизуйтесь');
                });
        });

        it('Чтение поста с главной страницы блога и переход по тегу поста (и там два поста): ', () => {
            cy.get(':nth-child(1) > .post-thumb > .post-thumb-overlay').click().wait(1000);
            cy.get('.decoration').scrollIntoView({duration: 1000});
            cy.get('[href="http://redjeetrips.com/blog/tag/tayga"]').click();
            const expectedCountPost = 2;
            cy.get('.main-content > :nth-child(1)').get('.post-thumb').should('have.length', expectedCountPost);
        });

        it('Чтение поста с главной страницы блога и переход по категории поста (и там два поста): ', () => {
            cy.get(':nth-child(1) > .post-thumb > .post-thumb-overlay').click().wait(1000);
            cy.get('h6 > a').click();
            const expectedCountPost = 2;
            cy.get('.main-content > :nth-child(1)').get('.post-thumb').should('have.length', expectedCountPost);
        });

        it('Поиск по названию (ввод "Alias", четыре поста): ', () => {
            cy.get('.row > .form-control').click().type('Alias').should('have.value', 'Alias');
            cy.get('.row > .btn').click();
            const expectedCountPost = 4;
            cy.get('.main-content > :nth-child(1)').get('.post-thumb').should('have.length', expectedCountPost);
        });

        it('Прокрутка главной страницы блога до блока "Категории" и выбор категории (максимум по два поста на страницу): ', () => {
            cy.get('.border').scrollIntoView({duration: 1000});
            cy.get('.border').scrollIntoView({duration: 1000})
                .contains('Категории');
            cy.get('.border > ul > :nth-child(3) > a').click();
            const expectedCountPostPerFirstPage = 2;
            cy.get('.main-content > :nth-child(1)').get('.post-thumb').should('have.length', expectedCountPostPerFirstPage);
            cy.log("Переход на следующую страницу: ");
            cy.get(':nth-child(3) > .page-link').click();
            const expectedCountPostPerSecondPage = 1;
            cy.get('.main-content > :nth-child(1)').get('.post-thumb').should('have.length', expectedCountPostPerSecondPage);
        });

        it('Прокрутка главной страницы блога до блока "Рекомендованные поста" и прокрутка "карусели": ', () => {
            cy.log("Прокрутка до блока 'Рекомендованные посты': ");
            cy.get('.sidebar > :nth-child(4)').scrollIntoView({duration: 1000})
                .contains('Рекомендованные посты');
            cy.log("Переход на следующую страницу: ");
            cy.get('.owl-next').click().wait(1000);
            cy.get('.owl-next').click().wait(1000);
            cy.get('.owl-next').click().wait(1000);
            cy.get(':nth-child(3) > .item > .feature-content > .overlay-text').click();
        });

        it('Проверка кнопок пагинации: ', () => {
            cy.get('.pagination').scrollIntoView({duration: 1000});
            cy.get('.active > .page-link').contains('1').should('have.text', '1');
            cy.get(':nth-child(6) > .page-link').click().wait(1000);
            cy.get('.pagination').scrollIntoView({duration: 1000});
            cy.get('.active > .page-link').contains('5').should('have.text', '5');
            cy.get(':nth-child(11) > .page-link').click().wait(1000);
            cy.get('.pagination').scrollIntoView({duration: 1000});
            cy.get('.active > .page-link').contains('10').should('have.text', '10');
            cy.get(':nth-child(15) > .page-link').click().wait(1000);
            cy.get('.pagination').scrollIntoView({duration: 1000});
            cy.get('.active > .page-link').contains('11').should('have.text', '11');
            cy.get(':nth-child(14) > .page-link').click().wait(1000);
            cy.get('.pagination').scrollIntoView({duration: 1000});
            cy.get(':nth-child(1) > .page-link').click().wait(1000);
            cy.get('.pagination').scrollIntoView({duration: 1000});
        });
    });

});

describe("Проверка рассылки:", () => {
    beforeEach(() => {
        cy.viewport(1980, 1080);
        cy.visit('http://redjeetrips.com/blog')
            .request('http://redjeetrips.com/blog')
            .should((response) => {
                expect(response.status).to.eq(200)
            });
    });
    it('Подписка на рассылку (без почты): ', () => {
        cy.get('.subscribe').submit();
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
    });

    it('Подписка на рассылку (с неправильно введённой почтой): ', () => {
        cy.get('form > .form-control').click().type(brokeEmail).should('have.value', brokeEmail);
        cy.get('form > .text-uppercase').click();
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
    });

    it('Подписка на рассылку: ', () => {
        cy.get('form > .form-control').click().type(email).should('have.value', email);
        cy.get('form > .text-uppercase').click();
        cy.get('#info')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('Информация:');
            });
        cy.get('#info').contains('Пожалуйста, проверьте Вашу почту.')
            .text()
            .then(value => {
                cy.log("Сообщение: " + value);
                expect(value).to.include('Пожалуйста, проверьте Вашу почту.');
            });
    });

    it('Подписка на рассылку (с уже существующей почтой): ', () => {
        cy.get('form > .form-control').click().type(existsEmail).should('have.value', existsEmail);
        cy.get('.subscribe').submit();
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
                expect(value).to.include('уже');
            });
    });
});
