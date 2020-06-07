export type AppbarTabCategory = '家計簿' | '食費管理' | '食材管理';

export type FoodCountUnit = '個' | '本' | '袋' | '束' | '缶' | 'g' | 'ml';
export type FoodStaffCategory = 'fridge-top' | 'fridge-bottom' | 'seasoning' | 'preserved';
export type FoodStaffSubCategory = 'vegetables' | 'leftovers'| 'others';
export type FoodStaffSubCategoryLabel = '野菜' | '残りもの'| 'その他';

export type FoodStaffDetails = {
    id: number;
    staffName: string;
    staffCount: number;
    unit: FoodCountUnit;
    category: FoodStaffCategory;
    subCategory?: FoodStaffSubCategory | null;
}
