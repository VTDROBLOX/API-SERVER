// 1. TRANG XEM WEB CÔNG KHAI (BẢN CẬP NHẬT GAY GẮT)
app.get('/', (req, res) => {
    res.send(`
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <title>Gửi mấy thằng ăn cắp</title>
            <style>
                body { 
                    margin: 0; 
                    height: 100vh; 
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                    background-color: #000; 
                    font-family: Arial, sans-serif; 
                }
                h1 { 
                    color: #ff0000; 
                    font-size: 4rem; 
                    text-align: center; 
                    text-transform: uppercase; 
                    text-shadow: 0 0 20px #ff0000;
                    padding: 20px;
                    line-height: 1.5;
                }
            </style>
        </head>
        <body>
            <h1>tắt likes cho ah tày tao likes tắt likes cho anh tboy tao like gọi mấy thk skips qua nói chuyện với tao</h1>
        </body>
        </html>
    `);
});

