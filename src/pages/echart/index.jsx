import React from 'react'
import { Chart, Geom, Axis, Tooltip, Legend, Coord, Guide, Label } from 'bizcharts'
import DataSet from '@antv/data-set'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
  }
  render() {
    const data = [
      { genre: 'Sports', sold: 275, income: 2300 },
      { genre: 'Strategy', sold: 115, income: 667 },
      { genre: 'Action', sold: 120, income: 982 },
      { genre: 'Shooter', sold: 350, income: 5271 },
      { genre: 'Other', sold: 150, income: 3710 },
    ]
    // 定义度量
    const cols = {
      sold: { alias: '销售量' },
      genre: { alias: '游戏种类' },
    }
    const data2 = [
      {
        month: 'Jan',
        city: 'Tokyo',
        temperature: 7,
      },
      {
        month: 'Jan',
        city: 'London',
        temperature: 3.9,
      },
      {
        month: 'Feb',
        city: 'Tokyo',
        temperature: 6.9,
      },
      {
        month: 'Feb',
        city: 'London',
        temperature: 4.2,
      },
      {
        month: 'Mar',
        city: 'Tokyo',
        temperature: 9.5,
      },
      {
        month: 'Mar',
        city: 'London',
        temperature: 5.7,
      },
      {
        month: 'Apr',
        city: 'Tokyo',
        temperature: 14.5,
      },
      {
        month: 'Apr',
        city: 'London',
        temperature: 8.5,
      },
      {
        month: 'May',
        city: 'Tokyo',
        temperature: 18.4,
      },
      {
        month: 'May',
        city: 'London',
        temperature: 11.9,
      },
      {
        month: 'Jun',
        city: 'Tokyo',
        temperature: 21.5,
      },
      {
        month: 'Jun',
        city: 'London',
        temperature: 15.2,
      },
      {
        month: 'Jul',
        city: 'Tokyo',
        temperature: 25.2,
      },
      {
        month: 'Jul',
        city: 'London',
        temperature: 17,
      },
      {
        month: 'Aug',
        city: 'Tokyo',
        temperature: 26.5,
      },
      {
        month: 'Aug',
        city: 'London',
        temperature: 16.6,
      },
      {
        month: 'Sep',
        city: 'Tokyo',
        temperature: 23.3,
      },
      {
        month: 'Sep',
        city: 'London',
        temperature: 14.2,
      },
      {
        month: 'Oct',
        city: 'Tokyo',
        temperature: 18.3,
      },
      {
        month: 'Oct',
        city: 'London',
        temperature: 10.3,
      },
      {
        month: 'Nov',
        city: 'Tokyo',
        temperature: 13.9,
      },
      {
        month: 'Nov',
        city: 'London',
        temperature: 6.6,
      },
      {
        month: 'Dec',
        city: 'Tokyo',
        temperature: 9.6,
      },
      {
        month: 'Dec',
        city: 'London',
        temperature: 4.8,
      },
    ]
    const cols2 = {
      month: {
        range: [0, 1],
      },
    }
    const { DataView } = DataSet
    const { Html } = Guide
    const data3 = [
      {
        item: '事例一',
        count: 40,
      },
      {
        item: '事例二',
        count: 21,
      },
      {
        item: '事例三',
        count: 17,
      },
      {
        item: '事例四',
        count: 13,
      },
      {
        item: '事例五',
        count: 9,
      },
    ]
    const dv = new DataView()
    dv.source(data3).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    })
    const cols3 = {
      percent: {
        formatter: (val) => {
          val = `${val * 100}%`
          return val
        },
      },
    }
    return (
      <div>
        <div style={{ clear: 'both' }}>
          <p>柱状图</p>
          <Chart style={{ float: 'left' }} width={600} height={600} data={data} scale={cols}>
            <Axis name="genre" title />
            <Axis name="sold" title />
            <Legend position="top" dy={-20} />
            <Tooltip />
            <Geom type="interval" position="genre*sold" color="genre" />
          </Chart>
          <Chart
            height={600}
            width={600}
            style={{ float: 'right' }}
            data={dv}
            scale={cols3}
            padding={[80, 100, 80, 80]}
          >
            <Coord type="theta" radius={0.75} innerRadius={0.6} />
            <Axis name="percent" />
            <Legend
              position="right"
              offsetY={(-window.innerHeight / 2) + 120}
              offsetX={-100}
            />
            <Tooltip
              showTitle={false}
              itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
            />
            <Guide>
              <Html
                position={['50%', '50%']}
                html="<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>主机<br><span style=&quot;color:#262626;font-size:2.5em&quot;>200</span>台</div>"
                alignX="middle"
                alignY="middle"
              />
            </Guide>
            <Geom
              type="intervalStack"
              position="percent"
              color="item"
              tooltip={[
                'item*percent',
                (item, percent) => {
                  percent = `${percent * 100}%`
                  return {
                    name: item,
                    value: percent,
                  }
                },
              ]}
              style={{
                lineWidth: 1,
                stroke: '#fff',
              }}
            >
              <Label
                content="percent"
                formatter={(val, item) => `${item.point.item}: ${val}`}
              />
            </Geom>
          </Chart>
        </div>
        <p>折线图</p>
        <Chart height={400} data={data2} scale={cols2} forceFit>
          <Legend />
          <Axis name="month" />
          <Axis
            name="temperature"
            label={{
              formatter: val => `${val}°C`,
            }}
          />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="line"
            position="month*temperature"
            size={2}
            color="city"
            shape="smooth"
          />
          <Geom
            type="point"
            position="month*temperature"
            size={4}
            shape="circle"
            color="city"
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
        </Chart>
      </div>
    )
  }
}
