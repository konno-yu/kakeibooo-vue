<template>
    <div class="food_staff_recorder">
        <div class="preserved_place_area">
            <!-- 冷凍庫 -->
            <div class="preserved_place_category">
                <div class="preserved_place_label">
                    <v-icon class="preserved_place_icon" color="#616161">mdi-fridge-top</v-icon>
                    冷凍庫
                </div>
                <div class="food_staff_list" style="overflow: scroll;">
                    <FoodStaffList :listItems="fridgeTop">
                        <template slot-scope="{listItems}">
                        <FoodStaffListItem
                            v-for="(listItem, index) in listItems"
                            :key="index"
                            :listItem="listItem"
                        />
                        </template>
                    </FoodStaffList>
                </div>
            </div>
            <!-- 冷蔵庫 -->
            <div class="preserved_place_category">
                <div class="preserved_place_label">
                    <v-icon class="preserved_place_icon" color="#616161">mdi-fridge-bottom</v-icon>
                    冷蔵庫
                </div>
                <div class="food_staff_list" style="overflow: scroll;">
                    <div class="small_category_tab">
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
                    <div class="food_staff_list_with_tab">
                        <FoodStaffList :listItems="fridgeBottom">
                            <template slot-scope="{listItems}">
                            <FoodStaffListItem
                                v-for="(listItem, index) in listItems"
                                :key="index"
                                :listItem="listItem"
                            />
                            </template>
                        </FoodStaffList>
                    </div>
                </div>
            </div>
        </div>
        <div class="preserved_place_area">
                <!-- 調味料 -->
                <div class="preserved_place_category">
                    <div class="preserved_place_label">
                        <v-icon class="preserved_place_icon" color="#616161">mdi-shaker-outline</v-icon>
                        調味料
                    </div>
                    <div class="food_staff_list" style="overflow: scroll;">
                        <FoodStaffList :listItems="seasoning">
                            <template slot-scope="{listItems}">
                            <FoodStaffListItem
                                v-for="(listItem, index) in listItems"
                                :key="index"
                                :listItem="listItem"
                            />
                            </template>
                        </FoodStaffList>
                    </div>
                </div>
                <!-- 保存食 -->
                <div class="preserved_place_category">
                    <div class="preserved_place_label">
                        <v-icon class="preserved_place_icon" color="#616161">mdi-noodles</v-icon>
                        保存食
                    </div>
                    <div class="food_staff_list" style="overflow:scroll;">
                        <FoodStaffList :listItems="preserved">
                            <template slot-scope="{listItems}">
                            <FoodStaffListItem
                                v-for="(listItem, index) in listItems"
                                :key="index"
                                :listItem="listItem"
                            />
                            </template>
                        </FoodStaffList>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, toRefs } from '@vue/composition-api';
import FoodStaffList from '@/components/foodstaff/FoodStaffList.vue';
import FoodStaffListItem from '@/components/foodstaff/FoodStaffListItem.vue';
import KakeiboooTab from '@/components/common/KakeiboooTab.vue';
import KakeiboooTabItem from '@/components/common/KakeiboooTabItem.vue';
import {FoodStaffSubCategoryLabel, FoodStaffSubCategory, FoodStaff } from '../../types/foodStaffTypes';
import axios from 'axios';

import { getAll } from '../../apis/foodStaffApi';

type TabItem = {
    label: FoodStaffSubCategoryLabel,
    icon: string
};
type FoodStaffs = {
    all: FoodStaff[],
    fridgeTop: FoodStaff[],
    fridgeBottom: FoodStaff[],
    seasoning: FoodStaff[],
    preserved: FoodStaff[]
};

export default defineComponent({
    components: {
        FoodStaffList,
        FoodStaffListItem,
        KakeiboooTab,
        KakeiboooTabItem
    },
    setup() {
        const tabState = reactive<{selectedTab: FoodStaffSubCategoryLabel}>({
            selectedTab: '残りもの'
        });
        const tabItems = reactive<TabItem[]>([
            {label: '野菜', icon: 'mdi-corn'},
            {label: '残りもの', icon: 'mdi-diamond-stone'},
            {label: 'その他', icon: 'mdi-flower'}
        ]);
        const subCategoryMap = reactive<{[key: string]: FoodStaffSubCategory}>({
            '野菜': 'vegetables',
            '残りもの': 'leftovers',
            'その他': 'others'
        });
        const foodStaffs = reactive<FoodStaffs>({
            all: [],
            fridgeTop: [],
            fridgeBottom: [],
            seasoning: [],
            preserved: []
        });

        /**
         * 冷蔵庫内の保存場所の名前を値に変換する
         */
        const convertCategoryNameToValue = (): FoodStaffSubCategory => {
            return subCategoryMap[tabState.selectedTab];
        }

        /**
         * 選択中のタブを切り替える
         */
        const ontabchange = (selected: FoodStaffSubCategoryLabel) => {
            tabState.selectedTab = selected;
            foodStaffs.fridgeBottom = foodStaffs.all.filter(staff => staff.subCategory === convertCategoryNameToValue());
        }

        /**
         * SVから食材一覧を取得して保存場所ごとに振り分ける
         */
        onMounted(() => {
            getAll().then(response => {
                foodStaffs.all = response.data;
                foodStaffs.fridgeTop = foodStaffs.all.filter(staff => staff.category === 'fridge-top');
                foodStaffs.fridgeBottom = foodStaffs.all.filter(staff => staff.category === 'fridge-bottom' && staff.subCategory === convertCategoryNameToValue());
                foodStaffs.seasoning = foodStaffs.all.filter(staff => staff.category === 'seasoning');
                foodStaffs.preserved = foodStaffs.all.filter(staff => staff.category === 'preserved');
            })
        });
        return {
            ...toRefs(tabState),
            tabItems,
            subCategoryMap,
            ...toRefs(foodStaffs),
            convertCategoryNameToValue,
            ontabchange,
            onMounted
        }
    }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&display=swap');

.food_staff_recorder {
    font-family: 'M PLUS Rounded 1c', sans-serif;
    display: flex;
    flex-direction: row;
}
.preserved_place_area {
    width: 50%;
    height: 600px; /** 仮おき */
    padding: 10px;
    background: #FAFAFA;
}
.preserved_place_category {
    width: 100%;
    height:50%;
    margin-bottom: 10px;
}
.preserved_place_label {
    font-weight: 700;
    font-size: 24px;
    color: #616161;
    text-align: center;
}
.preserved_place_icon {
    margin-right: 5px;
}
.food_staff_list {
    background: #FFFFFF;
    height: 250px;
    border-radius: 8px;
    border: 3px solid #E0E0E0;
    padding: 5px;
    margin: 0px 10px 10px 10px;
}
.food_staff_list_with_tab {
    height:165px;
    margin-top:10px;
    overflow:scroll;
}
.small_category_tab {
    height: 40px;
    background: #FFFFFF;
}
</style>