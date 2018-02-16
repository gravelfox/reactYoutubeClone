import React, {Component} from "react";
import ReactDOM from "react-dom";
import SearchBar from "./components/searchBar";
import YTSearch from "youtube-api-search";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/videoDetail";
import _ from "lodash";
const API_KEY = "AIzaSyAt5x1FNKN-hskJReYF4pmKKziYKnaaUn8";



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('surfboards');
  }

videoSearch(term){
  YTSearch({key: API_KEY, term: term}, (videos) => {
    this.setState({
      videos: videos,
      selectedVideo: videos[0]
    });
  });
}


  render() {
    const videoSearch = _.debounce ((term) => {this.videoSearch(term)}, 400);

    return (
    <div>
      <SearchBar onSearchTermChange={videoSearch}/>
      <VideoDetail video={this.state.selectedVideo} />
      <VideoList
      onVideoSelect={selectedVideo => this.setState({selectedVideo})}
      videos={this.state.videos} />
    </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
