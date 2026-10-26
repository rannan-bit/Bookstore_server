const express = require('express')
const userController = require('../controller/usercontroller')
const authMiddleware = require('../Middlewares/authMiddleware')
const multerMiddleWare = require('../Middlewares/multerMiddleware')
const bookcontroller=require('../controller/bookcontroller')

//to set up routes outside express server, create object for Router class in express
const router = new express.Router()

//register
router.post('/register', userController.registerController)
//login
router.post('/login', userController.loginController)
//google login
router.post('/google-login', userController.googleLogin)

router.get('/homebooks',bookcontroller.getHomePageBookController)

//--------------------authorized user------------------------


//edit user
router.put('/user/edit/:id',authMiddleware,multerMiddleWare.single('picture'), userController.userEditController)
//add book
router.post('/add-book',authMiddleware,multerMiddleWare.array('uploadImages',3),bookcontroller.addBookController)
//only login user see all books
router.get('/all-books',authMiddleware,bookcontroller.getBooksPageBookController)


module.exports = router