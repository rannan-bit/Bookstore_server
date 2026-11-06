const express = require('express')
const userController = require('../controller/usercontroller')
const authMiddleware = require('../Middlewares/authMiddleware')
const multerMiddleWare = require('../Middlewares/multerMiddleware')
const bookcontroller=require('../controller/bookcontroller')
const adminauthMiddleware = require('../Middlewares/adminAuthMiddleware')

//to set up routes outside express server, create object for Router class in express
const router = new express.Router()

//register
router.post('/register', userController.registerController)
//login
router.post('/login', userController.loginController)
//google login
router.post('/google-login', userController.googleLogin)
//homebooks
router.get('/homebooks',bookcontroller.getHomePageBookController)

//--------------------authorized user------------------------


//edit user
router.put('/user/edit/:id',authMiddleware,multerMiddleWare.single('picture'), userController.userEditController)
//add book
router.post('/add-book',authMiddleware,multerMiddleWare.array('uploadImages',3),bookcontroller.addBookController)
//only login user see all books
router.get('/all-books',authMiddleware,bookcontroller.getBooksPageBookController)
//
router.get('/user-books',authMiddleware,bookcontroller.getUserBooksController)
//
router.get('/bought-books',authMiddleware,bookcontroller.getUserBoughtBooksController)
//
router.get('/single-book/:id',authMiddleware,bookcontroller.getSingleBookController)
//remove book
// router.delete('remove-book/:id',authMiddleware,)
//make-payment
router.get('/make-payment/:id',authMiddleware,bookcontroller.bookPaymentController)
// payment verify
router.post('/verify-payment',authMiddleware,bookcontroller.verifyPaymentController)

//-------------------admin-----------------

//get allbooks
router.get('/books',adminauthMiddleware,bookcontroller.getAllBooksController)
//admin edit 
router.put('/admin/edit/:id',adminauthMiddleware,userController.adminEditController)
//update book status
router.put('/book-update/:id',adminauthMiddleware,bookcontroller.approveBookaController)
//users list
router.get('/all-users/',adminauthMiddleware,userController.getAllUsersController)

//----------------------------generate book abstract via ai--------------------
router.post('/books-ai',authMiddleware,bookcontroller.generateBookAbstractController)


module.exports = router