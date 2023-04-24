<template>
    <form class="form-filter">
        <div class="filter-header">
            <div class="close-filter">
                <button>
                    <span @click="closeModal"><img src="../assets/icons/close-icon.svg"></span>
                </button>
            </div>
            <h2>Filters</h2>
        </div>

        <div class="filter-content">
            <div class="price-filter">
                <h2>Price range</h2>
                <p>The average nightly price is 220$</p>

                <HistogramSlider @change="setRange" @start="startRange" :width="650" :hist-slider-gap="0" :bar-height="60" :bar-width="12"
                   :hideFromTo="true" :bar-radius="0" :line-height="1" :bar-color="'#b0b0b0'" :primary-color="'#b0b0b0'"
                    :label-color="'hidden'" :holder-color="'#b0b0b0'" :handel-color="'#b0b0b0'" :data="data" :min="0"
                    :max="max" />
                <div class="form-inputs">
                    <div class="inner-price">
                        <label for="min">min price</label>
                        <div class="flex form-input">
                            <span>$</span>
                            <input v-model="filterBy.price[0]" type="number" name="min" :min="min" >
                        </div>
                    </div>
                    <div class="between-prices">-</div>
                    <div class="inner-price">
                        <label for="max">max price</label>
                        <div class="flex form-input">
                            <span>$</span>
                            <input v-model="filterBy.price[1]" type="number" name="max" :max="max">
                        </div>
                        <!-- <el-input-number v-model="filterBy.max" :min="min" :max="max" size="small" :controls="false"
                            @change="handleChange" /> -->
                    </div>
                </div>
            </div>



            <div class="rooms-beds-filter">
                <h2>Rooms and beds</h2>
                <h3>Bedrooms</h3>
                <el-radio-group>
                    <label class="el-radio-button">
                        <input v-model="filterBy.bedrooms" type="radio" class="el-radio-button__original-radio"
                            value="0">
                        <span class="el-radio-button__inner any">Any</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.bedrooms" type="radio" class="el-radio-button__original-radio" value="1">
                        <span class="el-radio-button__inner">1</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.bedrooms" type="radio" class="el-radio-button__original-radio" value="2">
                        <span class="el-radio-button__inner">2</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.bedrooms" type="radio" class="el-radio-button__original-radio" value="3">
                        <span class="el-radio-button__inner">3</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.bedrooms" type="radio" class="el-radio-button__original-radio" value="4">
                        <span class="el-radio-button__inner">4</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.bedrooms" type="radio" class="el-radio-button__original-radio" value="5">
                        <span class="el-radio-button__inner">5</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.bedrooms" type="radio" class="el-radio-button__original-radio" value="6">
                        <span class="el-radio-button__inner">6</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.bedrooms" type="radio" class="el-radio-button__original-radio" value="7">
                        <span class="el-radio-button__inner">7</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.bedrooms" type="radio" class="el-radio-button__original-radio" value="8">
                        <span class="el-radio-button__inner">8+</span>
                    </label>
                    <!-- <label v-for="item in 8" class="el-radio-button">
                        <input v-model="filterBy.rooms" type="radio" class="el-radio-button__original-radio"
                            value="item">
                        <span class="el-radio-button__inner">{{ item }}</span>
                    </label> -->
                </el-radio-group>
                <h3>Beds</h3>
                <el-radio-group :fill="'#222222'">
                    <label class="el-radio-button">
                        <input v-model="filterBy.beds" type="radio" class="el-radio-button__original-radio" value="0">
                        <span class="el-radio-button__inner any">Any</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.beds" type="radio" class="el-radio-button__original-radio" value="1">
                        <span class="el-radio-button__inner">1</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.beds" type="radio" class="el-radio-button__original-radio" value="2">
                        <span class="el-radio-button__inner">2</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.beds" type="radio" class="el-radio-button__original-radio" value="3">
                        <span class="el-radio-button__inner">3</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.beds" type="radio" class="el-radio-button__original-radio" value="4">
                        <span class="el-radio-button__inner">4</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.beds" type="radio" class="el-radio-button__original-radio" value="5">
                        <span class="el-radio-button__inner">5</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.beds" type="radio" class="el-radio-button__original-radio" value="6">
                        <span class="el-radio-button__inner">6</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.beds" type="radio" class="el-radio-button__original-radio" value="7">
                        <span class="el-radio-button__inner">7</span>
                    </label>
                    <label class="el-radio-button">
                        <input v-model="filterBy.beds" type="radio" class="el-radio-button__original-radio" value="8">
                        <span class="el-radio-button__inner">8+</span>
                    </label>
                </el-radio-group>
            </div>


            <div class="property-type-filter">
                <h2>Property type</h2>
                <div class="flex">
                    <div @click="setType" class="property-type" :class="setBorder('House')">
                        <div>
                            <img
                                src="https://res.cloudinary.com/ddt1fjmim/image/upload/v1669845855/house_oz9fpr_eljbtg.png">
                            <span>House</span>
                        </div>
                    </div>
                    <div @click="setType" class="property-type" :class="setBorder('Apartment')">
                        <div>
                            <img
                                src="https://res.cloudinary.com/ddt1fjmim/image/upload/v1669845869/Apartment_s5whob_lmgvut.png">
                            <span>Apartment</span>
                        </div>
                    </div>
                    <div @click="setType" class="property-type" :class="setBorder('Guesthouse')">
                        <div>
                            <img
                                src="https://res.cloudinary.com/ddt1fjmim/image/upload/v1669845874/Guesthouse_rxvpqm_znyqbs.png">
                            <span>Guesthouse</span>
                        </div>
                    </div>
                    <div @click="setType" class="property-type" :class="setBorder('Hotel')">
                        <div>
                            <img
                                src="https://res.cloudinary.com/ddt1fjmim/image/upload/v1669845864/Hotel_lywp1t_y3foc7.png">
                            <span>Hotel</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="amenities-filter">
                <div class="amenities-title">
                    <h2>Amenities</h2>
                </div>
                <div class="essentials">
                    <h3>Essentials</h3>
                    <el-checkbox-group v-model="filterBy.amenities">
                        <el-checkbox label="TV" />
                        <el-checkbox label="Wifi" />
                        <el-checkbox label="Kitchen" />
                        <el-checkbox label="Smoking allowed" />
                        <el-checkbox label="Pets allowed" />
                        <el-checkbox label="Cooking basics" />
                    </el-checkbox-group>
                </div>
            </div>
        </div>
        <div class="filter-footer">
            <button>Clear all</button>
            <button @click.stop.prevent="setFilter">Show homes</button>
        </div>
    </form>
</template>

<script>
import HistogramSlider from "vue3-histogram-slider";
import "vue3-histogram-slider/dist/histogram-slider.css";
import { utilService } from "../services/util.service";

export default {
    name: 'filter-modal',
    data() {
        return {
            min: 0,
            max: 1000,
            isActive: false,
            data: [0,29,29,48,48,48,80,80,80,112,112,152,152,184,184,184,198,210,210,210,210,210,210,232,254,256,256,256,264,264,296,296,296,296,296,311,342,342,374,374,374,374,390,390,390,390,390,402,402,402,402,402,402,426,426,426,426,426,426,426,440,440,440,440,440,440,467,467,467,467,467,488,488,488,488,523,523,523,547,547,589,600,615,641,679,704,704,730,730,730,755,755,755,800,800,840,840,840,],
            filterBy: {
                price: [0, 1],
                bedrooms: '0',
                beds: '0',
                type: [],
                amenities: [],
            },

        }
    },
   
    methods: {
        getStays(){
            return this.$store.getters.stays
        },
        
        startRange($event){
            this.filterBy.price[0] = $event.from
            this.filterBy.price[1] = $event.to
        },
        setRange($event) {
            this.filterBy.price[0] = $event.from
            this.filterBy.price[1] = $event.to
        },
        closeModal() {
            this.$emit('onClickAway')
            event.preventDefault()

        },
        setBorder(type) {
            if (this.filterBy.type.includes(type)) {
                return 'active'
            }
        },
        setType(target) {
            this.isActive = !this.isActive
            let type = target.target.innerText
            let filter = this.filterBy.type
            if (filter.includes(type)) {
                let filteredType = filter.filter(item => item !== type)
                this.filterBy.type = filteredType
                return filteredType
            }
            this.filterBy.type.push(type)
        },
        setFilter() {
            this.$emit('setFilter', { ...this.filterBy })
        },
    },
   
    components: {
        HistogramSlider,
    }
}
</script>
