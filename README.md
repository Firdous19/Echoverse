# Echoverse - Modern Blogging Platform

## Overview

Echoverse is a sophisticated blogging platform built with React, Redux Toolkit, and Appwrite serving as the backend as a service. It provides bloggers with an intuitive and powerful platform to publish, manage, and share their articles, stories, and insights with a global audience.

## Features

- **User Authentication**: Secure user registration and login functionality powered by Appwrite.
- **Dynamic Blogging Dashboard**: User-friendly interface for creating, editing, and deleting blog posts.
- **Real-time Updates**: Utilizes Redux Toolkit for efficient state management to deliver seamless real-time updates.
- **Responsive Design**: Mobile-first design approach ensures optimal performance across all devices.

## Technology Stack

- **Frontend**: React, Redux Toolkit
- **Backend**: Appwrite
- **Styling**: CSS Modules, Tailwind-CSS
- **APIs**: Appwrite SDK for seamless integration and data management

## Installation

1. **Clone the Repository**

   ```bash
   git clone git@github.com:Firdous19/Echoverse.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd echoverse
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Set Environment Variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   VITE_APPWRITE_URL = https://your-appwrite-endpoint.com
   VITE_APPWRITE_PROJECT_ID = your-appwrite-project-id
   VITE_APPWRITE_DATABASE_ID = your-appwrite-database-id
   VITE_APPWRITE_COLLECTION_ID = your-appwrite-collection-id
   VITE_APPWRITE_BUCKET_ID = your-appwrite-bucket-id
   ```

## Getting Started

1. **Start the Development Server**

   ```bash
   npm run dev
   ```

2. **Access the Application**
   Open your web browser and navigate to [http://localhost:5173](http://localhost:3000) to explore Echoverse.

   or

   Preview the application at [https://echoverse-ebon.vercel.app/](https://echoverse-ebon.vercel.app)


```
Ensure to replace placeholders like `https://your-appwrite-endpoint.com`, `your-appwrite-project-id`, `your-appwrite-database-id` , `your-appwrite-collection-id` and `your-appwrite-bucket-id` with your actual Appwrite endpoint, project id, database id, collection id and bucket id.
```
