
// XPath for number buttons [0-9]
export const numberButtonXPath = (number) => `//div[@role='button'][contains(text(),'${number}')]`;
export const exactNumberButtonXPath = (number) => `//div[@role='button'][text() = '${number}']`;

// XPath for operator buttons (+, −, ×, ÷, =, AC, CE)
export const operatorButtonXPath = (operator) => {
  const operatorXPaths = {
    '+': "//div[@aria-label='plus'][contains(text(), '+')]",
    '−': "//div[@aria-label='minus'][contains(text(), '−')]",
    '×': "//div[@aria-label='multiply'][contains(text(), '×')]",
    '÷': "//div[@aria-label='divide'][contains(text(), '÷')]",
    '=': "//div[@aria-label='equals'][contains(text(), '=')]",
    '.': "//div[@aria-label='point'][contains(text(), '.')]",
    'AC': "//div[@aria-label='all clear']",
    'CE': "//div[@aria-label='clear entry']",
  };

  return operatorXPaths[operator];
};

// CSS Selector for the result display
export const resultDisplaySelector = "#cwos";
