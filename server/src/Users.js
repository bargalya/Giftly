class Users{
    constructor(){

    }

    // TODO: should we support GET method?
    // I don't see any reason to support
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

    // login request
    add(req, res){

        // Read the user parameters
        const userName = req.body.userName,
        password = req.body.password;

        console.log("got a post request: new user request name " + userName + " password " + password);

        // TODO: add a call to the DB to add the new user

        // Send a response to the front end
        res.send({"status":"success",
        "data":{
            "UserName": userName,
            "Password":password}
        });          
    }

    // Not supported yet
    update(req, res){
        let userid = req.params.userid;

        // update the fields
        // TODO: which of the fields are allowed to be updated?
        // username - no
        // password - yes, but with validation of the old password (maybe it is already done anyway)
        // first name, last name, email - yes

        // connect to DB

        // send the update request

        // send a response after the DB has finished the update
        res.send(
            {'status': 'success', 
            'data':
                {"UserId": userid}
            });
    }
}

module.exports = Users;
