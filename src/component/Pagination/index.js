import React, { useState, useEffect } from 'react';

const Pagination = ({ callback, total }) => {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        callback(currentPage);
    },[callback, currentPage]);


    return (
        <div>
            <button className="btn btn-success"
                onClick={() => (currentPage === 1) ? 1 : setCurrentPage(currentPage - 1)}>
                &lt;&lt;
            </button>
            <b className="mx-5">
                {
                    currentPage
                }
            </b>
            <button className="btn btn-success"
                onClick={() => (currentPage === total) ? currentPage : setCurrentPage(currentPage + 1)}>
                &gt;&gt;
            </button>
        </div>
    )
};

export default Pagination;