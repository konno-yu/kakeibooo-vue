<template>
    <v-app>
        <div class="expenses-register">
            <div class="register-label">
                konno-yuの食費
            </div>

            <div class="date-register">
                <div class="input-area">
                    <v-text-field class="input-date" v-model="month" outlined dense disabled/>
                </div>
                <span class="slash">/</span>
                <div class="input-area">
                    <v-text-field class="input-date" @input="(newDate) => inputDate(newDate)" v-model="date" outlined dense/>
                </div>
            </div>

            <div class="divider"/>

            <div class="receipt-register" v-show="targetDayReceipt.length !== 0">
                <!-- TODO v-modelと@changeの併用はよくないらしい -->
                <div class="receipt" v-for="(item, i) in targetDayReceipt" :key="i">
                    <v-text-field class="input shop" @change="(newStore) => changeStore(newStore, i)" v-model="item.store" color="#333333" prepend-inner-icon="mdi-store" />
                    <v-text-field class="input expense" @change="(newExpense) => changeExpense(newExpense, i)" v-model="item.expense" color="#333333" prepend-inner-icon="mdi-currency-jpy"/>
                    <v-btn class="icon-delete" @click="deleteReceipt(item.id, i)" icon>
                        <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                </div>
            </div>

                <div class="register-guide" v-show="date !== '' && !isNaN(date) && targetDayReceipt.length === 0">
                    <div class="message empty">
                        [+ 行を追加]を押して食費を登録してみましょう
                    </div>
                    <div class="guide-image">
                        <v-img src="../../assets/empty_expenses.svg" maxWidth="180" maxHeight="180"/>
                    </div>
                </div>

                <div class="register-guide" v-show="date === '' || isNaN(date)">
                    <div class="message no-input">
                        カレンダーをクリックするか、日付を直接入力して<br>食費を登録する日付を指定してください
                    </div>
                    <div class="guide-image">
                        <v-img src="../../assets/empty_dates.svg" maxWidth="180" maxHeight="180"/>
                    </div>
                </div>

            <div class="button-add-row">
                <v-btn @click="addReceipt" :disabled="targetDayReceipt.length === 4 || date === '' || isNaN(date)" color="#333333" width="100%" outlined>
                    <v-icon small>mdi-plus</v-icon>
                    行を追加
                </v-btn>
            </div>

            <div class="divider"/>

            <div class="expense-summation">
                <div class="sum-label">合計</div>
                <div class="sum-value">¥{{calcReceiptSummation()}}</div>
            </div>

            <div class="button-register-receipt">
                <v-btn class="button-register" :loading="loading" :disabled='targetDayReceipt.length === 0 || loading' @click="sendReceipt" width="100%" height="100%" color="#FF8A80" elevation="0">
                    <v-icon class="icon-check">mdi-checkbox-marked-circle-outline</v-icon>
                    登録
                </v-btn>
            </div>
        </div>

        <!-- 登録成功時のsnackbar -->
        <v-snackbar v-model="isOpen" timeout="1500" right>
            <div class="snackbar">
                <v-icon v-show="mode === 'success'" color="#FFD600">mdi-piggy-bank</v-icon>
                <v-icon v-show="mode === 'error'" color="#FF8A80">mdi-comment-alert-outline</v-icon>
                <div class="message">{{message}}</div>
            </div>
        </v-snackbar>
    </v-app>
</template>

<script lang="ts">
import _ from 'lodash';
import { defineComponent, inject, computed, ref, watch, reactive, toRefs, toRef, onMounted } from '@vue/composition-api';
import ExpensesKey from './expenses-key';
import { ExpensesStore, Receipt } from '../../store/expenses';
import * as ReceiptRest from '../../apis/receiptApi';
import { GetReceipt, ReceiptSnackbarMessage, ReceiptSnackbarState, ValidationResult } from '../../types/receiptType';
import { AxiosResponse } from 'axios';
import { isUndefined } from 'util';

export default defineComponent({
    setup() {
        const expensesStore = inject<ExpensesStore>(ExpensesKey);

        if(!expensesStore) {
            throw new Error(`${ExpensesKey} is not provided...`);
        }

        const targetDayReceipt = reactive<Receipt[]>([]);

        const receiptDate = reactive<{month: number, date: number}>({
            month: new Date().getMonth() + 1,  // Date()の月は0始まりなので1足しておく
            date: new Date().getDate()
        });

        const snackbarState = reactive<ReceiptSnackbarState>({
            isOpen: false,
            mode: 'success',
            message: ''
        });

        const loading = ref<boolean>(false);


        // ライフサイクルメソッドの created() 相当
        ReceiptRest.getByMonth(receiptDate.month).then((res: AxiosResponse<Receipt[]>) => {
            reflectDatabaseReceipts(res.data);
            setTargetDayReceipt(new Date().getDate());
        });

        watch(() => [expensesStore.month, expensesStore.date], (newStore) => {
            targetDayReceipt.splice(0, targetDayReceipt.length);
            if(receiptDate.month !== newStore[0]) {
                // 月が変わった
                [receiptDate.month, receiptDate.date] = newStore;

                ReceiptRest.getByMonth(receiptDate.month).then((res: AxiosResponse<Receipt[]>) => {
                    reflectDatabaseReceipts(res.data);
                    setTargetDayReceipt(receiptDate.date);
                });
                return;
            }
            if(receiptDate.date !== newStore[1]) {
                // 日が変わった
                receiptDate.date = newStore[1];
                setTargetDayReceipt(receiptDate.date);
            }
        });

        /**
         * データベースから取得した指定月の食費データをクライアント側に反映する
         */
        const reflectDatabaseReceipts = (monthlyReceipts: Receipt[]) => {
            // 日本時間に変換
            monthlyReceipts.forEach(receipt => receipt.purchaseDate = new Date(receipt.purchaseDate));
            // クライアント側のstoreを最新の状態に更新
            expensesStore.setReceipts(monthlyReceipts);
        }

        /**
         * 月の食費データから、食費入力日の食費データがすでにあるかどうかを探して画面に表示する
         */
        const setTargetDayReceipt = (targetDate: number) => {
            const target = expensesStore.receipts.filter(receipt => receipt.purchaseDate.getDate() === targetDate);
            target.forEach(t => targetDayReceipt.push(t));
        }
        const invalidInput = (): ValidationResult => {
            let result: ValidationResult = {isInvalid: true, message: '' };

            const thisYear = new Date().getFullYear();
            const endOf = new Date(thisYear, receiptDate.month, 0).getDate();
            targetDayReceipt.forEach(receipt => {
                if(receiptDate.date < 1 || receiptDate.date >= endOf) {
                    result = { isInvalid: false, message: '無効な日付が指定されていませんか？' };
                    return;
                }
                if(receipt.store === '') {
                    result = { isInvalid: false, message: '未入力の店舗がありませんか？' };
                    return;
                }
                if(receipt.expense === 0) {
                    result = { isInvalid: false, message: '未入力もしくは0円の食費がありませんか？' };
                    return;
                }
                if(isNaN(receipt.expense)) {
                    result = { isInvalid: false, message: '食費に半角数字以外が入力されていませんか？' };
                    return;
                }
            });
            if(targetDayReceipt.filter(f => f.store !== '').length !== _.uniqBy(targetDayReceipt.filter(f => f.store !== ''), 'store').length) {
                result = { isInvalid: false, message: '同じ店舗が複数登録されていませんか？' };
            }
            return result;
        }

        /**
         * snackbarの状態をまとめて更新する
         */
        const setSnackbarState = (isOpen: boolean, mode: 'success' | 'error', message: ReceiptSnackbarMessage) => {
            snackbarState.isOpen = isOpen;
            snackbarState.mode = mode;
            snackbarState.message = message;
        }
        const sendReceipt = () => {
            const invalidResult = invalidInput();
            if(!invalidResult.isInvalid) {
                setSnackbarState(true, 'error', invalidResult.message);
                return;
            }
            loading.value = true;

            const receipts: Receipt[] = expensesStore.receipts;
            const isPostAll = targetDayReceipt.filter(receipt => 'id' in receipt).length === 0;
            if(isPostAll) {
                // ある日付に対して初めて食費を登録する
                ReceiptRest.postAll(targetDayReceipt).then((res: AxiosResponse<Receipt[]>) => {
                    if(res.data) {
                        targetDayReceipt.splice(0, targetDayReceipt.length);
                        // SV側でidが付与されるので、UI上の値にもidを反映する
                        res.data.forEach(r => targetDayReceipt.push(r));
                    }
                    setTimeout(() => {
                        loading.value = false;
                        setSnackbarState(true, 'success', '登録が完了しました');
                        expensesStore.setReceipts(receipts.concat(res.data));
                    }, 2000);
                    return;
                });
            } else {
                const restQueries: Promise<AxiosResponse<Receipt>>[] = [];
                targetDayReceipt.forEach((receipt, i) => {
                    const isPut = 'id' in receipt;
                    restQueries.push(isPut ? ReceiptRest.update(receipt) : ReceiptRest.post(receipt));
                });
                if(restQueries.length > 0) {
                    Promise.all(restQueries).then(result => {
                        targetDayReceipt.splice(0, targetDayReceipt.length);
                        const newData: Receipt[] = [];
                        result.forEach(res => {
                            targetDayReceipt.push(res.data);
                            if(res.config.method === "post") {
                                newData.push(res.data);
                            } else {
                                receipts.forEach(r => {
                                    if(r.id === res.data.id) {
                                        r.store = res.data.store;
                                        r.expense = res.data.expense;
                                    }
                                });
                            }
                        });
                        setTimeout(() => {
                            loading.value = false;
                            setSnackbarState(true, 'success', '更新が完了しました');
                            expensesStore.setReceipts(receipts.concat(newData));
                        }, 2000);
                        return;
                    });
                }
            }
        }

        const deleteReceipt = (id: number, index: number) => {
            targetDayReceipt.splice(index, 1);
            if(isUndefined(id)) {
                // idが見つからない = UI上で追加したitemの場合
                return;
            }
            ReceiptRest.deleteById(id).then((res) => {
                if(res.data === 0) {
                    const updatedReceipt = expensesStore.receipts.filter(receipt => receipt.id !== id);
                    expensesStore.setReceipts(updatedReceipt);
                    setSnackbarState(true, 'success', '削除しました');
                    return;
                } else {
                    alert("予期せぬエラーが発生しました");
                }
            });
        }

        const addReceipt = () => {
            if(targetDayReceipt.length < 4) {
                let purchaseDate = new Date();
                purchaseDate.setFullYear(purchaseDate.getFullYear(), receiptDate.month - 1, receiptDate.date);
                purchaseDate.setHours(0, 0, 0);
                targetDayReceipt.push({ purchaseDate: purchaseDate, store: "", expense: 0 });
            }
        }

        const calcReceiptSummation = () => {
            return targetDayReceipt.reduce((sum, receipt) => Number(sum) + Number(receipt.expense), 0).toLocaleString();
        }

        const changeStore = (newStore: string, i: number) => {
            const updatedTarget = targetDayReceipt[i];
            updatedTarget.store = newStore;
            targetDayReceipt.splice(i, 1, updatedTarget);
        }

        const changeExpense = (newExpense: number, i: number) => {
            const updateTarget = targetDayReceipt[i];
            updateTarget.expense = Number(newExpense);
            targetDayReceipt.splice(i, 1, updateTarget);
        }

        const inputDate = (newDate: number) => {
            targetDayReceipt.splice(0, targetDayReceipt.length);
            expensesStore.receipts.forEach(receipt => {
                if((receipt.purchaseDate.getMonth() + 1) === receiptDate.month && receipt.purchaseDate.getDate() === +newDate) {
                    targetDayReceipt.push(receipt);
                }
            });
            if(targetDayReceipt.length === 0) {
                targetDayReceipt.push();
            }
        }

        return {
            ...toRefs(receiptDate),
            sendReceipt,
            ...toRefs(snackbarState),
            targetDayReceipt,
            deleteReceipt,
            addReceipt,
            onMounted,
            calcReceiptSummation,
            changeStore,
            changeExpense,
            inputDate,
            loading
        }
    }
});
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&display=swap');
.expenses-register {
    font-family: 'M PLUS Rounded 1c', sans-serif;
    padding: 15px;
    height: 100%;

    .register-label {
        width:100%;
        height:50px;
        font-weight:700;
        font-size:24px;
        color:#F7D65A;
        display:flex;
        align-items:center;
        justify-content:center;
        padding-bottom:15px;
    }

    .date-register {
        width:100%;
        height:50px;
        display:flex;
        align-items:end;
        justify-content:center;

        .input-area {
            width: 30%;
        }

        .slash {
            font-size:28px;
            width:10%;
            text-align:center;
        }

        .input-date {
            color: #333333 !important;
            font-weight:700;
            font-size: 18px;
            text-align: center;
        }
    }

    .divider {
        width:100%;
        height:1px;
        margin:20px 0;
        border-bottom:2px dashed #333333;
    }

    .receipt-register {
        height: 230px;

        .receipt {
            height:50px;
            display:flex;
            justify-content:space-around;
            align-items:baseline;
            margin:10px;
        }

        .input {
            font-weight: 700;
            font-size: 16px;
            color: #333333 !important;
            text-align: left;
            padding:0 !important;
        }

        .shop {
            width:50%;
            margin-right:10px;
        }

        .expense {
            width:30%;
            margin: 0 10px;
            font-size: 18px;
        }

        .icon-delete {
            margin-left: 10px;
        }
    }

    .register-guide {
        height: 230px;
        display:flex;
        justify-content:space-around;
        margin:10px;
        flex-direction:column;

        .message {
            color:#333333;
            font-weight:700;
            text-align:center;

        }
        .empty {
            font-size: 14px;
        }

        .no-input {
            font-size: 12px;
            line-height:20px;
        }

        .guide-image {
            margin:auto;
            padding-top:10px;
        }
    }

    .button-add-row {
        height:50px;
        display:flex;
        justify-content:center;
        align-items:center;
        margin:10px;
    }

    .expense-summation {
        height:50px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin:10px;

        .sum-label {
            font-size:20px;
            font-weight:700;
            color:#333333;
        }

        .sum-value {
            font-size:28px;
            font-weight:700;
            color:#333333;
        }
    }

    .button-register-receipt {
        height:50px;
        display:flex;
        justify-content:space-around;
        align-items:center;
        margin:10px;

        .button-register {
            font-size:24px;
            font-weight:700;
            color:#FFF;
        }

        .icon-check {
            margin-right:10px;
        }
    }
}

.snackbar {
    font-family: 'M PLUS Rounded 1c', sans-serif;
    display:flex;
    align-items:center;

    .message {
        color:#FFFFFF;
        font-weight:500;
        margin-left:5px;
        font-size:14px
    }
}

</style>