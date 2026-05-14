const wrap = (value, min, max) => {
  const range = max - min + 1;
  return ((((value - min) % range) + range) % range) + min;
};

export { wrap };