## Corelab Challenge:

Instructions on how to install and run the application.

### Instalation

1. The first step is to have the API up and running so the page can use it to retrieve and persist the data. It can be found on my [Github](https://github.com/helio-leao/corelab-api-challenge).

2. Use npm to install the necessary dependencies.

```bash
npm install
```

3. Create a `.env` file in the root folder of the project and add an environment variable with the API URL.

```bash
VITE_API_URL=THE_API_URL
```

4. Execute the application.

```bash
npm run dev
```

### The Project

It works on a single component page called "Home" and uses the "NoteCard" component to render the data of each note, providing the ability to edit the title, text, favorite status, color, and offering the option to remove the note. Since this is a relatively small project, the other components were developed within the Home page.

The data is stored in a MongoDB database through an API developed for the challenge. The popular Axios dependency is used to make requests to the API.

The design is quite responsive, and the components on the page will resize to avoid breaking the layout, even at a reasonably small size.

### How it works

#### Search Bar

Starting from the top, there's the search bar responsible for filtering the notes. It does this either by pressing Enter after typing the query in the input field or by clicking the search glass icon on the bar. When one of these actions is performed, the page sends a request to the API to retrieve notes that contain the entered text, which can be a fragment, either in the title or in the text.

#### New Note Card

Here, you can add data to create a new note. The three items that can be set for a new note are the title, text, and whether it is marked as a favorite. A button was added to trigger the request to the API to save this new note in the database. Once the operation is completed, the note card is displayed in the next section.

#### Note Cards

As requested, the notes are divided into two categories: "favorites", which are shown at the top of the container, and "others", which are displayed below. All the cards have functional buttons that allow you to change the note's favorite status, change its color, edit the title and text, or remove the note. Most of these actions trigger a request to the API to update the note, with the exception of editing the title and text.

### Editing the text and title of a note

In this design, to edit a note, you only need to click on the portion you wish to edit and type the modifications. Once you start editing, the confirmation icon will be enabled in the bottom left corner of the card, allowing you to confirm the changes. This will trigger a request to the API to update the note.

### Some details

Some details were added to improve the project's usability, such as changing the mouse cursor when hovering over a button and adding tooltips for most buttons that only display an icon.
