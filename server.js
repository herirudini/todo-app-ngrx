// function fardhuainHTTPS(req, res, next) {
//     if (req.get('x-forwareded-proto') != 'https') {
//         return res.redirect('https://' + req.get('host') + req.url)
//     } else next()
// }
const express = require("express");
const app = express();
// app.use(fardhuainHTTPS)
app.use(express.static('./dist/todo-app'));
app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/todo-app' })
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);