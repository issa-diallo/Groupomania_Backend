import multer, { FileFilterCallback } from 'multer'
import { mkdirSync } from '../utils/helpers/functions'
import { STORAGE_UPLOAD_PROFIL } from '../utils/helpers/constants'
import { Request } from 'express'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

// Configuration for multer.
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ) => {
    mkdirSync(STORAGE_UPLOAD_PROFIL)
    callback(null, STORAGE_UPLOAD_PROFIL)
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ) => {
    const name = file.originalname.split(' ').join('_')
    callback(null, name)
  },
})

// Multer Filter
const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
  }
}

// Calling the multer
export default multer({ storage: storage, fileFilter: multerFilter }).single(
  'file'
)
