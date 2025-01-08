🌟React Online Test Submission

🚀Live Link: https://custom-table-react.vercel.app/

🚀How to Run the Project
Prerequisites:

1. Node.js and npm installed on your system.
2. A modern browser (preferably Chrome).
3. Allow CORS: Access-Control-Allow-Origin Chrome Extension to see api data

   Steps:

4. Clone the repository:
   git clone https://github.com/moyuriakther/react-exam-Print-Manzil.git
   cd custom-table-react

5. Install dependencies:
   npm install
6. Start the development server:
   npm start
7. Open the application in your browser at http://localhost:3000.

📋Project Overview
This project is a submission for the React Online Test conducted by Print Manzil. The test involves implementing two tasks:

1. Custom Table: A table component with search and pagination functionality.
2. T-Shirt Logo Positioning: A system to overlay and position a logo on a predefined T-shirt image.

📝 Tasks Description
1️⃣ Task 1: Custom Table
Requirements:

1. Create a custom table in React without using any third-party packages.
2. Integrate the API: https://api.razzakfashion.com.
3. Support for search and pagination with parameters:
   - paginate: Controls the number of rows per page.
   - search: Filters the data based on the search term.

Implementation Details:

1. API Integration: Fetch data from the API and display it in the table.
2. Search: Users can search by name or email.
3. Pagination: Navigate through data with customizable rows per page.
4. Row Selection: Added checkboxes for selecting individual rows or all rows at once.

2️⃣ Task 2: T-Shirt Logo Positioning
Requirements:

1. Allow users to upload a logo and position it anywhere on a predefined T-shirt image.
2. Enable drag-and-drop functionality for logo positioning.
3. Maintain the logo's aspect ratio during resizing.
4. Generate a final combined image (T-shirt + logo).

Implementation Details:

1. Image Upload: Input field for users to upload a logo.
2. Drag-and-Drop: Implemented functionality for moving the logo across the T-shirt image.
3. Aspect Ratio: Ensured the logo maintains its aspect ratio during resizing.
4. Final Output: Provides a combined image of the T-shirt with the logo applied.

✨ Project Features

1. Custom Table
   - Dynamic data fetching from the API.
   - Search functionality to filter data.
   - Pagination to navigate through data.
   - Row selection with checkboxes.
2. T-Shirt Logo Positioning
   - User-friendly interface for uploading logos.
   - Drag-and-drop functionality for easy positioning.
   - Logo resizing while maintaining aspect ratio.
   - Final image generation.

📚 References
-API Documentation:
Base API: https://api.razzakfashion.com
Example Query: https://api.razzakfashion.com/?paginate=5&search=Kiehn
