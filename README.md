# Farmer Credit Intelligence Platform

A farmer-centric credit intelligence ecosystem where agricultural reliability is transparently assessed through verified data, community trust, and explainable AI, empowering farmers with data ownership while enabling responsible lending decisions.

## Product Vision

Create a farmer-centric credit intelligence ecosystem where agricultural reliability is transparently assessed through verified data, community trust, and explainable AI, empowering farmers with data ownership while enabling responsible lending decisions.

## Target Audience

- **Small and marginal farmers** seeking formal credit access
- **FPO officers** managing member verification
- **Rural banks and NBFCs** evaluating agricultural loans
- **Platform administrators** maintaining system integrity

## Core Features

- **Farmer Management**: Complete CRUD operations for farmer profiles with verification status
- **FPO Management**: Farmer Producer Organization registration and member management
- **Credit Assessment**: Loan application processing with AI-powered credit scoring and explainable decisions

## Technology Stack

- **Backend Framework**: FastAPI 0.104.1
- **Database**: SQLite (SQLAlchemy ORM)
- **Validation**: Pydantic 2.5.0
- **Server**: Uvicorn with ASGI
- **Architecture**: Modular Monolith with clear separation of concerns

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
```bash
cd /path/to/project
```

2. **Create a virtual environment**:
```bash
python -m venv venv
```

3. **Activate the virtual environment**:
   - On Linux/Mac:
     ```bash
     source venv/bin/activate
     ```
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```

4. **Install dependencies**:
```bash
pip install -r backend/requirements.txt
```

5. **Set up environment variables**:
```bash
cp .env.example .env
```
Edit `.env` file and update the configuration values, especially:
- `SECRET_KEY`: Use a strong random string for production
- `DATABASE_URL`: Update if using a different database

## Running the Application

### Development Mode

Run the application with auto-reload enabled:

```bash
python -m backend.main
```

Or using uvicorn directly:

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at: `http://localhost:8000`

### Production Mode

For production, set `DEBUG=False` in your `.env` file and run:

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## API Documentation

Once the application is running, access the interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Farmers
- `POST /api/v1/farmers/` - Create a new farmer
- `GET /api/v1/farmers/` - List all farmers (with pagination)
- `GET /api/v1/farmers/{farmer_id}` - Get farmer details
- `PUT /api/v1/farmers/{farmer_id}` - Update farmer information
- `DELETE /api/v1/farmers/{farmer_id}` - Delete a farmer

### FPO Management
- `POST /api/v1/fpo/` - Create a new FPO
- `GET /api/v1/fpo/` - List all FPOs (with pagination)
- `GET /api/v1/fpo/{fpo_id}` - Get FPO details
- `PUT /api/v1/fpo/{fpo_id}` - Update FPO information
- `DELETE /api/v1/fpo/{fpo_id}` - Delete an FPO
- `GET /api/v1/fpo/{fpo_id}/members` - Get all farmers in an FPO

### Credit Assessments
- `POST /api/v1/assessments/` - Create a new credit assessment
- `GET /api/v1/assessments/` - List all assessments (with filters)
- `GET /api/v1/assessments/{assessment_id}` - Get assessment details
- `PUT /api/v1/assessments/{assessment_id}` - Update assessment
- `DELETE /api/v1/assessments/{assessment_id}` - Delete an assessment

### Health Check
- `GET /` - Root endpoint with API information
- `GET /health` - Health check endpoint

## Project Structure

```
.
├── backend/
│   ├── __init__.py
│   ├── main.py              # Main application entry point
│   ├── config.py            # Configuration management
│   ├── database.py          # Database connection and session
│   ├── models.py            # SQLAlchemy database models
│   ├── schemas.py           # Pydantic schemas for validation
│   ├── requirements.txt     # Python dependencies
│   └── routers/             # API route handlers
│       ├── __init__.py
│       ├── farmers.py       # Farmer endpoints
│       ├── fpo.py           # FPO endpoints
│       └── credit_assessments.py  # Credit assessment endpoints
├── .env.example             # Environment variables template
└── README.md                # This file
```

## Database Models

### Farmer
- Personal information (name, email, phone, address)
- Agricultural data (land size, crop types)
- FPO membership
- Verification status

### FPO (Farmer Producer Organization)
- Organization details
- Registration information
- Contact information
- Member count

### Credit Assessment
- Loan application details
- Credit score and status
- AI explanation for decisions
- FPO and bank verification
- Comments and feedback

### User
- Authentication credentials
- Role-based access (Farmer, FPO Officer, Bank Officer, Admin)
- Account status

## Environment Variables

Key environment variables (see `.env.example` for complete list):

- `DATABASE_URL`: Database connection string
- `SECRET_KEY`: Secret key for JWT token generation
- `DEBUG`: Enable/disable debug mode
- `HOST`: Server host address
- `PORT`: Server port number
- `ALLOWED_ORIGINS`: CORS allowed origins

## Security Features

- Input validation using Pydantic schemas
- SQL injection prevention through SQLAlchemy ORM
- CORS configuration for cross-origin requests
- Environment-based configuration (no hardcoded secrets)
- Proper error handling and logging

## Development Guidelines

1. **Code Style**: Follow PEP 8 guidelines
2. **Error Handling**: All endpoints include proper error handling
3. **Logging**: Use the configured logger for debugging
4. **Validation**: All inputs are validated using Pydantic schemas
5. **Database**: Use SQLAlchemy ORM for all database operations

## Future Enhancements

- Authentication and authorization implementation
- AI-powered credit scoring algorithm
- Data verification workflows
- Reporting and analytics
- Mobile application support
- Integration with external credit bureaus

## Support

For issues, questions, or contributions, please refer to the project documentation or contact the development team.

## License

[Specify your license here]
