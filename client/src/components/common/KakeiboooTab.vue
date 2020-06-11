<template>
    <div class="kakeibooo_tab">
        <slot v-bind="slotProps" />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import KakeiboooTabItem from '@/components/common/KakeiboooTabItem.vue';
import { AppbarTabCategory, FoodStaffSubCategoryLabel } from '../../consts';

type TabItem = {
    label: string,
    icon: string
}

type Props = {
    tabItems: TabItem[],
    value: AppbarTabCategory;
}

export default defineComponent({
    components: {
        KakeiboooTabItem
    },
    props: {
        tabItems: {
            type: Array as () => TabItem[],
            required: true
        },
        value: {
            type: String as () => AppbarTabCategory,
            required: true
        }
    },
    setup(props: Props, context) {
        const slotProps = computed(() => {
            return {
                tabItems: props.tabItems,
                value: props.value,
                ontabchange: ontabchange
            }
        });

        /**
         * 選択中のタブを切り替え
         */
        const ontabchange = (selected: AppbarTabCategory) => {
            context.emit('change', selected);
        };
        return {
            slotProps,
            ontabchange
        }
    }
});
</script>

<style scoped>
.kakeibooo_tab {
    width: 100%;
    height: 100%;
}
</style>
