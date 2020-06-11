<template>
    <div>
        <slot v-bind="slotProps" />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import FoodStaffListItem from '@/components/foodstaff/FoodStaffListItem.vue';
import { FoodStaffDetails } from '../../consts';

type Props = {
    listItems: FoodStaffDetails[]
}

export default defineComponent({
    components: {
        FoodStaffListItem
    },
    props: {
        listItems: {
            type: Array as () => FoodStaffDetails[],
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