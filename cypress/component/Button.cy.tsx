import { Button } from '../../src/components/ui/button';

describe('Button Component', () => {
  it('renders correctly', () => {
    cy.mount(<Button>Click me</Button>);
    cy.get('button').should('contain', 'Click me');
  });

  it('handles click events', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    cy.mount(<Button onClick={onClickSpy}>Click me</Button>);
    cy.get('button').click();
    cy.get('@onClickSpy').should('have.been.calledOnce');
  });

  it('can be disabled', () => {
    cy.mount(<Button disabled>Disabled Button</Button>);
    cy.get('button').should('be.disabled');
  });
});
