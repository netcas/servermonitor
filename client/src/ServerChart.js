import React, { Component } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const tickFormatter = (tick) => {
    let date = new Date(tick * 1000);
    return date.toISOString();
};

class ServerChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usages: []
        };
    }

    getUsagesCurrent = () => {
        fetch('/api/usage/current')
            .then(res => res.json())
            .then(usages => this.setState({ usages }));
    }

    refreshData = () => {
        this.getUsagesCurrent();
        console.log(this.state.usages);
    }

    componentDidMount() {
        this.interval = setInterval(this.refreshData, 2000);
        this.getUsagesCurrent();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <AreaChart width={1280} height={600} data={this.state.usages}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="time" tickFormatter={tickFormatter} />
                <YAxis type="number" domain={[0, 100]} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="cpu" stroke="#8884d8" fillOpacity={1} fill="url(#colorCpu)" />
                <Area type="monotone" dataKey="mem" stroke="#82ca9d" fillOpacity={1} fill="url(#colorMem)" />
            </AreaChart>
        );
    }
}

export default ServerChart;