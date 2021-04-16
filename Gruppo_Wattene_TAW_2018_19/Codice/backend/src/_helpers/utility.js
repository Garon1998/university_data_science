const hasProperty = (object, property) => {
    return Object.prototype.hasOwnProperty.call(object, property);
};
const checkAndThrow = (object, property) => {
    if(!Object.prototype.hasOwnProperty.call(object, property))
        throw throwMissingProperty(property);
};
const checkProperty = (object, property) => {
    return Object.prototype.hasOwnProperty.call(object, property);        
};

const throwMissingProperty = (property) => {
    throw property + " missing";
}

const throwDocumentNotFound = (doucument) => {
    throw doucument + " doesn't exists";
}
const throwIntRequiredForProperty = (property) => {
    throw property + " must be int";
}
const throwDocumentNotAvailable = (document) => {
    throw document + " not available in this moment";
}
const throwMustBeEqualTo = (valueA, valueB) => {
    throw valueA + " must be equal to " + valueB;
}
const throwMustBeLowerOf = (valueA, valueB) => {
    throw valueA + " must be lower of " + valueB;
}
const throwMustBeGreaterOf = (valueA, valueB) => {
    throw valueA + " must be greater of " + valueB;
}
function errorHandler(res,next,err) {
    //console.log(err);
    if(typeof err === "string") {
        if (err.indexOf("missing")>-1){
            res.status(422);
            res.send(err);
        }
        else if (err.indexOf(" doesn't exists") > -1) {
            res.status(404);
            res.send(err);
        }
        else if(err.indexOf("is already taken") > - 1){
            res.status(304);
            res.send(err);
        }
        else if (err.indexOf(" must be int") > -1) {
            res.status(400);
            res.send(err);
        }
        else if (err.indexOf(" not available in this moment") > -1) {
            res.status(304);
            res.send(err);
        }
        else if (err === "Order already paid") { //quando si tenta di aggiungere un suborder ad un ordine già pagato
            res.status(304);
            res.send(err);
        }
        else if (err === "This order is already in preparation") { 
            //quando si tenta di eliminare un suborder in fase di preparazione
            //quando si tenta di aggiunere elementi ad un suborder in fase di preparazione
            res.status(400);
            res.send(err);
        }
    }
    else
        res.sendStatus(err);
    
    // console.log(res);
    // next(res);
}

exports.hasProperty = hasProperty;
exports.checkAndThrow = checkAndThrow;
exports.checkProperty = checkProperty;
exports.throwMissingProperty = throwMissingProperty;
exports.throwDocumentNotFound = throwDocumentNotFound;
exports.throwIntRequiredForProperty = throwIntRequiredForProperty;
exports.throwDocumentNotAvailable = throwDocumentNotAvailable;
exports.throwMustBeEqualTo = throwMustBeEqualTo;
exports.throwMustBeLowerOf = throwMustBeLowerOf;
exports.throwMustBeGreaterOf = throwMustBeGreaterOf;
exports.errorHandler = errorHandler;