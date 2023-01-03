# HTML Rendering Platform

Welcome to our HTML rendering platform! With our app, you can upload your HTML files and view them directly in the browser. You can also edit the HTML code in real-time and see the changes reflected in the rendered output. Plus, you can create your own account to save and manage your HTML files. Built with Next.js, TypeScript, React, Prisma, and PostgreSQL.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

1. Clone this repository: git clone https://github.com/Gravgor/HTMLHub.git

2. Navigate to the project directory: cd HTMLHub

3. Install the dependencies: npm install

4. Create a `.env` file in the root directory, and set the following environment variables: 
LOCALHOST="localhost:3000"
API_URL="http://localhost:3000/api"
DATABASE_URL=''
JWT_SECRET=''
NEXTAUTH_SECRET =''

5. Run the database migrations: npx prisma migrate dev

6. Start the development server: npm run dev

The app should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

To use the app, you can go to [http://localhost:3000](http://localhost:3000) and follow the instructions on the page. You can upload your HTML files, view them in the browser, edit the code in real-time, and save them to your account (if you have one).

To create an account, click on the "Sign Up" button and follow the prompts. To log in to an existing account, click on the "Log In" button and enter your credentials.

## Configuration

You can customize the appearance and behavior of the app by modifying the following files:

- `app/components`: Customize components rendered in Layout.tsx
- `app/login`: Contains Login page, you can change everything there
- `app/register`: Contains Register page, you can change everything there
- `app/dashboard`: Contains Dashboard page, you can change everything there


You can also configure the app by modifying the environment variables in the `.env` file.

## Contributing

If you want to contribute to this project, please follow these steps:

1. Fork this repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Push the branch to your fork.
5. Open a pull request.

## License

This project is released under the [MITLicense](https://opensource.org/licenses/MIT).

## Contact

If you have any questions or feedback, you can reach the maintainers of this project at 1944#3207.

