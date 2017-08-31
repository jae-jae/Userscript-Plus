<template>
    <div>
        <Row style="margin-bottom: 16px;">
            <Col span="8">
            <span class="expand-key">版本：</span>
            <span class="expand-value">{{ row.version }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">评分：</span>
            <span class="expand-value">{{ row.fan_score }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">总安装量：</span>
            <span class="expand-value">{{ row.total_installs }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="24">
            <span class="expand-key">描述：</span>
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
