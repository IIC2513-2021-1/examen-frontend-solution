/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Deserializer } from 'jsonapi-serializer';
import companiesApi from '../api/companies';
import Loading from '../components/Loading';
import useAuth from '../hooks/useAuth';
import CompanyCard from '../components/Companies/Card';

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser: { access_token: accessToken } } = useAuth();

  useEffect(() => {
    setLoading(true);
    companiesApi.getCompanies(accessToken)
      .then((data) => {
        new Deserializer({ keyForAttribute: 'camelCase' })
          .deserialize(data, (_error, companiesList) => setCompanies(companiesList));
      })
      .catch((error) => console.log(error)) // Optional since it was not requested in the exam
      .finally(() => setLoading(false));
  }, [accessToken]);

  return (
    <div className="companies">
      <h1>La carrera espacial privada</h1>
      {loading ? (
        <Loading large fullscreen />
      ) : (
        <ul>
          {companies.map((singleCompany) => (
            <CompanyCard key={singleCompany.id} company={singleCompany} />
          ))}
        </ul>
      )}
    </div>
  );
}
