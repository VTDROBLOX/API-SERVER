const express = require('express');
const app = express();
app.use(express.json());

let totalExecute = 0; 
let gameServers = []; 

// 1. TRANG XEM WEB CÔNG KHAI
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

// 2. CỔNG KÍCH HOẠT BAN ĐẦU
app.post('/execute', (req, res) => {
    totalExecute++; 
    res.json({ success: true, current_total: totalExecute });
});

// 3. CỔNG CẬP NHẬT TỔNG HỢP
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

// TỰ ĐỘNG DỌN PHÒNG QUÁ 10 PHÚT
setInterval(() => {
    const timeLimit = Date.now() - 10 * 60 * 1000;
    gameServers = gameServers.filter(s => s.updatedAt > timeLimit);
}, 60000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy trên cổng: ${PORT}`));

