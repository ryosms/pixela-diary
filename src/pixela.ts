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

  public async loadGraphSvg(graphId: string, targetDate: Date) {
    const targetDateString = targetDate.getFullYear()
      + `0${targetDate.getMonth() + 1}`.slice(-2)
      + `0${targetDate.getDate()}`.slice(-2);
    const url = `${Pixela.ENDPOINT}/users/${this.username}/graphs/${graphId}`;
    const params = {
      date: targetDateString,
      mode: 'short',
    };
    try {
      const res = await axios.get(url, {params});
      return res.data;
    } catch (ignore) {
      return null;
    }

  }

}
