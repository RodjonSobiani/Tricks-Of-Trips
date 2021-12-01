// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add("text", {prevSubject: true}, (subject, options) => {
    return subject.text();
});

Cypress.Commands.add('expectValidJsonWithMinimumLength', (url, length) => {
    return cy.request({
        method: 'GET',
        url: url,
        followRedirect: false,
        headers: {
            'accept': 'application/json'
        }
    })
        .then((response) => {
            // Parse JSON the body.
            let body = JSON.parse(response.body);
            expect(response.status).to.eq(200);
            expect(response.headers['content-type']).to.eq('application/vnd.api+json');
            cy.log(body);
            expect(response.body).to.not.be.null;
            expect(body.data).to.have.length.of.at.least(length);

            // Ensure certain properties are present.
            body.data.forEach(function (item) {
                expect(item).to.have.all.keys('type', 'id', 'attributes', 'relationships', 'links');
                ['changed', 'created', 'default_langcode', 'langcode', 'moderation_state', 'nid', 'path', 'promote', 'revision_log', 'revision_timestamp', 'status', 'sticky', 'title', 'uuid', 'vid'].forEach((key) => {
                    expect(item['attributes']).to.have.property(key);
                });
            });
        });
});

import 'cypress-file-upload';
