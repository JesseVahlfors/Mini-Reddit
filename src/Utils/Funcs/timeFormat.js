export const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
    }

    return new Intl.DateTimeFormat(navigator.language, options).format(date);
};