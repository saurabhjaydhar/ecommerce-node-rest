const multer = require('multer');
const fs = require('fs');
const userModel = require('../model/user-model');
const { extractToken } = require('./auth-controller');

// / SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg');
  },
});

const upload = multer({ storage: storage }).single('image');
function base64_encode(file) {
  return 'data:image/gif;base64,' + fs.readFileSync(file, 'base64');
}
const uploadimage = async (req, res) => {
  const token = extractToken(req);
  console.log('okdata');
  if (!req.file) {
    return res.status(400).json({ message: 'No file was uploaded' });
  }

  const fileName = req.file.path;
  var base64str = base64_encode(fileName);
  console.log('checkimage', base64str);

  await userModel.findByIdAndUpdate({
    name: 'saurabh J.',
    displayPicture: base64str,
  });

  // return res.status(200).json({ message: ' file was uploaded' });
};

const getUserProfile = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  console.log('donedata', req);
  const token = extractToken(req);
  user.token = token;

  if (user) {
    var jsonData = JSON.parse(JSON.stringify(user));
    delete jsonData.password;
    return res.status(400).json({ message: 'sucesss', data: jsonData });
  } else {
    return res.status(400).json({ message: 'No data found' });
  }
};

const updateUserProfile = async (req, res) => {
  console.log('checksomesss', req.userId);
  // const user = await userModel.findOne({ email: req.body.userId });
  const user = await userModel.findByIdAndUpdate(
    { _id: req.userId },
    {
      $set: {
        name: 'saurabh 100',
      },
      // new: true,
    },
  );
  // await user.save();

  console.log('checksomesss', user);

  if (user) {
    // var jsonData = JSON.parse(JSON.stringify(user));
    // delete jsonData.password;
    return res.status(400).json({ message: 'sucesss', data: 'jsonData' });
  } else {
    return res.status(400).json({ message: 'No data found' });
  }
};

module.exports = { uploadimage, upload, getUserProfile, updateUserProfile };
