function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
   
    const getWorkingDaysExcludingFridays = (year, month) => {
        let workingDays = 0;
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            // Check if it's a Friday
            if (date.getDay() !== 5) {
                workingDays++;
            }
        }
        return workingDays;
    };

    
    const getDaysWorkedExcludingFridays = (start, end) => {
        let count = 0;
        let currentDate = new Date(start);
        while (currentDate <= end) {
            if (currentDate.getDay() !== 5) {
                count++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return count;
    };

    const start = new Date(startDate);
    const end = new Date(endDate);
    const result = {
        daysExcludingFridays: [],
        daysWorkedExcludingFridays: [],
        monthlyTargets: [],
        totalTarget: 0
    };

    
    let currentMonth = new Date(start.getFullYear(), start.getMonth());
    const endMonth = new Date(end.getFullYear(), end.getMonth());

    while (currentMonth <= endMonth) {
        const month = currentMonth.getMonth();
        const year = currentMonth.getFullYear();

       
        const totalDaysInMonth = getWorkingDaysExcludingFridays(year, month);
        result.daysExcludingFridays.push(totalDaysInMonth);

       
        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 0);
        const rangeStart = currentMonth >= start ? currentMonth : start;
        const rangeEnd = monthEnd <= end ? monthEnd : end;
        const workedDays = getDaysWorkedExcludingFridays(rangeStart, rangeEnd);
        result.daysWorkedExcludingFridays.push(workedDays);

       
        if (totalDaysInMonth > 0) {
            const monthlyTarget = (workedDays / totalDaysInMonth) * (totalAnnualTarget / 12);
            result.monthlyTargets.push(monthlyTarget);
            result.totalTarget += monthlyTarget;
        } else {
            result.monthlyTargets.push(0);
        }

      
        currentMonth.setMonth(currentMonth.getMonth() + 1);
    }

    return result;
}


const result = calculateTotalTarget('2024-01-15', '2024-03-10', 120000);
console.log(result);
