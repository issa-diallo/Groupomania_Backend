import multer, { FileFilterCallback } from 'multer'
import { mkdirSync } from '../utils/helpers/functions'
import { STORAGE_UPLOAD_POST } from '../utils/helpers/constants'
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
    mkdirSync(STORAGE_UPLOAD_POST)
    callback(null, STORAGE_UPLOAD_POST)
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
  callback: FileFilterCallback
) => {
  if (
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/wbep' ||
    file.mimetype == 'image/jpeg'
  ) {
    callback(null, true)
  } else {
    callback(null, false)
    return callback(
      new Error('Only .png, .jpg, .wbep, and .jpeg format allowed!')
    )
  }
}

// Calling the multer
export default multer({ storage: storage, fileFilter: multerFilter }).single(
  'file'
)
