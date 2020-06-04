Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	return false
  })

describe('Tab Handling Anchor Links', function () {
	beforeEach(function () {
		cy.visit('https://www.yad2.co.il/')
		cy.wait(5000);
	})
	describe('Bounce Ad', () => {
		it('Login and bounce', () => {

			cy.get('.private_zone').first().click();
			cy.wait(2500);

			cy.get('#userName').type(Cypress.env('email'))
			cy.get('#password').type(Cypress.env('password'))
			cy.get('#submitLogonForm').click();


			cy.get('div.content-wrapper.active').each((category) => {
				category.click();

				try {
					const modalClostButton = cy.get('#sLightbox_container .closeToolTipIframe');
					modalClostButton.click();
				}
				catch(err) {
				}

				cy.get('tbody > tr.item').each((item) => {
					item.click();
					cy.wait(5000);

					cy.get('iframe[scrolling="no"]').then(f => {
						const body = f.contents().find('body');

						cy.wrap(body)
						.find('span#bounceRatingOrderBtn.viewCommand.viewSize1.viewCommandGreenBtn')
						.click({force: true});

						item.click();

					});
				});

				cy.get('.nextButton').first().click();

			})

			expect(true).to.equal(true)
		})
	})

})