import React, { useState, useEffect } from 'react';
import mockedServer from '../utils/server';
import RangeNormal from '../components/Range/RangeNormal';

const Exercise1 = () => {
    const [values, setValues] = useState({ min: 1, max: 100 });
    const [sliderMin, setSliderMin] = useState(values.min);
    const [sliderMax, setSliderMax] = useState(values.max);

    useEffect(() => {
        const getDataFromServer = async () => {
            const data = await mockedServer();
            setValues(data);
        }
        getDataFromServer();
    }, []);

    return <div className='exercise-wrapper'>
        <RangeNormal
            initial={values.min}
            sliderMin={sliderMin}
            sliderMax={sliderMax}
            min={values.min}
            max={values.max}
            onChangeMax={(value) => setSliderMax(value)}
            onChangeMin={(value) => setSliderMin(value)}
            isReadOnly={false}
            useFixedValues={false}
        />
    </div>
}

export default Exercise1;
