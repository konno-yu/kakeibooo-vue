<template>
    <div class="list_item_root">
        <div class="list_name">{{listItem.staffName}}</div>
        <div class="list_count">{{listItem.staffCount}} {{listItem.unit}}</div>
        <div class="list_action">
            <v-btn @click="onClick" class="list_action_button" color="#FF8A80" elevation="0" height="30" width="75" small>買った！</v-btn>
            <v-btn @click="onClick" class="list_action_button" color="#80CBC4" elevation="0" height="30" width="75" small>使った！</v-btn>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { FoodStaffDetails } from '../../consts';

@Component({})
export default class FoodStaffListItem extends Vue {
    @Prop({})
    listItem!: FoodStaffDetails;

    onClick() {
    }

}
</script>

<style scoped>
.list_item_root {
    padding: 5px;
    color: #616161;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: 1px dashed #E0E0E0;
}
.list_name {
    width: 150px;
}
.list_count {
    width: 100px;
}
.list_action {
    width: 200px;
    display: flex;
    justify-content: space-evenly;
}
.list_action_button {
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 700;
}
</style>