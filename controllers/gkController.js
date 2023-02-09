// const axios = require('axios');
// const cheerio = require('cheerio');
// const pretty = require('pretty');

// const getScrapData = async (req, res) => {
//   const url = 'https://gk-hindi.in/world-gk';
//   const { data } = await axios.get(url);
//   // Load HTML we fetched in the previous line
//   const $ = cheerio.load(data);
//   const lists = $('.list-group-item');
//   //   console.log('getdata', lists.html());

//   var gkCategoryArr = [];

//   lists.each((id, element) => {
//     const name = $(element).text();
//     const slug = $(element).attr('href');

//     gkCategoryArr.push({
//       name: name,
//       slug: slug,
//     });
//   });
//   gkCategoryArr = gkCategoryArr.filter(
//     (value) => value.slug != undefined && value.name != undefined,
//   );

//   console.log(gkCategoryArr);

//   res.status(200).json({
//     status: true,
//     message: 'success',
//     data: gkCategoryArr,
//   });
// };

// const getQuizByCategory = async (req, res) => {
//   const url =
//     //  'https://gk-hindi.in/world-gk';
//     'https://gktrickhindi.com/general-knowledge-questions-and-answers-for-competitive-exams-in-hindi';
//   const { data } = await axios.get(url);
//   // Load HTML we fetched in the previous line
//   const $ = cheerio.load(data);
//   const lists = $('.entry-content').attr('ol');
//   console.log('getdata', $.html());

//   var gkQuizArr = [];

//   // lists.each((id, element) => {
//   //   console.log($(element).attr('li span').text());
//   //   // console.log($(element).children('p').children('b').text());
//   //   // const questionTemp = $(element).children('p').children('b').text();
//   //   // const question = questionTemp.replace(/[0-9]/g, '');
//   //   // gkQuizArr.push({ question: question });
//   // });
//   console.log(gkQuizArr);
//   res.status(200).json({
//     status: true,
//     message: 'success',
//     data: gkQuizArr,
//   });
// };

// module.exports = { getScrapData, getQuizByCategory };
