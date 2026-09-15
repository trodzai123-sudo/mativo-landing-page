# MATIVO Landing Page

Landing page tiếng Việt cho hệ thống quạt áo điều hòa MATIVO với 2 SKU hiện đã xác nhận:

- **MATIVO X36**: 36V, 2 quạt không chổi than, pin 24.000mAh, khoảng 8.600 RPM.
- **MATIVO X24**: 24V, 2 quạt không chổi than, pin N41-24 20.000mAh / 77Wh, khoảng 6.700 RPM.

Dòng **18V** chưa có bộ ảnh hoàn chỉnh nên hiện chỉ được nhắc ở trạng thái “sắp bổ sung”, không dùng ảnh hoặc thông số chưa xác nhận.

## Nguyên tắc nội dung

- Toàn bộ nội dung quảng cáo/giải thích trên trang là tiếng Việt.
- Không hiển thị các banner tiếng Trung từ bộ ảnh gốc; ảnh X36 đã được cắt lại để chỉ giữ vùng sản phẩm, còn thông số được dựng bằng HTML tiếng Việt.
- Tập trung vào cách chọn giữa X36 và X24 thay vì nhồi nhiều SKU.
- Bố cục gồm hero 2 sản phẩm, lợi ích chính, 2 card SKU, bảng so sánh, công nghệ, ngành nghề sử dụng, bộ sản phẩm và FAQ.

## Tham khảo UX

Cấu trúc được làm lại dựa trên các pattern phổ biến của website áo điều hòa tại Việt Nam: đưa sản phẩm lên sớm, có thanh lợi ích/uy tín, thông số rõ, so sánh theo nhu cầu, gợi ý ngành nghề sử dụng và FAQ.

## Chạy thử tại máy

```bash
python3 -m http.server 4173
```

Sau đó mở `http://localhost:4173`.

## Cấu trúc

- `index.html`: nội dung và cấu trúc landing page.
- `styles.css`: giao diện responsive desktop/mobile.
- `script.js`: menu mobile, reveal animation và FAQ accordion.
- `assets/x36-kit.webp`: packshot X36 đã cắt bỏ phần banner chữ Trung.
- `assets/x24-full-kit.webp`: packshot trọn bộ X24.
- `assets/fan-exploded.webp`, `assets/battery-n41.webp`: ảnh chi tiết X24 đã xử lý.
- `assets/mativo-logo.webp`: logo MATIVO.

## Triển khai

Website tĩnh, không cần build. Có thể dùng trực tiếp với Cloudflare Pages, GitHub Pages, Netlify hoặc Vercel.
