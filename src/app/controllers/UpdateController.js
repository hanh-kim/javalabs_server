const User = require('../model/UserModel')
const Topic = require('../model/TopicModel')
class UpdateController{
    //hiển thị view update topic:
    showTopic(req, res, next) {
        if(req.query.id_topic == null){
            res.send('Cần truyền Id')
        }
        Topic.findOne({_id : req.query.id_topic}).then(topic =>{
            var a = {title: topic.title, content: topic.content, _id: topic._id}
            res.render('update_topic', {topic: a})
        }).catch(e => res.render('404'))
    }

    // update topic
    async updateTopic(req, res, next){
        if(req.query.topic_id == null){
            res.send('Cần truyền Id')
            return
        }
        try{
            console.log(">>>>>>>>" +req.query.id_topic)
            Topic.findOne({_id : req.query.id_topic}).then(topic => {
                if(topic )
                topic.title = req.body.title
                topic.content = req.body.content
                topic.save().then(topic => {
                    res.redirect('/lesson_detail?lessonId='+topic.lessonId)
                }).catch(e => res.send('Có lỗi'))
            })
            
        }catch(e){
            res.send('Loi '+e.message)
        }
        
    }

   
}


module.exports = new UpdateController()