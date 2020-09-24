export type GetReceipt = {
    id: number,
    purchaseDate: Date,
    store: string,
    expense: number
}

export type ReceiptSnackbarState = {
    isOpen: boolean,
    mode:　'success' | 'error',
    message: ReceiptSnackbarMessage
};

export type ValidationResult = {
    isInvalid: boolean,
    message: ReceiptSnackbarMessage
};

export namespace messages {
    export type RECEIPT_DELETED = '削除しました';
    export type RECEIPT_REGISTERED = '登録が完了しました';
    export type RECEIPT_UPDATED = '更新が完了しました';
    export type EMPTY_STORE_INPUT = '未入力の店舗がありませんか？';
    export type INVALID_EXPENSE_INPUT = '食費に半角数字以外が入力されていませんか？';
    export type EMPTY_EXPENSE_INPUT = '未入力もしくは0円の食費がありませんか？';
    export type DEPLICATE_STORE_INPUT = '同じ店舗が複数登録されていませんか？';
    export type INVALID_DATE_INPUT = '無効な日付が指定されていませんか？';
}

export type ReceiptSnackbarMessage = '' | messages.RECEIPT_DELETED | messages.RECEIPT_REGISTERED | messages.RECEIPT_UPDATED | messages.EMPTY_STORE_INPUT
| messages.INVALID_EXPENSE_INPUT | messages.EMPTY_EXPENSE_INPUT | messages.DEPLICATE_STORE_INPUT | messages.INVALID_DATE_INPUT;