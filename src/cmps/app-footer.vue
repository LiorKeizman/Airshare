<template>
  <section class="app-footer">
    <nav v-if ="!desktop">
      <div class="links-container">
        <a @click="loggedinUser()">
          <span>Stats</span>
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: currentcolor;"><path d="m16 1c8.2842712 0 15 6.71572875 15 15 0 8.2842712-6.7157288 15-15 15-8.28427125 0-15-6.7157288-15-15 0-8.28427125 6.71572875-15 15-15zm0 8c-2.7614237 0-5 2.2385763-5 5 0 2.0143973 1.2022141 3.7998876 2.9996346 4.5835001l.0003231 2.0984999-.1499943.0278452c-2.8326474.5613112-5.31897338 2.2230336-6.93575953 4.5872979 2.34343054 2.291067 5.54974273 3.7028569 9.08579613 3.7028569 3.5355506 0 6.7414538-1.4113884 9.0850203-3.701476-1.6141801-2.3628535-4.0978119-4.0247647-6.929184-4.5867938l-.1558786-.0287302.001228-2.0991413c1.7288399-.7547474 2.9066959-2.4357565 2.9936498-4.355479l.0051645-.2283797c0-2.7614237-2.2385763-5-5-5zm0-6c-7.17970175 0-13 5.82029825-13 13 0 2.9045768.95257276 5.5866683 2.56235849 7.7509147 1.42074739-1.9134907 3.33951478-3.4002416 5.53860831-4.2955956l.3480332-.1363191-.0229565-.0189706c-1.43704227-1.2411241-2.34462949-3.045583-2.42083359-5.0285539l-.00520991-.2714755c0-3.8659932 3.1340068-7 7-7s7 3.1340068 7 7c0 1.9941317-.8415062 3.8279876-2.224566 5.1193683l-.225434.2006317.0447787.0163138c2.3268368.8792152 4.3570558 2.4138611 5.8430586 4.4127726 1.6098837-2.1632453 2.5621627-4.8449575 2.5621627-7.7490864 0-7.17970175-5.8202983-13-13-13z"></path></svg></a>
        <a href="#/wishlist" @click="showMenu = !showMenu">
          <span>Wish</span>
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 24px; width: 24px; stroke: currentcolor; stroke-width: 2.66667; overflow: visible;"><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path></svg></a>
        <a @click="goHome"> 
          <span>Home</span>
          <img src="../assets/img/icons/home.png" alt=""></a>
        <a @click="usersTrips">
          <span>Trips</span>
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: currentcolor;"><path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.709-3.386l-.257-.26-.172-.179h-.011l-.176.185c-2.044 2.1-4.267 3.42-6.414 3.615l-.28.019-.267.006C5.377 31 2.5 28.584 2.5 24.522l.005-.469c.026-.928.23-1.768.83-3.244l.216-.524c.966-2.298 6.083-12.989 7.707-16.034C12.537 1.963 13.992 1 16 1zm0 2c-1.239 0-2.053.539-2.987 2.21l-.523 1.008c-1.926 3.776-6.06 12.43-7.031 14.692l-.345.836c-.427 1.071-.573 1.655-.605 2.24l-.009.33v.206C4.5 27.395 6.411 29 8.857 29c1.773 0 3.87-1.236 5.831-3.354-2.295-2.938-3.855-6.45-3.855-8.91 0-2.913 1.933-5.386 5.178-5.42 3.223.034 5.156 2.507 5.156 5.42 0 2.456-1.555 5.96-3.855 8.907C19.277 27.766 21.37 29 23.142 29c2.447 0 4.358-1.605 4.358-4.478l-.004-.411c-.019-.672-.17-1.296-.714-2.62l-.248-.6c-1.065-2.478-5.993-12.768-7.538-15.664C18.053 3.539 17.24 3 16 3zm.01 10.316c-2.01.021-3.177 1.514-3.177 3.42 0 1.797 1.18 4.58 2.955 7.044l.21.287.174-.234c1.73-2.385 2.898-5.066 2.989-6.875l.006-.221c0-1.906-1.167-3.4-3.156-3.421h-.001z"></path></svg></a>
         
        <a @click="logout" v-if="getLogInUser">
          <span>Logout</span>
          <img src="../assets/img/icons/logout1.png" alt=""></a>
        <a @click="login" v-if="!getLogInUser">
          <span>Login</span>
          <img src="../assets/img/icons/login.png" alt=""></a>
      </div>
    </nav>
    
    <div v-if="desktop" class="container footer flex justify-space-between align-center">

      <div class="left-side flex gap align-center">
        <span>© 2022 Airshare, Inc</span>
        <span>·</span>
        <span>Privacy</span>
        <span>·</span>
        <span>Terms</span>
        <span>·</span>
        <span>Sitemap</span>
      </div>

      <div class="right-side flex gap bold fs14 align-center"> -->
        <!-- <img class="explore-footer" src="../assets/img/icons/global.png" style="height: 15px;"> -->
        <!-- <span>English (US)</span> -->
        <!-- <span>$ USD</span> -->
        <span>Support & resources</span>
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 4; overflow: visible;"><g fill="none"><path d="m4 20 11.2928932-11.29289322c.3905243-.39052429 1.0236893-.39052429 1.4142136 0l11.2928932 11.29289322"></path></g></svg>      </div>

    </div>
  </section>
</template>

<script>
import filterModal from '../cmps/filter-modal.vue'
import exploreFilter from './explore-filter.vue';
import exploreLabels from './search-labels.vue';
import { eventBus } from '../services/event-bus.service.js';

export default {
  data() {
    return {
      isModal: false,
      isShow: false,
      location: false,
      isSticky: false,
      isExpend: false,
      showMenu: false,
      isExplore: false,
      desktop: window.innerWidth > 780 ? true : false,
      path: null,
      country: '',
      staysLength: null
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
    eventBus.on('staysLength', data => {
      this.staysLength = data
    });
    
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  },

  computed: {
    getCurrUser(){
      return this.$store.getters.watchedUser
    },
    getCheckinDate() {
      return this.checkinDate;
    },
    getCheckoutDate() {
      return this.checkoutDate;
    },
    getGuestsAmount() {
      if (!this.guests) return "Add guests";
      return this.guests;
    },
    // toDashboard(){
    //   this.$router.push(`/dashboard/${user.id}`)
    // },
    headerLocation() {
      let { params, path } = this.$route || {};
      this.isExplore = path !== '/';
      this.path = path;
      let isEmpty = Object.keys(params).length === 0;
      return isEmpty;
    },

    userImg() {
      var user = this.$store.getters.loggedinUser;
      return user ? user.imgUrl : 'https://res.cloudinary.com/sprint4-triman/image/upload/v1669793675/elon_mask_ltbtp6.jpg';
    },
    getLogInUser() {
      var user = this.$store.getters.loggedinUser;
      return user ? true : false;
    },
  },

  methods: {
    usersTrips(){
      var user = this.$store.getters.loggedinUser;
      console.log(user)
      this.$router.push(`/trip/${user._id}`)
      this.showMenu = !this.showMenu
    },
    loggedinUser() {
      var user = this.$store.getters.loggedinUser;
      console.log(user)
      this.$router.push(`/dashboard/${user.id}`)
      this.showMenu = !this.showMenu
    },
    setFilter(filterBy) {
      let filter = JSON.parse(JSON.stringify(filterBy))
      this.$router.push({ path: '/', query: { ...filter } });
      this.$store.dispatch({ type: 'setFilter', filter })
    },
    expendForm(value) {
      this.isExpend = value;
    },
    closeModal() {
      this.showMenu = false;
      this.isModal = false;
    },
    logout() {
      this.$store.dispatch({ type: 'logout' });
      this.$router.push("/")
      // this.loggedinUser = null;
      this.showMenu = false;
    },
    goHome() {
      this.$router.push("/")
      this.showMenu = false;
    },
    login() {
      this.$router.push("/login")
      this.showMenu = false;
    },
    async logDemo() {
      const demo = {
        password: 'demo',
        username: 'demo',
      };
      try {
        await this.$store.dispatch({ type: 'login', userCred: demo });
        this.$router.push('/');
        this.showMenu = false;
      } catch (err) {
        console.log(err);
        this.msg = 'Failed to login';
      }
    },
    onClickAway() {
      this.isShow = false;
      // this.showMenu = false;
      this.isExpend = false
    },
    handleScroll(ev) {
      let pos = window.scrollY;
      if (pos === 0) {
        this.isSticky = false;
        this.isExpend = false;
      }

      if (pos > 0) {
        this.isSticky = true;
        this.isShow = false;

        eventBus.emit('overlay', this.isShow);
      }

      if (this.isExpend) {
        this.isExpend = false;
        eventBus.emit('closeModal', this.isExpend);
      }
    },

    handleResize() {
      const width = window.outerWidth;
      if (width > 780) {
        this.desktop = true;
      }
      if (width < 780) {
        this.desktop = false;
      }
    },

    search() {
      let url = `/explore?location=${this.country}`;
      this.$router.push(url);
    },

    searchCountry(value) {
      this.country = value
    },

    showList() {
      this.$store.dispatch({ type: 'setFilter', filterBy: {} })
    }

  },


  watch: {
    isShow: function () {
      if (this.isShow) {
        document.documentElement.style.overflow = 'hidden';
        return;
      }
      document.documentElement.style.overflow = 'auto';
    },
  },

  components: {
    exploreFilter,
    exploreLabels,
    eventBus,
    filterModal
  },
  setup() { },
};
</script>
<style lang="scss" scoped>
</style>


<!-- <template>
  <section class="footer-container home-layout">
    <section class="main-footer">
      <div class="left-nav">

        <span>© 2023 Airshare, inc.</span>
        <span>·</span>
        <span>Privacy</span>
        <span>·</span>
        <span>Terms</span>
        <span>·</span>
        <span>Sitemap</span>
      </div>
        <div class="right-nav">
        <img  src="../assets/img/icons/global.png" />
        <p>English</p>
        <p>$</p>
        <p>USD</p>
        <img src="../assets/icons/global.png" style="height: 15px;">
        <span>English (US)</span>
        <span>$ USD</span>
        <span>Support & resources</span>
        <span class="material-icons-two-tone">expand_less</span>

      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: "Footer",
};
</script>
 -->
