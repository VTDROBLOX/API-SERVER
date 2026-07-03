const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <title>API hop full boss</title>
            <style>
                body { 
                    margin: 0; 
                    height: 100vh; 
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                    background-color: #000; 
                    font-family: Arial, sans-serif; 
                    overflow: hidden;
                }
                h1 { 
                    color: #ff0000; 
                    font-size: 4rem; 
                    text-align: center; 
                    text-transform: uppercase; 
                    text-shadow: 0 0 25px #ff0000;
                    padding: 30px;
                    line-height: 1.6;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <h1>tắt likes cho ah tày tao likes tắt likes cho anh tboy tao like tắt like cho ah teddy tao like gọi mấy thk skips qua nói chuyện với tao</h1>
        </body>
        </html>
    `);
});

app.use((req, res) => {
    res.status(403).json({ success: false, message: "" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server: ${PORT}`));

