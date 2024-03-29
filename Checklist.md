# Checklist

## Components

- [ ] **Global Component toDos**
  - [ ] Add message to alert user of Api limit
  - [x] Add a method to render previous state if Api limit exceeded
  - [x] Render initial view of the app when first visiting

- [ ] **Header Component**
  - [x] Initialize the header
  - [x] Implement logo
  - [x] Create Searchbar
    - [ ] implement search function to search posts
  - [ ] Add navigation button to select subreddits for small screens

- [ ] **Subreddit navigation Component**
  - [x] Create the component
    - [x] Display subreddit container
      - [x] Display Subreddit icon
      - [x] Display Subreddit title
  - [ ] Add navigation button to select subreddits for small screens
  - [x] Fetch and iterate subreddits to list them in order of popularity
  - [ ] Add /popular as the first button

- [ ] **Articles**
  - [x] *Create Articles component*
    - [x] Iterate the store state object to render posts
    - [ ] use useMemo to check article.id:s as keys and only add new articles on render.
  - [x] *Create Article component*
    - [x] Display Title
    - [ ] Display video, image, thumbnail or text paragraph
    - [x] Display Post Author
    - [ ] Display Score, up and down vote arrow buttons
      - [ ] Create button functions
    - [x] Display Time of the post
    - [ ] create button to display comments go straight to detailed view with commennts open
    - [ ] the article container should display title and image. if no image present it should display
        paragraph text restricted to 6 rows.
  - [x] *Create DetailedArticle*
    - [x] Clicking the article container opens a detailed view with the paragraph text.
    - [x] Display Text paragraph
    - [x] Display Title
    - [x] Display Image if available
    - [ ] Display Videos
    - [x] Display Post Author
    - [ ] Display Score, up and down vote arrow buttons
      - [ ] Create button functions
    - [x] Display Time of the post
    - [x] create button to display comments
  
- [ ] **YouTubeEmbed Component**
  - [x] Implement a component for embedding YouTube videos.
  - [x] Utilize the YouTube API or embed code for rendering videos.
  - [ ] Allow customization of video dimensions.
  - [x] Handle cases where YouTube embed code is not available.
  - [ ] Style the component for consistent UI.

- [ ] **MediaPlayer Component**
  - [x] Create a general-purpose video player component using `video.js`.
  - [x] Support various video sources, including Twitch, Gfycat, Streamable, Imgur, etc..
  - [x] Allow customization of player dimensions and controls.
  - [ ] Implement error handling for failed video loads.
  - [ ] Ensure compatibility with different browsers.
  - [ ] Style the component for a cohesive look with the application.
  - [ ] Enable volume control for the audio source

- [ ] **Twitchclips Component**
  - [x] Develop a component specifically for embedding Twitch videos.
  - [x] Utilize Twitch API or embed code for rendering videos.
  - [ ] Use thumbnails on main page and embed on detailed article.
  - [ ] Allow customization of video dimensions.
  - [ ] Handle cases where Twitch embed code is not available.
  - [ ] Style the component to maintain a consistent UI with the application.

  - [ ] **X (twitter) Component**
    - [x] Develop a component specifically for show tweets.

- [ ] **ImageGallery Component**
  - [x] Create a component to handle image galleries from Reddit API.
  - [x] Map over the gallery items and render images.
  - [x] Dynamically handle varying resolutions in the gallery.
  - [x] Allow for customization of image dimensions and styling.
  - [ ] Implement error handling for failed image loads.
  - [ ] Style the component to fit seamlessly into the overall design.
  - [ ] Performance improvements (Images are slowing down load)

- [ ] **Comments Component**
  - [x] Create Comments component
    - [x] Display Text paragraph
    - [x] Display Post Author
    - [x] Display Score, up and down vote arrow buttons
      - [x] Create button functions
    - [x] Display Time of the post
  - [x] Sort comments by score  
  - [ ] Style the comments section
- [ ] *Comments Component extras*
  - [ ] Make a selector to sort comments for newest and oldest posts

## Utilities

- [x] **Time Utilities**
  - [x] Create function to format time difference
  - [x] Implement function to format date

## Redux

- [x] **Store**
  - [x] Initialize the store
  - [x] Add ArticlesSlice to store
  - [x] Add CommentsSlice to store

- [ ] **Articles Slice**
  - [x] Define Redux slice for articles
  - [x] Create mockApi state with redditAPI structure as the initialState for building components
  - [ ] Add actions for fetching and updating articles
  - [x] Create selectors for accessing articles state

- [ ] **Comments Slice**
  - [x] Define Redux slice for comments
  - [x] Create mockApi state with redditAPI structure as the initialState for building components
  - [ ] Add actions for fetching and updating comments
  - [x] Create selectors for accessing comments state

- [x] **Subreddits Slice**
  - [x] Define Redux slice for subreddits

## Styling

- [ ] **Global Styles**
  - [x] Set initial styling differentiate components on page
  - [ ] Define global styles using a styling library (e.g., styled-components)
  - [ ] Light/Dark mode
- [ ] **Responsive Styles**
  - [ ] Mouse hovering animation to articles, comments and subreddits
  - [ ] Make components render well in most display sizes
  - [ ] Hide subreddits to a navigation button for small screen sizes
- [ ] **Component-specific Styles**
  - [ ] Apply styles to individual components
  - [ ] Loading animation for loading posts and comments

## Testing

- [ ] **Unit Tests**
  - [ ] Write unit tests for critical functions
  - [ ] Ensure Redux actions and reducers are tested

- [ ] **Component Tests**
  - [ ] Implement tests for rendering components
  - [ ] Test component interactions and state changes

## Documentation

- [ ] **Readme**
  - [ ] Update project Readme with usage instructions
  - [ ] Include information on available components and utilities

## Optionals

- [ ] Get a custom domain name and use it for your application

- [ ] Set up a CI/CD workflow to automatically deploy your application when the master branch in the repository changes

- [ ] Make your application a progressive web app
