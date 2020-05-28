<template>
    <div>
        <slot v-bind="slotProps" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import FoodStaffListItem from '@/components/foodstaff/FoodStaffListItem.vue';
import { FoodStaffDetails } from '../../consts';

@Component({
    components: {
        FoodStaffListItem
    }
})
export default class FoodStaffList extends Vue {
    @Prop({})
    private listItems!: FoodStaffDetails[];

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