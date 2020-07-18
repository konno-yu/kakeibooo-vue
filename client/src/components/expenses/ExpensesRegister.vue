<template>
    <v-app>
        <div class="expenses_register">
            <!-- 日付 -->
            <div class="date">
                <div class="textfield-label">日付</div>
                <div style="display:flex;align-items:center">
                    <v-text-field v-model="month" style="width:80px;" color="#E0E0E0" dense outlined flat solo />
                    <div class="date-unit">月</div>
                    <v-text-field v-model="date" style="width:80px" color="#E0E0E0" dense outlined flat solo />
                    <div class="date-unit">日</div>
                </div>
            </div>
            <!-- 使ったお金 -->
            <div class="expenses">
                <div class="textfield-label">食費</div>
                <div style="display:flex;align-items:center">
                    <v-text-field v-model="dayExpenses" color="#E0E0E0" dense outlined flat solo />
                    <div class="expenses-unit">円</div>
                </div>
            </div>
            <!-- 食べたもの -->
            <v-expansion-panels style="height:250px" flat>
                <v-expansion-panel>
                    <v-expansion-panel-header style="padding:10px !important" class="textfield-label">食事も記録しておく</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="meals">
                            <div style="display:flex;align-items:baseline; flex-direction:column;justify-contents:space-between">
                                <div style="display:flex;align-items:baseline;">
                                    <div class="meal-unit">朝: </div>
                                    <v-text-field style="padding-right:10px;" color="#E0E0E0" dense outlined flat solo />
                                </div>
                                <div style="display:flex;align-items:baseline">
                                    <div class="meal-unit">昼: </div>
                                    <v-text-field style="padding-right:10px;" color="#E0E0E0" dense outlined flat solo />
                                </div>
                                <div style="display:flex;align-items:baseline">
                                    <div class="meal-unit">夜: </div>
                                    <v-text-field style="padding-right:10px;" color="#E0E0E0" dense outlined flat solo />
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
            <div id="register_expenses">
                <v-btn @click="postRequest" color="#FFD600" elevation="0" width="100%" height="50">
                    <div id="register_button_label"><v-icon>mdi-cart-arrow-up</v-icon>チャリーン</div>
                </v-btn>
            </div>
        </div>

        <!-- 登録成功時のsnackbar -->
        <v-snackbar class="snackbar" v-model="isSuccessOpen" timeout="2000" right>
            <div style="display:flex;align-items:center">
                <v-icon color="#FFD600">mdi-emoticon-happy-outline</v-icon>
                <div style="font-weight:700;margin-left:5px">{{message}}</div>
            </div>
        </v-snackbar>
        <!-- 登録失敗時のsnackbar -->
        <v-snackbar class="snackbar" v-model="isErrorOpen" timeout="2000" right color="#EF5350">
            <div style="display:flex;align-items:center">
                <v-icon color="white">mdi-emoticon-cry-outline</v-icon>
                <div style="font-weight:700;margin-left:5px">{{message}}</div>
            </div>
        </v-snackbar>
    </v-app>
</template>

<script lang="ts">
import { defineComponent, inject, computed, ref, watch, reactive, toRefs } from '@vue/composition-api';
import ExpensesKey from './expenses-key';
import { ExpensesStore } from '../../store/expenses';
import { getByDate, post, update } from '../../apis/expensesApi';

import { FoodStaffUnit } from '../../types/foodStaffTypes';
import { Expenses, SnackbarState } from '../../types/expensesTypes';

export default defineComponent({
    setup() {
        const expensesStore = inject<ExpensesStore>(ExpensesKey);

        if(!expensesStore) {
            throw new Error(`${ExpensesKey} is not provided...`);
        }

        const today = new Date();
        const month = ref<number>(today.getMonth() + 1);
        const date = ref<number>(today.getDate());

        const dayExpenses = ref<number>(0);

        const snackbarState = reactive<SnackbarState>({
            isSuccessOpen: false,
            isErrorOpen: false,
            message: ''
        });

        const closeSnackbar = () => {
            snackbarState.isSuccessOpen = false;
            snackbarState.isErrorOpen = false;
            snackbarState.message = '';
        };

        watch(() => [expensesStore.month, expensesStore.date, expensesStore.dayExpenses], (newStore) => {
            month.value = (month.value !== newStore[0]) ? newStore[0] : month.value;
            date.value = newStore[1];
            dayExpenses.value = newStore[2];
        });

        const searchUpdateTargetDate = (dayExpenses: Expenses) => {
            const updatedMonthlyExpenses = expensesStore.monthlyExpenses.splice(0);
            const targetDate = new Date(dayExpenses.targetDate).getDate();
            updatedMonthlyExpenses.forEach(week => {
                week.forEach(day => {
                    if(day.date === targetDate) {
                        day.cost = dayExpenses.cost;
                    }
                });
            });
            return updatedMonthlyExpenses;
        }

        const postRequest = () => {
            if(dayExpenses.value.toString() === '' || month.value.toString() === '' || date.value.toString() === '') {
                snackbarState.isErrorOpen = true;
                snackbarState.message = '未入力の項目があります';
                return;
            }
            let targetDate = new Date();
            // Date()では実際の月より+1されるためここで引いておく
            targetDate.setMonth(month.value - 1);
            targetDate.setDate(date.value);
            const requestBody: Partial<Expenses> = {
                targetDate: targetDate,
                cost: dayExpenses.value
            };
            getByDate(targetDate).then(res => {
                if(res.data) {
                    const targetId = (res.data as Expenses).id;
                    // PUT
                    update(targetId, requestBody).then((res) => {
                        const updateedMonthlyExpenses = searchUpdateTargetDate(res.data as Expenses);
                        expensesStore.setMonthlyExpenses(updateedMonthlyExpenses);
                        snackbarState.isSuccessOpen = true;
                        snackbarState.message = "登録が完了しました";
                    });
                } else {
                    // POST
                    post(requestBody).then((res) => {
                        const updatedMonthlyExpenses = searchUpdateTargetDate(res.data as Expenses);
                        expensesStore.setMonthlyExpenses(updatedMonthlyExpenses);
                        snackbarState.isSuccessOpen = true;
                        snackbarState.message = "登録が完了しました";
                    });
                }
            });
        }

        return {
            month,
            date,
            dayExpenses,
            postRequest,
            ...toRefs(snackbarState),
            closeSnackbar
        }
    }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&display=swap');

.v-text-field >>> input {
    color: #616161 !important;
    font-weight: 700;
    font-size: 18px;
    text-align: right;
}

.expenses_register {
    font-family: 'M PLUS Rounded 1c', sans-serif;
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