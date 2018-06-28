
class Validation {

    _isSequelizeValidationError = (errorSubject) => {
        return (errorSubject && (errorSubject.name === 'SequelizeValidationError'));
    }

    validate = (sequelizeInstance) => {

        return sequelizeInstance.validate()
            .then((validationResult) => {
                if (this._isSequelizeValidationError(validationResult)) {
                    throw validationResult;
                } else {
                    // no validation errors continue
                    return true;
                }
            });
    }

}

export default new Validation;