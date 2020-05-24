DROP TABLE IF EXISTS foodstaffs;

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