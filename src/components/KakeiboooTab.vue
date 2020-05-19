<template>
    <div class="tab_area">
        <slot v-bind="slotProps" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

import KakeiboooTabItem from '@/components/KakeiboooTabItem.vue';
import { tabCategory } from '@/components/KakeiboooAppBar.vue';

@Component({
    components: {
        KakeiboooTabItem
    }
})
export default class KakeiboooTab extends Vue {
    // 全てのタブ要素
    @Prop({required: true, default: []})
    private tabItems!: {label: tabCategory, icon: string}[];
    // 選択中のタブのラベル名
    @Prop({required: true, default: ''})
    private value!: tabCategory;

    /**
     * 親要素（KakeiboooAppBar）から送られてくるpropsを取得
     * */
    get slotProps() {
        return {
            tabItems: this.$props.tabItems,
            value: this.$props.value,
            ontabchange: this.ontabchange
        }
    }

    /**
     * 選択中のタブを切り替え
     * 親要素に切り替え後のタブラベルを伝搬させる
     */
    ontabchange(selected: tabCategory) {
        this.$emit('change', selected);
    }
}
</script>

<style scoped>
.tab_root {
    width: 100%;
    height: 100%;
    display: flex;
    /* justify-content: space-between; */
}
.tab_area {
    width: 650px;
    height: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
}
</style>
