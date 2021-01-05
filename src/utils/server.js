const mockedServer = async () => {

    let min, max;

    min = Math.random(0, 1) * 100;
    max = Math.random(0, 1) * 100;
    while (min > max) max = Math.random(0, 1) * 100;

    return { min: 1, max: 100 };
}

export const mockedServerExercise2 = async () => {
    return [0.99, 5.99, 10.99, 20.99, 30.99, 50.99, 70.99, 80.99, 99.99];
}
export default mockedServer;