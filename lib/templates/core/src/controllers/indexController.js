import BaseController from './baseController';

class IndexController extends BaseController {

    index = (req, res) => {

        let messages = ['Hello World!'];
        let data = {
            foo : "bar"
        };
        
        res.status(200).json(this.formatResponse(false, messages, data));

    }

}

export default new IndexController();