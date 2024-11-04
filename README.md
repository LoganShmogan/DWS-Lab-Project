# Lab App
This is a web application built using **Express.js** as the backend framework, **Handlebars** for templating, and **TailwindCSS** for styling. It demonstrates a simple but dynamic structure with category filtering, reusable layouts, and server-side rendering.

## Features

- **Dynamic Routing**: Supports various routes and dynamic content filtering.
- **Server-Side Rendering**: Renders HTML on the server for faster load times and improved SEO.
- **Modular Views**: Utilizes Handlebars for reusable layouts and partials.
- **TailwindCSS Styling**: Built with utility-first TailwindCSS for quick, responsive styling.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/express-handlebars-tailwind.git
   cd express-handlebars-tailwind
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build Tailwind CSS**:
   Generate the Tailwind output file for the styling:
   ```bash
   npm run build:css
   ```

## Usage

1. **Start the Application**:
   Run the following command to start the application in development mode:
   ```bash
   npm run dev
   ```
   This will run both the Express server and the Tailwind build process. Nodemon is used to auto-restart the server when files change.

2. **Visit the App**:
   Open your browser and go to `http://localhost:3000` to view the application.

## Project Structure

Here’s a brief overview of the project’s structure:

```plaintext
express-handlebars-tailwind/
├── views/
│   ├── layouts/
│   │   └── main.handlebars        # Main layout template
│   ├── partials/
│   │   ├── categories.handlebars  # Categories partial for filtering
│   │   └── items.handlebars       # Items partial for displaying filtered results
│   └── home.handlebars            # Main view for homepage content
├── public/
│   └── css/
│       └── styles.css             # Custom CSS and Tailwind styles
├── app.js                         # Main application file with routes and server setup
├── package.json                   # Project metadata and scripts
├── tailwind.config.js             # Tailwind CSS configuration
└── nodemon.json                   # Nodemon configuration
```

### Configuration

- **TailwindCSS**: Customize your Tailwind configuration in `tailwind.config.js` for themes, colors, and responsive breakpoints.
- **Routes and Sample Data**: Modify `app.js` to change routes and add sample data. Example data can be found in the `items` and `categories` arrays.

### Available Scripts

In `package.json`, the following scripts are defined:

- **`npm run dev`**: Starts the server with Nodemon and builds Tailwind in watch mode.
- **`npm run build:css`**: Processes Tailwind CSS, outputting optimized CSS to `public/css/styles.css`.

## Customization

1. **Modify Views**: Update Handlebars views in `views/` to customize page layout or content.
2. **Add Routes**: Extend routing in `app.js` for additional functionality (e.g., more filtered views).
3. **Styling**: Update `styles.css` with custom CSS or Tailwind classes for further design tweaks.

## License

This project is open-source under the [MIT License](LICENSE).

---

This README is tailored to a ready-to-run app. Just replace `your-username` with your GitHub username in the repository URL if needed. Let me know if you’d like any further customization!
