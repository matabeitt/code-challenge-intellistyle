import React from 'react';
import axios from 'axios';

const url = 'https://s3-eu-west-1.amazonaws.com/stylr-ai-engine-srv-data/srv/data/archive/zalando-women-07-10-2017/garment_items.jl';

class ItemList extends React.Component {

    constructor() {
        super();
        this.state = {
            keyword: null,
            loading: false,
            list: [],
        }
    }

    componentDidMount = () => {
        this.setState({ keyword: this.props.query })
        this.handleKeyworkRequest(this.state.keyword)
    }

    handleKeyworkRequest = () => {
        this.setState({loading: true});
        
        axios.get(url)
            .then(res => {
                let data = res.data.split('\n');
                let next = [];
                let item = null;
                for (let i = 0; i < data.length-1; i++) {
                    item = this.analyseData(data[i]);
                    item !== null ? next.push(item) : next.push();
                }
                this.setState({list: next});
            })
            .catch(err => {
                console.log(err);
            })
            .finally( () => {
                this.setState({loading: false})
            })
    }

    analyseData = (data) => {
        console.log(true);
        data = JSON.parse(data);
        let keywords = this.state.keyword.split(" ");

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                // console.log(data[key])
                if (typeof(data[key]) === 'string' && data[key].includes(keywords[0])) {
                    return data;
                }
            }
        }
        return null;
    }

    render = () => {
        const listComponent = this.state.list.map(item => 
            <li key={item.product_id} className="product-result-item">
                {item.product_title}
            </li>
            );
        return (
            <div>
                {
                    this.state.loading ?
                    <h1>Loading</h1>
                    :
                    this.state.list.length > 0 ?
                    listComponent
                    :
                    <h1>Empty</h1>
                }
            </div>
        )
    }
}

export default ItemList;