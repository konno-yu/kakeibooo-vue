DROP TABLE IF EXISTS foodstaffs;
DROP TABLE IF EXISTS expenses;

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


INSERT INTO foodstaffs (staff_name, staff_count, unit, input_date, category, sub_category) VALUES
    ('豚こま', 100, 'g', current_date, 'fridge-top', NULL),
    ('鶏むね', 150, 'g', current_date, 'fridge-top', NULL),
    ('あいびき肉', 200, 'g', current_date, 'fridge-top', NULL),
    ('枝豆', 1, '袋', current_date, 'fridge-top', NULL),
    ('大根', 0.2, '本', current_date, 'fridge-bottom', 'vegetables'),
    ('人参', 0.5, '本', current_date, 'fridge-bottom', 'vegetables'),
    ('じゃがいも', 3, '個', current_date, 'fridge-bottom', 'vegetables'),
    ('白菜',  1, '本', current_date, 'fridge-bottom', 'vegetables'),
    ('きゅうり', 2, '個', current_date, 'fridge-bottom', 'vegetables'),
    ('肉じゃが', 100, 'g', current_date, 'fridge-bottom', 'leftovers'),
    ('水菜サラダ', 100, 'g', current_date, 'fridge-bottom', 'leftovers'),
    ('カレー', 150, 'g', current_date, 'fridge-bottom', 'leftovers'),
    ('ルイボスティー', 500, 'ml', current_date, 'fridge-bottom', 'others'),
    ('卵',  5, '個', current_date, 'fridge-bottom', 'others'),
    ('稲荷の皮', 3, '個', current_date, 'fridge-bottom', 'others'),
    ('しお', 1, '本', current_date, 'seasoning', NULL),
    ('パルスイート', 100, 'ml', current_date, 'seasoning', NULL),
    ('コンソメ', 400, 'g', current_date, 'seasoning', NULL),
    ('カップ麺', 10, '個', current_date, 'preserved', NULL),
    ('パスタ', 1, '個', current_date, 'preserved', NULL),
    ('うどん', 4, '個', current_date, 'preserved', NULL);

INSERT INTO expenses (target_date, cost) VALUES
    ('2020-06-01', 900),
    ('2020-06-02', 1000),
    ('2020-06-03', 890),
    ('2020-06-04', 1500),
    ('2020-06-05', 980),
    ('2020-06-06', 1980),
    ('2020-06-07', 2500),
    ('2020-06-08', 700),
    ('2020-06-09', 0),
    ('2020-06-10', 500),
    ('2020-06-11', 1980),
    ('2020-06-12', 1500),
    ('2020-06-13', 1200),
    ('2020-06-14', 1000),
    ('2020-06-15', 880),
    ('2020-06-16', 780),
    ('2020-06-17', 1800),
    ('2020-06-18', 2100),
    ('2020-06-19', 1900),
    ('2020-06-20', 990),
    ('2020-06-21', 550),
    ('2020-06-22', 980),
    ('2020-06-23', 1000),
    ('2020-06-24', 880),
    ('2020-06-25', 780),
    ('2020-06-26', 1800),
    ('2020-06-27', 2100),
    ('2020-06-28', 1900),
    ('2020-06-29', 990),
    ('2020-06-30', 550),
    ('2020-07-01', 900),
    ('2020-07-02', 1000),
    ('2020-07-03', 890),
    ('2020-07-04', 1500),
    ('2020-07-05', 980);