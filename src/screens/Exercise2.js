import React, { useState, useEffect } from 'react';
import { mockedServerExercise2 } from '../utils/server';
import RangeFixed from '../components/Range/RangeFixed';

const Exercise2 = () => {
    const [values, setValues] = useState([0.99, 99.99]);
    const [sliderMin, setSliderMin] = useState(values[0]);
    const [sliderMax, setSliderMax] = useState(values[values.length - 1]);

    useEffect(() => {
        const getDataFromServer = async () => {
            const data = await mockedServerExercise2();
            setValues(data);
        }
        getDataFromServer();
    }, []);

    return <div className='exercise-wrapper'>
        <RangeFixed
            initial={values[0]}
            sliderMin={sliderMin}
            sliderMax={sliderMax}
            min={values[0]}
            max={values[values.length - 1]}
            onChangeMax={(value) => setSliderMax(value)}
            onChangeMin={(value) => setSliderMin(value)}
            isReadOnly={true}
            useFixedValues={true}
            values={values}
        />
    </div>
}

export default Exercise2;
