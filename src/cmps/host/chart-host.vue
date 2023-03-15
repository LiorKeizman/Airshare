<template>
    <section class="dashboard dashboard-stats">
        <div class="cards-dashboard-container">
            <div class="stats-card">
           <div class="orders">
                  <h1>Orders Status</h1>
                  <DoughnutChart :chartData="testData" :options1="options1" />
              </div>
          </div>
          <div class="stats-card">

              <div class="revenue">
                  <h1>Revenue Per Month</h1>
                  <BarChart :options="options" :chartData="testData2"  />
                </div>
            </div>

            <div class="stats-card">
              <h1>Orders Managment 2022</h1>
              <div class="details">
                <div class="rev-stat">
                  <span class="stat-head">Cancelations</span>
                  <span class="canceled-stat">3.7%</span>
                </div>
                <div class="rev-stat">
                  <span class="stat-head">Average Stay Time</span>
                  <span class="total-stat">4 nights</span>
                </div>
                <div class="rev-stat">
                  <span class="stat-head">airshare Fees</span>
                  <span class="pending-stat">453$</span>
                </div>
            </div>
        </div>
        
        <div class="stats-card">
            <h1>Total revenue</h1>
            <div class="details">
                
                <div class="rev-stat">
                    <span class="stat-head">This Year</span>
                    <span>$8,253</span>
                </div>
                <div class="rev-stat">
                    <span class="stat-head">Total Income</span>
                    <span>$22,553</span>
                </div>

          </div>
        </div>
       
      </div>
        </section>
  </template>
  
  <script>
  import { BarChart, DoughnutChart } from 'vue-chart-3';
  import { Chart, registerables } from "chart.js";
//   import {utilService} from '../services/util-service.js'
  
  Chart.register(...registerables);
  
  export default {
    name: 'chart-host',
    components: { DoughnutChart, BarChart },
    data() {
        return {
            testData: {
                labels: ['Pending','Declined','Approved'],
                datasets: [
                    {
                        data: [2,3,5],
                        backgroundColor: ['yellow','red','green'],
                    },
                ],
            },
            options1: {
                plugins: {
                    legend: {
                        display: true,
                    },
                },
            },
            testData2: {
                labels: ['September','October','November','December'],
                datasets: [
                    {
                        data: [2000,2450,3100,1700],
                        backgroundColor: ['rgb(255,56,92)','rgb(255,56,92)','rgb(255,56,92)','rgb(255,56,92)'],
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        }
    },
    computed: {
        // labels() {
        //     return this.$store.getters.labels
        // }
           pendingOrders() {
            var ordersCount = 0;
            if (this.hostOrders.length > 0) {
                this.hostOrders.forEach((order) => {
                    if (order.status === "pending") {
                        ordersCount++;
                    }
                });
                return ordersCount;
            }
        },
        approvedOrders() {
            var ordersCount = 0;
            if (this.hostOrders.length > 0) {
                this.hostOrders.forEach((order) => {
                    if (order.status === "approved") {
                        ordersCount++;
                    }
                });
                return ordersCount;
            }
        },
        declinedOrders() {
            var ordersCount = 0;
            if (this.hostOrders.length > 0) {
                this.hostOrders.forEach((order) => {
                    if (order.status === "declined") {
                        ordersCount++;
                    }
                });
                return ordersCount;
            }
        },

        chartStatus() {
            var label = [this.pendingOrders, this.approvedOrders, this.declinedOrders]
            return [1, 2, 3]
        }
    },
    methods: {
   
  }
}
  </script>