import axios from 'axios';

export class Pixela {

  public static async authentication(username: string, token: string) {
    const url = `${Pixela.ENDPOINT}/users/${username}/graphs`;
    const headers = {'X-USER-TOKEN': token};
    return await axios.get(url, {headers});
  }

  private static ENDPOINT: string = 'https://pixe.la/v1';
}
