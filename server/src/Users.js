class Users{
    constructor(){

    }

    get(req, res){
        let userid = req.params.userid;
        res.send({
            'status': 'success',
            'data':{
                'UserId': userid,
                'FirstName':'Yossi',
                'LastName': 'Cohen',
                'Email':'yossi@gmail.com'
                }
            }
        );
    }

    add(req, res){
        const firstName = req.body.firstName,
        lastName = req.body.lastName;
        res.send({"status":"success",
        "data":{
            "FirstName": firstName,
            "LastName": lastName
        }
        });
    }

    update(req, res){
        let userid = req.params.userid;
        res.send(
            {'status': 'success', 
            'data':
                {"UserId": userid}
            });
    }
}

module.exports = Users;
