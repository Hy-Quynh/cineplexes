## Hệ thống đặt vé online
Một web ứng dụng mô phỏng hệ thống đặt đặt vé xem phim online, sử dụng Node.js, Express và postgresql. Hệ thống cung cấp các chức năng sau:
- Đăng ký (xác nhận email), đăng nhập, đăng xuất (email, mật khẩu), quên mật khẩu bằng email
- Quản lý thông tin cá nhân (email, mật khẩu, họ tên, số điện thoại)
- Trang chủ hiển thị các phim mới được công chiếu và phim được xem nhiều nhất
- Tìm các suất chiếu của một phim theo cụm rạp hoặc tìm các suất chiếu của tất cả các phim tại một rạp nào đó
- Xem lại các danh sách các đặt vé trong lịch sử (ngày/giờ, phim, rạp/cụm rạp, ghế)
- Đặt vé xem phim (chọn suất chiếu, chọn ghế, xác nhận)
## Setup
### Role điều kiện
Tải xuống Node.js và npm tại đây: https://nodejs.org/en/
<br>
### Install
1. <code>npm install</code>
2. <b>Create file .env </b>
  <pre>
    <code>
      MAILING_SERVICE_CLIENT_ID=xxxxxxx<font></font>
      MAILING_SERVICE_CLIENT_SECRET=xxxxxxx<font></font>
      MAILING_SERVICE_REFRESH_TOKEN=xxxxxxx<font></font>
      REDIRECT_URI=xxxxxx<font></font>
      SENDER_EMAIL_ADDRESS=xxxxxxx<font></font>
      PASSWORD_EMAIL=xxxxxxx<font></font>
    </code>
  </pre>
3. DB_URI is connect string to Postresql server: <code>postgres://postgres:postgres@localhost:5432/MyMovies</code> 
4. <code>npm start</code>
5. Truy cập http: // localhost: 3000 để xem các ứng dụng của bạn.
## Build
<code>npm run start:dev</code> nếu chạy với service hoặc <code>npm run start </code>
## Được xây dựng với
    bcrypt - 5.0.1
    body-parser - 1.19.0
    dotenv - 10.0.0
    ejs - 3.1.6
    express - 4.17.1
    express-session - 1.17.1
    googleapis - 74.2.0
    multer - 1.4.2
    nodemailer - 6.6.1
    path - 0.12.7
    pg - 8.6.0
    pg-hstore - 2.3.3
    sequelize - 6.6.2
## Tác giả và cộng tác viên
- Trần Đình Phương
- Nguyễn Hoàng Hạ Quyên
- Liêu Hy Quỳnh
