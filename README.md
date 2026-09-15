# MATIVO X24 Landing Page

Landing page tiếng Việt cho bộ quạt áo điều hòa MATIVO X24. Toàn bộ hình ảnh sử dụng trên trang đã được làm sạch chữ Trung; thông tin sản phẩm được trình bày lại bằng HTML tiếng Việt để rõ ràng, dễ đọc và thân thiện với công cụ tìm kiếm.

Trang ưu tiên trải nghiệm xem sản phẩm: ảnh trọn bộ xuất hiện ngay tại hero, thư viện tương tác giới thiệu mẫu X36 và khối “Bộ sản phẩm” liệt kê rõ từng thành phần của X24.

## Chạy thử tại máy

```bash
python3 -m http.server 4173
```

Sau đó mở `http://localhost:4173`.

## Cấu trúc

- `index.html`: nội dung và cấu trúc landing page.
- `styles.css`: hệ thống giao diện responsive theo nhận diện MATIVO.
- `script.js`: menu di động, hiệu ứng hiển thị và công cụ ước tính thời lượng pin.
- `assets/x36-gallery-*.webp`: bốn ảnh trong thư viện tương tác của mẫu X36.
- `assets/x24-full-kit.webp`: packshot trọn bộ gồm hai quạt, pin, dây chia DC và cáp Type-C.
- `assets/`: logo và các ảnh chi tiết sản phẩm đã xử lý.

## Triển khai

Trang là website tĩnh, có thể triển khai trực tiếp bằng GitHub Pages, Cloudflare Pages, Netlify hoặc Vercel mà không cần bước build.
