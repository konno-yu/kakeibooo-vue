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
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { tabCategory } from '@/components/appbar/KakeiboooAppBar.vue';

@Component({})
export default class KakeiboooTabItem extends Vue {
    // 描画対象のタブ要素
    @Prop({required: true, default: {}})
    tabItem!: {label: tabCategory, icon: string};
    // 対象のタブ要素が選択中がどうか
    @Prop({type: Boolean, required: true})
    isSelected!: boolean;

    /**
     * 選択中のタブを切り替え
     * 親要素（KakeiboooTab）にタブラベルを伝搬させる
     */
    tabClick() {
        this.$emit("change", this.tabItem.label);
    }
}
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
