

export const CandidatesData = [
  {
    id: "1",
    task: "Lorem ipsum dolor sit amet.",
    assigned_To: 'Beltran',
    assignee: 'Romona',
    Status: 'To-do',
    priority: 'Low',
    due_Date: "25-May-2020",
  },
  {
    id: "2",
    task: "Fix Styling",
    assigned_To: 'Dave',
    assignee: 'Romona',
    Status: 'To-do',
    priority: 'Low',
    due_Date: "26-May-2020",
  },
  
];


export const columnsFromBackend = {
  [1]: {
    title: 'To-Do',
    items: CandidatesData,
  }
};