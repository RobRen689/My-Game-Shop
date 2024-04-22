describe('vendor delete test', () => {
  it('visits the vendor page and deletes a vendor', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'vendors').click();
    cy.contains('Billy').click();
    cy.get('button').contains('Delete').click();
    cy.contains('deleted!');
  });
});
