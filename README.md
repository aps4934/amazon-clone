# Amazon Clone

A full-stack e-commerce web application inspired by Amazon, built with modern web technologies. This project features a responsive React frontend and a FastAPI backend with MongoDB integration.

## 🚀 Features

- **Product Browsing**: Browse products by categories with detailed product pages
- **Search Functionality**: Search products by title, description, or category
- **Shopping Cart**: Add/remove items, update quantities, persistent cart with localStorage
- **User Authentication**: Sign in and account management (mock implementation)
- **Checkout Process**: Complete order flow with shipping and payment forms
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Product Categories**: Electronics, Fashion, Home & Garden, Books, and more
- **Product Reviews**: Star ratings and review counts
- **Wishlist**: Save favorite products
- **Order History**: View past orders

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern JavaScript library for building user interfaces
- **React Router** - Declarative routing for React
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Hooks** - State management and lifecycle methods

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **MongoDB** - NoSQL database for data storage
- **Motor** - Asynchronous MongoDB driver
- **Pydantic** - Data validation and serialization
- **Uvicorn** - ASGI server for FastAPI
- **JWT** - JSON Web Tokens for authentication

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **Yarn** package manager
- **Python** (v3.8 or higher)
- **MongoDB** database
- **Git**

## 🔧 Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the backend directory with your MongoDB configuration:
   ```
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=amazon_clone
   ```

6. Start the backend server:
   ```bash
   uvicorn server:app --reload
   ```

The backend will be running at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn start
   ```

The frontend will be running at `http://localhost:3000`

## 🚀 Usage

1. **Homepage**: Browse featured products and categories
2. **Product Search**: Use the search bar to find specific products
3. **Product Details**: Click on any product to view detailed information
4. **Shopping Cart**: Add items to cart, adjust quantities, and proceed to checkout
5. **User Account**: Sign in to access account features and order history
6. **Checkout**: Complete your purchase with shipping and payment information

## 📡 API Endpoints

The backend provides the following API endpoints:

### Status Endpoints
- `GET /api/` - Welcome message
- `POST /api/status` - Create a status check entry
- `GET /api/status` - Retrieve all status check entries

### Data Models
```python
class StatusCheck(BaseModel):
    id: str
    client_name: str
    timestamp: datetime
```

## 📁 Project Structure

```
amazon-clone/
├── backend/
│   ├── server.py          # FastAPI application
│   ├── requirements.txt   # Python dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.js        # Main React application
│   │   ├── components.js # All React components
│   │   ├── index.js      # Application entry point
│   │   └── index.css     # Global styles
│   ├── package.json      # Node dependencies
│   ├── tailwind.config.js # Tailwind configuration
│   └── public/
│       └── index.html    # HTML template
├── tests/                # Test files
└── README.md            # Project documentation
```

## 🧪 Testing

Run backend tests:
```bash
cd backend
pytest
```

Run frontend tests:
```bash
cd frontend
yarn test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Product images sourced from Unsplash
- Icons and UI inspiration from Amazon.com
- Built with modern web development best practices

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Note**: This is a demo project for educational purposes. It includes mock data and simulated functionality. For a production deployment, additional security measures, payment integration, and database optimization would be required.
