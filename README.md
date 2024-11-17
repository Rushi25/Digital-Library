# Digital Library

The code is of Digital Library web application created to implement learning about Angular, .NET, SQL, etc

Digital Library is a comprehensive web application that provides a platform for users to explore, categorize, and access various learning resources and materials which are added by the Admin. Built with Angular for the frontend and .NET Core for the backend, this project offers a modern and scalable solution for digital content management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Debugging Locally](#debugging-locally)
- [Project Structure](#project-structure)

---

## Features

- **User Authentication and Authorization**: Secure login with role-based access control.
- **Course Selection**: Users can browse and select courses for customized content.
- **Adding and Updating Courses**: Admin user can easily add and update courses along with content for respective courses.
- **Responsive UI**: Angular Material provides a consistent and responsive design.
- **Error Handling**: Comprehensive error and feedback mechanisms for better user experience.
- **Modular and Scalable Code**: Ensures future growth and easy maintenance.

## Tech Stack

- **Frontend**: Angular, Angular Material
- **Backend**: .NET Core, Entity Framework Core
- **Database**: SQL Server
- **Other**: JWT Authentication, RxJS, Material icons

## Getting Started

How to set up the project on local machine.

### Prerequisites

#### IDE and Tools used

- [Visual Studio](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=Community&channel=Release&version=VS2022&source=VSLandingPage&cid=2030&passive=false) (for backend)
- [Visual Studio Code](https://code.visualstudio.com/docs/?dv=win) (for frontend)
- [SQL Server Management Studio](https://aka.ms/ssmsfullsetup) (for DB SQL operations)
- [GitHub](https://github.com/) (for Source Control)

#### Frameworks and SDK's

- [Node.js and npm](https://nodejs.org/) (for frontend)
- [.NET Core SDK](https://dotnet.microsoft.com/download) (for backend)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (for database)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Rushi25/Digital-Library.git
   cd digital-library
2. **Backend Setup**

   1. Open terminal and navigate to backend folder

		```bash
		cd backend
	2. Restore NuGet Packages
		```bash
		dotnet restore
	3. Update database connection string and JWT key in appsettings.Development.json
		```json
		{
			"ConnectionStrings": {
				"SqlConnection": "Server=<sever-name>;Database=DigitalLibraryDb;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=true;"
			},

			"JWT": {
				"Key": "<JWT key min 80 characters long>",
				"ExpiresInDays": 15,
				"Issuer": "http://localhost:5155"
			}
		}
	4. Create and Apply Migrations for initial database setup
		```bash
		dotnet ef migrations add InitialCreate
		dotnet ef database update
	5. Open solution in **Visiual Studio** Build and Run.

3. **Frontend Setup**

	1. Open a new terminal and navigate to the frontend folder:
	
		```bash	
		cd frontend
	2. Install Angular dependencies:
		```bash
		npm install
	3. Update environment.development.ts with the backend API URL.
		```ts
		export const environment = {
			production: false,
			baseUrl: '<Backend URL>',
			userKey: 'User_Info'
		};
	4. update nswag.json with the backend API URL.
		```json
		{
			"documentGenerator": {
				"fromDocument": {
					"url": "https://<Backend URL>/swagger/v1/swagger.json",
					"output": null,
					"newLineBehavior": "Auto"
				}
			}
		 }
	5. Build and run
		```bash
		npm run build

		npm run start
## Project Structure
The project is organized into two main folders: `frontend` for the Angular application and `backend` for the .NET Core API. Below is a breakdown of the project structure.

## Project Structure

This project consists of a frontend Angular application and a backend .NET Core API. Below is the complete directory structure, with comments for each significant part.

```plaintext
Digital-Library/
├── Frontend/                       
│   └── digital-library                # Angular frontend project
│       ├── src/
│       │   ├── app/                   # Main application code
│       │   │   ├── api-client         # API client generated using NSWAG
│       │   │   ├── features           # Digital library features like dashboard, login, etc.
│       │   │   └── shared             # Shared components and utilities
│       │   │	    ├── components/        # Reusable components
│       │   │       ├── services/          # Service classes for API calls
│       │   │       ├── models/            # Data models and interfaces
│       │   │       └── ...                # Other Angular modules and components
│       │   ├── environments/          # Environment configuration files
│       │   ├── index.html             # Main HTML file
│       │   ├── main.ts                # Main entry file for Angular app
│       │   └── ...                    # Other configuration files
│       ├── angular.json               # Angular CLI configuration file
│       ├── angular.json               # Angular CLI configuration file
│       └── ...			       # Other configuration files

├── DigitalLibrary.Backend/            # .NET Core backend project
│   ├── DigitalLibrary/                # Main API project
│   │   ├── Ares                       # Project folder for different API functionalities
│   │   │   ├── Admin                  # Admin-specific modules and controllers
│   │   │   │   ├── Controllers/       # API controllers for handling HTTP requests
│   │   │   │   ├── Models/            # Entity models representing database schema
│   │   │   │   ├── Services/          # Business logic services
│   │   │   ├── Authentication         # Authentication-related modules and controllers
│   │   │   │   ├── Controllers/       # API controllers for handling HTTP requests
│   │   │   │   ├── Models/            # Entity models representing database schema
│   │   │   │   ├── Services/          # Business logic services
│   │   │   └── ...                    # Other API functionalities and folders
│   │   ├── Context/                   # Database context and migration files
│   │   │   ├── Entities/              # Entity definitions
│   │   │   ├── Migrations/            # Database migrations
│   │   │   └── DbContext              # Database context configuration
│   │   ├── appsettings.json           # Application configuration
│   │   └── Program.cs                 # Main entry point for API application
│   ├── DigitalLibrary.sln             # Solution file for .NET project
│   └── README.md                      # Documentation for the backend

└── README.md                          # Root project documentation