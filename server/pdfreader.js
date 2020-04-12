const Extractor = require('./extractor');

// From file to file
Extractor
.parseResumeFile('./files/atulsharma.pdf', './files/compiled') // input file, output dir
  .then(file => {
    console.log("Yay! " + file);
  })
  .catch(error => {
    console.error(error);
  });

// From URL
// Extractor
//   .parseResumeUrl('https://github.com/divapriya/Language_Processing/blob/master/resumes/atul%20sharma.pdf') // url
//   .then(data => {
//     console.log('Yay! ', data);
//   })
//   .catch(error => {
//     console.error(error);
//   });