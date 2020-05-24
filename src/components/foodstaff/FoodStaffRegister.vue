<template>
    <v-app>
        <div class="food_staff_register">
            <!-- 買った品名 -->
            <div class="bought_food">
                <div class="bought_food_label">買ったもの</div>
                <div><v-text-field color="#E0E0E0" dense outlined flat solo /></div>
            </div>
            <!-- 買った個数-->
            <div class="bought_food">
                <div class="bought_food_label">個数</div>
                <div id="bought_food_count">
                    <div class="food_count"><v-text-field color="#E0E0E0" dense outlined solo flat clearable /></div>
                    <div class="food_unit">
                        <v-select
                            style="color: 'white"
                            item-color="yellow accent-4"
                            v-model="model"
                            :items="items"
                            color="#E0E0E0"
                            dense
                            outlined
                            solo
                            flat
                        />
                    </div>
                </div>
            </div>
            <div id="preserve_place_selection">
                <div class="bought_food_label">保存場所</div>
                <!-- 保存場所（大分類）-->
                <div id="large_class_selection">
                    <v-btn-toggle v-model="largeClassSelection" background-color="#FAFAFA" color="#FFD600" mandatory>
                        <v-btn><v-icon color="#616161">mdi-fridge-top</v-icon></v-btn>
                        <v-btn><v-icon color="#616161">mdi-fridge-bottom</v-icon></v-btn>
                        <v-btn><v-icon color="#616161">mdi-shaker-outline</v-icon></v-btn>
                        <v-btn><v-icon color="#616161">mdi-noodles</v-icon></v-btn>
                    </v-btn-toggle>
                </div>
                <!-- 保存場所（小分類）-->
                <div v-show="largeClassSelection === 1" id="small_class_selection">
                    <v-btn-toggle v-model="smallClassSelection" background-color="#FAFAFA" color="#FFD600">
                        <v-btn><v-icon color="#616161">mdi-corn</v-icon></v-btn>
                        <v-btn><v-icon color="#616161">mdi-diamond-stone</v-icon></v-btn>
                        <v-btn><v-icon color="#616161">mdi-flower</v-icon></v-btn>
                    </v-btn-toggle>
                </div>
            </div>
            <!-- 登録ボタン -->
            <div id="register_food_staff">
                <v-btn color="#FFD600" elevation="0" width="100%" height="50">
                    <div id="register_button_label">食材を登録!</div>
                </v-btn>
            </div>
        </div>
    </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop} from 'vue-property-decorator';

import { FoodCountUnit } from '@/consts';

@Component({})
export default class FoodStaffRegister extends Vue {
    private model: FoodCountUnit = '個';
    private items: FoodCountUnit[] = ['個', '本', '袋', '束', '缶', 'g', 'ml'];
    private largeClassSelection: number = 0;
    private smallClassSelection: number = 1;
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&display=swap');

.food_staff_register {
    font-family: 'M PLUS Rounded 1c', sans-serif;
}

.v-text-field >>> input {
    color: #616161 !important;
    font-weight: 700;
    font-size: 18px;
}
.bought_food {
    height: 110px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.bought_food_label {
    margin-bottom: 5px;
    font-weight: 700;
    color: #9E9E9E;
    font-size: 18px;
}
#bought_food_count {
    display: flex;
    justify-content: space-evenly;
}
.food_count {
    width: 65%;
}
.food_unit {
    width: 35%;
    margin-left: 10px;
}
#preserve_place_selection {
    height: 250px;
    padding: 10px;
    display: flex;
    flex-direction: column;
}
#large_class_selection {
    margin: 10px 0px;
}
#small_class_selection {
    margin: 10px 0px;
    padding: 10px 0px;
}
#register_food_staff {
    height: 100px;
    text-align: center;
    display: flex;
    align-items: center;
    margin: 10px;
}
#register_button_label {
    font-size: 24px;
    font-weight: 700;
    color: #FFFFFF;
}
</style>