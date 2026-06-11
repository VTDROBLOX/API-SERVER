const express = require('express');
const app = express();
app.use(express.json());

let totalExecute = 0; // Chỉ tăng khi người dùng THỰC SỰ bấm chạy Script lần đầu
let fullMoonServers = []; // Danh sách phòng trăng tròn thực tế

// 1. TRANG XEM WEB công khai công suất tổng
app.get('/', (req, res) => {
    res.json({
        "Total Execute": totalExecute,
        "by": "tungdepzai",
        "total_moon_servers": fullMoonServers.length,
        "moon_data": fullMoonServers
    });
});

// 2. CỔNG KÍCH HOẠT BAN ĐẦU (Chỉ gọi 1 lần duy nhất khi người chơi vừa bấm Execute Script)
app.post('/execute', (req, res) => {
    totalExecute++; 
    res.json({ success: true, current_total: totalExecute });
});

// 3. CỔNG CẬP NHẬT TRĂNG (Chạy ẩn liên tục để cập nhật phòng, KHÔNG làm tăng số lượt chạy ảo)
app.post('/update-moon', (req, res) => {
    const { jobId, players } = req.body;
    if (!jobId) return res.json({ success: false });

    const index = fullMoonServers.findIndex(s => s.jobid === jobId);
    
    if (index !== -1) {
        fullMoonServers[index].Players = players;
        fullMoonServers[index].updatedAt = Date.now(); // Cập nhật thời gian mới nhất
    } else {
        fullMoonServers.push({ 
            Players: players, 
            jobid: jobId, 
            name: "FullMoon",
            updatedAt: Date.now() 
        });
    }
    res.json({ success: true });
});

// TỰ ĐỘNG XÓA PHÒNG: Cứ 1 phút quét 1 lần, phòng nào quá 15 phút không gửi tín hiệu sẽ tự xóa khỏi web
setInterval(() => {
    const timeLimit = Date.now() - 15 * 60 * 1000;
    fullMoonServers = fullMoonServers.filter(s => s.updatedAt > timeLimit);
}, 60000);

app.listen(process.env.PORT || 3000);
