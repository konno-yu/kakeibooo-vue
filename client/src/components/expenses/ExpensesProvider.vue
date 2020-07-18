<template>
    <div>
        <slot/>
    </div>
</template>

<script lang="ts">
import { provide } from '@vue/composition-api'
import ExpensesKey from './expenses-key'
import expensesStore from '../../store/expenses'
export default {
    setup() {
        provide(ExpensesKey, expensesStore());
        return{};
    },
}
</script>