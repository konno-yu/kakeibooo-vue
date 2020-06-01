export interface FoodstaffDto {
    id: number;
    staffName: string;
    staffCount: number;
    unit: string;
    inputDate: Date;
    category: string;
    subCategory?: string;
}