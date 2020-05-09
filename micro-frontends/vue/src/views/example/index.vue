<template>
    <div class="example-container">
        <a-button @click="setCount" type="primary">vue</a-button>
    </div>
</template>

<script>
import Vue from "vue";
export default {
    name: "Example",
    components: {

    },
    mounted() {
        const { $mainUtils } = Vue.prototype;
        if($mainUtils) {
            const name = $mainUtils.getName();
            console.info("My name:", name);
        }
    },
    data() {
        return {
            count: 0
        };
    },
    methods: {
        setCount() {
            const { subject } = Vue.prototype.$mainUtils;
            this.count++;
            subject.publish("count", this.count);
        }
    }
};
</script>

<style lang="less" scoped>
    .example-container {
        padding: 20px;
    }
    .test {
        color: gold;
    }
</style>
