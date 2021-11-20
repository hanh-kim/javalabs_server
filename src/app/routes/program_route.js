
const express = require('express')
const route = express.Router()
const programController = require('../controllers/ProgramController')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '' + file.originalname)
    }
})


// var upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 5 * 1024 * 1024,
//     }
// });
const upload = multer({ storage: storage })

const mtupload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'excel_file', maxCount: 1 }])

route.get('/', programController.index)

route.post('/import_program', mtupload, programController.importProgram)

module.exports = route
