<template>
    <div>
        <Card class="circle">
            <Badge place="count" :count="count" class-name="badge"></Badge>
        </Card>
    </div>

</template>

<script>
 export default {
   props: ['count']
 }
</script>

<style>
    .circle {
            width: 56px;
            height: 56px;
            line-height: 56px;
            border-radius: 28px;
            float: right;
            right: 40px;
      }

    .badge{
        top:-17px;
        left: -6%;
        width: 26px;
        height: 26px;
        line-height: 26px;
        border-radius: 13px;
    }
</style>