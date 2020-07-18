import { InjectionKey } from "@vue/composition-api";
import { ExpensesStore } from '@/store/expenses';

const ExpensesKey: InjectionKey<ExpensesStore> = Symbol('ExpensesStore');
export default ExpensesKey;