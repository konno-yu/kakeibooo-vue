DROP TABLE IF EXISTS foodstaffs;
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS receipts;

-- 食材テーブル
CREATE TABLE foodstaffs (
    id SERIAL NOT NULL,
    staff_name VARCHAR(100) UNIQUE NOT NULL,
    staff_count INTEGER NOT NULL,
    unit VARCHAR(10) NOT NULL,
    input_date DATE NOT NULL,
    category VARCHAR(20) NOT NULL,
    sub_category VARCHAR(20)
);

-- 食費テーブル
CREATE TABLE expenses (
    id SERIAL NOT NULL,
    target_date DATE NOT NULL,
    cost INTEGER NOT NULL
);

-- レシート単位の食費テーブル
CREATE TABLE receipts (
    id SERIAL NOT NULL,
    purchase_date DATE NOT NULL,
    store VARCHAR(100) NOT NULL,
    expense INTEGER NOT NULL
);