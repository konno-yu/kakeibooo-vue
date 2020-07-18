<template>
    <div class="kakeibooo_tab">
        <slot v-bind="slotProps" />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import KakeiboooTabItem from '@/components/common/KakeiboooTabItem.vue';
import { AppbarTabCategory, KakeiboooTabItemType } from '../../types/commonTypes';
import { FoodStaffSubCategoryLabel } from '../../types/foodStaffTypes';

type KakeiboooTabProps = {
    tabItems: KakeiboooTabItemType[],
    value: AppbarTabCategory;
}

export default defineComponent({
    components: {
        KakeiboooTabItem
    },
    props: {
        tabItems: {
            type: Array as () => KakeiboooTabItemType[],
            required: true
        },
        value: {
            type: String as () => AppbarTabCategory,
            required: true
        }
    },
    setup(props: KakeiboooTabProps, context) {
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
