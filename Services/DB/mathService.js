function calcRequiredXP(level){
  const base = 25;
  const exponent = 1.5;
  return Math.floor(base * Math.pow(level, exponent))
}

module.exports = { calcRequiredXP }