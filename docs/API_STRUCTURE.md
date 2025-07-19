# โครงสร้าง API และฐานข้อมูลสำหรับระบบหวย

## 1. Database Schema

### lottery_categories (ประเภทหวย)
```sql
CREATE TABLE lottery_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(10),
    color VARCHAR(50),
    description TEXT,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### lotteries (หวยแต่ละประเภท)
```sql
CREATE TABLE lotteries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) UNIQUE,
    draw_time TIME,
    close_time TIME,
    draw_days JSON, -- ["MON", "WED", "FRI"]
    price_per_unit DECIMAL(10,2),
    max_number INT,
    min_number INT,
    prize_structure JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES lottery_categories(id)
);
```

### lottery_rounds (รอบการออกหวย)
```sql
CREATE TABLE lottery_rounds (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lottery_id INT NOT NULL,
    round_number VARCHAR(50),
    draw_date DATETIME NOT NULL,
    close_date DATETIME NOT NULL,
    result JSON,
    status ENUM('pending', 'closed', 'drawn', 'cancelled') DEFAULT 'pending',
    total_sales DECIMAL(15,2) DEFAULT 0,
    total_prizes DECIMAL(15,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (lottery_id) REFERENCES lotteries(id)
);
```

## 2. API Endpoints

### Admin APIs

#### POST /api/admin/lotteries
สร้างหวยใหม่
```json
{
    "category_id": 1,
    "name": "หวยรัฐบาลไทย",
    "code": "TH_GOV",
    "draw_time": "16:00",
    "close_time": "15:30",
    "draw_days": ["1", "16"],
    "price_per_unit": 80,
    "max_number": 999999,
    "min_number": 0,
    "prize_structure": {
        "first": { "amount": 6000000, "count": 1 },
        "three_digit_front": { "amount": 4000, "count": 2 },
        "three_digit_back": { "amount": 4000, "count": 2 },
        "two_digit_back": { "amount": 2000, "count": 1 }
    }
}
```

#### PUT /api/admin/lotteries/:id
อัพเดตหวย

#### DELETE /api/admin/lotteries/:id
ลบหวย (soft delete)

#### POST /api/admin/lottery-categories
สร้างประเภทหวยใหม่

#### POST /api/admin/lotteries/:id/rounds
สร้างรอบการออกหวย

#### PUT /api/admin/rounds/:id/result
บันทึกผลหวย
```json
{
    "result": {
        "first_prize": "123456",
        "three_digit_front": ["123", "456"],
        "three_digit_back": ["789", "012"],
        "two_digit_back": "34"
    }
}
```

## 3. การจัดการหวยแบบอัตโนมัติ

### Cron Jobs / Scheduled Tasks

1. **สร้างรอบหวยอัตโนมัติ**
   - รันทุกวันเวลา 00:00
   - ตรวจสอบหวยที่ต้องเปิดรอบใหม่
   - สร้างรอบตามวันที่กำหนด

2. **ปิดรอบการแทงอัตโนมัติ**
   - ตรวจสอบทุก 1 นาที
   - ปิดรอบที่ถึงเวลา close_time

3. **แจ้งเตือนผู้ใช้**
   - แจ้งเตือนก่อนปิดรอบ 15 นาที
   - แจ้งผลหลังออกรางวัล

## 4. การใช้งานจาก Admin Panel

### ขั้นตอนสร้างหวยใหม่:

1. **Admin เข้าระบบ**
2. **ไปที่หน้าจัดการหวย**
3. **กรอกข้อมูลหวย:**
   - ชื่อหวย
   - เวลาออกผล
   - เวลาปิดรับ
   - วันที่ออก (เช่น วันที่ 1 และ 16)
   - ราคาต่อหน่วย
   - โครงสร้างรางวัล
4. **ระบบจะ:**
   - บันทึกข้อมูลลง database
   - สร้างรอบแรกอัตโนมัติ
   - เพิ่มใน cron job สำหรับรอบถัดไป

### ตัวอย่างหวยยี่กี:
```javascript
{
    name: "หวยยี่กี 5 นาที",
    draw_interval: 5, // ออกทุก 5 นาที
    daily_rounds: 288, // 24*60/5 = 288 รอบต่อวัน
    auto_generate_rounds: true,
    round_naming: "YYYYMMDD-RRR" // 20240719-001
}
```

## 5. Security Considerations

1. **Authentication & Authorization**
   - ใช้ JWT Token
   - ตรวจสอบ role ทุก request
   - Rate limiting

2. **Data Validation**
   - Validate ข้อมูลทั้ง frontend และ backend
   - Sanitize input
   - ป้องกัน SQL Injection

3. **Audit Log**
   - บันทึกทุกการเปลี่ยนแปลง
   - เก็บ IP, User ID, Timestamp
   - การสร้าง/แก้ไข/ลบหวย

## 6. การ Deploy

### Development
```bash
npm run dev
# API: http://localhost:5000
# Frontend: http://localhost:3000
```

### Production
```bash
# Build frontend
npm run build

# Deploy API
pm2 start server.js

# Setup Nginx
# Proxy /api/* to backend
# Serve static files from build/
```

## 7. Monitoring

1. **Track Metrics:**
   - จำนวนหวยที่สร้าง
   - ยอดขายต่อรอบ
   - Error rates
   - API response time

2. **Alerts:**
   - รอบหวยสร้างไม่สำเร็จ
   - API errors > threshold
   - Database connection issues