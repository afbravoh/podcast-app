export const toHoursAndMinutes = (totalSeconds: number) => {
    const totalMinutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${parseNumberRange(hours)}:${parseNumberRange(minutes)}:${parseNumberRange(seconds)}`
}

const parseNumberRange = (number: number) => {
    return Math.floor(number).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })
}