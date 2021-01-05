import React, { useState } from 'react';
import { Input } from "@chakra-ui/react";
import './styles.css';

const getPercentage = (current, min, max) =>
    ((current - min) / (max - min)) * 100;

const getValue = (percentage, min, max) =>
    ((max) / 100) * percentage + min - 1;

const getLeft = (percentage) => `calc(${percentage}% - 5px)`;

const Range = ({
    initial,
    min,
    max,
    formatFn = (number) => parseFloat(number).toFixed(0),
    isReadOnly,
    handleMinMove,
    handleMaxMove,
}) => {

    const initialPercentage = getPercentage(max, min, max);
    const minInitialPercentage = getPercentage(initial, min, max);
    const rangeRef = React.useRef();
    const rangeProgressRef = React.useRef();
    const thumbRef = React.useRef();
    const minThumbRef = React.useRef();
    const currentMin = React.useRef();
    const currentRef = React.useRef();
    const diff = React.useRef();
    const [sliderMin, onChangeMin] = useState(min);
    const [sliderMax, onChangeMax] = useState(max);

    const handleUpdate = React.useCallback(
        (value, percentage) => {
            thumbRef.current.style.left = getLeft(percentage);
            currentRef.current.textContent = formatFn(value);
        },
        [formatFn]
    );

    const handleMinUpdate = React.useCallback(
        (value, percentage) => {
            minThumbRef.current.style.left = getLeft(percentage);
            currentMin.current.textContent = formatFn(value);
        }, [formatFn]
    )

    const handleMouseMove = (event) => {
        let newX =
            event.clientX -
            diff.current -
            rangeRef.current.getBoundingClientRect().left;

        const end =
            rangeRef.current.offsetWidth - thumbRef.current.offsetWidth;

        const minX = minThumbRef.current.offsetLeft > min ? minThumbRef.current.offsetLeft : min;

        const start = min;

        if (newX < start) {
            newX = min;
        }
        if (newX >= end) {
            newX = end;
        }
        if (newX <= minX) {
            newX = minX + 20;
        }

        const newPercentage = Math.floor(getPercentage(newX, start, end));
        const newValue = Math.floor(getValue(newPercentage, min, max));
        handleMaxMove(newValue, newPercentage, onChangeMax, handleUpdate, sliderMin, sliderMax);
    };

    const handleMinMouseMove = (event) => {

        let newX = event.clientX - diff.current - rangeRef.current.getBoundingClientRect().left;

        const end = rangeRef.current.offsetWidth - minThumbRef.current.offsetWidth;
        const maxThumbX = thumbRef.current.offsetLeft;
        const start = min;

        //Check limits
        if (newX < start) {
            newX = min;
        }
        if (newX >= end) {
            newX = end;
        }

        if (newX >= maxThumbX)
            newX = maxThumbX - 20;

        const newPercentage = Math.floor(getPercentage(newX, start, end));
        const newValue = Math.floor(getValue(newPercentage, min, max));
        handleMinMove(newValue, newPercentage, onChangeMin, handleMinUpdate, sliderMin, sliderMax)

    };
    const handleMouseUp = () => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
    };

    const handleMouseDown = (event) => {
        diff.current =
            event.clientX - thumbRef.current.getBoundingClientRect().left;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMinMouseUp = (event) => {
        document.removeEventListener('mousemove', handleMinMouseMove);
        document.removeEventListener('mouseup', handleMinMouseUp);
    };
    const handleMinMouseDown = (event) => {
        diff.current =
            event.clientX - minThumbRef.current.getBoundingClientRect().left;
        document.addEventListener('mousemove', handleMinMouseMove);
        document.addEventListener('mouseup', handleMinMouseUp);
    }

    React.useLayoutEffect(() => {
        handleUpdate(max, initialPercentage);
    }, [handleUpdate, max, initialPercentage]);

    React.useLayoutEffect(() => {
        handleMinUpdate(min, minInitialPercentage);
    }, [handleMinUpdate, min, minInitialPercentage]);

    return (
        <>
            <div className='header'>
                <div>
                    <Input
                        focusBorderColor="#3d5ef8"
                        type="text"
                        placeholder={`Min: ${min}`}
                        size='md'
                        isReadOnly={isReadOnly}
                        value={sliderMin}
                        variant="flushed"
                        className='input'
                        onChange={(event) => {
                            event.preventDefault();
                            let value = min;
                            if (event.target.value < parseInt(currentRef.current.textContent) && event.target.value >= min && event.target.value <= max)
                                value = parseInt(event.target.value);

                            handleMinUpdate(value, value);
                            onChangeMin(event.target.value);

                        }
                        }
                    /><span style={{ visibility: 'hidden' }} ref={currentMin} /></div>
                <div>
                    <Input
                        focusBorderColor="#3d5ef8"
                        type="text"
                        placeholder={`Max: ${max}`}
                        size='md'
                        isReadOnly={isReadOnly}
                        value={sliderMax}
                        variant="flushed"
                        className='input'
                        onChange={(event) => {
                            event.preventDefault();
                            let value = max;
                            if ((event.target.value > parseInt(currentMin.current.textContent)) && event.target.value >= min && event.target.value <= max)
                                value = parseInt(event.target.value);

                            handleUpdate(value, value);
                            onChangeMax(event.target.value)
                        }
                        }
                    /><span style={{ visibility: 'hidden' }} ref={currentRef} />
                </div>
            </div>
            <div className='progress-bar-container' ref={rangeRef}>
                <div className='progress-bar-range' ref={rangeProgressRef} />
                <div className='thumb' ref={minThumbRef} onMouseDown={handleMinMouseDown} />
                <div className='thumb' ref={thumbRef} onMouseDown={handleMouseDown} />
            </div>
        </>
    );
};

export default Range;
