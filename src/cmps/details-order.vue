<template>
  <div v-if="isConfirm" class="order-alert-overlay"></div>

  <section class="order-confirmation-modal" :class="{ showConfirm: isConfirm }">
    <div class="confirmation-details">
      <div class="confirm-title-container">
        <p class="confirm-title">Last step</p>
        <h1 class="confirm-text">Dear Guest,</h1>
        <h1 class="confirm-text">please confirm your trip details. </h1>
      </div>
      <div class="reservation-details-container">
        <div class="trip-details-container flex column">
          <h1 class="reservation-details-title">Reservation details</h1>
          <span class="mini-trip-title">Trip dates:</span>
          <span class="mini-trip-title">Guests:</span>

          <div class="price-details-container flex column">
            <h1 class="mini-trip-title">Price Details</h1>
            <div class="price-per-night flex justify-space-between">
            </div>

            <div class="service flex justify-space-between">
              <h1 class="mini-trip-detail">Service fee</h1>
            </div>
            <div class="total-price flex justify-space-between">
              <h1 class="mini-trip-detail">Total</h1>
            </div>
          </div>
        </div>

        <div class="order-stay-details flex column">
          <img class="order-stay-image" :src="imgOrder">
        </div>

      </div>
      <div class="modal-btns-container" @click="openConfirm">
        <div class="cell"></div>
        <div class="cell"></div>
        <div @click="openConfirm" class="btn-container">
          <div v-for="i in 100" class="cell"></div>
          <div class="content">
            <button type="submit" class="action-btn">
              <span>Confirm</span>
            </button>
          </div>
        </div>

        <div @click="isConfirm = false" class="sign-up-continue go-back">
          <el-button size="large">Back</el-button>
        </div>
      </div>
    </div>
  </section>

  <section class="order-container sticky" :class="{ extended: this.hasCalcPrice }">
    <div class="order-form-header">
      <div class="price">
        <span class="currency">${{ pricePerNight }}</span>
        <span class="night">night</span>
      </div>

      <div class="review-rating">
        <span class="stared">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
            focusable="false" style="display: block; height: 12px; width: 12px; fill: currentcolor;">
            <path
              d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
              fill-rule="evenodd"></path>
          </svg>
          <span>
            {{ calcStarRate }}
          </span> ·
          <span class="reviews-amount">
            {{ reviewsAmount }} reviews
          </span>
        </span>
      </div>
    </div>
    <div class="order-data">
      <v-date-picker color="gray" is-range :columns="2" @dayclick="onDatePicked">
        <template v-slot="{ inputValue, inputEvents }">
          <div class="flex justify-center items-center">
            <div class="date-picker">
              <div class="date-input">
                <label>CHECK-IN</label>
                <input :placeholder="checkIn" :value="inputValue.start" v-on="inputEvents.start"
                  class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300" />
              </div>
              <div class="date-input">
                <label>CHECK-OUT</label>
                <input :placeholder="checkOut" :value="inputValue.end" v-on="inputEvents.end"
                  class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300" />
              </div>
            </div>
          </div>
        </template>
      </v-date-picker>
      <div class="trip-length">
        <span class="night-num">{{this.currDates.daysNum}}</span>
        <span> nights</span>
        <div class="schedule-dates">
          <span class="first-night-date">  {{stayStartDate}}  </span>
          <span class="last-night-date">  {{stayEndDate}}  </span>
        </div>
      </div>
      <div @click="isShow = !isShow" class="guest-input">
        <label>GUESTS
          <div class="expand-order" @click="disableOrderBtn" v-html="orderArrow">
          </div>
        </label>
        <input disabled :value="guestTxt" />
      </div>
    </div>
    <div class="cell"></div>
    <div class="cell"></div>

    <div @click="sendOrder" ref="elOrderBtn" class="btn-container">
      <div v-for="i in 100" class="cell"></div>
      <div class="content">
        <button type="submit" class="action-btn" v-html="btnStatus"></button>
      </div>
    </div>

    <div class="flex column guest-add" v-if="isShow" v-click-away="onClickAway">
      <div class="row-card flex">
        <div class="lft-crd">
          <span class="title-sm"> Adults</span>
          <span class="txt-sm">Ages 13+</span>
        </div>
        <div class="rit-crd adults-btns">
          <button @click.stop="updateGuests('adults', -1)">
            <span> - </span>
          </button>
          <span class="guests-count">{{ this.guestsObj.adults }}</span>
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
        <div class="rit-crd children-btns">
          <button @click.stop="updateGuests('children', -1)">
            <span> - </span>
          </button>
          <span class="guests-count">{{ guestsObj.children }}</span>
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
        <div class="rit-crd infants-btns">
          <button @click.stop="updateGuests('infants', -1)">
            <span> - </span>
          </button>
          <span class="guests-count">{{ this.guestsObj.infants }}</span>
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
        <div class="rit-crd pets-btns">
          <button @click.stop="updateGuests('pets', -1)">
            <span> - </span>
          </button>
          <span class="guests-count">{{ this.guestsObj.pets }}</span>
          <button @click.stop="updateGuests('pets', 1)">
            <span> + </span>
          </button>
        </div>
      </div>
      <div class="flex under-line close-btn">
        <button @click="isShow = !isShow">
          Close
        </button>

      </div>
    </div>
    <div class="error-report" v-html="errorReport"></div>
    <div class="price-section">
      <div class="calming-alert">You won't be charged yet</div>
      <div><span>Base price</span><span>${{ this.priceObj.basePrice.toLocaleString() }}</span></div>
      <div><span>Cleaning fee</span><span> ${{ this.priceObj.CleaningFee.toLocaleString() }}</span></div>
      <div><span>Service fee</span><span> ${{ this.priceObj.serviceFee.toLocaleString() }}</span></div>
      <div><span>Taxes </span><span> ${{ this.priceObj.taxes.toLocaleString() }}</span></div>
      <div class="total-price"><span class="total" >Total</span><span>${{ totalPrice.toLocaleString() }}</span></div>
    </div>
  </section>
</template>
  
<script>

import { svgService } from '../services/svg.service.js';
import { ElMessage } from 'element-plus';
import { utilService } from '../services/util.service.js';
import { eventBus } from '../services/event-bus.service';

export default {
  name: ' order-details',
  props: ['orderStay'],
  data() {
    return {

      currDates: {
        startDay: 0,
        endDay: 0,
        daysNum: 0,
        isFirst: true,
      },
      hasCalcPrice: false,
      priceObj: {
        basePrice: 0,
        CleaningFee: 572 + utilService.getRandomIntInclusive(-70, 70),
        serviceFee: 0,
        taxes: 0,
        priceSum: 0
      },
      isConfirm: false,
      isShow: false,
      guestsObj: {
        adults: 1,
        children: 0,
        infants: 0,
        pets: 0,
      },
      guestTxt: '1 guest',
      error: ''
    };
  },
  components: {
    svgService,
    utilService,
    eventBus
  },
  created() {
    // if(this.loggedinUser._id){
      // this.$store.dispatch({ type: "loadAndWatchUser", userId: this.loggedinUser._id })
    // }
  },
  computed: {
    currUser() {
      return this.$store.getters.watchedUser
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    reviewsAmount() {
      // return this.orderStay.reviews.length
      return (this.orderStay?.reviews?.length) ? this.orderStay.reviews.length : '0'
    },
    pricePerNight() {
      return (this.orderStay?.price) ? this.orderStay.price : '0'
    },
    btnStatus() {
      return (this.currDates.startDay + this.currDates.endDay !== 0) ? '<span>Reserve</span>' : '<span>Check availability</span>';
    },
    orderArrow() {
      return (this.isShow) ? svgService.getSvgIcon('upArrow') : svgService.getSvgIcon('downArrow');
    },
    totalPrice() {
      let sum = this.priceObj.basePrice + this.priceObj.CleaningFee + this.priceObj.taxes
      return sum;
    },
    errorReport() {
      return `<span class="current-errors">${this.error} </span>`
    },
    guestsCount() {
      return 'Add guests';
    },
    checkIn() {
      if (this.currDates.startDay === 0) return "Add date";
      return new Date(this.currDates.startDay).toLocaleDateString()
    },
    checkOut() {
      if (this.currDates.endDay === 0) return "Add date";
      return new Date(this.currDates.endDay).toLocaleDateString()
    },
    calcStarRate(){
      let currRate = 'new'
      if(this.orderStay?.reviews?.length > 0){
        currRate = (this.orderStay.reviews.reduce((acc, review) => acc + parseFloat(review.starRate), 0)/this.orderStay.reviews.length).toFixed(1) ;
      }
      return currRate;
    }, 
    stayStartDate(){
      return (this.currDates?.startDay)? new Date(this.currDates.startDay).toLocaleDateString() + ' - ': ' ';
    },
    stayEndDate(){
      return (this.currDates?.endDay)? new Date(this.currDates.endDay).toLocaleDateString() : ' ';
    },
  },
  methods: {
    calcPayments() {
      if (this.hasCalcPrice) {
        let pricePerDay = (this.guestsObj.adults + this.guestsObj.children) * this.pricePerNight;
        this.priceObj.basePrice = this.currDates.daysNum * pricePerDay;
        this.priceObj.serviceFee = parseFloat(((this.priceObj.basePrice + this.priceObj.CleaningFee) * 1 / 7.05).toFixed(2));
        this.priceObj.taxes = parseFloat(((this.priceObj.basePrice + this.priceObj.CleaningFee + this.priceObj.serviceFee) * 0.07).toFixed(2));
      }
    },
    updateGuests(type, number) {
      switch (type) {
        case 'adults':
          if (number > 0 && this.guestsObj.adults < 8) {
            this.guestsObj.adults += number;
          } else if (number < 0 && this.guestsObj.adults > 1) {
            this.guestsObj.adults += number;
          }
          break;
        case 'children':
          if (number > 0 && this.guestsObj.children < 8) {
            this.guestsObj.children += number;
          } else if (number < 0 && this.guestsObj.children > 0) {
            this.guestsObj.children += number;
          }
          break;
        case 'infants':
          if (number > 0 && this.guestsObj.infants < 5) {
            this.guestsObj.infants += number;
          } else if (number < 0 && this.guestsObj.infants > 0) {
            this.guestsObj.infants += number;
          }
          break;
        case 'pets':
          if (number > 0 && this.guestsObj.pets < 5) {
            this.guestsObj.pets += number;
          } else if (number < 0 && this.guestsObj.pets > 0) {
            this.guestsObj.pets += number;
          }
          break;
        default:
          break;
      }
      (this.guestsObj.adults + this.guestsObj.children === 1) ? this.guestTxt = `1 guest ` : this.guestTxt = `${this.guestsObj.adults + this.guestsObj.children} guests `;
      if (this.guestsObj.infants > 0) this.guestTxt += `, ${this.guestsObj.infants} infants `;
      if (this.guestsObj.pets > 0) this.guestTxt += `, ${this.guestsObj.pets} pets `;
      this.calcPayments();

    },
    onClickAway(event) {
      this.isShow = false;
    },
    sendOrder() {

      let currOrder = {
        createdAt: Date.now(),
        totalPrice: this.totalPrice,
        startDate: this.currDates.startDay,
        endDate: this.currDates.endDay,
        status: 'pending', // empty, pending, approved
        guests: {
          adults: this.guestsObj.adults,
          children: this.guestsObj.children,
          infants: this.guestsObj.infants,
          pets: this.guestsObj.pets
        },
        stay: {
          _id: this.orderStay._id,
          name: this.orderStay.name,
          img: this.orderStay.imgUrls,
          address:this.orderStay.loc.address
        },
        host: {
          id: this.orderStay.host.id,
          imgUrl: this.orderStay.host.pictureUrl,
          fullname: this.orderStay.host.name,
        },
        buyer: {
          _id: this.currUser._id,
          fullname: this.currUser.name,
          imgUrl: this.currUser.imgUrl,
        },
        priceObj: {
          basePrice: this.priceObj.basePrice,
          CleaningFee: this.priceObj.CleaningFee,
          serviceFee: this.priceObj.serviceFee,
          taxes: this.priceObj.taxes,
        },
        msgs: [],
      }
      let order = this.$store.dispatch({ type: "saveOrder", order: currOrder });
      order.then(res => this.$router.push('/payment/' + res._id))
      ElMessage.success('Confirm order!')

    },
    onDatePicked(day) {
      if (this.currDates.isFirst) {
        this.currDates.startDay = new Date(day.id).getTime();
        this.currDates.isFirst = false;
        console.log(this.currDates.startDay)
      } else {
        this.currDates.endDay = new Date(day.id).getTime();
        this.currDates.isFirst = true;
        this.hasCalcPrice = true;
        this.currDates.daysNum = (Math.ceil((this.currDates.endDay - this.currDates.startDay) > 0))? 
        Math.ceil((this.currDates.endDay - this.currDates.startDay)/ 86400000) : '';
        this.calcPayments();
      }

      if (this.currDates.endDay + this.currDates.startDay !== 0) this.error = '';
    },
    openConfirm() {
      (this.currDates.endDay + this.currDates.startDay === 0)? this.error = 'please select dates': sendOrder();
    }
  },
  watch: {
    isShow(newValue, oldValue) {
      if (!newValue) {
        this.$refs.elOrderBtn.classList.value = 'btn-container'
      } else {
        this.$refs.elOrderBtn.classList += ' hidden'
      }
    }
  },
  created(){
    eventBus.on('getDateFromSchedule', this.onDatePicked);
  }
}
</script>
  