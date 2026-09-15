# MATIVO X24 & X36 Landing Page

Landing page tiếng Việt cho hai bộ quạt áo điều hòa MATIVO X24 và X36. Toàn bộ hình ảnh sử dụng trên trang đã được làm sạch chữ Trung; thông tin sản phẩm được trình bày lại bằng HTML tiếng Việt để rõ ràng, dễ đọc và thân thiện với công cụ tìm kiếm.

Trang ưu tiên trải nghiệm xem sản phẩm: ảnh trọn bộ xuất hiện ngay tại hero, banner so sánh hai phiên bản, hai thư viện tương tác riêng và khối “Bộ sản phẩm” liệt kê rõ từng thành phần của cả X24 lẫn X36.

## Chạy thử tại máy

```bash
python3 -m http.server 4173
```

Sau đó mở `http://localhost:4173`.

## Cấu trúc

- `index.html`: nội dung và cấu trúc landing page.
- `styles.css`: hệ thống giao diện responsive theo nhận diện MATIVO.
- `script.js`: menu di động, hai thư viện ảnh tương tác, hiệu ứng hiển thị và công cụ ước tính thời lượng pin.
- `assets/x36-gallery-*.webp`: bốn ảnh trong thư viện tương tác và hình bộ sản phẩm của mẫu X36.
- `assets/x24-gallery-*.webp`: bốn ảnh trong thư viện tương tác của mẫu X24.
- `assets/x24-x36-comparison.webp`: banner so sánh nhanh hai phiên bản X24 và X36.
- `assets/x24-full-kit.webp`: packshot trọn bộ gồm hai quạt, pin, dây chia DC và cáp Type-C.
- `assets/`: logo và các ảnh chi tiết sản phẩm đã nén WebP để tải nhanh trên desktop và mobile.

## Triển khai

Trang là website tĩnh, có thể triển khai trực tiếp bằng GitHub Pages, Cloudflare Pages, Netlify hoặc Vercel mà không cần bước build.
