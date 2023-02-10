const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/user-model');
const Joi = require('joi');
const l = require('lodash');
const { jwtSign, jwtVerify } = require('../services/user_service');

const register = async (req, res) => {
  const schema = Joi.object({
    role: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(value.password, salt);

  const existingUser = await UserModel.findOne({
    email: value.email,
  });

  if (existingUser) {
    res.status(400).json({
      message: 'Already registered',
      data: {},
    });
  } else {
    await UserModel.create({
      role: value.role,
      name: value.name,
      email: value.email,
      password: hashedPassword,
    })
      .then((userData) => {
        const email = userData.email;
        const userId = userData._id;
        const token = jwtSign(userId, email);

        userData.token = token;

        var jsondata = JSON.parse(JSON.stringify(userData));
        delete jsondata.password;

        if (jsondata) {
          res.status(201).send({
            message: 'Registered successfully',
            data: jsondata,
          });
        } else {
          res.status(401).send({
            message: 'Something went wrong',
            data: error,
          });
        }
      })
      .catch((error) => {
        res.status(401).send({
          message: 'Something went wrong',
          data: error,
        });
      });
  }
};
const comparePassword = async (plaintextPassword, hash) => {
  return await bcrypt
    .compare(plaintextPassword, hash)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      // console.log(err);
    });
};
const login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(value.password, salt);

  const user = await UserModel.findOne({
    email: value.email,
    name: value.name,
    // password: hashedPassword,
  })
    .then(async (userData) => {
      if (userData) {
        // console.log(typeof userData);
        const userId = userData._id;
        const email = userData.email;
        // console.log('checkuser 0', userData);
        const token = jwtSign(userId, email);

        userData.token = token;
        // userData.
        // delete userData.password;
        // var jsondata = userData;
        // console.log('checkuser 1');
        // console.log('hceonloginonly 1', userData);
        var isCorrectPassword = await comparePassword(
          value.password,
          userData.password,
          // '$2a$10$5eIRk4ADDRNOyEOjTRtsbujTfq66xsxW7RPy9BwKibc3AoCJFfGm3m',
          // '$2a$10$KPhCfJNA4Ebp9zRlmuYIs.F3D4Yjal9snC2zftcGG9bl5S4cErCNu',
        );
        // console.log('hceonloginonly', isCorrectPassword);

        if (isCorrectPassword) {
          // var jsondata = userData;
          // jsondata['password'] = '';
          var jsondata = JSON.parse(JSON.stringify(userData));
          delete jsondata.password;

          // console.log('checkuser|', jsondata);

          res.status(201).send({
            message: 'Logged in successfully',
            data: jsondata,
          });
        } else {
          return res.status(401).send({
            message: 'Wrong Password!',
            data: error,
          });
        }
        // console.log(l.omit(JSON.parse(JSON.stringify(userData)), ['password']));
        // var jsondata = l.omit(userData, ['password']);

        // if (jsondata) {
        //   res.status(201).send({
        //     message: 'Logged in successfully',
        //     data: jsondata,
        //   });
        // } else {
        //   res.status(401).send({
        //     message: 'Something went wrong',
        //     data: error,
        //   });
        // }
      } else {
        res.status(401).send({
          message: 'Email not found Credential',
          data: error,
        });
      }
    })
    .catch((error) => {});
};

const changePassword = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  // const { email, id } = req;
  // const { password } = req.body;

  const user = await UserModel.findOne({ email: value.email }).lean();
  // console.log(user);

  if (user) {
    if (value.password == user.password) {
      return res.status(400).json({
        message: 'Old and new pasassword are same',
      });
    }
    await UserModel.findByIdAndUpdate(
      { _id: user._id },
      {
        $set: {
          password: value.password,
        },
      },
    );
    const updatedUser = await UserModel.findById({ _id: user._id });
    res
      .status(200)
      .json({ message: 'Password updated successfully', data: updatedUser });
  } else {
    res.status(400).json({ message: 'User not found' });
  }
};

const verifyToken = (req, res, next) => {
  const token = extractToken(req);
  // console.log(token);

  if (token) {
    try {
      const decodeToken = jwtVerify(token);
      // jwt.verify(
      //   token,
      //   'SXqrqphaiLc92_sibuxhsEPvtjQlUx_WwMxdjZ7qp-odX3kAUbZi-H4ZvazieO2D',
      // );
      // console.log('geusert', decodeToken);

      const email = decodeToken.email;
      const id = decodeToken.user_id;
      req.email = email;
      req.userId = id;
      next();
    } catch (error) {
      res.status(400).json({ message: 'Authorization error' });
    }
  } else {
    res.status(400).json({ message: 'Authorization error' });
  }
};
const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

const sendOTP = () => {
  // const accountSid = 'AC6ab4f69802d4106531c36cdde1429208';
  // const authToken = '7a30955e3311e69f302f1922cd9164f2';
  // const client = require('twilio')(accountSid, authToken);
  // console.log('checkauth');
  // const otp = generateOTP();
  // client.messages
  //   .create({
  //     body: `This is a demo message. Your verification code is ${otp}`,
  //     from: '+19788177922',
  //     to: '+918476815968',
  //   })
  //   .then((message) => console.log(message.sid));
  // console.log('checkauth 2');
};

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

module.exports = {
  login,
  register,
  verifyToken,
  changePassword,
  extractToken,
  sendOTP,
  // updateUserProfile,
};
