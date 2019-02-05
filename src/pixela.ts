import axios from 'axios';

export class Pixela {
  private static ENDPOINT: string = 'https://pixe.la/v1';

  constructor(private username: string, private token: string) {
  }

  public async loadGraphs() {
    const url = `${Pixela.ENDPOINT}/users/${this.username}/graphs`;
    const headers = {'X-USER-TOKEN': this.token};

    try {
      const res = await axios.get(url, {headers});
      return res.data.graphs;
    } catch (ignore) {
      // axios' error will be output to DevTools' console.
      return null;
    }
  }

}
