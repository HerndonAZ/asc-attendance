import { create } from 'zustand';
interface RealTimeStore {
  data: any;
  initialDataLoaded: boolean;
  loading: boolean;
  day: string;
  setRealTimeData: (data: any) => void;
  setInitialDataLoaded: (loaded: boolean) => void;
  setLoading: (loading: boolean) => void;
  setDay: (day: string) => void;
  useMerged: boolean;
  setUseMerged: (merged: boolean) => void;
  toggleView: () => void;
}

export const useRealTimeStore = create<RealTimeStore>((set) => ({
  data: null,
  initialDataLoaded: false,
  loading: false,
  day: 'today',
  setRealTimeData: (data) => set({ data }),
  setInitialDataLoaded: (loaded) => set({ initialDataLoaded: loaded }),
  setLoading: (loading) => set({ loading }),
  setDay: (day) => set({ day }),
  useMerged: false,
  setUseMerged: (useMerged: boolean) => set({ useMerged }),
  toggleView: () => set((state) => ({ useMerged: !state.useMerged })) // Implemented toggleView
}));
export const priceTypes = [
  {
    id: 52,
    longName: 'Employee Exchange',
    shortName: 'EMP EXC',
    badgeColor:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
  },
  {
    id: 1026,
    longName: 'Discovery Pass Adult',
    shortName: 'DCV ADULT',
    badgeColor:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
  },
  {
    id: 1027,
    longName: 'Discovery Pass Child (3-17)',
    shortName: 'DCV CHILD',
    badgeColor:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
  },
  {
    id: 1037,
    longName: 'Discovery Pass Child Under 3',
    shortName: 'DCV Under 3',
    badgeColor:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
  },
  {
    id: 1036,
    longName: 'Discovery Pass Military',
    shortName: 'DCV MILIT',
    badgeColor:
      'bg-purple-200 text-purple-900 dark:bg-purple-800 dark:text-purple-200'
  },
  {
    id: 1035,
    longName: 'Discovery Pass Senior (62+)',
    shortName: 'DCV SENIOR',
    badgeColor:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
  },
  {
    id: 1034,
    longName: 'Discovery Pass Student',
    shortName: 'DCV STDNT',
    badgeColor:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
  },
  {
    id: 1182,
    longName: 'Discovery Pass LapChild Under3',
    shortName: 'DCV LapU3',
    badgeColor:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
  },
  {
    id: 330,
    longName: 'Corporate Adult',
    shortName: 'Corp Adult',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  },
  {
    id: 331,
    longName: 'Corporate Child (3-17)',
    shortName: 'Corp Child',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  },
  {
    id: 1033,
    longName: 'Corporate Child 0-5 (GST)',
    shortName: 'Corp 0-5',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  },
  {
    id: 1032,
    longName: 'Corporate Child 6-17 (GST)',
    shortName: 'Corp 6-17',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  },
  {
    id: 838,
    longName: 'Corporate Senior',
    shortName: 'Corp Senior',
    badgeColor: 'bg-blue-200 text-blue-900 dark:bg-blue-800 dark:text-blue-200'
  },
  {
    id: 1,
    longName: 'General Admission Adult',
    shortName: 'GA Adult',
    badgeColor:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  },
  {
    id: 5,
    longName: '	General Admission Child Under3',
    shortName: 'GA SeatU3',
    badgeColor:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  },
  {
    id: 1185,
    longName: '	General Admission Lap Under3',
    shortName: 'GA LapU3',
    badgeColor:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  },
  {
    id: 2,
    longName: 'General Admission Child (3-17)',
    shortName: 'GA Child 3-17',
    badgeColor:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  },
  {
    id: 5,
    longName: 'General Admission Child Under3',
    shortName: 'GA Under 3',
    badgeColor:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  },
  {
    id: 1031,
    longName: 'General Admission Military',
    shortName: 'GA Military',
    badgeColor:
      'bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-200'
  },
  {
    id: 1030,
    longName: 'General Admission Student',
    shortName: 'GA Student',
    badgeColor:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  },
  {
    id: 1133,
    longName: 'Member Voucher',
    shortName: 'Mem VCHR',
    badgeColor:
      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
  },
  {
    id: 7,
    longName: 'Member Adult',
    shortName: 'Mem Adult',
    badgeColor:
      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
  },
  {
    id: 1187,
    longName: 'Member Lap Child Under3',
    shortName: 'Mem LapU3',
    badgeColor:
      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
  },
  {
    id: 21,
    longName: 'Member Child (3-17)',
    shortName: 'Mem Child',
    badgeColor:
      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
  },
  {
    id: 1040,
    longName: 'Member Child Under3',
    shortName: 'Mem Under 3',
    badgeColor:
      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
  },
  {
    id: 956,
    longName: 'Member Guest',
    shortName: 'Mem Guest',
    badgeColor:
      'bg-orange-200 text-orange-900 dark:bg-orange-800 dark:text-orange-200'
  },
  {
    id: 1010,
    longName: 'Member Child 6-17 (GST)',
    shortName: 'Mem Child 6-17',
    badgeColor:
      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
  },
  {
    id: 59,
    longName: 'Member Senior (62+)',
    shortName: 'Mem Senior',
    badgeColor:
      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
  },
  {
    id: 1038,
    longName: 'All-Inclusive Child 6-17 (GST)',
    shortName: 'AI Child 6-17',
    badgeColor:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
  },
  {
    id: 3,
    longName: 'General Admission Senior (62+)',
    shortName: 'GA Senior',
    badgeColor:
      'bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-200'
  },
  {
    id: 6,
    longName: 'Comp',
    shortName: 'Comp',
    badgeColor: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  },
  {
    id: 45,
    longName: '	Group Comp',
    shortName: 'GRP CMP',
    badgeColor: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  },
  {
    id: 16,
    longName: 'Group Adult',
    shortName: 'GRP ADT',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  },
  {
    id: 1103,
    longName: 'Group Child Under3',
    shortName: 'GRPCH Under 3',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  },
  {
    id: 17,
    longName: 'Group Child (3-17)',
    shortName: 'GRPCH 3-17',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  },
  {
    id: 615,
    longName: 'School Group',
    shortName: 'Schl Grp',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  },
  {
    id: 1050,
    longName: 'Explorer Pass Group Child 3-17',
    shortName: 'EP GRP CHD',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  },
  {
    id: 1055,
    longName: '	Explorer Pass Group Adult',
    shortName: 'EP GRP ADT',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  },
  {
    id: 615,
    longName: 'School Group',
    shortName: 'Schl Grp',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  },
  {
    id: 78,
    longName: 'VIP Pass',
    shortName: 'VIP Pass',
    badgeColor:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
  },
  {
    id: 49,
    longName: 'ASTC',
    shortName: 'ASTC',
    badgeColor:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
  },
  {
    id: 1041,
    longName: 'GA PASS',
    shortName: 'GA PASS',
    badgeColor:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  },
  {
    id: 1014,
    longName: 'POGO Pass Member',
    shortName: 'POGO Pass',
    badgeColor:
      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
  },
  {
    id: 999,
    longName: 'MuseumsForAll Adult',
    shortName: 'MFA Adult',
    badgeColor:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
  },
  {
    id: 1104,
    longName: 'MuseumsForAll Child Under 3',
    shortName: 'MFAUnder3',
    badgeColor:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
  },
  {
    id: 1000,
    longName: 'MuseumsForAll Child (3-17)',
    shortName: 'MFA Child',
    badgeColor:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
  },
  {
    id: 1188,
    longName: '	MuseumsForAll Lap Child Under3',
    shortName: 'MFACH LapU3',
    badgeColor:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
  },
  {
    id: 1215,
    longName: 'MFA Member Child (3-17)',
    shortName: 'MFAMEM CH',
    badgeColor:
      'bg-yellow-800 text-yellow-100 dark:bg-yellow-300 dark:text-yellow-900'
  },
  {
    id: 1219,
    longName: 'MFA Member Adult',
    shortName: 'MFAMEM ADT',
    badgeColor:
      'bg-yellow-800 text-yellow-100 dark:bg-yellow-300 dark:text-yellow-900'
  },
  {
    id: 27,
    longName: 'Group Teacher',
    shortName: 'GRP TCHR',
    badgeColor:
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  },
  {
    id: 72,
    longName: 'Group Chaperone',
    shortName: 'GRP CHP',
    badgeColor:
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  },
  {
    id: 73,
    longName: 'T1 Group Chaperones',
    shortName: 'T1 CHAP',
    badgeColor:
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300'
  },
  {
    id: 348,
    longName: 'T1 Group Teacher',
    shortName: 'T1 TCHR',
    badgeColor:
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300'
  },
  {
    id: 996,
    longName: 'T1 Group Child (3-17)',
    shortName: 'T1 CHILD',
    badgeColor:
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300'
  },
  {
    id: 26,
    longName: 'Title 1 Arizona',
    shortName: 'T1 Student',
    badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300'
  }
  //{ id: 1009, longName: "T1 Group Chaperones", shortName: "T1 Chaperones", badgeColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300" },
  //{ id: 1006, longName: "Title 1 Arizona", shortName: "Title 1 AZ", badgeColor: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300" },
];
