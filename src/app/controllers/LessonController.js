const path = require('path')
const Lesson = require('../model/LessonModel')
const xlsx = require('xlsx');

class LessonController {
    //read excel file:

    index(req, res) {
        Lesson.find({}, function (err, lessons) {
            if (!err) {
                console.log(path.join(__dirname, 'excel/Book1.xlsx'
                ))

                const workbook = xlsx.readFile(path.join(__dirname, 'excel/Book1.xlsx'))
                let worksheet = workbook.Sheets[workbook.SheetNames[0]]
                for (let index = 2; index <= 2; index++) {
                    const title = worksheet[`A${index}`].v
                    const totalTopic = worksheet[`B${index}`].v
                    console.log({
                        title: title,
                        totalTopic: totalTopic
                    })
                }
                res.json(lessons)

            }
            else
                res.json({ status: 'Loi' })
        })
        // res.render('lesson')
    }
}

module.exports = new LessonController()