# Installation Instructions

## Prerequistes
PDF extraction requires pdftotext be installed, http://www.xpdfreader.com/download.html
DOC extraction requires catdoc be installed, http://www.wagner.pp.ru/~vitus/software/catdoc/, unless on OSX in which case textutil (installed by default) is used.


Install Tesseract in your system
Mac - brew install tesseract
Ubuntu - sudo apt-get install tesseract-ocr
Windows - Follow this link https://ourcodeworld.com/articles/read/348/getting-started-with-optical-character-recognition-ocr-with-tesseract-in-node-js



## Server

1. cd server
2. npm i
3. node app.js 

## Client
1. cd client/file-upload
2. npm i
3. npm run dev
