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

  // Parameterized test to handle multiplication of whole numbers, cases with 0.
  const multiplicationTestCases = [
    { multiplier: '4', multiplicand: '3', expected: '12' },
    { multiplier: '5', multiplicand: '0', expected: '0' },
    { multiplier: '0', multiplicand: '5', expected: '0' }
  ];

  multiplicationTestCases.forEach(({ multiplier, multiplicand, expected }) => {
    it(`should multiply ${multiplier} by ${multiplicand} correctly`, () => {
      calculator.clickExactNumber(multiplier);
      calculator.clickOperator('×');
      calculator.clickExactNumber(multiplicand);
      calculator.clickOperator('=');

      calculator.verifyResult(expected);
    });
  });

  it('should divide two numbers correctly', () => {
    calculator.clickNumber('6');
    calculator.clickOperator('÷');
    calculator.clickNumber('2');
    calculator.clickOperator('=');

    calculator.verifyResult('3');
  });

  // Parameterized test for division by 0
  const divisionByZeroTestCases = [
    { numerator: '5', denominator: '0', expected: 'Infinity' },
    { numerator: '0', denominator: '5', expected: '0' },
  ];

  divisionByZeroTestCases.forEach(({ numerator, denominator, expected }) => {
    it(`should divide ${numerator} by ${denominator} correctly`, () => {
      calculator.clickExactNumber(numerator);
      calculator.clickOperator('÷');
      calculator.clickExactNumber(denominator);
      calculator.clickOperator('=');

      calculator.verifyResult(expected);
    });
  });

  // Parameterized test for decimal scenarios on all operators
  const decimalTestCases = [
    { numerator: '5.5', operator: '+', denominator: '2.5',    expected: '8'     },
    { numerator: '9',   operator: '−', denominator: '4.5',    expected: '4.5'   },
    { numerator: '8.4', operator: '×', denominator: '0.1',    expected: '0.84'  },
    { numerator: '2',   operator: '÷', denominator: '0.01',   expected: '200'   },
    { numerator: '2',   operator: '÷', denominator: '0.001',  expected: '2000'  },
    { numerator: '15',  operator: '÷', denominator: '0.5',    expected: '30'    }
  ];

  decimalTestCases.forEach(({ numerator, operator, denominator, expected }) => {
    it(`should calculate ${numerator} ${operator} ${denominator} correctly`, () => {
      calculator.clickExactNumber(numerator);
      calculator.clickOperator(operator);
      calculator.clickExactNumber(denominator);
      calculator.clickOperator('=');

      calculator.verifyResult(expected);
    });
  });

  // Test cases with negative numbers for different operators
  const negativeNumberTestCases = [
    { numerator: '−5',  operator: '+', denominator: '3',  expected:  '-2'    },
    { numerator: '−5',  operator: '−', denominator: '3',  expected:  '-8'    },
    { numerator: '−5',  operator: '×', denominator: '−3', expected:  '15'    },
    { numerator:  '5',  operator: '×', denominator: '−3', expected:  '-15'   },
    { numerator: '−10', operator: '÷', denominator: '2',  expected:  '-5'    },
    { numerator: '−10', operator: '÷', denominator: '−2', expected:  '5'     },
  ];

  negativeNumberTestCases.forEach(({ numerator, operator, denominator, expected }) => {
    it(`should correctly calculate ${numerator} ${operator} ${denominator}`, () => {
      calculator.clickExactNumber(numerator);
      calculator.clickOperator(operator);
      calculator.clickExactNumber(denominator);
      calculator.clickOperator('=');

      calculator.verifyResult(expected);
    });
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
