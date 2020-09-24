<template>
    <v-app>
        <template>
        <ExpensesProvider>
            <div class="expenses-view-root">
                <!-- 金額入力エリア -->
                <div class="register-area">
                    <ReceiptRegister/>
                </div>
                <!-- カレンダーエリア -->
                <div class="calendar-area">
                    <ExpensesCalendar/>
                </div>
            </div>
        </ExpensesProvider>
        </template>
    </v-app>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from '@vue/composition-api';
import ReceiptRegister from '@/components/expenses/ReceiptRegister.vue';
import ExpensesCalendar from '@/components/expenses/ExpensesCalendar.vue';
import ExpensesProvider from '@/components/expenses/ExpensesProvider.vue';

export default defineComponent({
    components: {
        ReceiptRegister,
        ExpensesCalendar,
        ExpensesProvider
    },
    setup() {
    }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&display=swap');

.expenses-view-root {
    font-family: 'M PLUS Rounded 1c', sans-serif;
    width: 100%;
    height: 600px; /** 仮おき */
    /* border-top: 2px solid #E0E0E0; */
    display: flex;
    flex-direction: row;
    background: #F6F5F3;
}
.register-area {
    width: 500px;
    height: 600px; /** 仮おき */
    /* margin: 10px; */
    /* border-right: 2px solid #E0E0E0; */
    /* margin-right: 10px; */
}

.calendar-area {
    width:100%;
    height: 600px;
    /* padding: 10px; */
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>