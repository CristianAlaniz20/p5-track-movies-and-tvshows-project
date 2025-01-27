// converts minutes integer to hours and minutes string
export function convertMinutesToHoursAndMinutes(minutes) {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours} hour(s) and ${remainingMinutes} minute(s)`
}

// converts a streaming options string into an array
export function convertStringToAnArray(string) {
    return string ? string.split("|") : []
}

// Capitalize the first letter and lowercase the rest for every word in a string
export function capitalizeAndLowerCaseWords(str) {
    return str
      // Split the string into an array of words
      .split(' ')             
      // Capitalize the first letter and lowercase the rest
      .map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ) 
      // Join the words back into a single string
      .join(' ')          
  }