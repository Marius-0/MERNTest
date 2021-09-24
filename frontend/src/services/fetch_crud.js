export async function get(url='', data={}) {
  const options = data ? {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  } : null;

  return await fetch(url)
    .then(res => res.json())
    .catch(error => {console.error('Error occured when fetching posts:', error)});
}

export async function post(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  return response.json();
}

export async function postFunc(url = '', data = {}) {
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}
