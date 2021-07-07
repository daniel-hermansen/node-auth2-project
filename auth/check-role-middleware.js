// function makeCheckRoleMiddleware(role) {
//     return function (req, res, next) {
//         if (req.token.role && req.token.role === role) {
//             next();
//         } else {
//             res.status(403).json({ you: 'Have no access' });
//         }
//     }
// }

// module.exports = makeCheckRoleMiddleware;