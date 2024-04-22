describe('vendor update test', () => {
  it('visits the vendor page and updates a vendor', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'vendors').click();
    cy.contains('Billy').click();
    cy.get("[type='email']").clear();
    cy.get("[type='email']").type('bb@update.com');
    cy.get('form').submit();
    cy.contains('updated!');
  });
});
