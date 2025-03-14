export const calculateFine = (dueDate) => {
    const finePerHour = 0.1  // Fine rate: 10 cents per hour
    const today = new Date()  // Get current date and time
    
    // Check if today is past the due date
    if (today > dueDate) {
        const lateHours = Math.ceil((today - dueDate) / (1000 * 60 * 60)) // Calculate late hours (rounded up)
        const fine = lateHours * finePerHour  // Calculate total fine
        return fine
    }
    
    // No fine if not overdue
    return 0
}
