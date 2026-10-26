const books = require('../models/bookModel')

exports.addBookController = async (req, res) => {
    console.log("inside add book controller");

    const { title, author, pages, imageUrl, price, discountPrice, abstract, publisher, isbn, language, category } = req.body

    const uploadImages = req.files.map(item => item.filename)
    const sellerEmail = req.payload

    console.log(title, author, pages, imageUrl, price, discountPrice, abstract, publisher, isbn, language, category, uploadImages, sellerEmail);

    const existingBook = await books.findOne({ title, sellerEmail })
    if (existingBook) {
        res.status(409).json("Book already exist...operation denied")
    }
    else {
        const newBook = await books.create({ title, author, pages, imageUrl, price, discountPrice, abstract, publisher, isbn, language, category, uploadImages, sellerEmail })
        res.status(200).json(newBook)
    }

}
//get latest 4 books
exports.getHomePageBookController = async (req, res) => {
    console.log("inside getHomePageBookController");

    const homebooks = await books.find().sort({ _id: -1 }).limit(4)
    res.status(200).json(homebooks)

}
//get all books apart from login user
exports.getBooksPageBookController = async (req, res) => {
    console.log("inside getBooksPageBookController");

    const loginUsemail = req.payload
    const books = await books.find({ sellerEmail: { $ne: loginUsemail } })
    res.status(200).json(books)

}