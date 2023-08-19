module.exports ={
    getTransactionNumber(){
        const timestamp = Date.now(); // Get the current timestamp in milliseconds
        const randomDigits = Math.floor(Math.random() * 10000); // Generate a random 4-digit number

        return `TXN-${timestamp}-${randomDigits}`;
    },

    getTransactionTime(){
        const currentTime = new Date();
        return currentTime.toLocaleString('en-US', {timeZone: 'America/New_York'})
    }
}