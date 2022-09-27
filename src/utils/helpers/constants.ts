import { resolve } from 'path'

const ROOT_DIR = resolve(__dirname, '..', '..', '..')
export const RELATIVE_UPLOAD_PROFIL_PATH = 'src/clients/uploads/profil/'
export const ABSOLUTE_UPLOAD_PROFIL_PATH = resolve(
  ROOT_DIR,
  'src/clients/uploads/profil/'
)
export const RELATIVE_UPLOAD_POST_PATH = 'src/clients/uploads/post/'
export const ABSOLUTE_UPLOAD_POST_PATH = resolve(
  ROOT_DIR,
  'src/clients/uploads/post/'
)
