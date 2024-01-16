
export const getTableData = ({data, useMerged} : {data: any, useMerged: boolean}) => {
    if (useMerged && data) {
      // Use the mergeData function here
      // Example usage: const mergedData = mergeData(records);
      // Replace the following line with the actual merged data
      const mergedData = data.reduce((acc: any, current: any) => {
        const existingItem = acc.find(
            (item: { production_season: any; perf_time: any }) =>
              item.production_season === current.production_season &&
              item.perf_time === current.perf_time
          );
          
        if (existingItem) {
          // If the item already exists, update attendance and revenue
          existingItem.attendance += current.attendance;
          existingItem.revenue += current.revenue;
        } else {
          // If the item doesn't exist, add it to the accumulator
          acc.push({ ...current });
        }
      
        return acc;
      }, []);
      return mergedData;
    } else {
      // If not using merged view, return the original records
      return data;
    }
  };



export const getPriceType = (priceType: string | number) => {
const member: any[] = [7,21,956]
const group: any[] = [16]
const nonMember: any[] = [2,1,3,5,6]
const groupon: any = [350]



    if (member.includes(priceType)){
        return "Member"
    }

    if (nonMember.includes(priceType)){
        return "Non-member"
    }

    if (group.includes(priceType)){
        return "Group"
    }   

    if (priceType === groupon){
        return "Groupon"
    }

    return null

}