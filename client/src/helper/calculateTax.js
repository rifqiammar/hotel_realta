function calculateTax(value, taxRate) {
  const taxAmount = value * taxRate;
  return value + taxAmount;
}

export default calculateTax;
