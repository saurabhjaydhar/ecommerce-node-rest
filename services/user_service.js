const jwt = require('jsonwebtoken');

const jwtSign = (userId, email) => {
  return jwt.sign(
    { user_id: userId, email },
    'SXqrqphaiLc92_sibuxhsEPvtjQlUx_WwMxdjZ7qp-odX3kAUbZi-H4ZvazieO2D',
    {
      expiresIn: '2h',
    },
  );
};

const jwtVerify = (token) => {
  return jwt.verify(
    token,
    'SXqrqphaiLc92_sibuxhsEPvtjQlUx_WwMxdjZ7qp-odX3kAUbZi-H4ZvazieO2D',
  );
};

module.exports = { jwtSign, jwtVerify };
