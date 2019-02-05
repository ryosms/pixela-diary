import axios from 'axios';

export class Pixela {

  public static async loadGraphs(username: string, token: string) {
    const url = `${Pixela.ENDPOINT}/users/${username}/graphs`;
    const headers = {'X-USER-TOKEN': token};

    try {
      const res = await axios.get(url, {headers});
      return res.data.graphs;
    } catch (ignore) {
      // axios' error will be output to DevTools' console.
      return null;
    }
  }

  private static ENDPOINT: string = 'https://pixe.la/v1';
}
