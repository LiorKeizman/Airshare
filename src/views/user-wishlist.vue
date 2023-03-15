<template>
    <!-- <div  ><img class="loader" src="../assets/icons/loader.gif" alt="" srcset=""></div> -->
    <div >
        <!-- <div class="logIn" >
            <h1>log in first
                <router-link to="/login">

                    <span class="under-line">click Here</span>
                </router-link>
            </h1>
        </div> -->
        <h1 class="text-center">My wishlist:</h1>
        <div class="container">

            <!-- <stay-list class="container" :stays="wishStays" /> -->
        </div>
    </div>
</template>

<script>
import stayList from '../cmps/stay-list.vue';

export default {
    name: "wish-list",

    components: {
        stayList,
    },

    data() {
        return {
            loggedinUser: null,
            stays: null,
        };
    },
    created() {
        this.loggedinUser = this.$store.getters.loggedinUser;
        this.stays = this.$store.getters.getStays
    },
    computed: {
        wishStays() {
            var stays = [];
            this.stays.forEach((stay) => {
                if (this.loggedinUser.wishList.includes(stay._id)) {
                    stays.push(stay);
                }
            });
            return stays;
        },
    },

};
</script>

<style>
</style>