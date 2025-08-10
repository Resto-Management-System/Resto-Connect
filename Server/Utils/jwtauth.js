const jwt = require("jsonwebtoken");
const JWT_SECRET = "Sunbeam@DMCFeb2025"; 

function createToken(user) {
    const payload = { id: user.user_id, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    return token;
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (err) {
        console.log("token verification failed:", err);
        return null;
    }
}

// JWT authentication middleware
function jwtAuth(req, resp, next) {
    // List of URLs that do NOT require a JWT token.
    const nonProtectedUrls = [
        "/users/signin",
        "/users/signup/owner",
        "/users/signup/user",
        "/users/upload-document"
    ];

    // Clean up the URL to match against the list.
    const cleanUrl = req.url.split("?")[0].replace(/\/+$/, "");

    // *** THE CRITICAL FIX ***
    // Check if the URL is in the non-protected list.
    // If it is, we skip the rest of the function and proceed.
    if (nonProtectedUrls.includes(cleanUrl) || cleanUrl.startsWith("/users/upload-document" )){
        console.log("Skipping JWT check for public route:", cleanUrl);
        return next();
    }

    // Now, if the code reaches this point, the URL IS protected.
    // We must check for the authorization header.
    const authheader = req.headers.authorization;
    if (!authheader) {
        // If there's no header, send a 401 response and stop the request.
        return resp.status(401).send("Unauthorized Access - No authorization header");
    }

    // Get the token from the "Bearer <token>" string.
    const [bearer, token] = authheader.split(" ");
    
    // Verify the token.
    const decoded = verifyToken(token);

    // If the token is invalid, send a 403 response.
    if (!decoded) {
        return resp.status(403).send("Unauthorized Access - Invalid token");
    }
    
    // If the token is valid, attach user info to the request object and continue.
    req.user = { id: decoded.id, role: decoded.role };
    next();
}

module.exports = {
    createToken,
    jwtAuth,
};
