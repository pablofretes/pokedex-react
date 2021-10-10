import React  from 'react';
import { useSelector } from 'react-redux';

const Reviews = () => {
    const user = useSelector(state => state.user);
    console.log(user);
    
    if(!user){
        return null;
    };

    return (
        <>
            {user && user.reviews.map(r => {
                    return (
                        <div>
                            {r.content}
                        </div>
                    );
            })}
        </>
    );
};

export default Reviews;