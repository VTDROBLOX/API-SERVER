
app.get('/', (req, res) => {
    res.send(`
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <title> </title>
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
                    font-size: 5rem; 
                    text-align: center; 
                    text-transform: uppercase; 
                    text-shadow: 0 0 20px #ff0000;
                    padding: 20px;
                }
            </style>
        </head>
        <body>
            <h1>gọi mấy thk skip qua nỗi chuyện với tao</h1>
        </body>
        </html>
    `);
});

