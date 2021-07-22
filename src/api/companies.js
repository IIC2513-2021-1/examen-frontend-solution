import config from '../config';

async function getResource(url, token) {
  const requestOptions = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  const companies = await response.json();
  return companies;
}

function getCompanies(token) {
  return getResource(`${config.apiUrl}/api/companies`, token);
}

function getCompany(id, token) {
  return getResource(`${config.apiUrl}/api/companies/${id}`, token);
}

function getCompanyMilestones(id, token) {
  return getResource(`${config.apiUrl}/api/companies/${id}/milestones`, token);
}

export default {
  getCompanies,
  getCompany,
  getCompanyMilestones,
};
