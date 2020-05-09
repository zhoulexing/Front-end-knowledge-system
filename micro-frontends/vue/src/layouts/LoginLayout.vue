<template>
    <div class="vue">
        <a-button @click="goApps">login</a-button>
    </div>
</template>

<script>

export default {
    name: "LoginLayout",
    components: {

    },
    mounted() {
    },
    data() {
    },
    methods: {
        goApps() {
            this.$router.push({ path: "/apps/vue/init" });
        }
    }
};
</script>