const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let totalExecute = 0;

// CỔNG 1: Chỉ dùng để xem số lượt (Vào link này thoải mái không bị tăng số)
app.get('/', (req, res) => {
    res.json({
        "Total Execute": totalExecute,
        "by": "tungdepzai",
        "status": "success",
        "note": "Trang web nay chi dung de xem so luot"
    });
});

// CỔNG 2: Cổng bí mật dành riêng cho game (Chạy trong game mới bị tăng số)
app.get('/update-kpi', (req, res) => {
    totalExecute++; // Chỉ tăng khi gọi đúng cổng này
    res.json({
        "status": "Ghi nhan luot chay thanh cong!"
    });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy ở port ${PORT}`);
});
