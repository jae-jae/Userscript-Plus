<template>
    <div>
        <Row style="margin-bottom: 16px;">
            <Col span="8">
            <span class="expand-key">{{$t('table.version')}}：</span>
            <span class="expand-value">{{ row.version }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">{{$t('table.score')}}：</span>
            <span class="expand-value">{{ row.fan_score }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">{{$t('table.totalInstalls')}}：</span>
            <span class="expand-value">{{ row.total_installs }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="24">
            <span class="expand-key">{{$t('table.description')}}：</span>
            <span class="expand-value">{{ row.description }}</span>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
      props: {
        row: Object
      }
    }
</script>
