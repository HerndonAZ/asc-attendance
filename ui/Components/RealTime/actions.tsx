
export const getTableData = ({
  data,
  useMerged
}: {
  data: any;
  useMerged: boolean;
}) => {
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

export const PriceTypeBadge = ({ priceType, priceTypeName }: { priceType: number, priceTypeName?: string }) => {

  const matchedType = priceTypes.find(pt => pt.id === priceType);


  return (
    <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded ${matchedType?.badgeColor}`}>
      {matchedType?.shortName || priceType}
    </span>
  );
};


export const priceTypes = [
  { id: 1026, longName: 'All-Inclusive Adult', shortName: 'AI Adult', badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' },
  { id: 1027, longName: 'All-Inclusive Child (3-17)', shortName: 'AI Child', badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' },
  { id: 1037, longName: 'All-Inclusive Child (Under 3)', shortName: 'AI Under 3', badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' },
  { id: 1036, longName: 'All-Inclusive Military', shortName: 'AI Military', badgeColor: 'bg-purple-200 text-purple-900 dark:bg-purple-800 dark:text-purple-200' },
  { id: 1035, longName: 'All-Inclusive Senior (62+)', shortName: 'AI Senior', badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' },
  { id: 1034, longName: 'All-Inclusive Student', shortName: 'AI Student', badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' },
  {id: 1039,longName:"All-Inclusive Child 0-5 (GST)", shortName: "AI Child 0-5", badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"},
  { id: 330, longName: 'Corporate Adult', shortName: 'Corp Adult', badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
  { id: 331, longName: 'Corporate Child (3-17)', shortName: 'Corp Child', badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
  { id: 1033, longName: 'Corporate Child 0-5 (GST)', shortName: 'Corp 0-5', badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
  { id: 1032, longName: 'Corporate Child 6-17 (GST)', shortName: 'Corp 6-17', badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
  { id: 838, longName: 'Corporate Senior', shortName: 'Corp Senior', badgeColor: 'bg-blue-200 text-blue-900 dark:bg-blue-800 dark:text-blue-200' },
  { id: 1, longName: 'General Admission Adult', shortName: 'GA Adult', badgeColor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
  { id: 2, longName: 'General Admission Child (3-17)', shortName: 'GA Child', badgeColor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
  { id: 5, longName: 'General Admission Child Under3', shortName: 'GA Under 3', badgeColor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
  { id: 1031, longName: 'General Admission Senior (62+)', shortName: 'GA Senior', badgeColor: 'bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-200' },
  { id: 1030, longName: 'General Admission Student', shortName: 'GA Student', badgeColor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
  { id: 7, longName: 'Member Adult', shortName: 'Mem Adult', badgeColor: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' },
  { id: 21, longName: 'Member Child (3-17)', shortName: 'Mem Child', badgeColor: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' },
  { id: 1040, longName: 'Member Child Under3', shortName: 'Mem Under 3', badgeColor: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' },
  { id: 956, longName: 'Member Guest', shortName: 'Mem Guest', badgeColor: 'bg-orange-200 text-orange-900 dark:bg-orange-800 dark:text-orange-200' },
  {id: 1010, longName: "Member Child 6-17 (GST)", shortName: "Mem Child 6-17", badgeColor: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"},
  { id: 59, longName: 'Member Senior (62+)', shortName: 'Mem Senior', badgeColor: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' },
  {id: 1038, longName: "All-Inclusive Child 6-17 (GST)", shortName: "AI Child 6-17", badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"},
  { id: 3, longName: 'General Admission Senior (62+)', shortName: 'GA Senior', badgeColor: 'bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-200' },
  {id: 6,longName: "Comp", shortName: "Comp", badgeColor: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"},
  {id: 16, longName: "Group Adult", shortName: "Group Adult", badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"},
  {id: 17, longName: "Group Child", shortName: "Group Child", badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"}, 
  {id: 78, longName: "VIP Pass", shortName: "VIP Pass", badgeColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"},
  {id: 49, longName:"ASTC", shortName: "ASTC", badgeColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"},
  { id: 1041, longName: "GA PASS", shortName: "GA PASS", badgeColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  { id: 1014, longName: "POGO Pass Member", shortName: "POGO Pass", badgeColor: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
  {id: 999, longName: "MuseumsForAll Adult", shortName: "MFA Adult", badgeColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"},
  {id: 1000, longName: "MuseumsForAll Child (3-17)", shortName: "MFA Child", badgeColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"},

];