/* eslint-disable prettier/prettier */
export const getErrorMessage = (errorCode) => {
    if (errorCode === 'auth/invalid-email') { return 'Email is invalid'; }
    if (errorCode === 'auth/user-not-found') { return 'User does not exists'; }
    if (errorCode === 'auth/wrong-password') { return 'Incorrect password'; }
    if (errorCode === 'auth/email-already-in-use') { return 'Email already exists'; }
    if (errorCode === 'auth/weak-password') { return 'Password is too weak'; }
    if (errorCode === 'auth/invalid-credential') { return 'Invalid credentials'; }
    if (errorCode === 'auth/network-request-failed') { return 'Please check your internet connection'; }
};

export const isTimeInPast = (dateObject) => {
    // Get current date and time
    const currentDate = new Date();

    // Extract hours, minutes, and seconds from the dateObject
    const objHours = dateObject.getHours();
    const objMinutes = dateObject.getMinutes();
    const objSeconds = dateObject.getSeconds();

    // Extract hours, minutes, and seconds from the current date
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentSeconds = currentDate.getSeconds();

    // Compare the time components
    if (objHours < currentHours) {
        return true;
    } else if (objHours === currentHours) {
        if (objMinutes < currentMinutes) {
            return true;
        } else if (objMinutes === currentMinutes) {
            return objSeconds < currentSeconds;
        }
    }

    return false;
};

export const isDateGreaterThanToday = (givenDate) => {
    // Get current date
    const today = new Date();

    // Extract year, month, and day components from the given date
    const givenYear = givenDate.getFullYear();
    const givenMonth = givenDate.getMonth();
    const givenDay = givenDate.getDate();

    // Extract year, month, and day components from today's date
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();

    // Compare the date components
    if (givenYear > todayYear) {
        return true;
    } else if (givenYear === todayYear) {
        if (givenMonth > todayMonth) {
            return true;
        } else if (givenMonth === todayMonth) {
            return givenDay > todayDay;
        }
    }

    return false;
};
