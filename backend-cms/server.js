require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const connection = require('./connection')
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')
const billRouter = require('./routes/bill')
const dashboardRouter = require('./routes/dashboard')

app.use(cors())
app.use(express.json())
app.use('/user', userRouter)
app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/bill', billRouter)
app.use('/dashboard', dashboardRouter)

app.listen(5000, () => {
    console.log('server is on port 5000')
})

