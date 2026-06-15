-- Khởi tạo/Lấy các dịch vụ (Services) hệ thống của Roblox
local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local RS = game:GetService("ReplicatedStorage")
local Lighting = game:GetService("Lighting")

-- Tìm thư mục chứa kẻ địch (Enemies) trong Workspace
local Enemies = workspace:FindFirstChild("Enemies")

-- Xác định hàm gửi HTTP request dựa trên Executor đang sử dụng (Delta, VegaX, Fluxus, v.v.)
local request_fn = (syn and syn.request) or (http and http.request) or http_request or request
if not request_fn then return end

-- Cấu hình thông tin API Endpoint của Tùng
local API_URL = "https://api-server-clig.onrender.com"

-- Bảng lưu trữ trạng thái để tránh gửi lặp dữ liệu (Anti-spam)
local active = {}     -- Lưu các boss/sự kiện đang hoạt động

-- Hàm xác định Thế giới (Sea) dựa trên PlaceId để truyền dữ liệu cho chuẩn
local function getSea()
    local id = game.PlaceId
    if id == 275391513 or id == 2753915549 then return 1 end
    if id == 4442232693 or id == 4442272183 then return 2 end
    if id == 4442247956 or id == 7449423635 then return 3 end
    return 0
end

-- Hàm gửi dữ liệu sự kiện lên API /update-game của Tùng
local function sendToTung(eventType)
    pcall(function()
        request_fn({
            Url = API_URL .. "/update-game",
            Method = "POST",
            Headers = {["Content-Type"] = "application/json"},
            Body = HttpService:JSONEncode({
                jobId = tostring(game.JobId),
                players = #Players:GetPlayers(),
                placeId = game.PlaceId,
                type = eventType -- Loại dữ liệu đồng bộ với Backend: FullMoon, Mirage, RipIndra...
            })
        })
    end)
end

-- Hàm kiểm tra điều kiện xuất hiện của Boss/Đảo
local function check(name, eventType, cond)
    local ok = false
    pcall(function() ok = cond() end)

    if ok then
        -- Nếu đúng có Boss/Đảo và chưa từng gửi thông báo, tiến hành gửi lên web
        if not active[name] then
            active[name] = true
            sendToTung(eventType)
        end
    else
        -- Nếu Boss chết hoặc Đảo biến mất, xóa trạng thái để có thể nhận lại lần sau
        active[name] = nil
    end
end

-- Hàm tìm kiếm một Kẻ địch/Boss có tồn tại trong phòng hay không
local function enemy(name)
    return function()
        return RS:FindFirstChild(name) or (Enemies and Enemies:FindFirstChild(name))
    end
end

-- Tạo luồng chạy ngầm quét liên tục mỗi 7 giây (Tránh spam quá mức làm sập Render)
task.spawn(function()
    -- Gửi tín hiệu kích hoạt lượt Execute ban đầu lên Server Render của Tùng
    pcall(function()
        request_fn({ Url = API_URL .. "/execute", Method = "POST" })
    end)

    while task.wait(7) do
        local sea = getSea()

        -- ================= LÓGIC QUÉT TẠI SEA 2 =================
        if sea == 2 then
            check("captain", "CursedCaptain", enemy("Cursed Captain")) -- Cào Thuyền Trưởng Nguyền Rủa
        end

        -- ================= LÓGIC QUÉT TẠI SEA 3 =================
        if sea == 3 then
            check("rip", "RipIndra", enemy("Rip Indra"))               -- Cào Rip Indra
            check("doughv2", "KatakuriV2", enemy("Dough King"))        -- Cào Katakuri V2 (Dough King)
            check("reaper", "SoulReaper", enemy("Soul Reaper"))        -- Cào Tử Thần (Soul Reaper)

            -- Kiếm tra Đảo Kỳ Bí (Mirage Island) qua tọa độ gốc game
            local loc = workspace:FindFirstChild("_WorldOrigin")
            loc = loc and loc:FindFirstChild("Locations")
            if loc then
                check("mirage", "Mirage", function()
                    return loc:FindFirstChild("Mirage Island")
                end)
            end

            -- Kiểm tra chu kỳ Trăng Tròn (Full Moon)
            local sky = Lighting:FindFirstChild("Sky") or Lighting:FindFirstChildOfClass("Sky")
            if sky then
                check("fullmoon", "FullMoon", function()
                    return string.find(string.lower(sky.MoonTextureId), "9709149431") or string.find(string.lower(sky.MoonTextureId), "full")
                end)
            end
        end
    end
end)

