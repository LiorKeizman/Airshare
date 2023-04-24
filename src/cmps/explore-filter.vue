<template>
  <div class="search-wrapper flex">
    <div v-show="!isExpend" data-expend="expend" @click.prevent="expendForm(true)"
      class="filter-preview flex align-center">
      <div ref="myAnywhere" class="filter btn header-location" @click="openMap">Anywhere</div>
      <div ref="myAnyweek" class="filter btn header-time">Any week</div>
      <div ref="myWho" class="filter btn header-guests search guest-pad" value="hellow">Add guests
        <span class="search"><img src="../assets/icons/search-icon.svg" /></span>
      </div>
    </div>
    <div v-show="isExpend" class="filter-expend flex">
      <div class="filter-background" @click="exitAll"></div>
      <el-form @click="(isClicked = true)" :class="{ 'bgc': isExpend ? isClicked : !isClicked }" :model="filterBy">
        <div @click="activeTab('where')" class="filter-option where" data-field="where"
          :class="{ 'active-btn': isExpend ? isActive : !isActive }">
          <label for="where">Where</label>

          <input id="where" list="where" name="where" v-model="filterBy.where" placeholder="Search destinations" />
          <explore-maps v-if="isActive" v-click-away="onClickAway" @filterByMap="setFilter" />

        </div>
        <div class="filter-option check">
          <div class="labels-wrap">
            <v-date-picker color="gray" trim-weeks is-expanded mode="date" :columns="$screens({ default: 1, lg: 2 })"
              :rows="1" v-model="filterBy.date" is-range @dayclick="sendDate">
              <template v-slot="{ inputValue, inputEvents }">
                <div class="flex justify-center items-center">
                  <div  @click.native="activeTab('checkin')" class="checkin" data-field="checkin"
                    :class="{ 'hover-btn': isExpend ? isHover : !isHover, 'active-btn': startActive }">
                    <label for="checkin">Check in</label>
                    <!-- <date-picker :placeholder="getCheckinDate" @input="renderDates($event)" v-model="checkinDate" range></date-picker> -->
                    <input name="checkin" :value="inputValue.start" v-on="inputEvents.start" placeholder="Add dates"
                      class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300" />
                  </div>
                  <span class="sep"></span>

                  <div :class="{ 'active-btn': endActive }" class="checkout " @click.native="activeTab('checkout')">
                    <label for="checkout">Check out</label>
                    <input name="checkout" :value="inputValue.end" v-on="inputEvents.end" placeholder="Add dates"
                      class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300" />
                  </div>
                </div>
                <!-- <span class="sep"></span> -->
              </template>
            </v-date-picker>
            <!-- <label class="main-search-label" @click="openModal()">
            <span>Check in</span>
            <date-picker
              :placeholder="getCheckinDate"
              @input="renderDates($event)"
              v-model="checkinDate"
              range
            ></date-picker>
          </label>
          <label class="main-search-label" @click="openModal()">
            <span>Check out</span>
            <input
              :placeholder="getCheckoutDate"
              v-model="checkoutDate"
              ref="myDatePicker"
              range
            />
          </label> -->
          </div>
        </div>
        <div @click.native="activeTab('guest')" class="filter-option guest-dropdown"
          :class="{ 'active-btn': guestActive }">
          <div @click="dropDownMenu($event)" class="add-guest-wrapper">
            <label for="add-guest">Who</label>
            <input disabled type="text" data-field="guest" placeholder="Add guests" :value="guestsNum" />
          </div>

          <div @click="formSubmit" class="order-container header-filter-search">
            <div class="btn-container on-filter">
              <!-- <gardient-btn>

              </gardient-btn> -->

              <div v-for="i in 100" class="cell"></div>

              <div class="content filter-content">
                <button class="action-btn">
                  <div class="material-icons search"> search </div>
                  <span>Search</span>
                </button>

              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>

  <div v-if="showModal" v-click-away="onClickAway" class="guests-modal dropdown-card order-container">
    <div class="row-card flex">
      <div class="lft-crd">
        <span class="title-sm"> Adults</span>
        <span class="txt-sm">Ages 13 or above</span>
      </div>
      <div class="rit-crd guests-btns">
        <button @click.stop="updateGuests('adults', -1)">
          <span> - </span>
        </button>
        <span class="guests-count">{{ filterBy.guests.adults }}</span>
        <button @click.stop="updateGuests('adults', 1)">
          <span> + </span>
        </button>
      </div>

    </div>
    <div class="row-card flex">
      <div class="lft-crd">
        <span class="title-sm"> Children</span>
        <span class="txt-sm">Ages 2–12</span>
      </div>
      <div class="rit-crd guests-btns">
        <button @click.stop="updateGuests('children', -1)">
          <span> - </span>
        </button>
        <span class="guests-count">{{ filterBy.guests.children }}</span>
        <button @click.stop="updateGuests('children', 1)">
          <span> + </span>
        </button>
      </div>
    </div>

    <div class="row-card flex">
      <div class="lft-crd">
        <span class="title-sm"> Infants</span>
        <span class="txt-sm">Under 2</span>
      </div>
      <div class="rit-crd guests-btns">
        <button @click.stop="updateGuests('infants', -1)">
          <span> - </span>
        </button>
        <span class="guests-count">{{ filterBy.guests.infants }}</span>
        <button @click.stop="updateGuests('infants', 1)">
          <span> + </span>
        </button>
      </div>
    </div>
    <div class="row-card flex">
      <div class="lft-crd">
        <span class="title-sm"> Pets</span>
        <span class="txt-sm animal">Bringing a service animal?</span>
      </div>
      <div class="rit-crd guests-btns">
        <button @click.stop="updateGuests('pets', -1)">
          <span> - </span>
        </button>
        <span class="guests-count">{{ filterBy.guests.pets }}</span>
        <button @click.stop="updateGuests('pets', 1)">
          <span>+</span>
        </button>
      </div>
    </div>
  </div>
  <!-- 
    <section class="mobile-header">
      <div ">
        <div class="">
          <img
            class="search-icon"
            src=""
          />
        </div>
          <dynamic-modal  />
      </div>
    </section> -->

  <!-- <section class="mobile-nav">
      <div class="mobile-option">
        <img src= "" />
        <span  >Explore</span>
      </div>
      <div class="mobile-option">
        <img src= ""  />
        <span>Wishlists</span>
      </div>
      <div class="mobile-option">
        <img src= "" />
        <span>Trips</span>
      </div>
           <div class="mobile-option">
        <img src= "" />
        <span>Profile</span>
        <login/>
      </div>
    </section> -->
</template>

<script>
import { eventBus } from '../services/event-bus.service';
// import gardientBtn from "../cmps/gardient-btn.vue";
import exploreMaps from './filter-map.vue';


export default {
  emits: ['expendForm'],
  name: 'explore-filter',
  props: {
    isExpend: Boolean,
  },
  data() {
    return {
      isClicked: false,
      guestsNum: '',
      filterBy: {
        where: '',
        date: [],
        guests: {
          adults: 0,
          children: 0,
          infants: 0,
          pets: 0,
        },
        //       colorDate: {
        // color: 'orange',
        // fillMode: 'light',
        //       },
        //       attrs: [
        //       {
        //         key: 'today',
        //         highlight: 'red',
        //         dates: new Date(),
        //       },
        //     ],
      },
      monthNames: ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"],

      showModal: false,
      isShow: false,
      isActive: true,
      isHover: true,
      currentActive: false,
      guestActive: false,
      startActive: false,
      endActive: false,
      expend: this.isExpend,
      firstClick: null,
    };
  },
  computed:{
    openMap(){
      this.isActive = true;
      this.isClicked = true
    }
  },
  methods: {
    sendDate(day){
      eventBus.emit('dayPicked', day);
    },
    // renderDates(event) {
    //   this.checkinDate = `${new Date(event[0]).getDate()}/${
    //     new Date(event[0]).getMonth() + 1
    //   }/${new Date(event[0]).getFullYear()}`;

    //   this.checkoutDate = `${new Date(event[1]).getDate()}/${
    //     new Date(event[1]).getMonth() + 1
    //   }/${new Date(event[1]).getFullYear()}`;
    // },
    // openModal(of) {
    //   this.clickedOn = of;
    //   if (of === "submit") {
    //     if (this.checkinDate && this.checkoutDate) {
    //       const dates = [this.checkinDate, this.checkoutDate];
    //       eventBus.$emit("setDates", dates);
    //       this.checkinDate = "add Dates";
    //       this.checkoutDate = "add Dates";
    //       this.location = "Where are you going?";
    //       this.guests = 0;
    //     }
    //   }
    // },
    exitAll() {
      this.isClicked = false
      this.isActive = false;
      this.startActive = false;
      this.endActive = false;
      this.guestActive = false;
    },
    activeTab(value, ev) {

      if (value === 'where') {
        this.isActive = true;
        this.startActive = false;
        this.endActive = false;
        this.guestActive = false;
      }
      if (value === 'guest') {
        this.isActive = false;
        this.guestActive = true;
        this.startActive = false;
        this.endActive = false;
      }

      if (value === 'checkin') {
        this.isActive = false;
        this.guestActive = false;
        this.startActive = true;
        this.endActive = false;
        this.isHover = false;
      }
      if (value === 'checkout') {
        this.isActive = false;
        this.guestActive = false;
        this.startActive = false;
        this.endActive = true;
      }
    },
    formSubmit() {
      this.isShow = !this.isShow;
      eventBus.emit('overlay', this.isShow);
      eventBus.emit('getFilterStay');
      this.$router.push({ path: '/', query: { ...this.filterBy } });
      this.$store.dispatch({ type: 'setFilter',filterBy: this.filterBy })
      
      // const currentDate1 = this.filterBy.date.start
      // const currentDate2 = this.filterBy.date.end
      // const currentMonth = currentDate1.getMonth();
      // const currentMonthName = this.monthNames[currentMonth];
      // const day1 = currentDate1.getDay()
      // const day2 = currentDate2.getDay()
      
      const myAnywhere = this.$refs.myAnywhere;
      myAnywhere.textContent = this.filterBy.where;
      

      // const myAnyweek = this.$refs.myAnyweek;
      // myAnyweek.textContent = currentMonthName + '' + day1 + - + day2 
      // need to check how to put the search icon in
      // + <img src="../assets/icons/search-icon.svg" />

      const myWho = this.$refs.myWho;
      myWho.textContent = this.guestsNum 
      // + <img src="../assets/icons/search-icon.svg"/>

      this.$emit('expendForm', false);
    },
    expendForm(value) {
      this.firstClick = value;
      this.$emit('expendForm', true);
    },
    showInitModal(ev) {
      this.toggleShowModal();
    },
    dropDownMenu() {
      this.showModal = true;
    },
    
    updateGuests(type, number) {
      if (this.filterBy.guests[type] === 0 && number === -1) return 
      this.filterBy.guests[type] += number;

      let guestsNum = this.filterBy.guests.adults + this.filterBy.guests.children + this.filterBy.guests.infants + this.filterBy.guests.pets
      this.guestsNum = guestsNum + ' guests'

      if (guestsNum >= 1) this.guestsNum = guestsNum + ' guests';
      if (guestsNum === 0) this.guestsNum = 'Add guests'

    },
    toggleShowModal(ev) {
      this.showModal = !this.showModal;
    },
    onClickAway(ev) {
      this.showModal = false;
      if (this.firstClick) {
        this.isActive = true;
        this.firstClick = false;
      } else {
        this.isActive = false;
      }
    },

    setFilter(loc) {
      this.filterBy.where = loc
    }
  },

  created() {
    eventBus.on('closeModal', data => {
      this.showModal = data;
      this.isActive = true;
      this.guestActive = false;
      this.startActive = false;
      this.endActive = false;
      this.isHover = true;
    });
  },

  components: {
    // gardientBtn,
    exploreMaps
  },
};
</script>
