<template>
    <div class="appbar_root">
        <!-- サービスタイトル部分 -->
        <div class="title_area">
            <v-icon large color="#FFD600">mdi-reddit</v-icon>
            <div class="app_title">{{appTitle}}</div>
        </div>
        <!-- メニュータブ部分 -->
        <div class="tab_area">
            <KakeiboooTab :tabItems="tabItems" v-model="selectedTab">
                <template slot-scope="{ tabItems, onTabChange, value }">
                <KakeiboooTabItem
                    v-for="(tabItem, index) in tabItems"
                    :key="index"
                    :tabItem="tabItem"
                    :isSelected="value === tabItem.label"
                    @change="ontabchange"
                />
                </template>
            </KakeiboooTab>
        </div>
        <!-- ユーザアカウント部分 -->
        <div class="account_area">
           <v-avatar width="40" height="40"><img src="@/assets/user_account.png"></v-avatar>
           <div class="avatar_name">{{userName}}のおサイフ</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from '@vue/composition-api';
import KakeiboooTab from '@/components/common/KakeiboooTab.vue';
import KakeiboooTabItem from '@/components/common/KakeiboooTabItem.vue';
import { AppbarTabCategory } from '../../consts';

type HeaderElement = {
    appTitle: string,
    userName: string,
    selectedTab: AppbarTabCategory
};

type TabItem = {
    label: AppbarTabCategory,
    icon: string
}

export default defineComponent({
    components: {
        KakeiboooTab,
        KakeiboooTabItem
    },

    setup(props) {
        const headerElement = reactive<HeaderElement>({
            appTitle: 'KaKeiBooo',
            userName: 'コンノ',
            selectedTab: '家計簿'
        });

        const tabItems = reactive<TabItem[]>([
        {label: '家計簿', icon: 'mdi-square-edit-outline'},
        {label: '食費管理', icon: 'mdi-cart'},
        {label: '食材管理', icon: 'mdi-one-up'}
        ]);

        /**
         * 選択中のタブを切り替え
         */
        const ontabchange = (selected: AppbarTabCategory) => {
            headerElement.selectedTab = selected;
        }

        return {
            ...toRefs(headerElement),
            tabItems,
            ontabchange
        }
    }
})
</script>

<style scoped>
.appbar_root {
    height: 70px;
    width: 100%;
    background: #FFFFFF;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.title_area {
    width: 300px;
    height: 100%;
    display: flex;
    align-items: center;
}
.title_icon {
    height: 40px;
    width: 40px;
}
.app_title {
    color: #FFD600;
    font-weight: 900;
    font-size: 28px;
    margin-left: 5px;
}
.tab_area {
    width: 650px;
    height: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
}
.account_area {
    width: 250px;
    height: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
}
.avatar_name {
    margin-left: 5px;
    font-size: 18px;
    font-weight: 700;
    color: #616161;
}
.tab_area {
    width: 650px;
    height: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
}
</style>
