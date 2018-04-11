import React, { Component } from 'react'
import Post from '.././Components/Post'
import getTrendingPosts from '.././Functions/getTrendingPosts'

import Spinner from '.././Components/Spinner'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Masonry from 'react-masonry-component'
import InfiniteScroll from 'react-infinite-scroller'

import styled from 'styled-components'

const styles = {

  margin: '0 auto',
}
const Container = styled.div`
  margin-top: 2em;
`

export default class Trending extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      posts: [],
      layoutReady: false,
      following: this.props.following
    }
    //console.log(this.state.following)
  }
  async loader() {
    const prevState = this.state.posts
    const apiCall = await getTrendingPosts('dtube')
    const children = prevState.concat(apiCall)
   
    this.setState({
      posts: children
    })
  }
  async componentWillMount() {
  
    this.setState({
    
      posts: await getTrendingPosts('dsound'),
      isLoading: false
    })
    
  }
  handleLayoutReady() {
    if(!this.state.layoutReady) {
      this.setState({
        layoutReady: true
      })
    }
  }
  checkFollowing(author) {
    if(this.state.following === undefined) {
      return false
    }
    return this.state.following.includes(author)
  }
  render() {
    const masonryOptions = {
      fitWidth: true,
      gutter: 10,
      transitionDuration: 0,
      visibility: this.state.layoutReady ? 'visible' : 'hidden', 
    }
    if (this.state.isLoading) return (<MuiThemeProvider><Spinner /></MuiThemeProvider>)
    return (
      <Container>

        <InfiniteScroll
          pageStart={0}
          loadMore={this.loader.bind(this)}
          
          hasMore={true}
          loader={<MuiThemeProvider  key={Math.random()} ><Spinner key={Math.random()}/></MuiThemeProvider>}

        >

          <Masonry 
            style={styles}
            options={masonryOptions}
            threshold={0}
            onLayoutComplete={this.handleLayoutReady.bind(this)}
          >

          {this.state.posts.map((post) => {
            
            return <Post post={post} 
                    username={this.props.username} 
                    isFollowing={this.checkFollowing(post.author)} 
                    key={post.permlink}
                    
                    />
          })}
            


          </Masonry>

        </InfiniteScroll>


      </Container>

    )
  }
}

