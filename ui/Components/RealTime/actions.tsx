
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
const groupon: any = 350



    if (member.includes(priceType)){
        return <PriceTypeBadge priceType="Member"/>
    }

    if (nonMember.includes(priceType)){
      return <PriceTypeBadge priceType="Non-Member"/>
    }

    if (group.includes(priceType)){
      return <PriceTypeBadge priceType="Group"/>
    }   

    if (priceType === groupon){
      return <PriceTypeBadge priceType="Groupon"/>
    }

    return null

}

const PriceTypeBadge = ({priceType} : {priceType: string}) => {

  if (priceType === "Member")
return (
  <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{priceType}</span>
)

if (priceType === "Non-Member")
return (
  <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{priceType}</span>
)



if (priceType === "Group")
return (
  <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{priceType}</span>
)

if (priceType === "Groupon")
return (
  <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{priceType}</span>
)
}