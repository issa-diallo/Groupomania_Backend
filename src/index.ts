import app from './app'

app.listen(process.env.PORT, () => {
  console.info(`Listening on port at http://localhost:${process.env.PORT}`)
})

export default app
