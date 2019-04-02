const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const morgan = require("morgan");
const sequelize = require('./models').sequelize;
const User = require('./models').User;

const app = express();

app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
sequelize.sync();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
})

app.get('/', async (req, res) => {
    try{
        var userID = '';
        var userPW = '';
        var userName = '';
        
        await User.findOne({where : {id: 'admin1'}}).then(user => {
            if(!user){
                return res.render('index');
            } else {
                var userID = user.id;
                var userPW = user.pw;
                var userName = user.name;

                return res.render('index', {id: userID, pw: userPW, name: userName});
            }
        })
    } catch(err) {
        console.log(err);
        return res.send("<script>history.back();</script>");
    }
})

app.post('/join', async (req, res) => {
    try{
        await User.findOne({where : {id: req.body.id}}).then(user => {
            if(!user){
                User.create({
                    id: req.body.id,
                    pw: req.body.pw,
                    name: req.body.name
                });
            
                return res.send("<script>alert('회원가입 성공');location.href='/'</script>");
            } else {
                return res.send("<script>alert('오류');location.href='/'</script>");
            }
        })
    } catch(err) {
        console.log(err);
        return res.send("<script>location.href='/'</script>");
    }
})

app.post('/update', async (req, res) => {
    try{
        await User.findOne({where : {id: req.body.nowID}}).then(user => {
            if(!user) {
                return res.send("<script>alert('오류');location.href='/'</script>");
            } else {
                User.update({id: req.body.updateId}, {where: {id: req.body.nowID}});
                return res.send("<script>alert('성공');location.href='/'</script>");
            }
        })
    } catch(err) {
        console.log(err);
        return res.send("<script>location.href='/'</script>");
    }
})

app.post('/delete', async (req, res) => {
    try{
        await User.findOne({where: {id: req.body.deleteId}}).then(user => {
            if(!user) {
                return res.send("<script>alert('오류');location.href='/'</script>");
            } else if(user.id === req.body.deleteId && user.pw === req.body.deletePw && user.name === req.body.deleteName) {
                User.destroy({where: {id: req.body.deleteId}});
                return res.send("<script>alert('성공');location.href='/'</script>");
            } else {
                return res.send("<script>alert('오류1');location.href='/'</script>");
            }
        })
    } catch(err) {
        console.log(err);
        return res.send("<script>location.href='/'</script>");
    }
})
app.set('views', './views');
app.set('view engine', 'ejs');