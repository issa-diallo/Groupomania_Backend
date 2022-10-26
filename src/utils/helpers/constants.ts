import { resolve } from 'path'

const ROOT_DIR = resolve(__dirname, '..', '..', '..')
export const RELATIVE_UPLOAD_PROFIL_PATH = 'src/images/profil/'
export const ABSOLUTE_UPLOAD_PROFIL_PATH = resolve(
  ROOT_DIR,
  'src/images/profil/'
)
export const RELATIVE_UPLOAD_POST_PATH = 'images/post/'
export const ABSOLUTE_UPLOAD_POST_PATH = resolve(ROOT_DIR, 'src/images/post/')
