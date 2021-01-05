import React from 'react';
import Range from './Range';

const RangeFixed = (props) => {

    const handleMinMove = (newValue, newPercentage, onChangeMin, handleMinUpdate) => {
        onChangeMin(newValue)
        handleMinUpdate(newValue, newPercentage);

    }
    const handleMaxMove = (newValue, newPercentage, onChangeMax, handleMaxUpdate) => {
        onChangeMax(newValue)
        handleMaxUpdate(newValue, newPercentage);

    }
    return <Range {...props} handleMinMove={handleMinMove} handleMaxMove={handleMaxMove} />
};

export default RangeFixed;