<template>
    <v-btn
        :ripple="{ class: 'white--text' }"
        :class="{'active_tab': isSelected}"
        @click="tabClick"
        width="33%"
        height="100%"
        elevation="0"
        tile text
    >
        <div :class="{'active_category': isSelected}" class="tab_category">
            <v-icon class="tab_icon">{{tabItem.icon}}</v-icon>
            {{tabItem.label}}
        </div>
    </v-btn>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { AppbarTabCategory } from '../../types/commonTypes';
import { FoodStaffSubCategoryLabel } from '../../types/foodStaffTypes';

type TabItem = {
    label: AppbarTabCategory | FoodStaffSubCategoryLabel,
    icon: string
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
})
</script>

<style scoped>
.tab_item {
    width: 30%;
    border-bottom: 3px solid #FFFFFF;
}
.tab_category {
    color: #616161;
    font-weight: 700;
    font-size: 18px;
    display: flex;
}
.tab_icon {
    margin-right: 5px;
}
.active_tab {
    border-bottom: 3px solid #FFD600 !important;
}
.active_category {
    color: #FFD600;
}
</style>
