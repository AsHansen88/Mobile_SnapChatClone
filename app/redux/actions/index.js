import { USER_POST_STATE_CHANGE, USER_STATE_CHANGE } from '../constants/index';
import { auth, firestore } from '../../../firebase'; 
import { doc, getDoc, collection, query, orderBy, getDocs } from 'firebase/firestore'; 

export function fetchUser() {
  return async (dispatch) => {
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(firestore, 'users', user.uid); // Use the correct collection name 'users'

      try {
        const snapshot = await getDoc(userDocRef);

        if (snapshot.exists()) {
          console.log(snapshot.data());
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log('User data does not exist');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    } else {
      console.log('No user is currently logged in');
    }
  };
}

export function fetchUserPosts() {
  return async (dispatch) => {
    const user = auth.currentUser;

    if (user) {
      const postsCollectionRef = collection(firestore, 'posts');
      const postsQuery = query(
        postsCollectionRef,
        orderBy('creation', 'asc') 
      );

      try {
        const snapshot = await getDocs(postsQuery);
        const userPosts = [];

        snapshot.forEach((doc) => {
          userPosts.push(doc.data());
        });

        console.log(userPosts);
        dispatch({ type: USER_POST_STATE_CHANGE, userPosts });
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    } else {
      console.log('No user is currently logged in');
    }
  };
}