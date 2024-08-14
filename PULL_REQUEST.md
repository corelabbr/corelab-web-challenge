#### Overview

Built using React, TypeScript, TipTap, and FramerMotion. 
This application allows users to create, edit, delete, favorite, and search for notes. It also includes features such as rich text editing and color-coding for improved organization.

**Features:**

- Create, Read, Update, Delete (CRUD) Operations for Notes: Users can create new notes, view existing ones, update their content and titles, and delete them.

- Rich Text Editing: The application incorporates a rich text editor (TipTap) for enhanced note-taking capabilities. This allows users to format text, add lists, and insert emojis.

- Color-Coding: Users can assign different colors to their notes, allowing for visual organization and categorization.

- Favoriting: Notes can be marked as favorites for quick access and prioritization.

- Search Functionality: Users can search for specific notes based on their title or content.

- Filtering: Notes can be filtered by color for both favorite and non-favorite categories.

- Collapsible Sections: The notes are displayed in collapsible sections (Favorites and Others) for a cleaner user interface.

- Real-Time Updates: Changes made to notes are saved and reflected in real-time.

- Responsive Design: The application is designed to be responsive and function well across different screen sizes.

**Implementation Details:**

- The application is structured using functional components and hooks for state management.

- The Notes component fetches notes from the API and renders them as individual Note components.

- The Note component handles the display and editing of each note, including title, content, color, and favorite status.

- The CreateNote component allows users to create new notes.

- The TipTap component provides the rich text editing functionality.

- The ModalColors and ModalDelete components are used for color selection and note deletion confirmation, respectively.

- The Topbar component provides a search bar for filtering notes.

**Backend:**

- The application interacts with a backend API (assumed to be running on http://localhost:3333) to perform CRUD operations on notes.

- The axios library is used for making API requests.

- The api/routes.ts file contains functions for interacting with the API endpoints.

**How it Works:**

- Fetching Notes: On component mount, the Notes component fetches all notes from the API.

- Displaying Notes: The fetched notes are rendered as individual Note components, separated into "Favorites" and "Others" sections.

- Creating a Note: Users can create a new note using the CreateNote component. The note is saved to the API and then added to the list of displayed notes.

- Editing a Note: Users can edit the title and content of a note directly within the Note component. Changes are saved to the API using debouncing to prevent excessive API calls.

- Deleting a Note: Users can delete a note by clicking the delete button, which triggers a confirmation modal. Upon confirmation, the note is deleted from the API and removed from the displayed list.

- Favoriting a Note: Users can toggle the favorite status of a note by clicking the star icon. This updates the note's favorite status in the API.

- Color-Coding a Note: Users can change the color of a note by clicking the color icon and selecting a new color from the ModalColors component. This updates the note's color in the API.

- Searching for Notes: Users can search for notes by typing in the search bar. The displayed notes are filtered based on the search term.

- Filtering by Color: Users can filter notes by color within the "Favorites" and "Others" sections.
