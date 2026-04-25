class HttpError extends Error{
    constructor(message, errorCode){
        super(message);
        this.status = errorCode
    }
}

export default HttpError