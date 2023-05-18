import { Box, Button, ButtonGroup, CircularProgress, Grid } from '@mui/material'
import PostTile from '../components/PostTile'
import dummyFeed from '../api/feedData'
import '../styles/feed.css'
import { useContext, useEffect, useState } from 'react'
import { Post } from '../models/dataTypes'
import { FeedContext } from '../context/FeedContext'

export default function Feed() {
  const [isForYou, setIsForYou] = useState(true)
  const feedData = useContext(FeedContext)

  function renderFeed(posts: Post[]) {
    return posts.map((post: Post, index) => (
      <div className={`card card_${post.size}`} key={index}>
        <PostTile post={post}></PostTile>
      </div>
    ))
  }

  let feedContent = <div></div>

  if (isForYou) {
    feedContent = <Box className="post_container">{renderFeed(feedData)}</Box>
  } else {
    feedContent = <Box className="post_container">{renderFeed(dummyFeed.following)}</Box>
  }

  return (
    <div>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <ButtonGroup variant="text">
          <Button
            size="large"
            onClick={() => {
              setIsForYou(true)
            }}>
            For You
          </Button>
          <Button
            size="large"
            onClick={() => {
              setIsForYou(false)
            }}>
            Following
          </Button>
        </ButtonGroup>
      </Box>
      {feedContent}
    </div>
  )
}
