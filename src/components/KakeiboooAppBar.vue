<template>
    <div class="appbar_root">
        <!-- サービスタイトル部分 -->
        <div class="title_area">
            <v-icon large color="#FFD600">mdi-reddit</v-icon>
            <div class="app_title">KaKeiBooo</div>
        </div>
        <!-- メニュータブ部分 -->
        <KakeiboooTab :tabItems="tabItems" v-model="value">
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
        <!-- ユーザアカウント部分 -->
        <div class="account_area">
           <v-avatar width="40" height="40"><img src="@/assets/user_account.png"></v-avatar>
           <div class="avatar_name">{{this.userName}}のおサイフ</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import KakeiboooTab from '@/components/KakeiboooTab.vue';
import KakeiboooTabItem from '@/components/KakeiboooTabItem.vue';

export type tabCategory = '家計簿' | '食費管理' | '食材管理';


@Component({
    components: {
        KakeiboooTab,
        KakeiboooTabItem
    }
})
export default class KakeiboooAppBar extends Vue {
    private userName: string = 'コンノ';
    // タブで選択中の要素のラベル
    private value: tabCategory = '家計簿';

    /**
     * 選択中のタブを切り替え
     */
    ontabchange(selected: tabCategory) {
        this.value = selected;
    }

    /**
     * タブ要素一覧を取得
     */
    get tabItems(): {label: tabCategory, icon: string}[] {
        return [
            {label: '家計簿', icon: 'mdi-square-edit-outline'},
            {label: '食費管理', icon: 'mdi-cart'},
            {label: '食材管理', icon: 'mdi-one-up'}
        ];
    };
}
</script>

<style scoped>
.appbar_root {
    height: 90px;
    width: 100%;
    padding: 10px;
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
</style>
