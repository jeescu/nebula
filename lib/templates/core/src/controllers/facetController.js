import BaseController from './baseController';

class FacetController extends BaseController {

    browse = (req, res) => {
      let resultObj = this.formatResponse(false, [], []);
      res.status(200).json(resultObj);
    }
    
}

export default new FacetController();