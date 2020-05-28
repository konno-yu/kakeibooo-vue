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
                        <template slot-scope="{listItems, onclick}">
                        <FoodStaffListItem
                            v-for="(listItem, index) in fridgeTop"
                            :key="index"
                            :listItem="listItem"
                            @click="onclick"
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
                    </div>
                    <div class="food_staff_list_with_tab">
                        <FoodStaffList :listItems="fridgeBottom">
                            <template slot-scope="{listItems, onclick}">
                            <FoodStaffListItem
                                v-for="(listItem, index) in fridgeBottom"
                                :key="index"
                                :listItem="listItem"
                                @click="onclick"
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
                            <template slot-scope="{listItems, onclick}">
                            <FoodStaffListItem
                                v-for="(listItem, index) in seasoning"
                                :key="index"
                                :listItem="listItem"
                                @click="onclick"
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
                            <template slot-scope="{listItems, onclick}">
                            <FoodStaffListItem
                                v-for="(listItem, index) in preserved"
                                :key="index"
                                :listItem="listItem"
                                @click="onclick"
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
import { Vue, Component, Prop } from 'vue-property-decorator';
import FoodStaffList from '@/components/foodstaff/FoodStaffList.vue';
import FoodStaffListItem from '@/components/foodstaff/FoodStaffListItem.vue';
import KakeiboooTab from '@/components/common/KakeiboooTab.vue';
import KakeiboooTabItem from '@/components/common/KakeiboooTabItem.vue';
import {FoodStaffSubCategoryLabel, FoodStaffSubCategory, FoodStaffDetails } from '../../consts';
import axios from 'axios';

@Component({
    components: {
        FoodStaffList,
        FoodStaffListItem,
        KakeiboooTab,
        KakeiboooTabItem
    }
})
export default class FoodStaffRecorder extends Vue {
    private value: FoodStaffSubCategoryLabel = '野菜';

    private tabItems: {label: FoodStaffSubCategoryLabel, icon: string}[] = [
        {label: '野菜', icon: 'mdi-corn'},
        {label: '残りもの', icon: 'mdi-diamond-stone'},
        {label: 'その他', icon: 'mdi-flower'}
    ];

    private fridgeTop: FoodStaffDetails[] = [];
    private fridgeBottom: FoodStaffDetails[] = [];
    private seasoning: FoodStaffDetails[] = [];
    private preserved: FoodStaffDetails[] = [];

    private foodStaffSample: FoodStaffDetails[] = [];

     convertNameToValue(): FoodStaffSubCategory {
        if(this.value === '野菜') {
            return 'vegetables';
        } else if(this.value === '残りもの') {
            return 'leftovers'
        } else {
            return 'others';
        }
    }

    async getAllFoodStaffs() {
        await axios.get('http://localhost:3000/foodstaffs').then(res => {
            this.foodStaffSample = res.data;
            const fridgeBottomLabel = this.convertNameToValue();
            this.fridgeTop = this.foodStaffSample.filter(staff => staff.category === 'fridge-top');
            this.fridgeBottom = this.foodStaffSample.filter(staff => staff.category === 'fridge-bottom' && staff.subCategory === fridgeBottomLabel);
            this.seasoning = this.foodStaffSample.filter(staff => staff.category === 'seasoning');
            this.preserved = this.foodStaffSample.filter(staff => staff.category === 'preserved');
        });
    }

    mounted() {
        this.getAllFoodStaffs();
    }

    /**
     * 選択中のタブを切り替え
     */
    ontabchange(selected: FoodStaffSubCategoryLabel) {
        this.value = selected;
        this.fridgeBottom = this.foodStaffSample.filter(staff => staff.subCategory === this.convertNameToValue());
    }

    onclick(seleced: string) {
    }
}
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