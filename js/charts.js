/**
 * 阳光电源财务分析 - ECharts 图表渲染模块
 */

function initCharts() {
    renderRevenueProfitChart();
    renderCashFlowChart();
    renderProfitabilityChart();
    renderSolvencyChart();
    renderGrowthChart();
    renderBusinessRevenueChart();
    renderBusinessMarginChart();
    renderRegionalChart();
    renderRegionalMarginChart();
    renderInverterShipmentChart();
    renderValuationChart();
    renderDcfChart();
    renderComparisonChart();
    renderDupontTrendChart();
    renderForecastChart();
}

// ===== 营收与利润趋势 =====
function renderRevenueProfitChart() {
    const chart = echarts.init(document.getElementById('revenueProfitChart'));
    const d = FINANCIAL_DATA.revenueProfit;

    chart.setOption({
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#e8e8ef',
            borderWidth: 1,
            textStyle: { color: '#1a1a2e', fontSize: 13 },
            formatter: function(params) {
                let html = `<strong>${params[0].axisValue}</strong><br/>`;
                params.forEach(p => {
                    html += `${p.marker} ${p.seriesName}: <strong>${p.value}亿元</strong><br/>`;
                });
                return html;
            }
        },
        legend: {
            data: ['营业收入', '毛利', '净利润'],
            top: 0,
            textStyle: { fontSize: 12 }
        },
        grid: { left: 50, right: 20, bottom: 30, top: 50 },
        xAxis: {
            type: 'category',
            data: d.years,
            axisLine: { lineStyle: { color: '#e8e8ef' } },
            axisLabel: { color: '#8e8ea0' }
        },
        yAxis: {
            type: 'value',
            name: '亿元',
            nameTextStyle: { color: '#8e8ea0', fontSize: 11 },
            splitLine: { lineStyle: { color: '#f0f2f5' } },
            axisLabel: { color: '#8e8ea0' }
        },
        series: [
            {
                name: '营业收入',
                type: 'bar',
                data: d.revenue,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#1a3a6b' },
                        { offset: 1, color: '#0a1628' }
                    ]),
                    borderRadius: [4, 4, 0, 0]
                },
                barMaxWidth: 50
            },
            {
                name: '毛利',
                type: 'bar',
                data: d.grossProfit,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#f5a623' },
                        { offset: 1, color: '#d4921e' }
                    ]),
                    borderRadius: [4, 4, 0, 0]
                },
                barMaxWidth: 50
            },
            {
                name: '净利润',
                type: 'line',
                data: d.netProfit,
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: { color: '#16a34a', width: 3 },
                itemStyle: { color: '#16a34a' },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(22, 163, 74, 0.2)' },
                        { offset: 1, color: 'rgba(22, 163, 74, 0.02)' }
                    ])
                }
            }
        ]
    });

    window.addEventListener('resize', () => chart.resize());
}

// ===== 现金流量图 =====
function renderCashFlowChart() {
    const chart = echarts.init(document.getElementById('cashFlowChart'));
    const d = FINANCIAL_DATA.cashFlow;

    chart.setOption({
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#e8e8ef',
            borderWidth: 1,
            textStyle: { color: '#1a1a2e', fontSize: 13 },
            formatter: function(params) {
                let html = `<strong>${params[0].axisValue}</strong><br/>`;
                params.forEach(p => {
                    html += `${p.marker} ${p.seriesName}: <strong>${p.value}亿元</strong><br/>`;
                });
                return html;
            }
        },
        legend: {
            data: ['经营活动现金流', '投资活动现金流', '筹资活动现金流', '自由现金流'],
            top: 0,
            textStyle: { fontSize: 12 }
        },
        grid: { left: 50, right: 20, bottom: 30, top: 50 },
        xAxis: {
            type: 'category',
            data: d.years,
            axisLine: { lineStyle: { color: '#e8e8ef' } },
            axisLabel: { color: '#8e8ea0' }
        },
        yAxis: {
            type: 'value',
            name: '亿元',
            nameTextStyle: { color: '#8e8ea0', fontSize: 11 },
            splitLine: { lineStyle: { color: '#f0f2f5' } },
            axisLabel: { color: '#8e8ea0' }
        },
        series: [
            {
                name: '经营活动现金流',
                type: 'bar',
                data: d.operating,
                itemStyle: { color: '#16a34a', borderRadius: [4, 4, 0, 0] },
                barMaxWidth: 40
            },
            {
                name: '投资活动现金流',
                type: 'bar',
                data: d.investing,
                itemStyle: { color: '#dc2626', borderRadius: [4, 4, 0, 0] },
                barMaxWidth: 40
            },
            {
                name: '筹资活动现金流',
                type: 'bar',
                data: d.financing,
                itemStyle: { color: '#f5a623', borderRadius: [4, 4, 0, 0] },
                barMaxWidth: 40
            },
            {
                name: '自由现金流',
                type: 'line',
                data: d.freeCashFlow,
                symbol: 'diamond',
                symbolSize: 10,
                lineStyle: { color: '#1a3a6b', width: 3, type: 'dashed' },
                itemStyle: { color: '#1a3a6b' }
            }
        ]
    });

    window.addEventListener('resize', () => chart.resize());
}

// ===== 盈利能力比率 =====
function renderProfitabilityChart() {
    const chart = echarts.init(document.getElementById('profitabilityChart'));
    const d = FINANCIAL_DATA.profitability;

    chart.setOption({
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#e8e8ef',
            borderWidth: 1,
            textStyle: { color: '#1a1a2e', fontSize: 13 },
            formatter: function(params) {
                let html = `<strong>${params[0].axisValue}</strong><br/>`;
                params.forEach(p => {
                    html += `${p.marker} ${p.seriesName}: <strong>${p.value}%</strong><br/>`;
                });
                return html;
            }
        },
        legend: {
            data: ['毛利率', '净利率', 'ROE', 'ROA', '营业利润率'],
            top: 0,
            textStyle: { fontSize: 11 }
        },
        grid: { left: 50, right: 20, bottom: 30, top: 50 },
        xAxis: {
            type: 'category',
            data: d.years,
            axisLine: { lineStyle: { color: '#e8e8ef' } },
            axisLabel: { color: '#8e8ea0' }
        },
        yAxis: {
            type: 'value',
            name: '%',
            nameTextStyle: { color: '#8e8ea0', fontSize: 11 },
            splitLine: { lineStyle: { color: '#f0f2f5' } },
            axisLabel: { color: '#8e8ea0', formatter: '{value}%' }
        },
        series: [
            {
                name: '毛利率',
                type: 'line',
                data: d.grossMargin,
                symbol: 'circle', symbolSize: 6,
                lineStyle: { color: '#f5a623', width: 2 },
                itemStyle: { color: '#f5a623' }
            },
            {
                name: '净利率',
                type: 'line',
                data: d.netMargin,
                symbol: 'circle', symbolSize: 6,
                lineStyle: { color: '#16a34a', width: 2 },
                itemStyle: { color: '#16a34a' }
            },
            {
                name: 'ROE',
                type: 'line',
                data: d.roe,
                symbol: 'circle', symbolSize: 6,
                lineStyle: { color: '#1a3a6b', width: 3 },
                itemStyle: { color: '#1a3a6b' },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(26, 58, 107, 0.15)' },
                        { offset: 1, color: 'rgba(26, 58, 107, 0.01)' }
                    ])
                }
            },
            {
                name: 'ROA',
                type: 'line',
                data: d.roa,
                symbol: 'circle', symbolSize: 6,
                lineStyle: { color: '#0891b2', width: 2, type: 'dashed' },
                itemStyle: { color: '#0891b2' }
            },
            {
                name: '营业利润率',
                type: 'line',
                data: d.operatingMargin,
                symbol: 'circle', symbolSize: 6,
                lineStyle: { color: '#7c3aed', width: 2, type: 'dotted' },
                itemStyle: { color: '#7c3aed' }
            }
        ]
    });

    window.addEventListener('resize', () => chart.resize());
}

// ===== 偿债能力 =====
function renderSolvencyChart() {
    const chart = echarts.init(document.getElementById('solvencyChart'));
    const d = FINANCIAL_DATA.solvency;

    chart.setOption({
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#e8e8ef',
            borderWidth: 1,
            textStyle: { color: '#1a1a2e', fontSize: 13 },
            formatter: function(params) {
                let html = `<strong>${params[0].axisValue}</strong><br/>`;
                params.forEach(p => {
                    html += `${p.marker} ${p.seriesName}: <strong>${p.value}</strong><br/>`;
                });
                return html;
            }
        },
        legend: {
            data: ['资产负债率(%)', '流动比率', '速动比率', '权益乘数'],
            top: 0,
            textStyle: { fontSize: 12 }
        },
        grid: { left: 50, right: 20, bottom: 30, top: 50 },
        xAxis: {
            type: 'category',
            data: d.years,
            axisLine: { lineStyle: { color: '#e8e8ef' } },
            axisLabel: { color: '#8e8ea0' }
        },
        yAxis: [
            {
                type: 'value',
                name: '%',
                nameTextStyle: { color: '#8e8ea0', fontSize: 11 },
                splitLine: { lineStyle: { color: '#f0f2f5' } },
                axisLabel: { color: '#8e8ea0' }
            },
            {
                type: 'value',
                name: '比率',
                nameTextStyle: { color: '#8e8ea0', fontSize: 11 },
                splitLine: { show: false },
                axisLabel: { color: '#8e8ea0' }
            }
        ],
        series: [
            {
                name: '资产负债率(%)',
                type: 'bar',
                data: d.debtRatio,
                itemStyle: { color: '#1a3a6b', borderRadius: [4, 4, 0, 0] },
                barMaxWidth: 40,
                yAxisIndex: 0
            },
            {
                name: '流动比率',
                type: 'line',
                data: d.currentRatio,
                symbol: 'circle', symbolSize: 6,
                lineStyle: { color: '#16a34a', width: 2 },
                itemStyle: { color: '#16a34a' },
                yAxisIndex: 1
            },
            {
                name: '速动比率',
                type: 'line',
                data: d.quickRatio,
                symbol: 'circle', symbolSize: 6,
                lineStyle: { color: '#f5a623', width: 2, type: 'dashed' },
                itemStyle: { color: '#f5a623' },
                yAxisIndex: 1
            },
            {
                name: '权益乘数',
                type: 'line',
                data: d.equityMultiplier,
                symbol: 'circle', symbolSize: 6,
                lineStyle: { color: '#dc2626', width: 2, type: 'dotted' },
                itemStyle: { color: '#dc2626' },
                yAxisIndex: 1
            }
        ]
    });

    window.addEventListener('resize', () => chart.resize());
}

// ===== 成长能力 =====
function renderGrowthChart() {
    const chart = echarts.init(document.getElementById('growthChart'));
    const d = FINANCIAL_DATA.growth;

    chart.setOption({
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#e8e8ef',
            borderWidth: 1,
            textStyle: { color: '#1a1a2e', fontSize: 13 },
            formatter: function(params) {
                let html = `<strong>${params[0].axisValue}</strong><br/>`;
                params.forEach(p => {
                    html += `${p.marker} ${p.seriesName}: <strong>${p.value}%</strong><br/>`;
                });
                return html;
            }
        },
        legend: {
            data: ['营收增长率', '净利润增长率', '总资产增长率', '净资产增长率'],
            top: 0,
            textStyle: { fontSize: 12 }
        },
        grid: { left: 50, right: 20, bottom: 30, top: 50 },
        xAxis: {
            type: 'category',
            data: d.years,
            axisLine: { lineStyle: { color: '#e8e8ef' } },
            axisLabel: { color: '#8e8ea0' }
        },
        yAxis: {
            type: 'value',
            name: '%',
            nameTextStyle: { color: '#8e8ea0', fontSize: 11 },
            splitLine: { lineStyle: { color: '#f0f2f5' } },
            axisLabel: { color: '#8e8ea0', formatter: '{value}%' }
        },
        series: [
            {
                name: '营收增长率',
                type: 'bar',
                data: d.revenueGrowth,
                itemStyle: {
                    color: function(param) {
                        return param.value >= 0 ? '#16a34a' : '#dc2626';
                    },
                    borderRadius: [4, 4, 0, 0]
                },
                barMaxWidth: 40
            },
            {
                name: '净利润增长率',
                type: 'line',
                data: d.profitGrowth,
                symbol: 'circle', symbolSize: 6,
                lineStyle: { color: '#f5a623', width: 3 },
                itemStyle: { color: '#f5a623' }
            },
            {
                name: '总资产增长率',
                type: 'line',
                data: d.assetGrowth,
                symbol: 'circle', symbolSize: 6,
                lineStyle: { color: '#0891b2', width: 2, type: 'dashed' },
                itemStyle: { color: '#0891b2' }
            },
            {
                name: '净资产增长率',
                type: 'line',
                data: d.equityGrowth,
                symbol: 'circle', symbolSize: 6,
                lineStyle: { color: '#7c3aed', width: 2, type: 'dotted' },
                itemStyle: { color: '#7c3aed' }
            }
        ]
    });

    window.addEventListener('resize', () => chart.resize());
}

// ===== 业务收入构成 =====
function renderBusinessRevenueChart() {
    const chart = echarts.init(document.getElementById('businessRevenueChart'));
    const d = FINANCIAL_DATA.business;

    chart.setOption({
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#e8e8ef',
            borderWidth: 1,
            textStyle: { color: '#1a1a2e', fontSize: 13 },
            formatter: function(params) {
                return `<strong>${params.name}</strong><br/>
                        营收: <strong>${params.value}亿元</strong><br/>
                        占比: <strong>${params.percent}%</strong>`;
            }
        },
        legend: {
            data: d.segments,
            bottom: 0,
            textStyle: { fontSize: 11 }
        },
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '45%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 6,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    formatter: '{b}\n{d}%',
                    fontSize: 11,
                    color: '#4a4a6a'
                },
                emphasis: {
                    label: { show: true, fontSize: 14, fontWeight: 'bold' },
                    itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.2)' }
                },
                data: d.segments.map((name, i) => ({
                    name,
                    value: d.revenue[i]
                })).filter(item => item.value > 0),
                color: ['#1a3a6b', '#f5a623', '#16a34a', '#8e8ea0']
            }
        ]
    });

    window.addEventListener('resize', () => chart.resize());
}

// ===== 业务毛利率 =====
function renderBusinessMarginChart() {
    const chart = echarts.init(document.getElementById('businessMarginChart'));
    const d = FINANCIAL_DATA.business;

    const marginData = d.segments.map((name, i) => ({
        name,
        value: d.margin[i]
    })).filter(item => item.value !== null);

    chart.setOption({
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#e8e8ef',
            borderWidth: 1,
            textStyle: { color: '#1a1a2e', fontSize: 13 },
            formatter: function(params) {
                let html = `<strong>${params[0].axisValue}</strong><br/>`;
                params.forEach(p => {
                    html += `${p.marker} ${p.seriesName}: <strong>${p.value}%</strong><br/>`;
                });
                return html;
            }
        },
        grid: { left: 50, right: 20, bottom: 30, top: 10 },
        xAxis: {
            type: 'category',
            data: marginData.map(d => d.name),
            axisLine: { lineStyle: { color: '#e8e8ef' } },
            axisLabel: { color: '#8e8ea0', fontSize: 11 }
        },
        yAxis: {
            type: 'value',
            name: '%',
            nameTextStyle: { color: '#8e8ea0', fontSize: 11 },
            splitLine: { lineStyle: { color: '#f0f2f5' } },
            axisLabel: { color: '#8e8ea0', formatter: '{value}%' }
        },
        series: [
            {
                type: 'bar',
                data: marginData.map(item => ({
                    value: item.value,
                    itemStyle: {
                        color: item.value >= 30 ? '#16a34a' : item.value >= 25 ? '#f5a623' : '#dc2626',
                        borderRadius: [6, 6, 0, 0]
                    }
                })),
                barMaxWidth: 60,
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}%',
                    color: '#4a4a6a',
                    fontWeight: 'bold'
                }
            }
        ]
    });

    window.addEventListener('resize', () => chart.resize());
}

// ===== 分地区收入 =====
function renderRegionalChart() {
    const chart = echarts.init(document.getElementById('regionalChart'));
    const d = FINANCIAL_DATA.regional;

    chart.setOption({
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#e8e8ef',
            borderWidth: 1,
            textStyle: { color: '#1a1a2e', fontSize: 13 },
            formatter: function(params) {
                return `<strong>${params.name}</strong><br/>
                        营收: <strong>${params.value}亿元</strong><br/>
                        占比: <strong>${params.percent}%</strong>`;
            }
        },
        series: [
            {
                type: 'pie',
                radius: ['45%', '70%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 6,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    formatter: '{b}\n{d}%',
                    fontSize: 12,
                    color: '#4a4a6a'
                },
                emphasis: {
                    label: { show: true, fontSize: 15, fontWeight: 'bold' },
                    itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.2)' }
                },
                data: d.regions.map((name, i) => ({
                    name,
                    value: d.revenue[i]
                })),
                color: ['#1a3a6b', '#f5a623']
            }
        ]
    });

    window.addEventListener('resize', () => chart.resize());
}

// ===== 分地区毛利率 =====
function renderRegionalMarginChart() {
    const chart = echarts.init(document.getElementById('regionalMarginChart'));
    const d = FINANCIAL_DATA.regional;

    chart.setOption({
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#e8e8ef',
            borderWidth: 1,
            textStyle: { color: '#1a1a2e', fontSize: 13 }
        },
        grid: { left: 60, right: 30, bottom: 30, top: 10 },
        xAxis: {
            type: 'category',
            data: d.regions,
            axisLine: { lineStyle: { color: '#e8e8ef' } },
            axisLabel: { color: '#8e8ea0', fontSize: 11 }
        },
        yAxis: {
            type: 'value',
            name: '毛利率 %',
            min: 0,
            max: 50,
            nameTextStyle: { color: '#8e8ea0', fontSize: 11 },
            splitLine: { lineStyle: { color: '#f0f2f5' } },
            axisLabel: { color: '#8e8ea0', formatter: '{value}%' }
        },
        series: [
            {
                type: 'bar',
                data: d.margin.map(v => ({
                    value: v,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: v > 30 ? '#16a34a' : '#f5a623' },
                            { offset: 1, color: v > 30 ? '#15803d' : '#d4921e' }
                        ]),
                        borderRadius: [6, 6, 0, 0]
                    }
                })),
                barMaxWidth: 80,
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}%',
                    color: '#4a4a6a',
                    fontWeight: 'bold',
                    fontSize: 14
                }
            }
        ]
    });

    window.addEventListener('resize', () => chart.resize());
}

// ===== 逆变器出货量 =====
function renderInverterShipmentChart() {
    const chart = echarts.init(document.getElementById('inverterShipmentChart'));
    const d = FINANCIAL_DATA.inverterShipment;

    chart.setOption({
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#e8e8ef',
            borderWidth: 1,
            textStyle: { color: '#1a1a2e', fontSize: 13 },
            formatter: function(params) {
                let html = `<strong>${params[0].axisValue}</strong><br/>`;
                params.forEach(p => {
                    html += `${p.marker} ${p.seriesName}: <strong>${p.value}GW</strong><br/>`;
                });
                return html;
            }
        },
        grid: { left: 50, right: 20, bottom: 30, top: 10 },
        xAxis: {
            type: 'category',
            data: d.years,
            axisLine: { lineStyle: { color: '#e8e8ef' } },
            axisLabel: { color: '#8e8ea0' }
        },
        yAxis: {
            type: 'value',
            name: 'GW',
            nameTextStyle: { color: '#8e8ea0', fontSize: 11 },
            splitLine: { lineStyle: { color: '#f0f2f5' } },
            axisLabel: { color: '#8e8ea0' }
        },
        series: [
            {
                type: 'bar',
                data: d.shipments,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#f5a623' },
                        { offset: 1, color: '#1a3a6b' }
                    ]),
                    borderRadius: [4, 4, 0, 0]
                },
                barMaxWidth: 50,
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}GW',
                    color: '#4a4a6a',
                    fontWeight: 'bold'
                }
            }
        ]
    });

    window.addEventListener('resize', () => chart.resize());
}

// ===== PE 估值区间 =====
function renderValuationChart() {
    const chart = echarts.init(document.getElementById('valuationChart'));

    const years = ['2020', '2021', '2022', '2023', '2024'];
    // 模拟 PE 数据
    const peData = [35.2, 48.6, 22.8, 18.5, 15.8];
    const pe25 = peData.map(v => v * 1.25);
    const pe10 = peData.map(v => v * 0.75);

    chart.setOption({
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#e8e8ef',
            borderWidth: 1,
            textStyle: { color: '#1a1a2e', fontSize: 13 }
        },
        legend: {
            data: ['PE(TTM)', 'PE 上轨(+25%)', 'PE 下轨(-25%)'],
            top: 0,
            textStyle: { fontSize: 12 }
        },
        grid: { left: 50, right: 20, bottom: 30, top: 50 },
        xAxis: {
            type: 'category',
            data: years,
            axisLine: { lineStyle: { color: '#e8e8ef' } },
            axisLabel: { color: '#8e8ea0' }
        },
        yAxis: {
            type: 'value',
            name: 'PE (x)',
            nameTextStyle: { color: '#8e8ea0', fontSize: 11 },
            splitLine: { lineStyle: { color: '#f0f2f5' } },
            axisLabel: { color: '#8e8ea0', formatter: '{value}x' }
        },
        series: [
            {
                name: 'PE(TTM)',
                type: 'line',
                data: peData,
                symbol: 'circle', symbolSize: 8,
                lineStyle: { color: '#1a3a6b', width: 3 },
                itemStyle: { color: '#1a3a6b' },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(26, 58, 107, 0.15)' },
                        { offset: 1, color: 'rgba(26, 58, 107, 0.01)' }
                    ])
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                    ],
                    lineStyle: { color: '#f5a623', type: 'dashed' },
                    label: { formatter: '均值: {c}x', color: '#f5a623' }
                }
            },
            {
                name: 'PE 上轨(+25%)',
                type: 'line',
                data: pe25,
                symbol: 'none',
                lineStyle: { color: '#dc2626', width: 1, type: 'dashed' },
                itemStyle: { color: '#dc2626' }
            },
            {
                name: 'PE 下轨(-25%)',
                type: 'line',
                data: pe10,
                symbol: 'none',
                lineStyle: { color: '#16a34a', width: 1, type: 'dashed' },
                itemStyle: { color: '#16a34a' }
            }
        ]
    });

    window.addEventListener('resize', () => chart.resize());
}

// ===== DCF 估值 =====
function renderDcfChart() {
    const chart = echarts.init(document.getElementById('dcfChart'));
    const d = FINANCIAL_DATA.dcf;

    chart.setOption({
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#e8e8ef',
            borderWidth: 1,
            textStyle: { color: '#1a1a2e', fontSize: 13 },
            formatter: function(params) {
                let html = `<strong>${params[0].axisValue}</strong><br/>`;
                params.forEach(p => {
                    html += `${p.marker} ${p.seriesName}: <strong>${typeof p.value === 'number' ? p.value.toFixed(1) : p.value}</strong><br/>`;
                });
                return html;
            }
        },
        legend: {
            data: ['自由现金流(FCFF)', '现值(PV of FCFF)'],
            top: 0,
            textStyle: { fontSize: 12 }
        },
        grid: { left: 50, right: 20, bottom: 30, top: 50 },
        xAxis: {
            type: 'category',
            data: d.years,
            axisLine: { lineStyle: { color: '#e8e8ef' } },
            axisLabel: { color: '#8e8ea0', fontSize: 10, interval: 0, rotate: 30 }
        },
        yAxis: {
            type: 'value',
            name: '亿元',
            nameTextStyle: { color: '#8e8ea0', fontSize: 11 },
            splitLine: { lineStyle: { color: '#f0f2f5' } },
            axisLabel: { color: '#8e8ea0' }
        },
        series: [
            {
                name: '自由现金流(FCFF)',
                type: 'bar',
                data: d.fcff.map(v => v === null ? '-' : v),
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#1a3a6b' },
                        { offset: 1, color: '#0a1628' }
                    ]),
                    borderRadius: [4, 4, 0, 0]
                },
                barMaxWidth: 30
            },
            {
                name: '现值(PV of FCFF)',
                type: 'line',
                data: d.pvFcff.map(v => v === null ? '-' : v),
                symbol: 'diamond', symbolSize: 8,
                lineStyle: { color: '#f5a623', width: 2 },
                itemStyle: { color: '#f5a623' },
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' }
                    ],
                    symbolSize: 50,
                    label: { formatter: '终值\n{c}亿', color: '#fff' }
                }
            }
        ]
    });

    window.addEventListener('resize', () => chart.resize());
}

// ===== 同业比较 =====
function renderComparisonChart() {
    const chart = echarts.init(document.getElementById('comparisonChart'));
    const d = FINANCIAL_DATA.comparison;

    chart.setOption({
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#e8e8ef',
            borderWidth: 1,
            textStyle: { color: '#1a1a2e', fontSize: 13 }
        },
        legend: {
            data: ['营收(亿元)', '净利润(亿元)', '毛利率(%)', '净利率(%)'],
            top: 0,
            textStyle: { fontSize: 12 }
        },
        grid: { left: 50, right: 20, bottom: 30, top: 50 },
        xAxis: {
            type: 'category',
            data: d.companies,
            axisLine: { lineStyle: { color: '#e8e8ef' } },
            axisLabel: { color: '#8e8ea0' }
        },
        yAxis: {
            type: 'value',
            name: '亿元 / %',
            nameTextStyle: { color: '#8e8ea0', fontSize: 11 },
            splitLine: { lineStyle: { color: '#f0f2f5' } },
            axisLabel: { color: '#8e8ea0' }
        },
        series: [
            {
                name: '营收(亿元)',
                type: 'bar',
                data: d.revenue,
                itemStyle: { color: '#1a3a6b', borderRadius: [4, 4, 0, 0] },
                barMaxWidth: 30
            },
            {
                name: '净利润(亿元)',
                type: 'bar',
                data: d.netProfit,
                itemStyle: { color: '#f5a623', borderRadius: [4, 4, 0, 0] },
                barMaxWidth: 30
            },
            {
                name: '毛利率(%)',
                type: 'line',
                data: d.grossMargin,
                symbol: 'circle', symbolSize: 6,
                lineStyle: { color: '#16a34a', width: 2 },
                itemStyle: { color: '#16a34a' }
            },
            {
                name: '净利率(%)',
                type: 'line',
                data: d.netMargin,
                symbol: 'circle', symbolSize: 6,
                lineStyle: { color: '#dc2626', width: 2, type: 'dashed' },
                itemStyle: { color: '#dc2626' }
            }
        ]
    });

    window.addEventListener('resize', () => chart.resize());
}

// ===== 杜邦趋势 =====
function renderDupontTrendChart() {
    const chart = echarts.init(document.getElementById('dupontTrendChart'));
    const d = FINANCIAL_DATA.dupont;

    chart.setOption({
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#e8e8ef',
            borderWidth: 1,
            textStyle: { color: '#1a1a2e', fontSize: 13 },
            formatter: function(params) {
                let html = `<strong>${params[0].axisValue}年</strong><br/>`;
                params.forEach(p => {
                    html += `${p.marker} ${p.seriesName}: <strong>${p.value}</strong><br/>`;
                });
                return html;
            }
        },
        legend: {
            data: ['ROE(%)', '净利率(%)', '总资产周转率(x)', '权益乘数(x)'],
            top: 0,
            textStyle: { fontSize: 12 }
        },
        grid: { left: 50, right: 20, bottom: 30, top: 50 },
        xAxis: {
            type: 'category',
            data: d.years,
            axisLine: { lineStyle: { color: '#e8e8ef' } },
            axisLabel: { color: '#8e8ea0' }
        },
        yAxis: [
            {
                type: 'value',
                name: '%',
                nameTextStyle: { color: '#8e8ea0', fontSize: 11 },
                splitLine: { lineStyle: { color: '#f0f2f5' } },
                axisLabel: { color: '#8e8ea0' }
            },
            {
                type: 'value',
                name: 'x',
                nameTextStyle: { color: '#8e8ea0', fontSize: 11 },
                splitLine: { show: false },
                axisLabel: { color: '#8e8ea0' },
                min: 0
            }
        ],
        series: [
            {
                name: 'ROE(%)',
                type: 'line',
                data: d.roe,
                symbol: 'circle', symbolSize: 8,
                lineStyle: { color: '#1a3a6b', width: 3 },
                itemStyle: { color: '#1a3a6b' },
                yAxisIndex: 0,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(26, 58, 107, 0.15)' },
                        { offset: 1, color: 'rgba(26, 58, 107, 0.01)' }
                    ])
                }
            },
            {
                name: '净利率(%)',
                type: 'line',
                data: d.netMargin,
                symbol: 'circle', symbolSize: 6,
                lineStyle: { color: '#16a34a', width: 2 },
                itemStyle: { color: '#16a34a' },
                yAxisIndex: 0
            },
            {
                name: '总资产周转率(x)',
                type: 'bar',
                data: d.assetTurnover,
                itemStyle: { color: '#f5a623', borderRadius: [4, 4, 0, 0] },
                barMaxWidth: 30,
                yAxisIndex: 1
            },
            {
                name: '权益乘数(x)',
                type: 'line',
                data: d.equityMultiplier,
                symbol: 'diamond', symbolSize: 6,
                lineStyle: { color: '#0891b2', width: 2, type: 'dashed' },
                itemStyle: { color: '#0891b2' },
                yAxisIndex: 1
            }
        ]
    });

    window.addEventListener('resize', () => chart.resize());
}

// ===== 盈利预测 =====
function renderForecastChart() {
    const chart = echarts.init(document.getElementById('forecastChart'));
    const d = FINANCIAL_DATA.forecast;
    const analyst = FINANCIAL_DATA.analystForecast;

    // 构建机构预测的箱线数据
    const boxData = analyst.forecasts.map(f => {
        const sorted = [...f.values].sort((a, b) => a - b);
        return {
            year: f.year,
            min: sorted[0],
            q1: sorted[1],
            median: sorted[2],
            q3: sorted[2],
            max: sorted[3]
        };
    });

    chart.setOption({
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#e8e8ef',
            borderWidth: 1,
            textStyle: { color: '#1a1a2e', fontSize: 13 },
            formatter: function(params) {
                let html = `<strong>${params[0].axisValue}</strong><br/>`;
                params.forEach(p => {
                    html += `${p.marker} ${p.seriesName}: <strong>${typeof p.value === 'number' ? p.value.toFixed(1) : p.value}亿</strong><br/>`;
                });
                return html;
            }
        },
        legend: {
            data: ['实际净利润', '一致预期', '营收(右轴)'],
            top: 0,
            textStyle: { fontSize: 12 }
        },
        grid: { left: 50, right: 50, bottom: 30, top: 50 },
        xAxis: {
            type: 'category',
            data: d.years,
            axisLine: { lineStyle: { color: '#e8e8ef' } },
            axisLabel: { color: '#8e8ea0' },
            splitLine: { show: true, lineStyle: { color: '#f0f2f5', type: 'dashed' } }
        },
        yAxis: [
            {
                type: 'value',
                name: '净利润（亿元）',
                nameTextStyle: { color: '#8e8ea0', fontSize: 11 },
                splitLine: { lineStyle: { color: '#f0f2f5' } },
                axisLabel: { color: '#8e8ea0' }
            },
            {
                type: 'value',
                name: '营收（亿元）',
                nameTextStyle: { color: '#8e8ea0', fontSize: 11 },
                splitLine: { show: false },
                axisLabel: { color: '#8e8ea0' }
            }
        ],
        series: [
            {
                name: '实际净利润',
                type: 'bar',
                data: [
                    { value: d.netProfit[0], itemStyle: { color: '#1a3a6b' } },
                    { value: d.netProfit[1], itemStyle: { color: 'rgba(245, 166, 35, 0.6)' } },
                    { value: d.netProfit[2], itemStyle: { color: 'rgba(245, 166, 35, 0.6)' } },
                    { value: d.netProfit[3], itemStyle: { color: 'rgba(245, 166, 35, 0.6)' } }
                ],
                barMaxWidth: 40,
                yAxisIndex: 0
            },
            {
                name: '一致预期',
                type: 'line',
                data: d.netProfit,
                symbol: 'circle', symbolSize: 8,
                lineStyle: { color: '#f5a623', width: 3, type: 'dashed' },
                itemStyle: { color: '#f5a623' },
                yAxisIndex: 0,
                markPoint: {
                    data: [
                        { type: 'max', name: '预期峰值' }
                    ],
                    symbolSize: 50,
                    label: { formatter: '{c}亿', color: '#fff' }
                }
            },
            {
                name: '营收(右轴)',
                type: 'line',
                data: d.revenue,
                symbol: 'circle', symbolSize: 6,
                lineStyle: { color: '#0891b2', width: 2 },
                itemStyle: { color: '#0891b2' },
                yAxisIndex: 1
            }
        ]
    });

    window.addEventListener('resize', () => chart.resize());
}
