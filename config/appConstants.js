const statusMessages = {
    ERROR_MSG: {
        IMP_ERROR: {
            status: 500,
            success: false,
            message: 'Implementation Error',
            type: 'IMP_ERROR'
        },
        DATA_NOT_FOUND: {
            status: 404,
            success: false,
            message: "Data Not Found",
            type: "DATA_NOT_FOUND"
        },
        FILE_UPLOAD_ERROR: {
            status: 404,
            success: false,
            message: "Unable to upload file",
            type: "FILE_UPLOAD_ERROR"
        },
        EMAIL_NOT_FOUND: {
            status: 404,
            success: false,
            message: "Email does not exist.",
            type: "EMAIL_NOT_FOUND"
        },
        EMAIL_EXIST: {
            status: 404,
            success: false,
            message: "Email Already Exist",
            type: "EMAIL_EXIST"
        },
        INVALID_CREDENTIALS: {
            status: 404,
            success: false,
            message: "Invalid credentials provided",
            type: "INVALID_CREDENTIALS"
        },
        SOMETHING_WENT_WRONG: {
            status: 404,
            success: false,
            message: "Something Went Wrong",
            type: "SOMETHING_WENT_WRONG",
            error: {}
        },
        DATA_EXIST: {
            status: 404,
            success: false,
            message: "Data Already Exist",
            type: "DATA_EXIST"
        },
        EMAIL_OR_PASSWORD: {
            status: 404,
            success: false,
            message: "Email Or Password Don't Match",
            type: "PWD_NOT_MATCH"
        },
        PWD_NOT_MATCH: {
            status: 404,
            success: false,
            message: "Password Don't Match",
            type: "PWD_NOT_MATCH"
        },
        MISSING_AUTH: {
            status: 401,
            success: false,
            message: "Missing Authorization Header",
            type: "MISSING_AUTH"
        },
        UNAUTHORIZATION_ACCESS: {
            status: 401,
            success: false,
            message: "Unauthorized Access",
            type: "UNAUTHORIZATION_ACCESS"
        },
        UNABLE_TO_UPDATE: {
            status: 404,
            success: false,
            message: "Unable To Make Request",
            type: "UNABLE_TO_UPDATE"
        },
        UNABLE_TO_RETRIEVE: {
            status: 404,
            success: false,
            message: "Unable to retrieve data",
            type: "UNABLE_TO_RETRIEVE"
        },
        UNABLE_TO_REGISTER: {
            status: 404,
            success: false,
            message: "Unable To Register",
            type: "UNABLE_TO_REGISTER"
        },
        ID_NOT_PRESENT: {
            status: 404,
            success: false,
            message: "ID Not Provided",
            type: "ID_NOT_PRESENT"
        },
        REQUEST_NOT_APPROVED: {
            status: 404,
            success: false,
            message: "You request is not approved at at the moment, check after some time",
            type: "REQUEST_NOT_APPROVED"
        },
        NUMBER_EXCEDED: {
            status: 404,
            success: false,
            message: "You've exceded number of request per month",
            type: "NUMBER_EXCEDED"
        }
    },

    SUCCESS_MSG: {
        SUCCESS: {
            status: 200,
            message: 'Success',
            success: true,
            type: 'SUCCESS',
            data: {}
        },
        PWD_RECOVERY: {
            status: 200,
            message: 'Success',
            success: true,
            type: 'PWD_RECOVERY',
            data: {}
        },
        DELETE: {
            status: 200,
            success: true,
            message: 'Record has been deleted successfully',
            type: 'DELETE'
        },
        REQUEST_RESPONSE: {
            status: 200,
            success: true,
            message: 'We will get back to you when your request is met, check back after 24 hour',
            type: 'REQUEST_RESPONSE'
        },
        REQUEST_APPROVED: {
            status: 200,
            success: true,
            message: 'Request approved',
            type: 'REQUEST_APPROVED'
        }
    },
    SERVER_BASE_URL: "http://localhost:5000/"
};

module.exports = statusMessages;