const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index]?.trim() || '';
    });
    return obj;
  });
}

// Shuffle array function
function shuffle(array, seed) {
  const arr = [...array];
  let currentIndex = arr.length;
  let random = seed;
  
  // Simple seeded random
  const seededRandom = () => {
    random = (random * 9301 + 49297) % 233280;
    return random / 233280;
  };
  
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(seededRandom() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  }
  
  return arr;
}

const codes = parseCSV(path.join(__dirname, 'codes.csv'));
const links = parseCSV(path.join(__dirname, 'links.csv'));

// Tạo nhiều trang với các permutation khác nhau
const pages = [];
const numPages = 10000; // Tăng lại lên 10000 trang sau khi tối ưu CSS

for (let i = 0; i < numPages; i++) {
  const shuffledCodes = shuffle(codes, i * 123);
  const shuffledLinks = shuffle(links, i * 456);
  
  // Tạo bookmarks cho trang này
  const bookmarks = shuffledCodes.map((code, index) => ({
    code: code.code,
    url: shuffledLinks[index % shuffledLinks.length].url,
    title: shuffledLinks[index % shuffledLinks.length].title
  }));
  
  // Tạo số thứ tự 6 chữ số (000001, 000002, ...)
  const pageNumber = String(i + 1).padStart(6, '0');
  
  pages.push({
    slug: `code-sex-${pageNumber}`,
    title: `Code Phim Sex Đặc Sắc ${pageNumber}`,
    description: `Tổng hợp phim sex cực dâm số ${pageNumber}`,
    bookmarks: bookmarks
  });
}

module.exports = pages;
