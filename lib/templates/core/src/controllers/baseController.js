import xLibs from './../lib';

class BaseController {

    filterParams = (params, blacklist) => {
		const filtered = {};
		for (const key in params) {
			if (blacklist.indexOf(key) === -1) {
				filtered[key] = params[key];
			}
		}
		return filtered;
	}

    formatResponse = (isError=false, messages, data=null) => {
        return xLibs.MessageFormatter.formatMessage(isError, messages, data);
    }

    getParams = (req) => {
        let params = {};
        if (req) {
            params = req.body || req.query;
        }

        return params;
    }

}

export default BaseController;