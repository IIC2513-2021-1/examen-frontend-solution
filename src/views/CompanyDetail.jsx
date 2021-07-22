/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { Deserializer } from 'jsonapi-serializer';
import companiesApi from '../api/companies';
import Loading from '../components/Loading';
import useAuth from '../hooks/useAuth';
import useOption from '../hooks/useOption';
import CompanyMilestone from '../components/Companies/Milestone';
import CompanyStats from '../components/Companies/Stats';

export default function Companies() {
  const { id } = useParams();
  const [company, setCompany] = useState({});
  const [loading, setLoading] = useState(false);
  const [milestones, setMilestones] = useState([]);
  const [loadingMilestones, setLoadingMilestones] = useState(false);
  const [stats, setStats] = useState({});
  const [loadingStats, setLoadingStats] = useState(false);
  const { currentUser: { access_token: accessToken } } = useAuth();
  const { option } = useOption();

  useEffect(() => {
    setLoading(true);
    companiesApi.getCompany(id, accessToken)
      .then((data) => {
        new Deserializer({ keyForAttribute: 'camelCase' })
          .deserialize(data, (_error, companyData) => setCompany(companyData));
      })
      .catch((error) => console.log(error)) // Optional since it was not requested in the exam
      .finally(() => setLoading(false));
  }, [accessToken, id]);

  useEffect(() => {
    if (Object.keys(company).length > 0) {
      if (option === 'milestones') {
        setLoadingMilestones(true);
        companiesApi.getCompanyMilestones(id, accessToken)
          .then((data) => {
            new Deserializer({ keyForAttribute: 'camelCase' })
              .deserialize(data, (_error, dataArray) => setMilestones(dataArray));
          })
          .catch((error) => console.log(error)) // Optional since it was not requested in the exam
          .finally(() => setLoadingMilestones(false));
      } else {
        setLoadingStats(true);
        companiesApi.getCompanyStats(id, accessToken)
          .then((data) => {
            new Deserializer({ keyForAttribute: 'camelCase' })
              .deserialize(data, (_error, statsData) => setStats(statsData));
          })
          .catch((error) => console.log(error)) // Optional since it was not requested in the exam
          .finally(() => setLoadingStats(false));
      }
    }
  }, [accessToken, company, id, option]);

  return (
    <div className="company-detail">
      {loading ? (
        <Loading large fullscreen />
      ) : (
        <>
          <div className="company-extended">
            <section className="company-extended-item">
              <h1>{company.name}</h1>
              <p className="company-subtitle">
                Founded by
                {' '}
                {company.founder}
                {' '}
                on
                {' '}
                {company.foundedAt && format(parseISO(company.foundedAt), 'PPP')}
              </p>
              <p>{company.description}</p>
            </section>
            <img className="company-extended-item" src={company.imageUrl} alt={`${company.name} ship`} />
          </div>
          {option === 'milestones' && (
            <div className="company-milestones">
              {loadingMilestones ? (
                <div className="loading-sm-container">
                  <Loading />
                </div>
              ) : (
                <ul>
                  {milestones.map((milestone) => (
                    <CompanyMilestone key={milestone.id} milestone={milestone} />
                  ))}
                </ul>
              )}
            </div>
          )}
          {option === 'stats' && (
            loadingStats ? (
              <div className="loading-sm-container">
                <Loading />
              </div>
            ) : (
              <CompanyStats stats={stats} />
            )
          )}
        </>
      )}
    </div>
  );
}
