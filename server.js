const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let totalExecute = 0;

// CỔNG XEM TRÊN WEB: Dùng lệnh GET. Bạn vào F5 thoải mái số đứng yên không tăng bậy
app.get('/', (req, res) => {
    res.json({
        "Total Execute": totalExecute,
        "by": "tungdepzai",
        "status": "success"
    });
});

// CỔNG TĂNG SỐ TRONG GAME: Dùng lệnh POST. Chỉ có game mới gọi được để tăng số
app.post('/', (req, res) => {
    totalExecute++; // Chỉ cộng số khi nhận tín hiệu POST từ game
    res.json({
        "Total Execute": totalExecute,
        "by": "tungdepzai",
        "status": "success"
    });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy ở port ${PORT}`);
});
