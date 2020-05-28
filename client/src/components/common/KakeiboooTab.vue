<template>
    <div class="kakeibooo_tab">
        <slot v-bind="slotProps" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

import KakeiboooTabItem from '@/components/common/KakeiboooTabItem.vue';
import { AppbarTabCategory } from '../../consts';

@Component({
    components: {
        KakeiboooTabItem
    }
})
export default class KakeiboooTab extends Vue {
    // 全てのタブ要素
    @Prop({required: true, default: []})
    private tabItems!: {label: AppbarTabCategory, icon: string}[];
    // 選択中のタブのラベル名
    @Prop({required: true, default: ''})
    private value!: AppbarTabCategory;

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
    ontabchange(selected: AppbarTabCategory) {
        this.$emit('change', selected);
    }
}
</script>

<style scoped>
.kakeibooo_tab {
    width: 100%;
    height: 100%;
}
</style>
