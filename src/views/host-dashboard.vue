<!-- <template>
  <div class="dashboard-container">
    
    <div class="logIn" v-if="!getLogInUser">
      <h1 class="login-msg">In order to see your hosting summary,
        you must log in first
        <router-link to="/login">
          <span class="under-line">login here</span>
        </router-link>
      </h1>
    </div>

    <div v-else>

      <div class="flex column">

        <h1 class="chart-title">Hosting Summary</h1>
        <div class="top-dashboard-title flex">
          <button @click="showOrder" class="top-btn"> Orders</button>
          <button @click="showStay" class="top-btn"> My Stays</button>
          <button @click="showGraph" class="top-btn"> Dashboard</button>
          <button @click="showWishList" class="top-btn"> Wishlist</button>
        </div>

        <table v-if="showOrders" class="content-table">
          <thead>
            <tr class="border-bottom">
              <th class="title-thead">Guest </th>
              <th class="title-thead text-center">Status </th>
              <th class="title-thead text-center">Guests </th>
              <th class="title-thead">Booking</th>
              <th class="title-thead">Stay name </th>
              <th class="title-thead text-center">Revenue </th>
              <th class="title-thead text-center">Action </th>
              <th class="title-thead">Check In/ Out </th>
            </tr>
          </thead>
          <div></div>
          <tbody>
            <orders-host />
          </tbody>
        </table>
        
        <table v-if="showStays" class="content-table">
          <thead>
            <tr>
              <th class="title-thead"></th>
              <th class="title-thead">Stay name</th>
              <th class="title-thead">Price per night</th>
              <th class="title-thead">Address</th>
              <th class="title-thead">Actions</th>
            </tr>
          </thead>
          <tbody>
            <stays-host />
          </tbody>
        </table>
      </div>
      <div v-if="showGraphs" class="graphs">
        <chart-host  />
      </div>
    </div>
  </div>
</template>

<script>
import ordersHost from '../cmps/host/orders-host.vue';
import staysHost from '../cmps/host/stays-host.vue';
import chartHost from '../cmps/host/chart-host.vue';

export default {
  name: 'host-dashboard',
  components: {
    ordersHost,
    staysHost,
    chartHost,
  },
  data() {
    return {
      showWishLists: false,
      showGraphs: false,
      orders: null,
      stays: null,
      hostStays: null,
      showStays: false,
      showOrders: true,
      tableData: [
        {

        },
      ]
    };

  },
  created() {
    this.$store.dispatch({ type: 'loadOrders', hostId: this.$route.params.id });
    this.$store.dispatch({ type: 'loadStays', userId: this.$route.params.id });

  },

  computed: {
    getSumReviews() {
      return this.$store.getters.getTotalReviews
    },
    getAvgRate() {
      return this.$store.getters.getAvgRate
    },
    getLogInUser() {
      return this.$store.getters.loggedinUser;
    },
    getHostOrders() {
      return this.$store.getters.getOrders

    },
    getHostStays() {
      return this.$store.getters.getStays
    },
    stayOrder() {
      if (!this.showStay) return 'Show my stays';
      if (this.showStay) return 'Show my orders';
    },
    totalOrders() {
      return this.hostOrders.length;
    },
    pendingOrders() {
      var ordersCount = 0;
      if (this.hostOrders.length > 0) {
        this.hostOrders.forEach(order => {
          if (order.status === 'pending') {
            ordersCount++;
          }
        });
        return ordersCount;
      }
    },
    approvedOrders() {
      var ordersCount = 0;
      if (this.hostOrders.length > 0) {
        this.hostOrders.forEach(order => {
          if (order.status === 'approved') {
            ordersCount++;
          }
        });
        return ordersCount;
      }
    },
    declinedOrders() {
      var ordersCount = 0;
      if (this.hostOrders.length > 0) {
        this.hostOrders.forEach(order => {
          if (order.status === 'declined') {
            ordersCount++;
          }
        });
        return ordersCount;
      }
    },

    totalRevenues() {
      var prices = [];
      if (this.hostOrders.length > 0) {
        this.hostOrders.forEach(order => {
          prices.push(order.totalPrice);
        });
        var sum = prices.reduce((sum, price) => +sum + +price, 0);
        return sum.toLocaleString();
      }
    },
  },
  methods: {
    showOrder() {
      this.showStays = false;
      this.showOrders = true;
      this.showGraphs = false;
      this.showWishLists = false;

    },
    showStay() {
      this.showOrders = false;
      this.showStays = true;
      this.showGraphs = false;
      this.showWishLists = false;

    },
    showGraph() {
      this.showOrders = false;
      this.showStays = false;
      this.showGraphs = true;
      this.showWishLists = false;

    },
    showWishList() {
      this.showOrders = false;
      this.showStays = false;
      this.showGraphs = false;
      this.showWishLists = true;

    },
  },
};
</script>

  -->
  <template>
    <div class="dashboard-container ">
      <!-- <div class="logIn"> -->
      <div class="logIn" v-if="!getLogInUser">
        <h1 class="login-msg">In order to see your hosting summary,
          you must log in first
          <router-link to="/login">
            <span class="under-line">login here</span>
          </router-link>
        </h1>
      </div>
  
      <div v-else>
  
        <div class="title-btn flex column">
  
          <h1 class="chart-title">Hosting Summary</h1>
          <div class="top-dashboard-title flex">
            <button @click="showOrder" class="top-btn"> Orders</button>
            <button @click="showStay" class="top-btn"> My Stays</button>
            <button @click="showGraph" class="top-btn"> Dashboard</button>
            <button @click="showWishlist" class="top-btn"> Wishlist</button>
          </div>
  
          <section v-if="showOrders && desktop" class="main-layout">
              <orders-host />
          </section>
           <section v-if="showOrders && !desktop" class="main-layout">
              <orders-host-mobile />
          </section>
           
          <div v-if="showStays" class="content-table">
              <stays-host />
          </div>
        </div>
        <div v-if="showGraphs" class="graphs">
          <chart-host  />
        </div>
      </div>
    </div>
    <div  v-if="showWishlists">
      
      <wishlist-host/>
    </div>
  </template>
  
  <script>
  import ordersHost from '../cmps/host/orders-host.vue';
  import ordersHostMobile from '../cmps/host/orders-host-mobile.vue';
  import staysHost from '../cmps/host/stays-host.vue';
  import chartHost from '../cmps/host/chart-host.vue';
  import wishlistHost from '../cmps/host/wishlist-host.vue';
  
  export default {
    name: 'host-dashboard',
    components: {
      ordersHost,
      ordersHostMobile,
      staysHost,
      chartHost,
      wishlistHost
    },
    data() {
      return {
        desktop: window.innerWidth > 780 ? true : false,
        showWishlists: false,
        showGraphs: false,
        orders: null,
        stays: null,
        hostStays: null,
        showStays: false,
        showOrders: true,
        tableData: [
          {
  
          },
        ]
      };
  
    },
    created() {
      this.$store.dispatch({ type: 'loadOrders', hostId: this.$route.params.id });
      this.$store.dispatch({ type: 'loadStays', userId: this.$route.params.id });
  
  
    },
  
    computed: {
      
      getSumReviews() {
        return this.$store.getters.getTotalReviews
      },
      getAvgRate() {
        return this.$store.getters.getAvgRate
      },
      getLogInUser() {
        return this.$store.getters.loggedinUser;
      },
      getHostOrders() {
        console.log(this.$store.getters.getOrders)
        return this.$store.getters.getOrders
  
      },
      getHostStays() {
        return this.$store.getters.getStays
      },
      stayOrder() {
        if (!this.showStay) return 'Show my stays';
        if (this.showStay) return 'Show my orders';
      },
      totalOrders() {
        return this.hostOrders.length;
      },
      pendingOrders() {
        var ordersCount = 0;
        if (this.hostOrders.length > 0) {
          this.hostOrders.forEach(order => {
            if (order.status === 'pending') {
              ordersCount++;
            }
          });
          return ordersCount;
        }
      },
      approvedOrders() {
        var ordersCount = 0;
        if (this.hostOrders.length > 0) {
          this.hostOrders.forEach(order => {
            if (order.status === 'approved') {
              ordersCount++;
            }
          });
          return ordersCount;
        }
      },
      declinedOrders() {
        var ordersCount = 0;
        if (this.hostOrders.length > 0) {
          this.hostOrders.forEach(order => {
            if (order.status === 'declined') {
              ordersCount++;
            }
          });
          return ordersCount;
        }
      },
  
      totalRevenues() {
        var prices = [];
        if (this.hostOrders.length > 0) {
          this.hostOrders.forEach(order => {
            prices.push(order.totalPrice);
          });
          var sum = prices.reduce((sum, price) => +sum + +price, 0);
          return sum.toLocaleString();
        }
      },
    },
    methods: {
      showOrder() {
        this.showStays = false;
        this.showOrders = true;
        this.showGraphs = false;
        this.showWishlists = false;
  
      },
      showStay() {
        this.showOrders = false;
        this.showStays = true;
        this.showGraphs = false;
        this.showWishlists = false;
  
      },
      showGraph() {
        this.showOrders = false;
        this.showStays = false;
        this.showGraphs = true;
        this.showWishlists = false;
        console.log(this.showGraphs);
  
      },
      showWishlist() {
        this.showOrders = false;
        this.showStays = false;
        this.showGraphs = false;
        this.showWishlists = true;
  
      },
    },
  };
  </script>