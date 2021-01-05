import React from 'react';
import Range from './Range';

const RangeFixed = (props) => {

    const getRangePosition = (value) => {
        const { values } = props;
        let minAbsValue = 10000;
        let minPosValue = 0;
        values.forEach((range, index) => {
            const dif = Math.abs(value - range);
            if (dif < minAbsValue) {
                minPosValue = index;
                minAbsValue = dif;
            }
        });

        return minPosValue;
    }
    const handleMinMove = (newValue, newPercentage, onChangeMin, handleMinUpdate, sliderMin, sliderMax) => {
        const rangeIndex = getRangePosition(newValue);
        const value = props.values[rangeIndex];
        if (value < sliderMax) {
            onChangeMin(value)
            handleMinUpdate(value, value);
        }
    }

    const handleMaxMove = (newValue, newPercentage, onChangeMax, handleMaxUpdate, sliderMin, sliderMax) => {
        const rangeIndex = getRangePosition(newValue);
        const value = props.values[rangeIndex];
        if (value > sliderMin) {
            onChangeMax(value)
            handleMaxUpdate(value, value);
        }
    }
    return <Range {...props} handleMinMove={handleMinMove} handleMaxMove={handleMaxMove} />
};

export default RangeFixed;