export type FoodStaffUnit = '個' | '本' | '袋' | '束' | '缶' | 'g' | 'ml';
export type FoodStaffCategory = 'fridge-top' | 'fridge-bottom' | 'seasoning' | 'preserved';
export type FoodStaffCategoryLabel = '冷凍庫' | '冷蔵庫' | '調味料' | '保存食';
export type FoodStaffSubCategory = 'vegetables' | 'leftovers' | 'others';
export type FoodStaffSubCategoryLabel = '野菜' | '残りもの' | 'その他';
export type FoodStaff = {
    id: number;
    staffName: string;
    staffCount: number;
    unit: FoodStaffUnit;
    category: FoodStaffCategory;
    subCategory?: FoodStaffSubCategory | null;
};
export type FoodStaffInput = {
    staffName: string;
    staffCount: number | string;
    unit: FoodStaffUnit;
    unitList: FoodStaffUnit[];
    largeClassSelection: number;
    smallClassSelection: number;
};
export type FoodStaffDialogState = {
    isOpenBuy: boolean,
    isOpenUse: boolean,
    count: number
};
export type FoodStaffDialogType = 'buy' | 'use';
export type FoodStaffConsumption = 'all' | 'half';
export type SnackbarMessage = '' | '入力内容に不備があります' | 'すでに登録されています' | '登録が完了しました';
export type SnackbarState = {
    isSuccessOpen: boolean,
    isErrorOpen: boolean,
    message: SnackbarMessage
};