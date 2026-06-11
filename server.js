const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let totalExecute = 0;

const handleCount = (req, res) => {
    totalExecute++;
    res.json({
        "Total Execute": totalExecute,
        "by": "tungdepzai",
        "status": "success"
    });
};

// Mở cả 2 cổng này để bạn bấm link nào cũng vào được, không lo Not Found
app.get('/', handleCount);
app.get('/kpi', handleCount);

app.listen(PORT, () => {
    console.log(`Server đang chạy ở port ${PORT}`);
});
