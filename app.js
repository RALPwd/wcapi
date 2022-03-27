const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.json({msg: 'Hola mundo'})
})

const port = process.env.PORT || 8080;
app.listen(port)

console.log(`Server running at http://localhost:${port}/`);