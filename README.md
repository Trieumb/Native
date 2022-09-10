# Hello RN21TC

- zero-setup

zero-setup
communication between services

API REST-ful server Session 2: BTVN:
1 -
Tạo 1 file :data/comment.json: (array of object)
Cài đặt 1 endpoint mới: /comment
GET: read data từ file comments -> trả về cho người dùng

2 -

Cài đặt 1 endpoint : /pokemon
GET: call tới endpoint https://pokeapi.co/api/v2/pokemon/ditto và lấy data ở dạng json -> trả về. Gợi ý dùng thư viện node-fetch

SESSION 3:
GET POST PUT PATCH DELETE
GET: get some data from some server
POST: Create/adding new data to the server
PUT/PATCH: changes existed data at the server
DELETE: delete existed data at the server

-> mấy behavior hoàn toàn phụ thuộc vào người code

BTVN 2022/09/06:
Cải tiến các endpoint sau. Tất cả dữ liệu phải được lưu vào file

1. GET /user:

- Thêm query parameter để có thể filter những user phù hợp tiêu chí
- đọc thêm về url query parameter : https://viblo.asia/p/nodejs-bai-4-query-parameters-bWrZn63QZxw

2. DELETE /users/:id:

- Delete user dựa trên id

3. POST /users

- Thêm logic kiểm tra user id đã tồn tại chưa, nếu chưa thì tạo & lưu vào file, nếu rồi thì trả lỗi 400

4. PUT /user/:id

- Cập nhật thông tin của user dựa trên id. thông tin mới của user được đính kèm trong request body
