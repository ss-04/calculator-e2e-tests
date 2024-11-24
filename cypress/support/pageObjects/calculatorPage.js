import { numberButtonXPath, exactNumberButtonXPath, operatorButtonXPath, resultDisplaySelector } from '../selectors';

class CalculatorPage {

  // Method to click a number button (using XPath)
  clickNumber(number) {
    cy.xpath(numberButtonXPath(number)).click();
  }

  // Method to click a positive number
  clickPositiveNumber(number) {
    number.toString().split('').forEach(digit => {
      cy.xpath(exactNumberButtonXPath(digit)).click();
    });
  }

  // Method to click a negative number
  clickNegativeNumber(number) {
    cy.xpath(exactNumberButtonXPath('−')).click();
    this.clickPositiveNumber(number.slice(1));
  }

  // Method to click an exact number button (for specific numbers like 0, 1, etc.)
  clickExactNumber(number) {
    if (number.startsWith('−')) {
      this.clickNegativeNumber(number);
    } else {
      this.clickPositiveNumber(number);
    }
  }

  // Method to click an operator button (+, −, ×, ÷, =, AC, CE)
  clickOperator(operator) {
    cy.xpath(operatorButtonXPath(operator)).click();
  }

  // Method to verify the result displayed in the calculator
  verifyResult(expectedResult) {
    cy.get(resultDisplaySelector).should('have.text', expectedResult);
  }

  // Method to clear the calculator using AC
  clear() {
    this.clickOperator('AC');
  }

  // Method to clear the current entry using CE
  clearEntry() {
    this.clickOperator('CE');
  }
}

export default CalculatorPage;
