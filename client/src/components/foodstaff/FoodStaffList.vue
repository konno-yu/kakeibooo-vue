<template>
    <div>
        <slot v-bind="slotProps" />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import FoodStaffListItem from '@/components/foodstaff/FoodStaffListItem.vue';
import { FoodStaff } from '../../types/foodStaffTypes';

type Props = {
    listItems: FoodStaff[]
}

export default defineComponent({
    components: {
        FoodStaffListItem
    },
    props: {
        listItems: {
            type: Array as () => FoodStaff[],
            required: true
        }
    },
    setup(props: Props) {
        const slotProps = computed(() => {
            return {
                listItems: props.listItems
            }
        });
        return {
            slotProps
        }
    }
});
</script>

<style scoped>
</style>