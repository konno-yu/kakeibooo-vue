<template>
    <v-app>
        <div class="food_staff_view_root">
            <!-- 買ったもの登録エリア -->
            <div class="register_area">
                <FoodStaffRegister/>
            </div>
            <!-- 冷凍庫/冷蔵庫エリア -->
            <div class="recorder_area">
                <FoodStaffRecorder/>
            </div>
        </div>
    </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import FoodStaffRegister from '@/components/foodstaff/FoodStaffRegister.vue';
import FoodStaffRecorder from '@/components/foodstaff/FoodStaffRecorder.vue';

export default defineComponent({
    components: {
        FoodStaffRegister,
        FoodStaffRecorder
    }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&display=swap');

.food_staff_view_root {
    font-family: 'M PLUS Rounded 1c', sans-serif;
    width: 100%;
    height: 600px; /** 仮おき */
    padding: 10px;
    border-top: 2px solid #E0E0E0;
    display: flex;
    flex-direction: row;
}
.register_area {
    width: 20%;
    height: 600px; /** 仮おき */
    padding: 10px;
    border-right: 2px solid #E0E0E0;
    margin-right: 10px;
}

.recorder_area {
    width:80%;
}
</style>