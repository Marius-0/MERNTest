async function get(url='') {
  const response = await fetch(url)
    .catch(error => {console.error('Error occured when fetching posts:', error)});
  return response.json();
}

async function post(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}
