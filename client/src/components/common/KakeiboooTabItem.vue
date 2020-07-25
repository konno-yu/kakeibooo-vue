<template>
    <v-btn
        :ripple="{ class: 'white--text' }"
        :class="{ 'active-tab': isSelected }"
        @click="tabClick"
        width="120"
        height="100%"
        elevation="0"
        tile
        text
    >
        <div :class="{ 'active_category': isSelected }" class="tab-category">
            {{tabItem.label}}
        </div>
    </v-btn>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { AppbarTabCategory } from '../../types/commonTypes';
import { FoodStaffSubCategoryLabel } from '../../types/foodStaffTypes'

type TabItem = {
    label: AppbarTabCategory | FoodStaffSubCategoryLabel,
    icon?: string
}

type KakeiboooTabItemProps = {
    tabItem: TabItem,
    isSelected: boolean
}

export default defineComponent({
props: {
        tabItem: {
            type: Object as () => TabItem,
            required: true
        },
        isSelected: {
            type: Boolean,
            required: true
        }
    },
    setup(props: KakeiboooTabItemProps, context) {
        const tabClick = () => {
            context.emit('change', props.tabItem.label);
        };
        return {
            tabClick
        }
    }
});
</script>

<style scoped>
.tab-category {
    color: #333333;
    font-weight: 700;
    font-size: 18px;
    display: flex;
}

.active-tab {
    border-bottom: 3px solid #333333 !important;
}
</style>