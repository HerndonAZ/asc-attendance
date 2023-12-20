export function formatDateForUI(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    //  hour: 'numeric',
   //   minute: 'numeric',
   //   second: 'numeric',
    //  timeZoneName: 'short',
    };
  
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  
    return formattedDate;
  }
  
  // Example usage
  