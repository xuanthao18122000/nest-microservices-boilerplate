## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Generate service 
```bash

$ nest generate app auth-service
```

## Service 
```bash

$ API Gateway ✅ Không cần database
# API Gateway chỉ đóng vai trò định tuyến request, không lưu trữ dữ liệu.
$ Auth Service ✅ PostgreSQL 
# Dữ liệu người dùng có cấu trúc rõ ràng (email, password hash, role).
# Cần hỗ trợ ACID để đảm bảo tính toàn vẹn khi đăng ký/xác thực.
# PostgreSQL có hỗ trợ tốt cho JSON nếu cần lưu metadata.
$ User Service ✅ PostgreSQL
# Thông tin user có cấu trúc cố định (tên, email, số điện thoại, địa chỉ...).
# Không có yêu cầu xử lý dữ liệu lớn theo kiểu NoSQL.
# PostgreSQL mạnh về truy vấn phức tạp, MySQL tối ưu tốc độ đọc.
$ Product Service ✅ MongoDB
# Dữ liệu sản phẩm có thể thay đổi linh hoạt (các thuộc tính như màu sắc, kích thước có thể khác nhau tùy loại sản phẩm).
# NoSQL giúp dễ dàng mở rộng và tìm kiếm nhanh hơn.
# Nếu cần tìm kiếm nâng cao, có thể tích hợp Elasticsearch.
$ Order Service  ✅ PostgreSQL
# Dữ liệu đơn hàng cần ACID để tránh mất dữ liệu hoặc trạng thái sai.
# Thường xuyên có các giao dịch (CRUD) với nhiều ràng buộc.
# PostgreSQL có hỗ trợ JSONB, tốt nếu cần lưu lịch sử thay đổi đơn hàng
$ Payment Service ✅ PostgreSQL
# Giao dịch thanh toán cần tính nhất quán cao (ACID).
# Cần kiểm soát transaction kỹ để tránh lỗi mất tiền.
# PostgreSQL có hỗ trợ UUID, dễ dàng quản lý mã giao dịch.
$ Cart Service ✅ Redis + MySQL
# Redis: Lưu giỏ hàng tạm thời cho tốc độ truy xuất nhanh.
# PostgreSQL: Lưu giỏ hàng vĩnh viễn khi khách hàng đăng nhập.
$ Inventory Service ✅ MySQL
# Cần đảm bảo tính nhất quán khi cập nhật số lượng hàng.
# Không cần NoSQL vì dữ liệu kho hàng có cấu trúc rõ ràng.
# PostgreSQL mạnh hơn nếu cần phân quyền truy cập theo user.
$ Customer Service ✅ MySQL
# Dữ liệu khách hàng có cấu trúc rõ ràng và quan hệ phức tạp
# Cần đảm bảo tính toàn vẹn dữ liệu cao
# Yêu cầu truy vấn phức tạp
```