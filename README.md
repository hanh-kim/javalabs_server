# javalabs_server
Cách chạy server:
B1: Clone project, checkout nhánh develop
B2: Mở app, mở terminal, chạy lênh: npm install
B3: Chạy lệnh: npm start
B4: Mở trình duyệt, gõ: localhost:{port}  - hiện tại đang là port 3000 => localhost:3000


// Các api đã chạy:

http://localhost:3000/api/get-all-in-lesson : trả về 1 list lesson, lesson sẽ chứa tất cả các trường của lesson, quiz và topic
http://localhost:3000/api/get-topic : trả về tất cả topic
http://localhost:3000/api/get-lesson: trả về toàn bộ lesson
http://localhost:3000/api/get-quiz: trả về toàn bộ quiz
