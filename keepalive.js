const express = require("express")
const app = express()
const port = process.env.PORT || 5000
app.get("/", (req, res) => {
    res.send("Tớ là cô gái nắng và tớ sẽ không bao giờ vụt tắt đâu! Đừng lo nhé ^^ (SEVER FREE NHƯNG VIP KO RIP ĐC ĐÂU)")
})
const keepalive = () => {
    app.listen(port, "0.0.0.0", function () {
    // console.log(`Server listening on port ${port}\n`);
    })
}
module.exports.keepalive = keepalive
