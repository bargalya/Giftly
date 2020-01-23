var metaget = require("metaget");

class ImgService{

    constructor(){
        
    }
    
    getDetails(req, res){
        console.log("req: " + req.body.url);
        metaget.fetch(req.body.url, function (err, meta_response) {
            if(err){
                console.log(err);
                res.status(500).send({
                    'status': 'error',
                    'error': err
                });
            } else{
                console.log(meta_response);
                res.status(200).send({
                    'status': 'success',
                    'imgUrl': meta_response["og:image"],
                    'imgTitle':meta_response["twitter:title"]
                });
            }
        });
    }
}

module.exports = ImgService;