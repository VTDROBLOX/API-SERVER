const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let totalExecute = 0; 

app.get('/kpi', (req, res) => {
    totalExecute++; 
    res.json({
        "Total Execute": totalExecute,
        "by": "tungdepzai", // 
        "status": "success"
    });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại cổng ${PORT}`);
});
