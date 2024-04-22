describe('product update test', () => {
  it('visits the product page and updates a product', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'products').click();
    cy.contains('MARIO000').click();
    cy.get("input[formcontrolname=costprice]").clear();
    cy.get("input[formcontrolname=costprice]").type('119.99');
    cy.get('button').contains('Save').click();
    cy.contains('updated!');
  });
});
