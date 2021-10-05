/// <reference types = "cypress" />

// Locators - find element by:
// - Tag Name
// - ID
// - class name
// - attribute name
// - attribute name and value
// - class value
// - create attribute Specifically for e2e

// link to element under test https://prntscr.com/1ibf5gs

describe('Our first suit', () => { //also can be used "context"
    
    it ('locators - 10 lesson', () => {

        cy.visit('/') //open needed page in app
        cy.contains('Forms').click() //clicks on nav menu -> Forms
        cy.contains('Form Layouts').click() //clicks on nav sub-menu -> Form Layouts
        
        // Tag name
        cy.get('input')

        // ID
        cy.get('#imputEmail1') // for id # needs to be added

        // class name
        cy.get('.input-full-width') // for class . needs to be added; van be added only 1 class value

        // class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]') //should be added all class values

        // attribute name
        cy.get('[placeholder]') // for attributre [] needs to be added

        // attribute name and value
        cy.get('[placeholder="Email"]')

        // tag name AND attribute name and value
        cy.get('input[placeholder="Email"]')

        // 2 different attrubutes
        cy.get('[placeholder="Email"][fullwidth]') 

        // tag name + attribute and value + id + class name
        cy.get('input[placeholder="Email"]#imputEmail1.input-full-width')

        // The most Recommend way by Cypress - create attributes for it
        cy.get('[data-cy="imputEmail1"]')

    })

    it ('finding element - 11 lesson', () => {

        cy.visit('/') 
        cy.contains('Forms').click() 
        cy.contains('Form Layouts').click()

    cy.get('[data-cy="signInButton"]')
    
    cy.contains('Sign in')

    cy.contains('[status="warning"]', 'Sign in')

    cy.get('#inputEmail3')
        .parents('form')
        .find('button')
        .should('contain','Sign in')
        .parents('form')
        .find('nb-checkbox')
        .click()
    })

    it('then and wrap methods - 12 lesson', () => {
        cy.visit('/') 
        cy.contains('Forms').click() 
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()

            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then(secondForm => {
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(passwordLabelSecond)
            })

            cy.wrap(secondForm).find('[for="exampleInputPassword1"').should('contain', 'Password')
        })
    })

    it('invoke - 13 lesson', () => {
        cy.visit('/') 
        cy.contains('Forms').click() 
        cy.contains('Form Layouts').click()

        // 1 way of assertion
        cy.get('[for="exampleInputEmail1"]').should('contain','Email address')
        // 2nd way of assertion
        cy.get('[for="exampleInputEmail1"]').then(label => {
            expect(label.text()).to.equal('Email address')
        })

        // invoke way of assertion
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')
        })

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            .should('contain', 'checked')
    })

    it('assert property - 13 lesson', () => {
        cy.visit('/') 
        cy.contains('Forms').click() 
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker')
            .find('[placeholder="Form Picker"]').click()
            .get('nb-calendar-day-picker').contains('17').click()
            .get('[placeholder="Form Picker"')
            .invoke('prop', 'value')
            .should('contain', 'Aug 17, 2021')
    })

    it('radio button - 14 lesson', () => {
        cy.visit('/') 
        cy.contains('Forms').click() 
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
            cy.wrap(radioButtons) // transforms radioButtons object fron JQuery to Cypress
                .first() // gets the first element, can be used eq(0) - equal to index
                .check({force: true}) // because the element is hidden in DOM
                .should('be.checked')
            cy.wrap(radioButtons)
                .eq(1) // finds the second radio button by index
                .check({force: true})
                .should('be.checked')
                cy.wrap(radioButtons) 
                .first()
                .should('not.be.checked')
            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled')
        })
    })

    it('checkboxes - 14 lesson', () => {
        cy.visit('/') 
        cy.contains('Modal & Overlays').click() 
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"').check({force:true}) // activates all checkboxes on the page
        cy.get('[type="checkbox"').eq(0).click({force:true}) // deactivates the first checkbox on the page as it was activated before
    })

    it('dropdown 1 - 15 lesson', () => {
        cy.visit('/') 

        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')
    })

    it.only('dropdown go through the list - 15 lesson', () => {
        cy.visit('/')

        cy.get('nav nb-select').then( dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each( listItem => {
                const itemText = listItem.text().trim()

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                cy.wrap(dropdown).click()
            })
        })
    })
})
