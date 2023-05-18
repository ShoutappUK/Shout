import MapFeed from '../components/MapFeed'
export default function Map() {
  return <MapFeed />
}
// Alex: I gave up trying to implement a way for onClicks to work properly.
// If you want to implement opening a post, I suggest having a modal which will open a sequence of predefined post cards when anywhere on the screen is clicked for demo purposes.
// So you would load the data of Posts 1, 2, and 3 but not display the modal. Then when the modal is opened the first element in the data is shown in the modal. On closing the modal the first element is removed.
