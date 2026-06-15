const express = require('express');
const app = express();
app.use(express.json());

// Giữ nguyên và đếm tiếp từ mốc 12,993 lượt xem huyền thoại của Tùng
let totalExecute = 12993; 
let gameServers = []; // Mảng tổng quản lý tất cả các loại phòng (Trăng, Đảo, Boss)

// 1. TRANG XEM WEB CÔNG KHAI (Hiển thị đầy đủ danh mục thống kê)
app.get('/', (req, res) => {
    const countType = (type) => gameServers.filter(s => s.type === type).length;
    res.json({
        "Total Execute": totalExecute,
        "by": "tungdepzai",
        "stats": {
            "full_moon": countType("FullMoon"),
            "mirage_island": countType("Mirage"),
            "volcano": countType("Volcano"),
            "rip_indra": countType("RipIndra"),
            "katakuri_v2": countType("KatakuriV2"),
            "cursed_captain": countType("CursedCaptain"),
            "soul_reaper": countType("SoulReaper")
        },
        "all_servers": gameServers 
    });
});

// 2. CỔNG KÍCH HOẠT BAN ĐẦU (Người chơi bấm chạy script)
app.post('/execute', (req, res) => {
    totalExecute++; 
    res.json({ success: true, current_total: totalExecute });
});

// 3. CỔNG CŨ CỦA TÙNG: Dành riêng cho MÁY CÀO TRĂNG CŨ (Không cần sửa 1 dòng code Lua nào cũ!)
app.post('/update-moon', (req, res) => {
    const { jobId, players } = req.body;
    if (!jobId) return res.json({ success: false });

    // Khớp mã phòng và loại dữ liệu FullMoon
    const index = gameServers.findIndex(s => s.jobid === jobId && s.type === "FullMoon");
    
    if (index !== -1) {
        gameServers[index].Players = players || 0;
        gameServers[index].updatedAt = Date.now(); 
    } else {
        gameServers.push({ 
            jobid: jobId,
            Players: players || 0, // ĐÃ FIX: Đổi dấu = thành dấu : chuẩn chỉnh
            placeId: 4442247956,   // Mặc định Sea 3 cho trăng tròn
            type: "FullMoon",
            name: "FullMoon",
            updatedAt: Date.now() 
        });
    }
    res.json({ success: true });
});

// 4. CỔNG MỚI ĐA NHIỆM: Sẵn sàng nhận dữ liệu từ các máy cào Boss VIP và Đảo mới gửi về
app.post('/update-game', (req, res) => {
    const { jobId, players, placeId, type } = req.body;
    if (!jobId || !type) return res.json({ success: false, message: "Thiếu thông tin!" });

    const index = gameServers.findIndex(s => s.jobid === jobId && s.type === type);
    
    if (index !== -1) {
        gameServers[index].Players = players || 0;
        gameServers[index].placeId = placeId || gameServers[index].placeId;
        gameServers[index].updatedAt = Date.now(); 
    } else {
        gameServers.push({ 
            jobid: jobId,
            Players: players || 0, 
            placeId: placeId || 4442247956, 
            type: type, 
            updatedAt: Date.now() 
        });
    }
    res.json({ success: true });
});

// TỰ ĐỘNG DỌN PHÒNG QUÁ 15 PHÚT (Giữ nguyên thời gian dọn phòng cũ của bạn)
setInterval(() => {
    const timeLimit = Date.now() - 15 * 60 * 1000;
    gameServers = gameServers.filter(s => s.updatedAt > timeLimit);
}, 60000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server đa nhiệm đang chạy trên cổng: ${PORT}`));

