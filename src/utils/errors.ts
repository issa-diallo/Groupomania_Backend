/* eslint-disable @typescript-eslint/no-explicit-any */
export const signUpErrors = (err: any) => {
  const RegisterError = { pseudo: '', email: '', password: '' }

  if (err.errors[0].message.includes('pseudo')) {
    RegisterError.pseudo = 'Pseudo incorrect ou déjà pris'
  }
  if (err.errors[0].message.includes('email')) {
    RegisterError.email = 'Email incorrect ou déjà pris'
  }
  if (err.errors[0].message.includes('password')) {
    RegisterError.password = 'Le mot de passe doit faire 6 caractères minimum'
  }
  return RegisterError
}
