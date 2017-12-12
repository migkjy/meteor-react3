const add = (a, b) => {
  if (typeof b !== 'number') {
    return a + a;
  }
  return a + b;
};

const square = a => a * a;

it('should add two number', () => {
  const res = add(11, 9);

  if (res !== 20) {
    throw new Error('Sum was not equal to expected value');
  }
});

it('should double a single number', () => {
  const res = add(44);

  if (res !== 88) {
    throw new Error('Number was not doulbed.');
  }
});

it('should square a single number', () => {
  const res = square(7);

  if (res !== 49) {
    throw new Error('Number was not squared');
  }
});
