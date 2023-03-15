

<template>
  <GoogleLogin :callback="callback"/>

</template>

<script >
export default {
    name: 'Google',
    data() {
        return {
            callback:(response) => {
            // This callback will be triggered when the user selects or login to
            // his Google account from the popup
            console.log("Handle the response", response)
        }        }
    },
}
</script>

