import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import './HomeMain.css'
import { EnvironmentFilled, ContainerFilled } from '@ant-design/icons';

const HomeMain = () => {
    const chartRef = useRef()
    const chartRef2 = useRef()
    const options = {
        // 标题
        title: {
            text: "26,900",
            subtext: "Sales in current month",
            x: 'left',
            y: 'top',
            itemGap: 10,
            textStyle: {
                fontSize: 26,
                fontWeight: 200,
                color: '#333'
            },
            subtextStyle: {
                color: '#333'
            }
        },
        // 提示框组件
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(231, 244, 255)',
            borderColor: '#333',   // 提示边框颜色
            borderRadius: 0,   // 提示边框圆角，单位px，默认为4
            borderWidth: 0,   // 提示边框线宽，单位px，默认为0（无边框）
            padding: 10,  // 提示内边距，单位px，默认各方向内边距为5
            axisPointer: {   // 坐标轴指示器，坐标轴触发有效
                type: 'line',  // 默认为直线，可选为：'line' 'shadow'
                lineStyle: {  // 直线指示器样式设置
                    color: 'rgb(91, 106, 173, 0.2)',
                    width: 1,
                    type: 'dashed'
                },
                shadowStyle: {   // 阴影指示器样式设置
                    width: 0,    // 阴影大小
                    color: 'rgba(255,255,255,0)'  // 阴影颜色
                }
            },
            textStyle: {
                color: 'rgb(91, 106, 173)'
            },
        },
        // 图例组件
        legend: {
            data: ['销量'],
            show: false,
        },
        // x轴
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug'],
            show: false,
        },
        // y轴
        yAxis: {
            type: 'value',
            show: false,
        },
        series: [{
            data: [20, 26, 29, 35, 35, 30, 21, 24],
            type: 'line', // 折线图
            // name: '销量'，
            showSymbol: false,
            symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
            symbolSize: 5,    //小圆点的大小
            lineStyle: {
                width: 1,
                // type: 'dotted' //'dotted'虚线 'solid'实线
            }
        }],
        grid: {
            x: -25,
            y: 60,
            x2: 5,
            y2: -50,
            borderWidth: 1
        },
    }
    const options2 = {
        // 标题
        title: {
            text: "32,900",
            subtext: "Sales in current month",
            x: 'left',
            y: 'top',
            itemGap: 10,
            textStyle: {
                fontSize: 26,
                fontWeight: 200,
                color: '#333'
            },
            subtextStyle: {
                color: '#333'
            }
        },
        // 提示框组件
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(231, 244, 255)',
            borderColor: '#333',   // 提示边框颜色
            borderRadius: 0,   // 提示边框圆角，单位px，默认为4
            borderWidth: 0,   // 提示边框线宽，单位px，默认为0（无边框）
            padding: 10,  // 提示内边距，单位px，默认各方向内边距为5
            axisPointer: {   // 坐标轴指示器，坐标轴触发有效
                type: 'line',  // 默认为直线，可选为：'line' 'shadow'
                lineStyle: {  // 直线指示器样式设置
                    color: 'rgb(91, 106, 173, 0.2)',
                    width: 1,
                    type: 'dashed'
                },
                shadowStyle: {   // 阴影指示器样式设置
                    width: 0,    // 阴影大小
                    color: 'rgba(255,255,255,0)'  // 阴影颜色
                }
            },
            textStyle: {
                color: 'rgb(91, 106, 173)'
            },
        },
        // 图例组件
        legend: {
            data: ['销量'],
            show: false,
        },
        // x轴
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug'],
            show: false,
        },
        // y轴
        yAxis: {
            type: 'value',
            show: false,
        },
        series: [{
            data: [20, 24, 35, 44, 29, 32, 25, 24],
            type: 'line', // 折线图
            // name: '销量'，
            showSymbol: false,
            symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
            symbolSize: 5,    //小圆点的大小
            lineStyle: {
                width: 1,
                // type: 'dotted' //'dotted'虚线 'solid'实线
            }
        }],
        grid: {
            x: -25,
            y: 60,
            x2: 5,
            y2: -50,
            borderWidth: 1
        },
    }

    useEffect(() => {
        // 创建一个echarts实例，返回echarts实例。不能在单个容器中创建多个echarts实例
        const chart = echarts.init(chartRef.current)
        const chart2 = echarts.init(chartRef2.current)

        // 设置图表实例的配置项和数据
        chart.setOption(options)
        chart2.setOption(options2)

        // 组件卸载
        return () => {
            // myChart.dispose() 销毁实例。实例销毁后无法再被使用
            chart.dispose()
            chart2.dispose()
        }
    })

    return (
        // 宽度要大，不然y轴有些名称可能不会显示
        <div className='content'>
            <div className='chartBox1'>
                <div className='chart1' ref={chartRef}></div>
                <div className='chart1Tip'>
                    <div>
                        <span>Pages / Visit</span>
                        <p>236 321.80</p>
                    </div>
                    <div>
                        <span>% New Sales</span>
                        <p>12.853%</p>
                    </div>
                    <div>
                        <span>Last Month</span>
                        <p>432.021</p>
                    </div>
                </div>
            </div>
            <div className='chartBox1'>
                <div className='chart1' ref={chartRef2}></div>
                <div className='chart1Tip'>
                    <div>
                        <span>Pages / Visit</span>
                        <p>236 321.80</p>
                    </div>
                    <div>
                        <span>% New Sales</span>
                        <p>12.853%</p>
                    </div>
                    <div>
                        <span>Last Month</span>
                        <p>432.021</p>
                    </div>
                </div>
            </div>

            {/* 新订单表格 */}
            <div className='orderNew'>
                <div className='orderTitle'>New Order.</div>
                <div className='orderTip'>
                    <h1>You have new order !</h1>
                    <p><EnvironmentFilled />Today is 2022-09-13. Check your list to see detail.</p>
                </div>
                <div className='orderInfoBox'>
                    <div className='orderInfoItem'>
                        <div className='orderInfoTime'>
                            <ContainerFilled />
                            <p>22.09.13</p>
                        </div>
                        <div className='orderInfoText'>
                            <h1>Television</h1>
                            <p>Conference on the sales results for the previous year. Monica please examine sales trends in marketing and products.</p>
                        </div>
                    </div>
                    <div className='orderInfoItem'>
                        <div className='orderInfoTime'>
                            <ContainerFilled />
                            <p>22.09.13</p>
                        </div>
                        <div className='orderInfoText'>
                            <h1>Frigde</h1>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.</p>
                        </div>
                    </div>
                    <div className='orderInfoItem'>
                        <div className='orderInfoTime'>
                            <ContainerFilled />
                            <p>22.09.12</p>
                        </div>
                        <div className='orderInfoText'>
                            <h1>Air Container</h1>
                            <p>Lorem Ipsum has been the industry's standard dummy text ever since.</p>
                        </div>
                    </div>
                    <div className='orderInfoItem'>
                        <div className='orderInfoTime'>
                            <ContainerFilled />
                            <p>22.09.12</p>
                        </div>
                        <div className='orderInfoText2'>
                            <h1>Air Container</h1>
                            <p>Lorem Ipsum has been the industry's standard dummy text ever since.</p>
                        </div>
                    </div>
                    <div className='point'>....</div>
                </div>
            </div>
        </div>
    )
}

export default HomeMain;

