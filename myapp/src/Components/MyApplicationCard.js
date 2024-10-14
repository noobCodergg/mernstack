import React from 'react';

const MyApplicationCard = ({ item }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
            <div className="p-4">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                {item.status==='Approved' ? <p className='text-green-500'>{item.status}</p>:<p className='text-red-700'>{item.status}</p>}
            </div>
        </div>
    );
};

export default MyApplicationCard;