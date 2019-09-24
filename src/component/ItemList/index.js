import React from 'react';
import axios from 'axios';

import Pagination from '../Pagination';

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
            itemsPerPage: 20,
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
                this.updatePage(1);
                this.setState({ loading: false });
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

    updatePage = (page) => {
        this.setState({
            currentPage: page,
        });
        const lastItemIndex = this.state.currentPage * this.state.itemsPerPage;
        const firstItemIndex = lastItemIndex - this.state.itemsPerPage;

        this.setState({
            currentList: this.state.list.slice(firstItemIndex, lastItemIndex),
        });
    }


    render = () => {
        const listComponent = this.state.currentList.map(item =>
            <div className="card d-inline-flex m-2" key={item.product_id} style={{width: 18 + "rem"}}>
                <img className="card-img-top" src={item.image_urls[0]} alt="Card image cap"></img>
                <div className="card-body">
                    <h5 className="card-title">{item.product_title}</h5>
                    <p className="card-text">{item.product_description.substring(0, 180)}</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
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

                            <Pagination
                                callback={this.updatePage}
                                total={this.state.list.length / this.state.itemsPerPage}
                            />

                        </div>

                }
            </div>
        )
    }
}

export default ItemList;