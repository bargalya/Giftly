var metaget = require("metaget");

class ImgService{

    constructor(){
        
    }
    
    getDetails(req, res){
        //console.log("req: " + req.body.url);
        metaget.fetch(req.body.url, function (err, meta_response) {
            if(err){
                console.log('error: ' + err);
                res.status(200).send({
                    'status': 'error',
                    'error': err
                });
            } else{
                //console.log('success: ' + meta_response);
                var imgUrl = meta_response["og:image"];
                var imgTitle = meta_response["og:title"];
                if(imgUrl && imgUrl.startsWith("{| ")) {
                    imgTitle = undefined;
                    imgUrl = undefined;
                }
                res.status(200).send({
                    'status': 'success',
                    'imgUrl': imgUrl,
                    'imgTitle': imgTitle
                });
            }
        });
    }
}

module.exports = ImgService;