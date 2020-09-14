<template>
    <v-app>
        <div class="expenses_register">
            <div style='width:100%;height:50px;font-weight:700;font-size:24px;color:#F7D65A;display:flex;align-items:center;justify-content:center;padding-bottom:15px'>
                コンノ家の食費
            </div>

            <div style='width:100%;height:50px;display:flex;align-items:end;justify-content:center;'>
                <div style="width:30%"><v-text-field class="input-date" v-model="month" outlined dense disabled/></div>
                <span style="font-size:28px;width:10%;text-align:center">/</span>
                <div style="width:30%"><v-text-field @input="(newDate) => inputDate(newDate)" class="input-date" v-model="date" outlined dense/></div>
            </div>

            <div style="width:100%;height:1px;margin:20px 0;border-bottom:2px dashed #333333;"/>

            <div v-show="targetDayReceipt.length !== 0" style="height: 230px">
                <!-- TODO v-modelと@changeの併用はよくないらしい -->
                <div style="height:50px;display:flex;justify-content:space-around;align-items:baseline;margin:10px" v-for="(item, i) in targetDayReceipt" :key="i">
                    <v-text-field @change="(newStore) => changeStore(newStore, i)" v-model="item.store" color="#333333" class="input-shop" style="width:50%;margin-right:10px;padding:0 !important;" prepend-inner-icon="mdi-store" />
                    <v-text-field @change="(newExpense) => changeExpense(newExpense, i)" v-model="item.expense" color="#333333" class="input-expense" style="width:30%;margin-left:10px;margin-right:10px;padding:0 !important" prepend-inner-icon="mdi-currency-jpy"/>
                    <v-btn @click="deleteItem(item.id, i)" icon style="margin-left:10px"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
                </div>
            </div>

                <div v-show="date !== '' && !isNaN(date) && targetDayReceipt.length === 0" style="height: 230px;display:flex;justify-content:space-around;margin:10px;flex-direction:column">
                    <div style="font-size: 14px;color:#333333;font-weight:700;text-align:center">
                        [+ 行を追加]を押して食費を登録してみましょう
                    </div>
                    <div style="margin:auto;padding-top:10px"><v-img src="../../assets/empty_expenses.svg" maxWidth="180" maxHeight="180"/></div>
                </div>

                <div v-show="date === '' || isNaN(date)" style="height: 230px;display:flex;justify-content:space-around;margin:10px;flex-direction:column">
                    <div style="font-size: 12px;line-height:20px;color:#333333;font-weight:700;text-align:center">
                        カレンダーをクリックするか、日付を直接入力して<br>食費を登録する日付を指定してください
                    </div>
                    <div style="margin:auto;padding-top:10px"><v-img src="../../assets/empty_dates.svg" maxWidth="180" maxHeight="180"/></div>
                </div>

            <div style="height:50px;display:flex;justify-content:center;align-items:center;margin:10px;justify-content:flex-between">
            <v-btn @click="addItem" :disabled="targetDayReceipt.length === 4 || date === '' || isNaN(date)" color="#333333" width="100%" outlined><v-icon small>mdi-plus</v-icon>行を追加</v-btn>
            </div>

            <div style="width:100%;height:1px;margin:20px 0;border-bottom:2px dashed #333333;"/>

            <div style="height:50px;display:flex;justify-content:space-between;align-items:center;margin:10px;">
                <div style="font-size:20px;font-weight:700;color:#333333">合計</div>
                <div style="font-size:28px;font-weight:700;color:#333333">¥{{calcReceiptSummation()}}</div>
            </div>

            <div style="height:50px;display:flex;justify-content:space-around;align-items:center;margin:10px;">
                <v-btn :loading="loading" :disabled='targetDayReceipt.length === 0 || loading' @click="sendReceipt" width="100%" height="100%" color="#FF8A80" elevation="0" style="font-size:24px;font-weight:700;color:#FFF">
                    <v-icon style="margin-right:10px">mdi-checkbox-marked-circle-outline</v-icon>
                    登録
                </v-btn>
            </div>
        </div>

        <!-- 登録成功時のsnackbar -->
        <v-snackbar class="snackbar" v-model="isOpen" timeout="2000" right>
            <div style="display:flex;align-items:center">
                <v-icon v-show="mode === 'success'" color="#FFD600">mdi-piggy-bank</v-icon>
                <v-icon v-show="mode === 'error'" color="#FF8A80">mdi-comment-alert-outline</v-icon>
                <div style="color:#FFFFFF;font-weight:700;margin-left:5px">{{message}}</div>
            </div>
        </v-snackbar>
    </v-app>
</template>

<script lang="ts">
import _, { rest } from 'lodash';
import { defineComponent, inject, computed, ref, watch, reactive, toRefs, toRef, onMounted } from '@vue/composition-api';
import ExpensesKey from './expenses-key';
import { ExpensesStore, Receipt } from '../../store/expenses';
import { getByDate, post, update } from '../../apis/expensesApi';

import { FoodStaffUnit } from '../../types/foodStaffTypes';
import { Expenses, SnackbarState } from '../../types/expensesTypes';

import * as ReceiptRest from '../../apis/receiptApi';
import { GetReceipt, ReceiptSnackbarMessage, ReceiptSnackbarState } from '../../types/receiptType';
import Axios, { AxiosResponse } from 'axios';
import { isUndefined } from 'util';
import { error } from 'console';

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
        ReceiptRest.getByMonth(receiptDate.month).then(res => {
            // todo 上と共通化できる
            const receipts = (res as AxiosResponse<Receipt[]>).data;
            receipts.forEach(receipt => receipt.purchaseDate = new Date(receipt.purchaseDate));
            expensesStore.setReceipts(receipts);

            const h = expensesStore.receipts.filter(receipt => receipt.purchaseDate.getTime() === new Date().getTime());
            h.forEach((h) => targetDayReceipt.push(h));
        });

        watch(() => [expensesStore.month, expensesStore.date], (newStore) => {
            targetDayReceipt .length = 0;  // 初期化
            if(receiptDate.month !== newStore[0]) {
                // 月が変わった
                receiptDate.month = newStore[0];
                receiptDate.date = newStore[1];

                ReceiptRest.getByMonth(receiptDate.month).then(res => {
                    const receipts = (res as AxiosResponse<Receipt[]>).data;
                    receipts.forEach(receipt => receipt.purchaseDate = new Date(receipt.purchaseDate));
                    expensesStore.setReceipts(receipts);
                    const targetDate = expensesStore.receipts.filter(receipt => receipt.purchaseDate.getDate() === receiptDate.date);
                    targetDate.forEach((t) => targetDayReceipt.push(t));
                });
                return;
            }
            if(receiptDate.date !== newStore[1]) {
                // 日が変わった時
                receiptDate.date = newStore[1];
                const newTargetReceipt = expensesStore.receipts.filter(r => new Date(r.purchaseDate).getDate() === newStore[1]);
                newTargetReceipt.forEach(r => targetDayReceipt.push(r));

            }
        });

        const invalidInput = (): {isInvalid: boolean, message: ReceiptSnackbarMessage} => {
            let result: {isInvalid: boolean, message: ReceiptSnackbarMessage} = {isInvalid: true, message: '' };
            targetDayReceipt.forEach(receipt => {
                if(receipt.store === '') {
                    result.isInvalid = false;
                    result.message = '未入力の店舗がありませんか？';
                    return;
                }
                if(receipt.expense === 0) {
                    result.isInvalid = false;
                    result.message = '未入力もしくは0円の食費がありませんか？';
                    return;
                }
                if(isNaN(receipt.expense)) {
                    result.isInvalid = false;
                    result.message = '食費に半角数字以外が入力されていませんか？';
                    return;
                }
            });
            if(targetDayReceipt.length !== _.uniqBy(targetDayReceipt, 'store').length) {
                result.isInvalid = false;
                result.message = '同じ店舗が複数登録されていませんか？';
            }
            return result;
        }

        const sendReceipt = () => {
            const showSuccessSnackbar = (message: ReceiptSnackbarMessage) => {
                snackbarState.isOpen = true;
                snackbarState.mode = 'success';
                snackbarState.message = message;
            };
            const invalidResult = invalidInput();
            if(!invalidResult.isInvalid) {
                snackbarState.isOpen = true;
                snackbarState.mode = 'error';
                snackbarState.message = invalidResult.message;
                return;
            }
            loading.value = true;

            const receipts: readonly Receipt[] = expensesStore.receipts;
            const isPostAll = targetDayReceipt.filter(receipt => 'id' in receipt).length === 0;
            if(isPostAll) {
                // ある日付に対して初めて食費を登録する
                ReceiptRest.postAll(targetDayReceipt).then((res) => {
                    if(res.data) {
                        targetDayReceipt.length = 0;
                        // SV側でidが付与されるので、UI上の値にもidを反映する
                        (res.data as Receipt[]).forEach(r => targetDayReceipt.push(r));
                        expensesStore.setReceipts(receipts.concat(res.data));
                    }
                    setTimeout(() => {
                        loading.value = false;
                        showSuccessSnackbar('登録が完了しました');
                    }, 2000);
                    return;
                });
            } else {
                const restQueries: Promise<any>[] = [];
                targetDayReceipt.forEach((receipt, i) => {
                    const isPut = 'id' in receipt;
                    restQueries.push(isPut ? ReceiptRest.update(receipt) : ReceiptRest.post(receipt));
                });
                if(restQueries.length > 0) {
                    Promise.all(restQueries).then(result => {
                        targetDayReceipt.length = 0;
                        const newData: any[] = [];
                        result.forEach(res => {
                            targetDayReceipt.push(res.data as Receipt);
                            if(res.config.method === "post") newData.push(res.data);
                        });
                        expensesStore.setReceipts(receipts.concat(newData));
                        setTimeout(() => {
                            loading.value = false;
                            showSuccessSnackbar('更新が完了しました');
                        }, 2000);
                        return;
                    });
                }
            }
        }

        const deleteItem = (id: number, index: number) => {
            targetDayReceipt.splice(index, 1);
            if(isUndefined(id)) {
                // idが見つからない = UI上で追加したitemの場合
                return;
            }
            ReceiptRest.deleteById(id).then((res) => {
                if(res.data === 0) {
                    const updatedReceipt = expensesStore.receipts.filter(receipt => receipt.id !== id);
                    expensesStore.setReceipts(updatedReceipt);
                    snackbarState.mode = "success";
                    snackbarState.message = "削除しました";
                    snackbarState.isOpen = true;
                    return;
                } else {
                    alert("予期せぬエラーが発生しました");
                }
            });
        }

        const addItem = () => {
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
            targetDayReceipt.length = 0;
            expensesStore.receipts.forEach(receipt => {
                if((receipt.purchaseDate.getMonth() + 1) === receiptDate.month && receipt.purchaseDate.getDate() === +newDate) {
                    targetDayReceipt.push(receipt);
                }
            });
            if(targetDayReceipt.length === 0) {
                targetDayReceipt.push();
            }
        }

        const closeSnackbar = () => {
            snackbarState.isOpen = false;
            snackbarState.mode = 'success';
            snackbarState.message = '';
        };

        return {
            ...toRefs(receiptDate),
            sendReceipt,
            ...toRefs(snackbarState),
            closeSnackbar,
            targetDayReceipt,
            deleteItem,
            addItem,
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Gamja+Flower&display=swap');

.v-text-field.input-date >>> input {
    color: #333333 !important;
    font-weight:700;
    font-size: 18px;
    text-align: center;
}

.v-text-field.input-expense >>> input {
    /* font-family: 'Gamja Flower', cursive; */
    color: #333333 !important;
    font-weight: 700;
    font-size: 18px;
    text-align: left;
}

.v-text-field.input-shop >>> input {
    color: #333333 !important;
    font-weight: 700;
    font-size: 16px;
    text-align: left;
}

.expenses_register {
    font-family: 'M PLUS Rounded 1c', sans-serif;
    padding: 15px;
    height: 100%;
}
.date, .expenses {
    height: 110px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.date-unit, .expenses-unit, .meal-unit {
    margin:0 10px;
    color:#616161;
    font-weight:700;
    text-align:center;
}

.meals{
    height: 200px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
}

.textfield-label {
    margin-bottom: 5px;
    font-weight: 700;
    color: #9E9E9E;
    font-size: 18px;
}
#register_expenses {
    height: 100px;
    text-align: center;
    display: flex;
    align-items: center;
    margin: 10px;
}
#register_button_label {
    font-size: 24px;
    font-weight: 700;
    color: #FFFFFF;
}
.snackbar {
    font-family: 'M PLUS Rounded 1c', sans-serif;
}
</style>