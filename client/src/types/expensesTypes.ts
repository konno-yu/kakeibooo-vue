export type DailyExpenses = {
    date: number | null,
    cost: number | null
};
export type Expenses = {
    id: number,
    targetDate: Date,
    cost: number
}

export type SnackbarMessage = '' | '未入力の項目があります' | '登録が完了しました';
export type SnackbarState = {
    isSuccessOpen: boolean,
    isErrorOpen: boolean,
    message: SnackbarMessage
};