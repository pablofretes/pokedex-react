<<<<<<< Updated upstream
import React from 'react';
=======
import React  from 'react';
>>>>>>> Stashed changes
import { useSelector } from 'react-redux';

const Reviews = () => {
    const user = useSelector(state => state.user);
<<<<<<< Updated upstream

=======
    console.log(user);
    
>>>>>>> Stashed changes
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