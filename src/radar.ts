import 'echarts/lib/chart/radar';
import * as echarts from 'echarts/lib/echarts';
import { EChartOption } from 'echarts/lib/echarts';

class RadarChart {
    private workYears: number;

    constructor(workYears: number) {
        this.workYears = workYears;
    }

    public initChart(): void {
        const chartDom = document.getElementById('radar') as HTMLDivElement;

        const chart = echarts.init(chartDom);

        const option: EChartOption = {
            radar: [
                {
                    indicator: [
                        { name: 'Angular', max: this.workYears },
                        { name: 'Java', max: this.workYears },
                        { name: 'React', max: this.workYears },
                        { name: 'Python', max: this.workYears },
                        { name: 'Vue', max: this.workYears },
                    ],
                    center: ['50%', '50%'],
                },
            ],
            series: [
                {
                    type: 'radar',
                    silent: true,
                    areaStyle: {
                        color: 'rgba(194, 53, 49, 1)',
                    },
                    lineStyle: {
                        color: 'rgba(194, 53, 49, 1)',
                    },
                    data: [
                        {
                            value: [this.workYears - 2, this.workYears - 2, this.workYears - 7, 1, 1],
                        },
                    ],
                    symbol: 'circle',
                    symbolSize: 4,
                    itemStyle: {
                        borderWidth: 0.5,
                        borderColor: 'rgba(194, 53, 49, 1)',
                        color: 'rgba(255, 255, 255, 1)',
                    },
                },
            ],
        };

        chart.setOption(option);
        setTimeout(() => {
            chart.resize();
            chartDom.getElementsByTagName('canvas')[0].style.position = 'unset';
        }, 10);
        window.addEventListener('resize', () => chart.resize());
    }
}

export { RadarChart };
