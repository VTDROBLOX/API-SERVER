const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let totalExecute = 0;

// CỔNG CHÍNH: Chỉ dùng để xem. Ai F5 ở đây thoải mái không bao giờ bị tăng số!
app.get('/', (req, res) => {
    res.json({
        "Total Execute": totalExecute,
        "by": "tungdepzai",
        "status": "success"
    });
});

// CỔNG BÍ MẬT: Chỉ dành cho game Roblox gọi lên để tăng số lượt chạy
app.get('/kpi', (req, res) => {
    totalExecute++; // Tăng số lên 1 cái
    res.json({
        "Total Execute": totalExecute,
        "by": "tungdepzai",
        "status": "success"
    });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy ở port ${PORT}`);
});
