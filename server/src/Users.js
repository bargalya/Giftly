class Users{
    constructor(){

    }

    get(req, res){
        let userid = req.params.userid;
        res.send({
            'status': 'success',
            'data':{
                'userid': userid,
                'username':'Yossi', 
                'email':'yossi@gmail.com'
                }
            }
        );
    }

    set(){
        res.send({"status":"success"});
    }

    update(req, res){
        let userid = req.params.userid;
        res.send(
            {'status': 'success', 
            'data':
                {"userid": userid}
            });
    }
}

module.exports = Users;
