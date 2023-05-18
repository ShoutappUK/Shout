import db from '../firebase/firebase';
import { collection, query, limit, getDocs } from 'firebase/firestore';
import { Post } from '../models/dataTypes';
import dummyFeed from '../api/feedData';
import CircularProgress from '@mui/material/CircularProgress';
import { createContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';

export const FeedContext = createContext<Post[]>(dummyFeed.forYou);

type FeedProviderProps = {
  children: React.ReactNode;
};

export default function FeedProvider({ children }: FeedProviderProps) {
  const [feedData, setFeedData] = useState<Post[]>(dummyFeed.forYou);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const q = query(collection(db, 'posts'));
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map((doc) => doc.data() as Post);
        setFeedData(posts);
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeed();
  }, []);

  return (
    <>
      {isLoading ? (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', my: 3 }}>
        <CircularProgress />
      </Box>
      ) : (
        <FeedContext.Provider value={feedData}>
          {children}
        </FeedContext.Provider>
      )}
    </>
  );
}