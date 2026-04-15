---

# 📦 Order Management System

A modern React-based application to manage product inventory, track customer orders, and visualize business performance through an interactive dashboard.

---

## 🚀 Getting Started

Follow the steps below to run the project locally.

### 🔧 Prerequisites

* Node.js (v14 or higher)
* npm or yarn

---

## 📥 Installation

1. **Clone the repository**

```bash
git clone https://github.com/UPBLICODER/order-mangement-system.git
```

2. **Navigate to the project directory**

```bash
cd order-mangement-system
```

3. **Install dependencies**

```bash
npm install
```

---

## ▶️ Run the Application

Start the development server:

```bash
npm run dev
```

The application will be available at:

[http://localhost:5173](http://localhost:5173)

---

## 📊 Features

### 📌 Dashboard

* Visual overview of key metrics
* Order distribution insights
* Performance tracking

### 📦 Orders

* View all orders
* Update order status
* Search and filtering

### 🛒 Products

* Add, edit, and manage inventory
* Real-time updates across the app

---

## 🧠 Technical Highlights

### 1. Data Persistence

Implemented using **React Context API + Local Storage**, ensuring data remains even after refresh without a backend.

### 2. State Management

Centralized state using Context API for:

* Instant UI updates
* Consistent data flow across pages

### 3. Dynamic Dashboard Logic

Processed raw order data into categorized metrics for charts and visual components.

---

## ⚡ Challenges Faced

### 1. Data Persistence Without Backend

Since there is no backend or database, maintaining data after refresh was challenging.
Solved using **React Context + Local Storage**.

---

### 2. State Synchronization Across Pages

Keeping Dashboard, Orders, and Products in sync required centralized state management.
Handled using **Context API** to ensure real-time updates.

---

### 3. Dynamic Dashboard Calculations

Transforming raw order data into meaningful distribution metrics while maintaining performance.


---

## 📁 Project Structure

```
src/
│
├── components/   # Reusable UI components
├── pages/        # Dashboard, Orders, Products
├── context/      # Global state (OrderContext)
├── data/         # Static/mock data
├── utils/        # Helper functions
```

---

## ⚠️ Limitations

* No backend integration
* Data stored only in local storage
* Not suitable for multi-user environments

---

## 🚀 Future Improvements

* Backend integration (Node.js / Firebase)
* Authentication system
* Real-time database sync
* Advanced analytics & reporting

---

## 🤝 Contributing

Feel free to fork the repository and submit pull requests.

---

## 📄 License

This project is open-source and available under the MIT License.

---
