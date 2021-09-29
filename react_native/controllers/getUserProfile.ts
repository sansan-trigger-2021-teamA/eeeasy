import Amplify, {Auth} from 'aws-amplify';

export async function getUserProfile(){
  const currentUser = await Auth.currentAuthenticatedUser();
  return currentUser["attributes"];
}
