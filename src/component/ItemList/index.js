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
            currentList: [],
            currentPage: 1,
            itemsPerPage: 12,
        };
    }

    componentDidMount = () => {
        this.setState({ keyword: this.props.query })
        this.handleKeyworkRequest(this.state.keyword)
    }

    handleKeyworkRequest = () => {
        this.setState({ loading: true });

        axios.get(url)
            .then(res => {
                let data = res.data.split('\n');
                let next = [];
                let item = null;
                for (let i = 0; i < data.length - 1; i++) {
                    item = this.analyseData(data[i]);
                    item !== null ? next.push(item) : next.push();
                }
                this.setState({
                    list: next,
                });
            })
            .catch(err => {
                this.setState({
                    list: ["There was an error"],
                });
            })
            .finally(() => {
                const lastItemIndex = this.state.currentPage * this.state.itemsPerPage;
                const firstItemIndex = lastItemIndex - this.state.itemsPerPage;
                
                this.setState({
                    loading: false,
                    currentList: this.state.list.slice(firstItemIndex, lastItemIndex),
                });
            })
    }

    analyseData = (data) => {
        data = JSON.parse(data);
        let keywords = this.state.keyword.split(" ");

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                if (typeof (data[key]) === 'string' && data[key].includes(keywords[0])) {
                    return data;
                }
            }
        }
        return null;
    }


    render = () => {
        const listComponent = this.state.currentList.map(item => 
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
                        <div>
                            <h1>search: {this.state.keyword}</h1>
                            {
                                this.state.currentList.length > 0 ?
                                listComponent
                                :
                                <h1>Empty</h1>
                            }
                        </div>
                        
                }
            </div>
        )
    }
}

export default ItemList;