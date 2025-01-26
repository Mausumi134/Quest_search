
```markdown
# QuestSearch

QuestSearch is a web application that allows users to search programming questions and anagram challenges. It includes both a backend to serve data from MongoDB and a frontend to display results.

## Installation

### 1. Clone the repository:
```bash
git clone https://github.com/Mausumi134/Quest_search.git
cd Quest
```

### 2. Backend Setup
Navigate to the `backend` folder and install dependencies:
```bash
cd backend
npm install
```
Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
Navigate to the `frontend` folder and install dependencies:
```bash
cd frontend
cd my-react-app
npm install
```
Start the frontend server:
```bash
npm run dev
```
This will open the app at `http://localhost:3000`.

## Running the Application
1. The backend will run on `http://localhost:3000`.
2. The frontend will run on `http://localhost:3000`.

Search for programming questions or anagrams by typing in the input box and clicking "Search".

## Uploading Data to MongoDB

To upload questions to MongoDB:

1. **Download** the `questions.json` file.
2. Use `mongoimport` to upload it to your MongoDB instance:
```bash
mongoimport --db questsearch --collection questions --file path/to/questions.json --jsonArray
```

