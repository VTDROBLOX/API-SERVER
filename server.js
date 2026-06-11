const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let totalExecute = 0;

const handleCount = (req, res) => {
    totalExecute++;
    res.json({
        "Total Execute": totalExecute,
        "by": "Tungdepzai",
        "status": "success"
    });
};

app.get('/', handleCount);
app.get('/kpi', handleCount);

app.listen(PORT, () => {
    console.log(`Server đang chạy ở port ${PORT}`);
});
