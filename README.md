# Eleventy Static Site Generator

Dự án tạo hàng chục ngàn trang web tĩnh với Eleventy và deploy lên Vercel.

## Cài đặt

```bash
npm install
```

## Phát triển local

```bash
npm run dev
```

Truy cập: http://localhost:8080

## Build

```bash
npm run build
```

## Deploy lên Vercel

1. Cài đặt Vercel CLI: `npm i -g vercel`
2. Chạy: `vercel`
3. Hoặc kết nối repo với Vercel dashboard để auto-deploy

## Cấu trúc dữ liệu CSV

### File `_data/codes.csv`:
```csv
code
abc-123
def-456
ghi-789
```

### File `_data/links.csv`:
```csv
url,title
https://example.com/page1,Example Page 1
https://example.com/page2,Example Page 2
```

## Cách hoạt động

Hệ thống sẽ tạo nhiều trang, mỗi trang:
- Hiển thị **tất cả các codes**
- Mỗi code gắn với 1 link (shuffle ngẫu nhiên)
- Thứ tự codes và links khác nhau ở mỗi trang

Ví dụ với 5 codes và 5 links, tạo 100 trang:
- Trang 1: code-A→link1, code-B→link2, code-C→link3...
- Trang 2: code-C→link4, code-A→link2, code-B→link5...
- Trang 3: code-B→link1, code-C→link3, code-A→link4...

Để tạo nhiều trang hơn, chỉnh sửa `numPages` trong `_data/bookmarks.js`

## Tối ưu cho hàng chục ngàn trang

- Sử dụng pagination của Eleventy để tạo pages động
- Data được load từ JSON files trong `_data/`
- Liên kết giữa các trang qua `relatedSlugs`
- Build time được tối ưu với `setQuietMode(true)`

## Mở rộng

- Thêm nhiều data files trong `_data/` (có thể chia nhỏ thành nhiều files)
- Tạo script để generate data từ database hoặc API
- Thêm sitemap, RSS feed nếu cần
- Tối ưu SEO với meta tags
