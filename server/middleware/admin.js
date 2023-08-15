require('dotenv').config();
const authReq = process.env.REQUIRES_AUTH;

module.exports = function(req, res, next) {

  // 401 Unauthorized
  // 403 Forbidden
  // Pass auth during development 
  if (authReq==="false") return next();
  console.log("admin is", req.user.isAdmin)

  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  next();
};
