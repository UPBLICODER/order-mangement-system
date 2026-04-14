export const orders = [
  {
    id: "ORD-1024",
    customerName: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    phone: "+91 9876543210",
    status: "in_progress",
    priority: "high",
    amount: 12499,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-12",
    assignedTo: "Rahul Verma",
    city: "Delhi",

    items: [
      { name: "Wireless Headphones", qty: 1, price: 4999 },
      { name: "Bluetooth Speaker", qty: 1, price: 2999 },
      { name: "Smart Watch", qty: 1, price: 4501 },
    ],

    notes: ["Customer requested fast delivery"],
  },

  {
    id: "ORD-1025",
    customerName: "Neha Gupta",
    email: "neha.gupta@gmail.com",
    phone: "+91 9876501234",
    status: "completed",
    priority: "medium",
    amount: 4999,
    createdAt: "2024-01-09",
    updatedAt: "2024-01-11",
    assignedTo: "Amit Singh",
    city: "Mumbai",

    items: [{ name: "Office Chair", qty: 1, price: 4999 }],

    notes: ["Delivered successfully"],
  },

  {
    id: "ORD-1026",
    customerName: "Rohan Mehta",
    email: "rohan.mehta@gmail.com",
    phone: "+91 9811122233",
    status: "pending",
    priority: "low",
    amount: 8999,
    createdAt: "2024-01-08",
    updatedAt: null,
    assignedTo: null,
    city: "Bangalore",

    items: [
      { name: "Laptop Stand", qty: 1, price: 2999 },
      { name: "Keyboard", qty: 1, price: 6000 },
    ],

    notes: [],
  },

  {
    id: "ORD-1027",
    customerName: "Priya Singh",
    email: "priya.singh@gmail.com",
    phone: "+91 9877001122",
    status: "cancelled",
    priority: "low",
    amount: 2999,
    createdAt: "2024-01-07",
    updatedAt: "2024-01-08",
    assignedTo: "Suresh Yadav",
    city: "Pune",

    items: [{ name: "Table Lamp", qty: 1, price: 2999 }],

    notes: ["Order cancelled by user"],
  },

  {
    id: "ORD-1028",
    customerName: "Karan Malhotra",
    email: "karan.malhotra@gmail.com",
    phone: "+91 9900112233",
    status: "in_progress",
    priority: "medium",
    amount: 15999,
    createdAt: "2024-01-11",
    updatedAt: "2024-01-12",
    assignedTo: "Rahul Verma",
    city: "Hyderabad",

    items: [
      { name: "Gaming Mouse", qty: 1, price: 1999 },
      { name: "Mechanical Keyboard", qty: 1, price: 5999 },
      { name: "Monitor", qty: 1, price: 8000 },
    ],

    notes: [],
  },

  {
    id: "ORD-1029",
    customerName: "Simran Kaur",
    email: "simran.kaur@gmail.com",
    phone: "+91 9812345678",
    status: "completed",
    priority: "high",
    amount: 21999,
    createdAt: "2024-01-06",
    updatedAt: "2024-01-10",
    assignedTo: "Amit Singh",
    city: "Chandigarh",

    items: [{ name: "Smartphone", qty: 1, price: 21999 }],

    notes: ["Delivered early"],
  },

  {
    id: "ORD-1030",
    customerName: "Aditya Joshi",
    email: "aditya.joshi@gmail.com",
    phone: "+91 9000011122",
    status: "pending",
    priority: "high",
    amount: 7499,
    createdAt: "2024-01-12",
    updatedAt: null,
    assignedTo: null,
    city: "Jaipur",

    items: [{ name: "Printer", qty: 1, price: 7499 }],

    notes: [],
  },

  {
    id: "ORD-1031",
    customerName: "Sneha Iyer",
    email: "sneha.iyer@gmail.com",
    phone: "+91 9888877766",
    status: "in_progress",
    priority: "low",
    amount: 3999,
    createdAt: "2024-01-13",
    updatedAt: "2024-01-14",
    assignedTo: "Suresh Yadav",
    city: "Chennai",

    items: [
      { name: "Desk Organizer", qty: 1, price: 1999 },
      { name: "Lamp", qty: 1, price: 2000 },
    ],

    notes: [],
  },

  {
    id: "ORD-1032",
    customerName: "Vikram Desai",
    email: "vikram.desai@gmail.com",
    phone: "+91 9777711122",
    status: "completed",
    priority: "medium",
    amount: 12999,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-09",
    assignedTo: "Amit Singh",
    city: "Ahmedabad",

    items: [{ name: "Tablet", qty: 1, price: 12999 }],

    notes: [],
  },

  {
    id: "ORD-1033",
    customerName: "Pooja Nair",
    email: "pooja.nair@gmail.com",
    phone: "+91 9666611122",
    status: "cancelled",
    priority: "medium",
    amount: 5599,
    createdAt: "2024-01-04",
    updatedAt: "2024-01-06",
    assignedTo: "Rahul Verma",
    city: "Kochi",

    items: [{ name: "Headphones", qty: 1, price: 5599 }],

    notes: ["Payment failed"],
  },
];
