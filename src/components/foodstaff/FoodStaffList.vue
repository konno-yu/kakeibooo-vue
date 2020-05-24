<template>
    <div>
        <slot v-bind="slotProps" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import FoodStaffListItem from '@/components/foodstaff/FoodStaffListItem.vue';

@Component({
    components: {
        FoodStaffListItem
    }
})
export default class FoodStaffList extends Vue {
    @Prop({})
    private listItems!: {name: string, count: number, unit:string, category: string, subCategory?:string}[];

    get slotPlops() {
        return {
            listItems: this.$props.listItems,
            onclick: this.onclick
        }
    }

    onclick(selected: string) {
    }
}
</script>

<style scoped>
</style>