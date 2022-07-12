import { Options, diskStorage } from 'multer';
import path from 'path';
import { randomBytes } from 'crypto';

export const multerConfig = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: diskStorage({
    destination: (req, res, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (req, file, cb) => {
      randomBytes(16, (err, hash) => {
        if (err) cb(err, null);
        const filename = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, filename);
      });
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/jpg',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file ype'));
    }
  },
} as Options;
