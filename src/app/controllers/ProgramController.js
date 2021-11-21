const path = require('path')
const Program = require('../model/ProgramModel')
const ProgramDetail = require('../model/ProgramDetailModel')
const xlsx = require('xlsx');
const fs = require('fs')


class ProgramController {
    index(req, res) {
        res.render('add_program')
    }

    importProgram(req, res, next) {
        console.log(req.files['image'][0])
        Program({
            name: req.body.name,
            image: '/uploads/' + req.files['image'][0].filename
        }).save().then(program => {
            const workbook = xlsx.readFile(req.files['excel_file'][0].path)
            let lessonSheet = workbook.Sheets[workbook.SheetNames[0]]
            var xlData = xlsx.utils.sheet_to_json(lessonSheet);
            for (var data of xlData) {
                ProgramDetail({
                    programId: program._id,
                    title: data.title,
                    content: data.content
                }).save().catch(e => res.json({ message: 'Lỗi đọc file excel', error: e }))
            }
            res.json({ message: 'Thêm thành công' })
        })
    }

}

module.exports = new ProgramController();