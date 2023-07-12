import data from './mock_data.json';

export function mockFetchData() {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}
