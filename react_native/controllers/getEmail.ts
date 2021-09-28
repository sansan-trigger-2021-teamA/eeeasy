import Amplify, {Auth} from 'aws-amplify';

export async function getEmail(){
  const currentUser = await Auth.currentAuthenticatedUser();
  return currentUser["attributes"]["email"];
}
