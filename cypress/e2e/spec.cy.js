describe('Google Search and Gradual Scroll Test', () => {
  it('should perform a search and scroll through the results gradually', () => {
    // Visit the Google homepage
    cy.visit('https://www.google.com');

    // Accept cookies if the consent form appears (optional, based on your location)
    cy.get('button').then(($btn) => {
      if ($btn.text().includes('I agree') || $btn.text().includes('Accept all')) {
        cy.wrap($btn).click();
      }
    });

    // Enter the search term
    cy.get('.gLFyf').type('Cypress testing framework');

    // Click the Google search button by its text
    cy.contains('input', 'Google Search').click();

    // Wait for the search results to appear
    cy.get('#search').should('be.visible');

    // Verify that the search results contain the expected text
    cy.get('#search').contains('Cypress.io').should('be.visible');

    // Gradually scroll from top to bottom
    cy.window().then((win) => {
      const scrollHeight = win.document.body.scrollHeight;
      const scrollStep = 100; // Adjust the step size as needed
      for (let y = 0; y <= scrollHeight; y += scrollStep) {
        cy.wait(500); // Adjust the delay between scroll steps as needed
        cy.scrollTo(0, y);
      }
    });
  });
});
