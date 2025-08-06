// consistent response from rest apis

function apiResult(status, data, message) {
    return { status, data, message };
}

function apiSuccess(data) {
    return { status: "success", data: data, message: "Operation successful" }; // Added a default success message
}

function apiError(msg) {
    let errorMessage = "An unknown error occurred."; // Default error message

    if (typeof msg === 'string') {
        errorMessage = msg;
    } else if (msg && typeof msg === 'object') {
        // If it's an Error object, use its 'message' property
        if (msg.message) {
            errorMessage = msg.message;
        } 
        // If it's a database error object with a 'sqlMessage' (e.g., MySQL errors)
        else if (msg.sqlMessage) {
            errorMessage = msg.sqlMessage;
        }
        // Fallback for other generic objects
        else {
            try {
                errorMessage = JSON.stringify(msg);
            } catch (e) {
                errorMessage = "An unstringifiable error object was received.";
            }
        }
    }
    
    return { status: "error", message: errorMessage };
}

module.exports = {
    apiResult,
    apiSuccess,
    apiError
};
