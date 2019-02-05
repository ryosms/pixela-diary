import axios, {AxiosResponse} from 'axios';

export interface Pixel {
  quantity: string;
  title: string;
  body: string;
}

export class Pixela {
  private static ENDPOINT: string = 'https://pixe.la/v1';

  private static formatDateString(target: Date) {
    return target.getFullYear()
      + `0${target.getMonth() + 1}`.slice(-2)
      + `0${target.getDate()}`.slice(-2);
  }

  private static parsePixel(responseData: AxiosResponse): Pixel {
    if (responseData.status === 404) {
      return {quantity: '', title: '', body: ''};
    }
    const quantity = responseData.data.quantity;
    let title = '';
    let body = '';
    try {
      const json = JSON.parse(responseData.data.optionalData);
      title = json.title;
      body = json.body;
    } catch (ignore) {
      // Pixel registered but that contains no optionalData or not json format.
    }
    return {quantity, title, body};
  }

  private static async stringifyOptionalData(pixel: Pixel) {
    return await JSON.stringify({title: pixel.title, body: pixel.body});
  }

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
    const targetDateString = Pixela.formatDateString(targetDate);
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

  public async loadPixel(graphId: string, pixelDate: Date) {
    const targetDate = Pixela.formatDateString(pixelDate);
    const url = `${Pixela.ENDPOINT}/users/${this.username}/graphs/${graphId}/${targetDate}`;
    const headers = {
      'X-USER-TOKEN': this.token,
      'accept': 'application/json',
    };
    try {
      const res = await axios.get(url, {
        headers,
        validateStatus: (status) => (status === 200 || status === 404),
      });
      return Pixela.parsePixel(res);
    } catch (ignore) {
      return null;
    }
  }

  public async postPixel(graphId: string, pixelDate: Date, pixelData: Pixel) {
    const targetDate = Pixela.formatDateString(pixelDate);
    const url = `${Pixela.ENDPOINT}/users/${this.username}/graphs/${graphId}/${targetDate}`;
    const quantity = pixelData.quantity ? pixelData.quantity : '1';
    const optionalData = await Pixela.stringifyOptionalData(pixelData);
    const headers = {
      'X-USER-TOKEN': this.token,
    };

    try {
      await axios.put(url, {quantity, optionalData}, {headers});
      return {quantity, title: pixelData.title, body: pixelData.body};
    } catch (ignore) {
      return null;
    }
  }

  public async deletePixel(graphId: string, pixelDate: Date) {
    const targetDate = Pixela.formatDateString(pixelDate);
    const url = `${Pixela.ENDPOINT}/users/${this.username}/graphs/${graphId}/${targetDate}`;
    const headers = {
      'X-USER-TOKEN': this.token,
    };
    try {
      await axios.delete(url, {headers});
      return true;
    } catch (ignore) {
      return false;
    }
  }
}
