import CalculatorPage from '../support/pageObjects/calculatorPage';

describe('Google Calculator E2E Functionality Tests', () => {
  const calculator = new CalculatorPage();

  beforeEach(() => {
    cy.visit('/search?q=calculator');
    cy.get('#cwos', { timeout: 20000 }).should('be.visible');
  });

  it('should add two numbers correctly', () => {
    calculator.clickNumber('2');
    calculator.clickOperator('+');
    calculator.clickNumber('3');
    calculator.clickOperator('=');

    calculator.verifyResult('5');
  });

  it('should subtract two numbers correctly', () => {
    calculator.clickNumber('5');
    calculator.clickOperator('−');
    calculator.clickNumber('3');
    calculator.clickOperator('=');

    calculator.verifyResult('2');
  });

  it('should multiply two numbers correctly', () => {
    calculator.clickNumber('4');
    calculator.clickOperator('×');
    calculator.clickNumber('3');
    calculator.clickOperator('=');

    calculator.verifyResult('12');
  });

  it('should divide two numbers correctly', () => {
    calculator.clickNumber('6');
    calculator.clickOperator('÷');
    calculator.clickNumber('2');
    calculator.clickOperator('=');

    calculator.verifyResult('3');
  });

  it('should handle decimals correctly', () => {
    calculator.clickNumber('2');
    calculator.clickNumber('.');
    calculator.clickNumber('5');
    calculator.clickOperator('+');
    calculator.clickNumber('3');
    calculator.clickOperator('=');

    calculator.verifyResult('5.5');
  });

  it('should handle multiple operations correctly', () => {
    calculator.clickNumber('2');
    calculator.clickOperator('+');
    calculator.clickNumber('3');
    calculator.clickOperator('×');
    calculator.clickNumber('4');
    calculator.clickOperator('=');

    calculator.verifyResult('14');
  });

  it('should clear the current entry using CE', () => {
    calculator.clickNumber('9');
    calculator.clickOperator('+');
    calculator.clickOperator('CE');

    calculator.verifyResult('9');
  });

  it('should reset the result to zero after clearing calculator', () => {
    calculator.clickNumber('9');
    calculator.clickOperator('×');
    calculator.clickNumber('2');
    calculator.clickOperator('=');

    calculator.verifyResult('18');
    calculator.clear();
    calculator.verifyResult('0');
  });

});
