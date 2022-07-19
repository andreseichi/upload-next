import express from 'express';
import multer from 'multer';
import cors from 'cors';

const upload = multer({ dest: 'uploads/' });

const server = express();
const PORT = 5000;
server.use(cors());

server.post('/file', upload.single('file'), function (req, res, next) {
  const file = req.file;

  if (!file) return res.status(400).send('No file received');

  if (file.size > 1309200) {
    return res.status(400).send('File too big!');
  }

  return res.send('File uploaded!');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
