# MATIVO X24 & X36 Landing Page

Landing page tiếng Việt cho hai bộ quạt áo điều hòa MATIVO X24 và X36. Toàn bộ hình ảnh sử dụng trên trang đã được làm sạch chữ Trung; thông tin sản phẩm được trình bày lại bằng HTML tiếng Việt để rõ ràng, dễ đọc và thân thiện với công cụ tìm kiếm.

Trang ưu tiên trải nghiệm xem sản phẩm: ảnh trọn bộ X24 xuất hiện ngay tại hero, banner ngang so sánh hai phiên bản, một thư viện tương tác chung cho X24/X36 và khối “Bộ sản phẩm” liệt kê rõ từng thành phần. Thư viện hỗ trợ nút chuyển ảnh, thao tác vuốt, bàn phím và trình xem phóng to/thu nhỏ.

Dải ảnh chi tiết được đặt dưới chân khối sản phẩm; trên mobile, ảnh được phóng lớn thành thanh cuộn ngang để dễ xem và chạm chọn hơn.

Các nút “Mua ngay” tự chọn đúng phiên bản rồi mở biểu mẫu nhận báo giá dạng pop-up. Form được gửi qua FormSubmit, có xác thực trường bắt buộc, chống bot cơ bản và email phản hồi tự động cho khách.

## Chạy thử tại máy

```bash
python3 -m http.server 4173
```

Sau đó mở `http://localhost:4173`.

## Cấu trúc

- `index.html`: nội dung và cấu trúc landing page.
- `styles.css`: hệ thống giao diện responsive theo nhận diện MATIVO.
- `script.js`: menu di động, thư viện ảnh X24/X36, thao tác vuốt, trình xem ảnh, luồng “Mua ngay”, biểu mẫu báo giá, hiệu ứng hiển thị và công cụ ước tính thời lượng pin.
- `assets/x36-gallery-*.webp`: bốn ảnh trong thư viện tương tác và hình bộ sản phẩm của mẫu X36.
- `assets/x24-gallery-*.webp`: bốn ảnh trong thư viện tương tác của mẫu X24.
- `assets/x24-x36-wide-banner.webp`: banner ngang so sánh nhanh hai phiên bản X24 và X36.
- `assets/x24-full-kit.webp`: packshot trọn bộ gồm hai quạt, pin, dây chia DC và cáp Type-C.
- `assets/`: logo và các ảnh chi tiết sản phẩm đã nén WebP để tải nhanh trên desktop và mobile.

## Triển khai

Trang là website tĩnh, có thể triển khai trực tiếp bằng GitHub Pages, Cloudflare Pages, Netlify hoặc Vercel mà không cần bước build.

### Cloudflare Pages

- Production branch: `main`
- Build command: để trống
- Build output directory: `/` (thư mục gốc repository)
- Không cần Node.js, npm hoặc framework build.

### Kích hoạt biểu mẫu báo giá

FormSubmit yêu cầu xác nhận địa chỉ nhận thư ở lần gửi đầu tiên. Sau khi gửi thử form, mở email kích hoạt do FormSubmit gửi đến và xác nhận một lần; các yêu cầu tiếp theo sẽ được chuyển tới hộp thư này.

Nếu một lần deploy từ GitHub bị lỗi tạm thời, commit mới trên `main` sẽ kích hoạt lại Automatic Deployment mà không làm thay đổi mã nguồn trang.
