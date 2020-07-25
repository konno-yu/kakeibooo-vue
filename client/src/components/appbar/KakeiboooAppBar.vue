<template>
    <v-app>
        <div class="appbar-root">
            <div class="title-area">
                <v-icon color="#333333">mdi-cart</v-icon>
                <div class="app-title">Kakeibooo</div>
            </div>
            <div class="tab-area">
                <kakeiboooTab :tabItems="tabItems" v-model="selectedTab">
                    <template slot-scope="{ tabItems, onTabChange, value }">
                        <kakeiboooTabItem
                          v-for="(tabItem, index) in tabItems"
                          :key="index"
                          :tabItem="tabItem"
                          :isSelected="value === tabItem.label"
                          @change="ontabchange"
                        />
                    </template>
                </kakeiboooTab>
            </div>
            <div class="account-area">
                <v-btn color="#333333" icon><v-icon>mdi-bell</v-icon></v-btn>
                <div class="account-avatar">
                    <v-avatar width="30" height="30">
                        <img src="@/assets/fox.svg">
                    </v-avatar>
                </div>
            </div>
        </div>
        <div>
            <ExpensesView v-show="selectedTab === '家計簿'"/>
            <!-- <ExpensesView v-show="selectedTab === '食費管理'"/> -->
            <FoodStaffView v-show="selectedTab === '食材'"/>
        </div>
    </v-app>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import KakeiboooTab from '@/components/common/KakeiboooTab.vue';
import KakeiboooTabItem from '@/components/common/KakeiboooTabItem.vue';
import { AppbarTabCategory } from '../../types/commonTypes';
import FoodStaffView from '@/views/FoodStaffView.vue';
import ExpensesView from '@/views/ExpensesView.vue';

type HeaderType = {
    appTitle: string,
    selectedTab: AppbarTabCategory
};

type TabItemType = {
    label: AppbarTabCategory
};

export default defineComponent({
    components: {
        KakeiboooTab,
        KakeiboooTabItem,
        ExpensesView,
        FoodStaffView
    },

    setup() {
        const headerItem = reactive<HeaderType>({
            appTitle: "Kakeibooo",
            selectedTab: "家計簿"
        });
        const tabItems = reactive<TabItemType[]>([
            { label: "家計簿" },
            { label: "食費" },
            { label: "食材" }
        ]);

        function ontabchange(selected: AppbarTabCategory) {
            headerItem.selectedTab = selected;
        }

        return {
            ...toRefs(headerItem),
            tabItems,
            ontabchange
        }
    }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&display=swap');
.appbar-root {
    font-family: 'M PLUS Rounded 1c', sans-serif;
    height: 60px;
    width: 100%;
    background: #F7D65A;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.title-area {
    width: 15%;
    height: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.app-title {
    color: #333333;
    font-weight: 800;
    font-size: 24px;
}

.tab-area {
    width: 65%;
    height: 100%;
    padding: 10px 20px 10px 20px;
    display: flex;
    align-items: center;
    border-left: 2px dashed #333333;
}

.account-area {
    width: 20%;
    height: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.account-avatar {
    width: 40px;
    height: 40px;
    border-radius: 80px;
    background: #333333;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>