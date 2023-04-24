<template>
    <section class="stay-filter">
        <div class="slider-demo-block">
            <el-slider v-model="filterBy.range" @change="show" range :max="1000" />
        </div>
        <h2>Rooms and Beds</h2>
        <h3>BedRooms</h3>

        <div class="el-radio-group" role="radiogroup" aria-label="radio-group">
            <el-radio-button label="House" />
            <el-radio-button label="Hotel" />
            <el-radio-button label="Cabin" />
        </div>
        <h3>Beds</h3>
        <div class="el-radio-group" role="radiogroup" aria-label="radio-group">
            <label class="el-radio-button">
                <input v-model="filterBy.beds" type="radio" @change="show" class="el-radio-button__original-radio"
                    value="0">
                <span class="el-radio-button__inner">Any</span>
            </label>
            <label class="el-radio-button">
                <input v-model="filterBy.beds" type="radio" @change="show" class="el-radio-button__original-radio"
                    value="1">
                <span class="el-radio-button__inner">1</span>
            </label>
            <label class="el-radio-button">
                <input v-model="filterBy.beds" type="radio" @change="show" class="el-radio-button__original-radio"
                    value="2">
                <span class="el-radio-button__inner">2</span>
            </label>
            <label class="el-radio-button">
                <input v-model="filterBy.beds" type="radio" @change="show" class="el-radio-button__original-radio"
                    value="3">
                <span class="el-radio-button__inner">3</span>
            </label>
        </div>
        <h3>Type</h3>
        <el-radio-group v-model="filterBy.type" size="large">
            <el-radio-button label="House" />
            <el-radio-button label="Hotel" />
            <el-radio-button label="Cabin" />
        </el-radio-group>
        <h3>Amenities</h3>
        <el-checkbox-group v-model="filterBy.amenities">
            <el-checkbox label="TV" />
            <el-checkbox label="Wifi" />
            <el-checkbox label="Kitchen" />
            <el-checkbox label="Smoking allowed" />
            <el-checkbox label="Pets allowed" />
            <el-checkbox label="Cooking basics" />
        </el-checkbox-group>
        <button @click="setFilter">Save</button>
    </section>
</template>
  
<script>
export default {
    name: 'stay-filter',
    data() {
        return {
            filterBy: {
                range: [0, 1],
                rooms: 0,
                beds: 0,
                type: '',
                amenities: [],
            },

        }
    },
    methods: {
       
     
        
        setFilter() {
            this.$emit('setFilter', { ...this.filterBy })
        },
    },
    computed: {

    },
    components: {
        //   multiSelect
    }
}
</script>
<style>
.slider-demo-block {
    display: flex;
    align-items: center;
}

.slider-demo-block .el-slider {
    margin-top: 0;
    margin-left: 12px;
}
</style>
  